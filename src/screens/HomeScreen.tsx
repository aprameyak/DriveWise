import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserProfileStore } from '../store/userProfileStore';
import { dataService } from '../services/dataService';
import { calculateTCO } from '../utils/calculateTCO';
import { CarRecommendation } from '../types';

const HomeScreen = () => {
  const { profile } = useUserProfileStore();
  const [recommendations, setRecommendations] = useState<CarRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, [profile]);

  const loadRecommendations = async () => {
    if (!profile) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const cars = await dataService.getCarData();
      
      // Filter cars within budget range
      const affordableCars = cars.filter(car => {
        const estimatedPrice = car.msrp * 0.8; // 20% off MSRP
        return estimatedPrice >= profile.budgetRange.min && estimatedPrice <= profile.budgetRange.max;
      });

      // Calculate TCO for each car
      const carRecommendations = await Promise.all(
        affordableCars.slice(0, 8).map(async (car) => {
          const tco = await calculateTCO({
            make: car.make,
            model: car.model,
            year: car.year,
            purchasePrice: car.msrp * 0.8,
            ownershipYears: profile.ownershipDuration,
            annualMileage: profile.annualMileage,
            zipCode: profile.zipCode
          });

          if (!tco) return null;

          // Calculate recommendation metrics
          const buyAtMileage = 0;
          const sellAtMileage = profile.annualMileage * profile.ownershipDuration;
          const buyPrice = car.msrp * 0.8;
          const sellPrice = tco.resaleValue;
          
          // Calculate confidence based on various factors
          const reliabilityScore = car.maintenanceByMileage[sellAtMileage.toString()] || 2000;
          const fuelEfficiencyScore = car.mpg;
          const confidence = Math.min(95, Math.max(60, 
            (100 - (reliabilityScore / 100)) + (fuelEfficiencyScore / 2)
          ));

          const reasoning = [];
          if (car.mpg > 30) reasoning.push('Excellent fuel efficiency');
          if (reliabilityScore < 1500) reasoning.push('Low maintenance costs');
          if (tco.costPerMile < 0.50) reasoning.push('Low cost per mile');

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
        .slice(0, 5);

      setRecommendations(validRecommendations);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.title}>Welcome to DriveWise</Text>
          <Text style={styles.subtitle}>Complete onboarding to get personalized car recommendations</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>DriveWise Recommendations</Text>
        <Text style={styles.subtitle}>Based on your profile in {profile.zipCode}</Text>
        
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Finding your perfect car...</Text>
          </View>
        ) : recommendations.length > 0 ? (
          recommendations.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.carTitle}>
                {item.car.year} {item.car.make} {item.car.model}
              </Text>
              <Text style={styles.tcoText}>
                TCO: ${item.tcoCalculation.totalCost.toFixed(0)} | ${item.tcoCalculation.costPerMile.toFixed(2)}/mile
              </Text>
              <Text style={styles.mpgText}>MPG: {item.car.mpg}</Text>
              <Text style={styles.confidenceText}>
                Confidence: {item.recommendation.confidence.toFixed(0)}%
              </Text>
              {item.recommendation.reasoning.length > 0 && (
                <Text style={styles.reasoningText}>
                  {item.recommendation.reasoning[0]}
                </Text>
              )}
            </View>
          ))
        ) : (
          <View style={styles.centerContainer}>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
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
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#94a3b8',
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
    marginBottom: 4,
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
});

export default HomeScreen; 