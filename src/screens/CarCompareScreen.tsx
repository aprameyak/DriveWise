import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ALL_CARS } from '../data/cars';
import { calculateTCO } from '../utils/calculateTCO';

const CarCompareScreen = () => {
  const [firstCarIndex, setFirstCarIndex] = useState<number | null>(null);
  const [secondCarIndex, setSecondCarIndex] = useState<number | null>(null);
  const [tcoResults, setTcoResults] = useState<any[]>([]);
  const [compared, setCompared] = useState(false);

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

  const handleCompare = () => {
    if (!validateSelection()) return;
    const car1 = ALL_CARS[firstCarIndex!];
    const car2 = ALL_CARS[secondCarIndex!];
    // Use default values for comparison
    const tco1 = calculateTCO({
      make: car1.make,
      model: car1.model,
      year: car1.year,
      purchasePrice: car1.msrp * 0.8,
      ownershipYears: 5,
      annualMileage: 12000,
      zipCode: '90001',
    });
    const tco2 = calculateTCO({
      make: car2.make,
      model: car2.model,
      year: car2.year,
      purchasePrice: car2.msrp * 0.8,
      ownershipYears: 5,
      annualMileage: 12000,
      zipCode: '90001',
    });
    setTcoResults([tco1, tco2]);
    setCompared(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Car Compare</Text>
      <Text style={styles.label}>Select First Car:</Text>
      <View style={styles.carList}>
        {ALL_CARS.map((car, idx) => (
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
        {ALL_CARS.map((car, idx) => (
          <TouchableOpacity
            key={car.make + car.model + car.year + '2'}
            style={[styles.carButton, secondCarIndex === idx && styles.carButtonSelected]}
            onPress={() => setSecondCarIndex(idx)}
          >
            <Text style={styles.carButtonText}>{car.year} {car.make} {car.model}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCompare}>
        <Text style={styles.buttonText}>Compare</Text>
      </TouchableOpacity>
      {compared && tcoResults[0] && tcoResults[1] ? (
        <View style={styles.comparisonBox}>
          <Text style={styles.comparisonTitle}>TCO Comparison (5 years, 12,000 mi/year)</Text>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonCol}>
              <Text style={styles.carName}>{ALL_CARS[firstCarIndex!].year} {ALL_CARS[firstCarIndex!].make} {ALL_CARS[firstCarIndex!].model}</Text>
              <Text style={styles.resultText}>Total Cost: ${tcoResults[0].totalCost.toFixed(0)}</Text>
              <Text style={styles.resultText}>Per Mile: ${tcoResults[0].costPerMile.toFixed(2)}</Text>
              <Text style={styles.resultText}>Resale: ${tcoResults[0].resaleValue.toFixed(0)}</Text>
            </View>
            <View style={styles.comparisonCol}>
              <Text style={styles.carName}>{ALL_CARS[secondCarIndex!].year} {ALL_CARS[secondCarIndex!].make} {ALL_CARS[secondCarIndex!].model}</Text>
              <Text style={styles.resultText}>Total Cost: ${tcoResults[1].totalCost.toFixed(0)}</Text>
              <Text style={styles.resultText}>Per Mile: ${tcoResults[1].costPerMile.toFixed(2)}</Text>
              <Text style={styles.resultText}>Resale: ${tcoResults[1].resaleValue.toFixed(0)}</Text>
            </View>
          </View>
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
  emptyText: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 24,
    textAlign: 'center',
  },
});

export default CarCompareScreen; 