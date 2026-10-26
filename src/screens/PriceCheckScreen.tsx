import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePriceCheckStore } from '../store/priceCheckStore';
import { marketStats } from '../utils/marketStats';
import { riskFlags } from '../utils/riskFlags';

const PriceCheckScreen = () => {
  const { listings, addListing, removeListing } = usePriceCheckStore();
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [year, setYear] = useState('');

  const selectedModel = model.trim();
  const models = Array.from(new Set(listings.map(l => l.model)));
  const filtered = selectedModel ? listings.filter(l => l.model === selectedModel) : listings;
  const stats = marketStats(listings, selectedModel || undefined);

  const parseOptional = (value: string) => (value.trim() === '' ? undefined : Number(value));

  const handleAdd = () => {
    const priceNum = Number(price);
    const mileageNum = parseOptional(mileage);
    const yearNum = parseOptional(year);

    if (!selectedModel) {
      Alert.alert('Validation Error', 'Please enter a model.');
      return;
    }
    if (price.trim() === '' || isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid price.');
      return;
    }
    if ((mileageNum !== undefined && (isNaN(mileageNum) || mileageNum < 0)) || (yearNum !== undefined && isNaN(yearNum))) {
      Alert.alert('Validation Error', 'Please enter a valid mileage and year.');
      return;
    }

    addListing({ model: selectedModel, price: priceNum, mileage: mileageNum, year: yearNum });
    setPrice('');
    setMileage('');
    setYear('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add a Listing</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Model:</Text>
          <TextInput
            style={styles.input}
            value={model}
            onChangeText={setModel}
            placeholder="Honda Civic"
          />
          {models.length > 0 && (
            <View style={styles.chipRow}>
              {models.map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[styles.chip, m === selectedModel && styles.chipSelected]}
                  onPress={() => setModel(m === selectedModel ? '' : m)}
                >
                  <Text style={[styles.chipText, m === selectedModel && styles.chipTextSelected]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Price ($):</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="18500"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldContainer, styles.rowItem]}>
            <Text style={styles.fieldLabel}>Mileage:</Text>
            <TextInput
              style={styles.input}
              value={mileage}
              onChangeText={setMileage}
              placeholder="42000"
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.fieldContainer, styles.rowItem]}>
            <Text style={styles.fieldLabel}>Year:</Text>
            <TextInput
              style={styles.input}
              value={year}
              onChangeText={setYear}
              placeholder="2020"
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add Listing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{selectedModel || 'All Models'}</Text>
        {stats ? (
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Median</Text>
              <Text style={styles.statValue}>${stats.median.toLocaleString()}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Low</Text>
              <Text style={styles.statValue}>${stats.min.toLocaleString()}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>High</Text>
              <Text style={styles.statValue}>${stats.max.toLocaleString()}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Listings</Text>
              <Text style={styles.statValue}>{stats.count}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.emptyText}>No listings yet</Text>
        )}

        {filtered.map((listing) => (
          <View key={listing.id} style={styles.listingItem}>
            <View style={styles.listingContent}>
              <Text style={styles.listingTitle}>
                {[
                  `$${listing.price.toLocaleString()}`,
                  listing.year?.toString(),
                  listing.mileage !== undefined ? `${listing.mileage.toLocaleString()} mi` : undefined,
                ].filter(Boolean).join(' · ')}
              </Text>
              {!selectedModel && <Text style={styles.listingModel}>{listing.model}</Text>}
              {riskFlags({ model: listing.model, mileage: listing.mileage, askingPrice: listing.price }).map((flag) => (
                <View key={flag} style={styles.flagRow}>
                  <Ionicons name="warning-outline" size={14} color="#f59e0b" />
                  <Text style={styles.flagText}>{flag}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity onPress={() => removeListing(listing.id)}>
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        ))}
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowItem: {
    flex: 1,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipSelected: {
    backgroundColor: '#2563eb',
  },
  chipText: {
    fontSize: 13,
    color: '#64748b',
  },
  chipTextSelected: {
    color: 'white',
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  emptyText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  listingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  listingContent: {
    flex: 1,
  },
  listingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  listingModel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  flagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  flagText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
});

export default PriceCheckScreen;
