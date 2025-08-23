import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useUserProfileStore } from '../store/userProfileStore';
import { dataService } from '../services/dataService';
import { calculateTCO } from '../utils/calculateTCO';
import { CarRecommendation, CarData } from '../types';

const HomeScreen = () => {
  const { profile } = useUserProfileStore();
  const [recommendations, setRecommendations] = useState<CarRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    fuelType: [] as string[],
    size: [] as string[],
    priceRange: [15000, 60000] as [number, number],
  });

  useEffect(() => {
    loadRecommendations();
  }, [profile, selectedFilters]);

  const loadRecommendations = async () => {
    if (!profile) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const cars = await dataService.getCarData();
      
      // Filter cars based on user preferences and filters
      const filteredCars = cars.filter(car => {
        const estimatedPrice = car.price;
        const matchesBudget = estimatedPrice >= profile.budgetRange.min && estimatedPrice <= profile.budgetRange.max;
        const matchesPriceRange = estimatedPrice >= selectedFilters.priceRange[0] && estimatedPrice <= selectedFilters.priceRange[1];
        const matchesFuelType = selectedFilters.fuelType.length === 0 || selectedFilters.fuelType.includes(car.fuelType);
        const matchesSize = selectedFilters.size.length === 0 || selectedFilters.size.includes(car.size);
        
        return matchesBudget && matchesPriceRange && matchesFuelType && matchesSize;
      });

      // Calculate TCO for each car
      const carRecommendations = await Promise.all(
        filteredCars.slice(0, 12).map(async (car) => {
          const tco = await calculateTCO({
            make: car.make,
            model: car.model,
            year: car.year,
            purchasePrice: car.price,
            ownershipYears: profile.ownershipDuration,
            annualMileage: profile.annualMileage,
            zipCode: profile.zipCode
          });

          if (!tco) return null;

          // Calculate recommendation metrics
          const buyAtMileage = 0;
          const sellAtMileage = profile.annualMileage * profile.ownershipDuration;
          const buyPrice = car.price;
          const sellPrice = tco.resaleValue;
          
          // Calculate confidence based on various factors
          const reliabilityScore = car.reliability;
          const fuelEfficiencyScore = car.mpg.combined;
          const safetyScore = car.safetyRating;
          const confidence = Math.min(95, Math.max(60, 
            (reliabilityScore * 2) + (fuelEfficiencyScore / 2) + (safetyScore * 3)
          ));

          const reasoning = [];
          if (car.mpg.combined > 30) reasoning.push('Excellent fuel efficiency');
          if (car.reliability >= 8) reasoning.push('High reliability rating');
          if (car.safetyRating >= 4) reasoning.push('Top safety rating');
          if (tco.costPerMile < 0.50) reasoning.push('Low cost per mile');
          if (car.features.length >= 4) reasoning.push('Well equipped');

          return {
            car,
            tcoCalculation: tco,
            recommendation: {
              buyAtMileage,
              sellAtMileage,
              buyPrice,
              sellPrice,
              confidence,
              reasoning
            }
          };
        })
      );

      // Sort by TCO and filter out null results
      const validRecommendations = carRecommendations
        .filter((rec): rec is CarRecommendation => rec !== null)
        .sort((a, b) => a.tcoCalculation.totalCost - b.tcoCalculation.totalCost)
        .slice(0, 8);

      setRecommendations(validRecommendations);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCarCard = (item: CarRecommendation, index: number) => (
    <View key={index} style={styles.carCard}>
      <View style={styles.cardHeader}>
        <Image 
          source={{ uri: item.car.image }} 
          style={styles.carImage}
          resizeMode="cover"
        />
        <View style={styles.badgeContainer}>
          <View style={styles.yearBadge}>
            <Text style={styles.yearBadgeText}>{item.car.year}</Text>
          </View>
          <View style={[styles.fuelBadge, { backgroundColor: item.car.fuelType === 'Electric' ? '#10b981' : '#f1f5f9' }]}>
            <Text style={[styles.fuelBadgeText, { color: item.car.fuelType === 'Electric' ? 'white' : '#64748b' }]}>
              {item.car.fuelType}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.carTitleSection}>
          <Text style={styles.carTitle}>
            {item.car.year} {item.car.make} {item.car.model}
          </Text>
          <Text style={styles.carPrice}>
            ${item.car.price.toLocaleString()}
          </Text>
        </View>

        <View style={styles.carSpecs}>
          <View style={styles.specRow}>
            <Ionicons name="speedometer-outline" size={16} color="#64748b" />
            <Text style={styles.specText}>
              {item.car.mpg.combined} {item.car.fuelType === 'Electric' ? 'MPGe' : 'MPG'}
            </Text>
          </View>
          <View style={styles.specRow}>
            <Ionicons name="shield-checkmark-outline" size={16} color="#64748b" />
            <View style={styles.starContainer}>
              {[...Array(item.car.safetyRating)].map((_, i) => (
                <Ionicons key={i} name="star" size={12} color="#fbbf24" />
              ))}
            </View>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specText}>Reliability: {item.car.reliability}/10</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specText}>Size: {item.car.size}</Text>
          </View>
        </View>

        <View style={styles.tcoSection}>
          <Text style={styles.tcoLabel}>5-Year TCO</Text>
          <Text style={styles.tcoValue}>
            ${item.tcoCalculation.totalCost.toLocaleString()}
          </Text>
        </View>

        <View style={styles.confidenceSection}>
          <Text style={styles.confidenceText}>
            Confidence: {item.recommendation.confidence.toFixed(0)}%
          </Text>
          {item.recommendation.reasoning.length > 0 && (
            <Text style={styles.reasoningText}>
              {item.recommendation.reasoning[0]}
            </Text>
          )}
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.compareButton}>
            <Ionicons name="add" size={16} color="#2563eb" />
            <Text style={styles.compareButtonText}>Compare</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailsButton}>
            <Ionicons name="bar-chart-outline" size={16} color="white" />
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Ionicons name="car" size={80} color="#2563eb" />
          <Text style={styles.title}>Welcome to DriveWise</Text>
          <Text style={styles.subtitle}>Complete onboarding to get personalized car recommendations</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>DriveWise Recommendations</Text>
          <Text style={styles.subtitle}>Based on your profile in {profile.zipCode}</Text>
        </View>
        
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Finding your perfect car...</Text>
          </View>
        ) : recommendations.length > 0 ? (
          <View style={styles.cardsContainer}>
            {recommendations.map((item, index) => renderCarCard(item, index))}
          </View>
        ) : (
          <View style={styles.centerContainer}>
            <Ionicons name="search" size={64} color="#cbd5e1" />
            <Text style={styles.noResultsText}>No cars found in your budget range</Text>
            <Text style={styles.noResultsSubtext}>Try adjusting your budget in Profile settings</Text>
          </View>
        )}
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
  noResultsText: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  cardsContainer: {
    padding: 16,
  },
  carCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    position: 'relative',
  },
  carImage: {
    width: '100%',
    height: 200,
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yearBadge: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  yearBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  fuelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  fuelBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  carTitleSection: {
    marginBottom: 12,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  carPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  carSpecs: {
    marginBottom: 12,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  specText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
  },
  starContainer: {
    flexDirection: 'row',
    marginLeft: 6,
  },
  tcoSection: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  tcoLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  tcoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  confidenceSection: {
    marginBottom: 16,
  },
  confidenceText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
    marginBottom: 4,
  },
  reasoningText: {
    fontSize: 12,
    color: '#64748b',
    fontStyle: 'italic',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  compareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  compareButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  detailsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default HomeScreen; 