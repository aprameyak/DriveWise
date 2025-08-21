import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { dataService } from '../services/dataService';
import { CarData } from '../types';

const DepreciationExplorerScreen = () => {
  const [cars, setCars] = useState<CarData[]>([]);
  const [selectedCarIndex, setSelectedCarIndex] = useState<number | null>(null);
  const [explored, setExplored] = useState(false);
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

  const handleExplore = () => {
    if (selectedCarIndex === null) {
      Alert.alert('Validation Error', 'Please select a car to explore depreciation.');
      return;
    }
    setExplored(true);
  };

  const car = selectedCarIndex !== null ? cars[selectedCarIndex] : null;
  const depreciationData = car ? Object.entries(car.usedPrices).map(([mileage, value]) => ({
    mileage: Number(mileage),
    value: value as number,
  })) : [];

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
      <Text style={styles.title}>Depreciation Explorer</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleExplore}>
        <Text style={styles.buttonText}>Show Depreciation</Text>
      </TouchableOpacity>
      {explored && car ? (
        <View style={styles.tableBox}>
          <Text style={styles.tableTitle}>Depreciation Table</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Mileage</Text>
            <Text style={styles.tableHeaderText}>Value ($)</Text>
          </View>
          {depreciationData.map((row, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.mileage.toLocaleString()}</Text>
              <Text style={styles.tableCell}>{row.value.toLocaleString()}</Text>
            </View>
          ))}
        </View>
      ) : explored ? (
        <Text style={styles.emptyText}>Could not load depreciation data for this car.</Text>
      ) : (
        <Text style={styles.emptyText}>Select a car and tap Show Depreciation to see results.</Text>
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
  tableBox: {
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
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 4,
    marginBottom: 4,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    color: '#64748b',
    fontSize: 15,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#1e293b',
    fontSize: 14,
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

export default DepreciationExplorerScreen; 