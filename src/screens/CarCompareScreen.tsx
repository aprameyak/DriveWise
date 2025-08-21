import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useUserProfileStore } from '../store/userProfileStore';
import { dataService } from '../services/dataService';
import { calculateTCO } from '../utils/calculateTCO';
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
      const carData = await dataService.getCarData();
      setCars(carData);
    } catch (error) {
      console.error('Error loading cars:', error);
      Alert.alert('Error', 'Failed to load car data');
    } finally {
      setInitialLoading(false);
    }
  };

  const validateSelection = () => {
    if (firstCarIndex === null || secondCarIndex === null) {
      Alert.alert('Validation Error', 'Please select two cars to compare.');
      return false;
    }
    if (firstCarIndex === secondCarIndex) {
      Alert.alert('Validation Error', 'Please select two different cars.');
      return false;
    }
    return true;
  };

  const handleCompare = async () => {
    if (!validateSelection() || !profile) return;
    
    setLoading(true);
    try {
      const car1 = cars[firstCarIndex!];
      const car2 = cars[secondCarIndex!];
      
      const [tco1, tco2] = await Promise.all([
        calculateTCO({
          make: car1.make,
          model: car1.model,
          year: car1.year,
          purchasePrice: car1.msrp * 0.8,
          ownershipYears: profile.ownershipDuration,
          annualMileage: profile.annualMileage,
          zipCode: profile.zipCode,
        }),
        calculateTCO({
          make: car2.make,
          model: car2.model,
          year: car2.year,
          purchasePrice: car2.msrp * 0.8,
          ownershipYears: profile.ownershipDuration,
          annualMileage: profile.annualMileage,
          zipCode: profile.zipCode,
        }),
      ]);
      
      setTcoResults([tco1, tco2]);
      setCompared(true);
    } catch (error) {
      console.error('Error comparing cars:', error);
      Alert.alert('Error', 'Failed to compare cars. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading cars...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Car Comparison</Text>
        <Text style={styles.subtitle}>Complete onboarding to compare cars</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Car Compare</Text>
      <Text style={styles.subtitle}>Compare TCO for {profile.ownershipDuration} years, {profile.annualMileage.toLocaleString()} mi/year</Text>
      
      <Text style={styles.label}>Select First Car:</Text>
      <View style={styles.carList}>
        {cars.map((car: CarData, idx: number) => (
          <TouchableOpacity
            key={car.make + car.model + car.year + '1'}
            style={[styles.carButton, firstCarIndex === idx && styles.carButtonSelected]}
            onPress={() => setFirstCarIndex(idx)}
          >
            <Text style={styles.carButtonText}>{car.year} {car.make} {car.model}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.label}>Select Second Car:</Text>
      <View style={styles.carList}>
        {cars.map((car: CarData, idx: number) => (
          <TouchableOpacity
            key={car.make + car.model + car.year + '2'}
            style={[styles.carButton, secondCarIndex === idx && styles.carButtonSelected]}
            onPress={() => setSecondCarIndex(idx)}
          >
            <Text style={styles.carButtonText}>{car.year} {car.make} {car.model}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleCompare}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Comparing...' : 'Compare'}
        </Text>
      </TouchableOpacity>
      
      {loading && <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 16 }} />}
      
      {compared && tcoResults[0] && tcoResults[1] ? (
        <View style={styles.comparisonBox}>
          <Text style={styles.comparisonTitle}>TCO Comparison</Text>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonCol}>
              <Text style={styles.carName}>
                {cars[firstCarIndex!].year} {cars[firstCarIndex!].make} {cars[firstCarIndex!].model}
              </Text>
              <Text style={styles.resultText}>Total Cost: ${tcoResults[0].totalCost.toFixed(0)}</Text>
              <Text style={styles.resultText}>Per Mile: ${tcoResults[0].costPerMile.toFixed(2)}</Text>
              <Text style={styles.resultText}>Resale: ${tcoResults[0].resaleValue.toFixed(0)}</Text>
            </View>
            <View style={styles.comparisonCol}>
              <Text style={styles.carName}>
                {cars[secondCarIndex!].year} {cars[secondCarIndex!].make} {cars[secondCarIndex!].model}
              </Text>
              <Text style={styles.resultText}>Total Cost: ${tcoResults[1].totalCost.toFixed(0)}</Text>
              <Text style={styles.resultText}>Per Mile: ${tcoResults[1].costPerMile.toFixed(2)}</Text>
              <Text style={styles.resultText}>Resale: ${tcoResults[1].resaleValue.toFixed(0)}</Text>
            </View>
          </View>
          
          {tcoResults[0] && tcoResults[1] && (
            <View style={styles.savingsBox}>
              <Text style={styles.savingsTitle}>
                {tcoResults[0].totalCost < tcoResults[1].totalCost ? 'Savings' : 'Additional Cost'}
              </Text>
              <Text style={[
                styles.savingsAmount,
                { color: tcoResults[0].totalCost < tcoResults[1].totalCost ? '#10b981' : '#ef4444' }
              ]}>
                ${Math.abs(tcoResults[0].totalCost - tcoResults[1].totalCost).toFixed(0)}
              </Text>
            </View>
          )}
        </View>
      ) : compared ? (
        <Text style={styles.emptyText}>Could not calculate TCO for one or both cars.</Text>
      ) : (
        <Text style={styles.emptyText}>Select two cars and compare to see results.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
    alignItems: 'stretch',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#2563eb',
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
  carList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 8,
  },
  carButton: {
    backgroundColor: '#e0e7ef',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  carButtonSelected: {
    backgroundColor: '#2563eb',
  },
  carButtonText: {
    color: '#1e293b',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  comparisonBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
    textAlign: 'center',
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  comparisonCol: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  carName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 6,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  savingsBox: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'center',
  },
  savingsTitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  savingsAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 24,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#64748b',
    fontSize: 16,
  },
});

export default CarCompareScreen; 