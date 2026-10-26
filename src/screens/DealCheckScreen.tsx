import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auditDeal } from '../utils/auditDeal';

const DealCheckScreen = () => {
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [documentationFee, setDocumentationFee] = useState('');
  const [addOnInput, setAddOnInput] = useState('');
  const [addOns, setAddOns] = useState<string[]>([]);
  const [total, setTotal] = useState('');
  const [flags, setFlags] = useState<string[] | null>(null);

  const validateAmount = (amount: string) => {
    const num = Number(amount);
    return amount.trim() === '' || (!isNaN(num) && num >= 0);
  };

  const handleAddAddOn = () => {
    const name = addOnInput.trim();
    if (!name) return;
    setAddOns([...addOns, name]);
    setAddOnInput('');
  };

  const handleRemoveAddOn = (index: number) => {
    setAddOns(addOns.filter((_, i) => i !== index));
  };

  const handleCheck = () => {
    if (![monthlyPayment, documentationFee, total].every(validateAmount)) {
      Alert.alert('Validation Error', 'Please enter amounts as positive numbers.');
      return;
    }

    setFlags(
      auditDeal({
        monthlyPayment: Number(monthlyPayment),
        documentationFee: Number(documentationFee),
        addOns,
        total: Number(total),
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dealer Offer</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Monthly Payment ($):</Text>
          <TextInput
            style={styles.input}
            value={monthlyPayment}
            onChangeText={setMonthlyPayment}
            placeholder="450"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Documentation Fee ($):</Text>
          <TextInput
            style={styles.input}
            value={documentationFee}
            onChangeText={setDocumentationFee}
            placeholder="799"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Total Price ($):</Text>
          <TextInput
            style={styles.input}
            value={total}
            onChangeText={setTotal}
            placeholder="32000"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Add-ons:</Text>
          <View style={styles.addOnRow}>
            <TextInput
              style={[styles.input, styles.addOnInput]}
              value={addOnInput}
              onChangeText={setAddOnInput}
              placeholder="Paint protection"
              onSubmitEditing={handleAddAddOn}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddAddOn}>
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {addOns.map((addOn, index) => (
            <View key={`${addOn}-${index}`} style={styles.addOnItem}>
              <Text style={styles.addOnText}>{addOn}</Text>
              <TouchableOpacity onPress={() => handleRemoveAddOn(index)}>
                <Ionicons name="close-circle-outline" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCheck}>
          <Text style={styles.buttonText}>Check Deal</Text>
        </TouchableOpacity>
      </View>

      {flags && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Result</Text>
          {flags.length > 0 ? (
            flags.map((flag) => (
              <View key={flag} style={styles.flagRow}>
                <Ionicons name="warning-outline" size={20} color="#f59e0b" />
                <Text style={styles.flagText}>{flag}</Text>
              </View>
            ))
          ) : (
            <View style={styles.flagRow}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#10b981" />
              <Text style={styles.flagText}>No issues found</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
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
  addOnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addOnInput: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  addOnItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  addOnText: {
    fontSize: 14,
    color: '#1e293b',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  flagText: {
    fontSize: 14,
    color: '#1e293b',
    marginLeft: 8,
  },
});

export default DealCheckScreen;
