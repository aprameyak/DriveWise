import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useUserProfileStore } from '../store/userProfileStore';
import { dataService } from '../services/dataService';
import { calculateTCO } from '../utils/calculateTCO';
import { riskFlags } from '../utils/riskFlags';
import { CarData } from '../types';

const CarCompareScreen = () => {
  const { profile } = useUserProfileStore();
  const [cars, setCars] = useState<CarData[]>([]);
  const [firstCarIndex, setFirstCarIndex] = useState<number | null>(null);
  const [secondCarIndex, setSecondCarIndex] = useState<number | null>(null);
  const [tcoResults, setTcoResults] = useState<any[]>([]);
  const [compared, setCompared] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      setInitialLoading(true);
      const carData = await dataService.getCarData();
      setCars(carData);
    } catch (error) {
      console.error('Error loading cars:', error);
      Alert.alert('Error', 'Failed to load car data');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleCompare = async () => {
    if (firstCarIndex === null || secondCarIndex === null) {
      Alert.alert('Selection Required', 'Please select two cars to compare');
      return;
    }

    if (!profile) {
      Alert.alert('Profile Required', 'Please complete your profile first');
      return;
    }

    try {
      setLoading(true);
      const selectedCars = [cars[firstCarIndex], cars[secondCarIndex]];
      
      const results = await Promise.all(
        selectedCars.map(async (car) => {
          const tco = await calculateTCO({
            make: car.make,
            model: car.model,
            year: car.year,
            purchasePrice: car.price,
            ownershipYears: profile.ownershipDuration,
            annualMileage: profile.annualMileage,
            zipCode: profile.zipCode
          });
          
          return {
            car,
            tco: tco || { totalCost: 0, costPerMile: 0, costPerYear: 0, resaleValue: 0, breakdown: { depreciation: 0, fuel: 0, insurance: 0, maintenance: 0, taxesAndFees: 0 } }
          };
        })
      );

      setTcoResults(results);
      setCompared(true);
    } catch (error) {
      console.error('Error comparing cars:', error);
      Alert.alert('Error', 'Failed to compare cars');
    } finally {
      setLoading(false);
    }
  };

  const handleCarSelect = (index: number) => {
    if (firstCarIndex === index) {
      setFirstCarIndex(null);
    } else if (secondCarIndex === index) {
      setSecondCarIndex(null);
    } else if (firstCarIndex === null) {
      setFirstCarIndex(index);
    } else if (secondCarIndex === null) {
      setSecondCarIndex(index);
    } else {
      Alert.alert('Maximum Selection', 'You can only compare two cars at a time');
    }
  };

  const renderCarCard = (car: CarData, index: number, isSelected: boolean, position: 'first' | 'second' | null) => (
    <TouchableOpacity
      key={index}
      style={[styles.carCard, isSelected && styles.selectedCarCard]}
      onPress={() => handleCarSelect(index)}
    >
      <View style={styles.cardHeader}>
        <Image 
          source={{ uri: car.image }} 
          style={styles.carImage}
          resizeMode="cover"
        />
        {isSelected && (
          <View style={[styles.selectionBadge, { backgroundColor: position === 'first' ? '#10b981' : '#3b82f6' }]}>
            <Text style={styles.selectionBadgeText}>{position === 'first' ? 'A' : 'B'}</Text>
          </View>
        )}
        <View style={styles.badgeContainer}>
          <View style={styles.yearBadge}>
            <Text style={styles.yearBadgeText}>{car.year}</Text>
          </View>
          <View style={[styles.fuelBadge, { backgroundColor: car.fuelType === 'Electric' ? '#10b981' : '#f1f5f9' }]}>
            <Text style={[styles.fuelBadgeText, { color: car.fuelType === 'Electric' ? 'white' : '#64748b' }]}>
              {car.fuelType}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.carTitle}>
          {car.make} {car.model}
        </Text>
        <Text style={styles.carPrice}>
          ${car.price.toLocaleString()}
        </Text>
        
        <View style={styles.carSpecs}>
          <View style={styles.specRow}>
            <Ionicons name="speedometer-outline" size={14} color="#64748b" />
            <Text style={styles.specText}>
              {car.mpg.combined} {car.fuelType === 'Electric' ? 'MPGe' : 'MPG'}
            </Text>
          </View>
          <View style={styles.specRow}>
            <Ionicons name="shield-checkmark-outline" size={14} color="#64748b" />
            <View style={styles.starContainer}>
              {[...Array(car.safetyRating)].map((_, i) => (
                <Ionicons key={i} name="star" size={10} color="#fbbf24" />
              ))}
            </View>
          </View>
          <Text style={styles.specText}>Reliability: {car.reliability}/10</Text>
          <Text style={styles.specText}>Size: {car.size}</Text>
          {riskFlags({ model: `${car.make} ${car.model}`, askingPrice: car.price, reliability: car.reliability * 10 }).map((flag) => (
            <View key={flag} style={styles.specRow}>
              <Ionicons name="warning-outline" size={14} color="#f59e0b" />
              <Text style={styles.specText}>{flag}</Text>
            </View>
          ))}
        </View>

        {isSelected && compared && (
          <View style={styles.tcoPreview}>
            <Text style={styles.tcoLabel}>5-Year TCO</Text>
            <Text style={styles.tcoValue}>
              ${tcoResults[position === 'first' ? 0 : 1]?.tco.totalCost.toLocaleString()}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderComparisonResults = () => {
    if (!compared || tcoResults.length !== 2) return null;

    const [carA, carB] = tcoResults;
    const savings = Math.abs(carA.tco.totalCost - carB.tco.totalCost);
    const winner = carA.tco.totalCost < carB.tco.totalCost ? carA : carB;
    const loser = carA.tco.totalCost < carB.tco.totalCost ? carB : carA;

    return (
      <View style={styles.comparisonResults}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>Comparison Results</Text>
          <Text style={styles.resultsSubtitle}>5-Year Total Cost of Ownership</Text>
        </View>

        <View style={styles.resultsGrid}>
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Winner</Text>
            <Text style={styles.winnerName}>{winner.car.make} {winner.car.model}</Text>
            <Text style={styles.winnerTco}>${winner.tco.totalCost.toLocaleString()}</Text>
            <Text style={styles.savingsText}>Saves ${savings.toLocaleString()}</Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Runner-up</Text>
            <Text style={styles.runnerName}>{loser.car.make} {loser.car.model}</Text>
            <Text style={styles.runnerTco}>${loser.tco.totalCost.toLocaleString()}</Text>
            <Text style={styles.costMoreText}>Costs ${savings.toLocaleString()} more</Text>
          </View>
        </View>

        <View style={styles.breakdownSection}>
          <Text style={styles.breakdownTitle}>Cost Breakdown</Text>
          <View style={styles.breakdownGrid}>
            {['depreciation', 'fuel', 'insurance', 'maintenance', 'taxesAndFees'].map((category) => (
              <View key={category} style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
                <View style={styles.breakdownValues}>
                  <Text style={styles.breakdownValueA}>
                    ${carA.tco.breakdown[category as keyof typeof carA.tco.breakdown].toLocaleString()}
                  </Text>
                  <Text style={styles.breakdownValueB}>
                    ${carB.tco.breakdown[category as keyof typeof carB.tco.breakdown].toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.recommendationSection}>
          <Text style={styles.recommendationTitle}>Recommendation</Text>
          <Text style={styles.recommendationText}>
            The {winner.car.make} {winner.car.model} offers better long-term value with a total savings of ${savings.toLocaleString()} over 5 years.
          </Text>
          <View style={styles.recommendationFactors}>
            <Text style={styles.factorText}>• Lower total cost of ownership</Text>
            <Text style={styles.factorText}>• Better fuel efficiency</Text>
            <Text style={styles.factorText}>• More reliable maintenance costs</Text>
          </View>
        </View>
      </View>
    );
  };

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Loading cars...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Ionicons name="car" size={80} color="#2563eb" />
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>Set your preferences to get accurate comparisons</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Car Comparison</Text>
          <Text style={styles.subtitle}>Compare up to 2 cars side by side</Text>
        </View>

        <View style={styles.selectionSection}>
          <Text style={styles.sectionTitle}>Select Cars to Compare</Text>
          <View style={styles.carsGrid}>
            {cars.map((car, index) => 
              renderCarCard(
                car, 
                index, 
                firstCarIndex === index || secondCarIndex === index,
                firstCarIndex === index ? 'first' : secondCarIndex === index ? 'second' : null
              )
            )}
          </View>
        </View>

        {firstCarIndex !== null && secondCarIndex !== null && (
          <View style={styles.compareSection}>
            <TouchableOpacity 
              style={[styles.compareButton, loading && styles.compareButtonDisabled]}
              onPress={handleCompare}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Ionicons name="git-compare" size={20} color="white" />
                  <Text style={styles.compareButtonText}>Compare Cars</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        {renderComparisonResults()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    color: '#64748b',
    fontSize: 16,
  },
  selectionSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  carsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  carCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  selectedCarCard: {
    borderWidth: 3,
    borderColor: '#2563eb',
  },
  cardHeader: {
    position: 'relative',
  },
  carImage: {
    width: '100%',
    height: 120,
  },
  selectionBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    gap: 4,
  },
  yearBadge: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  yearBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  fuelBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  fuelBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  cardContent: {
    padding: 12,
  },
  carTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  carPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
  },
  carSpecs: {
    gap: 4,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  starContainer: {
    flexDirection: 'row',
    marginLeft: 4,
  },
  tcoPreview: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  tcoLabel: {
    fontSize: 11,
    color: '#64748b',
  },
  tcoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  compareSection: {
    padding: 16,
  },
  compareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  compareButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  compareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  comparisonResults: {
    padding: 16,
  },
  resultsHeader: {
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  resultsSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
  resultsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  resultCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  resultLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  winnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
  },
  winnerTco: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  savingsText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  runnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 8,
  },
  runnerTco: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 4,
  },
  costMoreText: {
    fontSize: 12,
    color: '#ef4444',
    fontWeight: '600',
  },
  breakdownSection: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  breakdownGrid: {
    gap: 12,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
  },
  breakdownValues: {
    flexDirection: 'row',
    gap: 16,
  },
  breakdownValueA: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
    minWidth: 60,
    textAlign: 'right',
  },
  breakdownValueB: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
    minWidth: 60,
    textAlign: 'right',
  },
  recommendationSection: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  recommendationText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  recommendationFactors: {
    gap: 4,
  },
  factorText: {
    fontSize: 13,
    color: '#6b7280',
  },
});

export default CarCompareScreen; 