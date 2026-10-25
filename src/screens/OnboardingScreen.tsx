import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, USAGE_TYPES, MAINTENANCE_TOLERANCE } from '../constants';
import { useAuthStore } from '../store/authStore';
import { useUserProfileStore } from '../store/userProfileStore';
import { UserProfile } from '../types';

const OnboardingScreen = () => {
  const { user } = useAuthStore();
  const { setProfile } = useUserProfileStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    annualMileage: '',
    usageType: 'mixed' as const,
    ownershipDuration: '',
    maintenanceTolerance: 'medium' as const,
    budgetMin: '',
    budgetMax: '',
    zipCode: '',
  });

  const steps = [
    {
      title: 'Welcome to DriveWise',
      subtitle: 'Let\'s optimize your used car purchase',
      icon: 'car-outline',
    },
    {
      title: 'Your Driving Habits',
      subtitle: 'Help us understand how you drive',
      icon: 'speedometer-outline',
    },
    {
      title: 'Ownership Goals',
      subtitle: 'How long do you plan to keep the car?',
      icon: 'calendar-outline',
    },
    {
      title: 'Budget Range',
      subtitle: 'What\'s your target price range?',
      icon: 'wallet-outline',
    },
    {
      title: 'Location',
      subtitle: 'For accurate insurance and tax estimates',
      icon: 'location-outline',
    },
  ];

  const updateFormData = (key: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (!formData.annualMileage || !formData.ownershipDuration || 
        !formData.budgetMin || !formData.budgetMax || !formData.zipCode) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const userProfile: UserProfile = {
      id: Date.now().toString(),
      email: 'user@example.com',
      annualMileage: parseInt(formData.annualMileage),
      usageType: formData.usageType,
      ownershipDuration: parseInt(formData.ownershipDuration),
      maintenanceTolerance: formData.maintenanceTolerance,
      budgetRange: {
        min: parseInt(formData.budgetMin),
        max: parseInt(formData.budgetMax),
      },
      zipCode: formData.zipCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProfile(userProfile);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContent}>
            <Ionicons name="car" size={80} color={COLORS.primary} />
            <Text style={styles.stepTitle}>{steps[0].title}</Text>
            <Text style={styles.stepSubtitle}>{steps[0].subtitle}</Text>
            <Text style={styles.description}>
              DriveWise helps you make smarter used car decisions by calculating the true cost of ownership.
            </Text>
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{steps[1].title}</Text>
            <Text style={styles.stepSubtitle}>{steps[1].subtitle}</Text>
            
            <Text style={styles.label}>Annual Mileage</Text>
            <TextInput
              style={styles.input}
              value={formData.annualMileage}
              onChangeText={(value) => updateFormData('annualMileage', value)}
              placeholder="e.g., 12000"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Driving Type</Text>
            {USAGE_TYPES.map((type) => (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.optionButton,
                  formData.usageType === type.value && styles.optionButtonSelected,
                ]}
                onPress={() => updateFormData('usageType', type.value)}
              >
                <Text style={[
                  styles.optionText,
                  formData.usageType === type.value && styles.optionTextSelected,
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{steps[2].title}</Text>
            <Text style={styles.stepSubtitle}>{steps[2].subtitle}</Text>
            
            <Text style={styles.label}>Ownership Duration (years)</Text>
            <TextInput
              style={styles.input}
              value={formData.ownershipDuration}
              onChangeText={(value) => updateFormData('ownershipDuration', value)}
              placeholder="e.g., 5"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Maintenance Tolerance</Text>
            {MAINTENANCE_TOLERANCE.map((tolerance) => (
              <TouchableOpacity
                key={tolerance.value}
                style={[
                  styles.optionButton,
                  formData.maintenanceTolerance === tolerance.value && styles.optionButtonSelected,
                ]}
                onPress={() => updateFormData('maintenanceTolerance', tolerance.value)}
              >
                <Text style={[
                  styles.optionText,
                  formData.maintenanceTolerance === tolerance.value && styles.optionTextSelected,
                ]}>
                  {tolerance.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{steps[3].title}</Text>
            <Text style={styles.stepSubtitle}>{steps[3].subtitle}</Text>
            
            <Text style={styles.label}>Minimum Budget ($)</Text>
            <TextInput
              style={styles.input}
              value={formData.budgetMin}
              onChangeText={(value) => updateFormData('budgetMin', value)}
              placeholder="e.g., 15000"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Maximum Budget ($)</Text>
            <TextInput
              style={styles.input}
              value={formData.budgetMax}
              onChangeText={(value) => updateFormData('budgetMax', value)}
              placeholder="e.g., 25000"
              keyboardType="numeric"
            />
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{steps[4].title}</Text>
            <Text style={styles.stepSubtitle}>{steps[4].subtitle}</Text>
            
            <Text style={styles.label}>ZIP Code</Text>
            <TextInput
              style={styles.input}
              value={formData.zipCode}
              onChangeText={(value) => updateFormData('zipCode', value)}
              placeholder="e.g., 10001"
              keyboardType="numeric"
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentStep + 1) / steps.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1} of {steps.length}
          </Text>
        </View>

        {renderStepContent()}

        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={20} color={COLORS.text} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <Ionicons 
              name={currentStep === steps.length - 1 ? "checkmark" : "arrow-forward"} 
              size={20} 
              color={COLORS.surface} 
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.lg,
  },
  progressContainer: {
    marginBottom: SPACING.xl,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressText: {
    textAlign: 'center',
    marginTop: SPACING.sm,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  stepSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: SPACING.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.lg,
  },
  optionButton: {
    width: '100%',
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  optionButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.lg,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  backButtonText: {
    marginLeft: SPACING.xs,
    fontSize: 16,
    color: COLORS.text,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
    marginRight: SPACING.xs,
  },
});

export default OnboardingScreen; 