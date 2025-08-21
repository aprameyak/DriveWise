import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useUserProfileStore } from '../store/userProfileStore';
import { dataService } from '../services/dataService';
import { calculateTCO } from '../utils/calculateTCO';
import { CarData } from '../types';

const TCOOptimizerScreen = () => {
  const { profile } = useUserProfileStore();
  const [cars, setCars] = useState<CarData[]>([]);
  const [selectedCarIndex, setSelectedCarIndex] = useState<number | null>(null);
  const [annualMileage, setAnnualMileage] = useState(profile?.annualMileage?.toString() || '12000');
  const [ownershipYears, setOwnershipYears] = useState(profile?.ownershipDuration?.toString() || '5');
  const [zipCode, setZipCode] = useState(profile?.zipCode || '90001');
  const [tcoResult, setTcoResult] = useState<any>(null);
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

  const validateInputs = () => {
    if (selectedCarIndex === null) {
      Alert.alert('Validation Error', 'Please select a car.');
      return false;
    }
    if (!annualMileage || isNaN(Number(annualMileage)) || Number(annualMileage) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid annual mileage.');
      return false;
    }
    if (!ownershipYears || isNaN(Number(ownershipYears)) || Number(ownershipYears) <= 0) {
      Alert.alert('Validation Error', 'Please enter valid ownership years.');
      return false;
    }
    if (!zipCode || zipCode.length !== 5 || isNaN(Number(zipCode))) {
      Alert.alert('Validation Error', 'Please enter a valid 5-digit ZIP code.');
      return false;
    }
    return true;
  };

  const handleCalculate = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    
    try {
      const car = cars[selectedCarIndex!];
      const tco = await calculateTCO({
        make: car.make,
        model: car.model,
        year: car.year,
        purchasePrice: car.msrp * 0.8,
        ownershipYears: Number(ownershipYears),
        annualMileage: Number(annualMileage),
        zipCode,
      });
      setTcoResult(tco);
    } catch (error) {
      console.error('Error calculating TCO:', error);
      Alert.alert('Error', 'Failed to calculate TCO. Please try again.');
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

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>TCO Optimizer</Text>
      <Text style={styles.label}>Select a Car:</Text>
      <View style={styles.carList}>
        {cars.map((car: CarData, idx: number) => (
          <TouchableOpacity
            key={car.make + car.model + car.year}
            style={[styles.carButton, selectedCarIndex === idx && styles.carButtonSelected]}
            onPress={() => setSelectedCarIndex(idx)}
          >
            <Text style={styles.carButtonText}>{car.year} {car.make} {car.model}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Annual Mileage:</Text>
      <TextInput
        style={styles.input}
        value={annualMileage}
        onChangeText={setAnnualMileage}
        keyboardType="numeric"
        placeholder="e.g. 12000"
        editable={!loading}
      />
      <Text style={styles.label}>Ownership Years:</Text>
      <TextInput
        style={styles.input}
        value={ownershipYears}
        onChangeText={setOwnershipYears}
        keyboardType="numeric"
        placeholder="e.g. 5"
        editable={!loading}
      />
      <Text style={styles.label}>ZIP Code:</Text>
      <TextInput
        style={styles.input}
        value={zipCode}
        onChangeText={setZipCode}
        keyboardType="numeric"
        placeholder="e.g. 90001"
        maxLength={5}
        editable={!loading}
      />
      <TouchableOpacity style={styles.button} onPress={handleCalculate} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Calculating...' : 'Calculate TCO'}</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 16 }} />}
      {tcoResult && !loading && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Estimated TCO</Text>
          <Text style={styles.resultText}>Total Cost: ${tcoResult.totalCost.toFixed(0)}</Text>
          <Text style={styles.resultText}>Cost per Mile: ${tcoResult.costPerMile.toFixed(2)}</Text>
          <Text style={styles.resultText}>Cost per Year: ${tcoResult.costPerYear.toFixed(0)}</Text>
          <Text style={styles.resultText}>Resale Value: ${tcoResult.resaleValue.toFixed(0)}</Text>
          <Text style={styles.resultBreakdownTitle}>Breakdown:</Text>
          {Object.entries(tcoResult.breakdown).map(([key, value]) => (
            <Text key={key} style={styles.resultBreakdownText}>{key}: ${(value as number).toFixed(0)}</Text>
          ))}
        </View>
      )}
      {!tcoResult && !loading && (
        <Text style={styles.emptyText}>Enter your details and calculate to see results.</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
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
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultBox: {
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
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 2,
  },
  resultBreakdownTitle: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 10,
    fontWeight: '600',
  },
  resultBreakdownText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 24,
    textAlign: 'center',
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
});

export default TCOOptimizerScreen; 