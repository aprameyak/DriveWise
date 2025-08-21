import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { useUserProfileStore } from '../store/userProfileStore';

const ProfileScreen = () => {
  const { user, logout } = useAuthStore();
  const { profile, updateProfile } = useUserProfileStore();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [zipCode, setZipCode] = useState(profile?.zipCode || '90001');
  const [annualMileage, setAnnualMileage] = useState(profile?.annualMileage?.toString() || '12000');
  const [ownershipDuration, setOwnershipDuration] = useState(profile?.ownershipDuration?.toString() || '5');
  const [budgetMin, setBudgetMin] = useState(profile?.budgetRange?.min?.toString() || '15000');
  const [budgetMax, setBudgetMax] = useState(profile?.budgetRange?.max?.toString() || '25000');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setZipCode(profile.zipCode);
      setAnnualMileage(profile.annualMileage.toString());
      setOwnershipDuration(profile.ownershipDuration.toString());
      setBudgetMin(profile.budgetRange.min.toString());
      setBudgetMax(profile.budgetRange.max.toString());
    }
  }, [profile]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateZipCode = (zip: string) => {
    return zip.length === 5 && !isNaN(Number(zip));
  };

  const validateMileage = (mileage: string) => {
    const num = Number(mileage);
    return !isNaN(num) && num > 0 && num <= 50000;
  };

  const validateBudget = (budget: string) => {
    const num = Number(budget);
    return !isNaN(num) && num > 0 && num <= 100000;
  };

  const validateDuration = (duration: string) => {
    const num = Number(duration);
    return !isNaN(num) && num > 0 && num <= 20;
  };

  const handleSave = () => {
    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    if (!validateZipCode(zipCode)) {
      Alert.alert('Validation Error', 'Please enter a valid 5-digit ZIP code.');
      return;
    }
    if (!validateMileage(annualMileage)) {
      Alert.alert('Validation Error', 'Please enter a valid annual mileage (1-50,000).');
      return;
    }
    if (!validateDuration(ownershipDuration)) {
      Alert.alert('Validation Error', 'Please enter a valid ownership duration (1-20 years).');
      return;
    }
    if (!validateBudget(budgetMin) || !validateBudget(budgetMax)) {
      Alert.alert('Validation Error', 'Please enter valid budget amounts.');
      return;
    }
    if (Number(budgetMin) >= Number(budgetMax)) {
      Alert.alert('Validation Error', 'Minimum budget must be less than maximum budget.');
      return;
    }

    setLoading(true);
    
    // Update profile
    if (profile) {
      updateProfile({
        zipCode,
        annualMileage: Number(annualMileage),
        ownershipDuration: Number(ownershipDuration),
        budgetRange: {
          min: Number(budgetMin),
          max: Number(budgetMax),
        },
      });
    }

    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    }, 1000);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={80} color="#2563eb" />
        <Text style={styles.userName}>{user?.email || 'User'}</Text>
        <Text style={styles.userId}>ID: {user?.id || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Email:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            editable={isEditing}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>ZIP Code:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={zipCode}
            onChangeText={setZipCode}
            placeholder="Enter ZIP code"
            keyboardType="numeric"
            maxLength={5}
            editable={isEditing}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Annual Mileage:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={annualMileage}
            onChangeText={setAnnualMileage}
            placeholder="Enter annual mileage"
            keyboardType="numeric"
            editable={isEditing}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Ownership Duration (years):</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={ownershipDuration}
            onChangeText={setOwnershipDuration}
            placeholder="Enter ownership duration"
            keyboardType="numeric"
            editable={isEditing}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Minimum Budget ($):</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={budgetMin}
            onChangeText={setBudgetMin}
            placeholder="Enter minimum budget"
            keyboardType="numeric"
            editable={isEditing}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Maximum Budget ($):</Text>
                      <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={budgetMax}
            onChangeText={setBudgetMax}
            placeholder="Enter maximum budget"
            keyboardType="numeric"
            editable={isEditing}
          />
        </View>

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.saveButton]} 
                onPress={handleSave}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={() => setIsEditing(false)}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 24,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 16,
  },
  userId: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: '#f1f5f9',
    color: '#64748b',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#10b981',
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ProfileScreen; 