import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ALL_CARS } from '../data/cars';
import { calculateTCO } from '../utils/calculateTCO';

const HomeScreen = () => {
  const userProfile = {
    annualMileage: 12000,
    ownershipYears: 5,
    zipCode: '90001'
  };

  const recommendations = ALL_CARS.slice(0, 5).map(car => {
    const tco = calculateTCO({
      make: car.make,
      model: car.model,
      year: car.year,
      purchasePrice: car.msrp * 0.8, // 20% off MSRP
      ownershipYears: userProfile.ownershipYears,
      annualMileage: userProfile.annualMileage,
      zipCode: userProfile.zipCode
    });

    return { car, tco };
  }).filter(item => item.tco !== null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>DriveWise Recommendations</Text>
        {recommendations.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.carTitle}>
              {item.car.year} {item.car.make} {item.car.model}
            </Text>
            <Text style={styles.tcoText}>
              TCO: ${item.tco?.totalCost.toFixed(0)} | ${item.tco?.costPerMile.toFixed(2)}/mile
            </Text>
            <Text style={styles.mpgText}>MPG: {item.car.mpg}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tcoText: {
    fontSize: 16,
    color: '#2563eb',
    marginBottom: 4,
  },
  mpgText: {
    fontSize: 14,
    color: '#64748b',
  },
});

export default HomeScreen; 