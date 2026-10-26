import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type ToolScreen = 'DealCheck' | 'PriceCheck' | 'BuyingChecklist';

const TOOLS: {
  screen: ToolScreen;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    screen: 'DealCheck',
    title: 'Deal Check',
    description: 'Enter a dealer offer and flag a high documentation fee or too many add-ons.',
    icon: 'document-text-outline',
  },
  {
    screen: 'PriceCheck',
    title: 'Price Check',
    description: 'Record listing prices you have seen and get the median, low, and high for a model.',
    icon: 'pricetags-outline',
  },
  {
    screen: 'BuyingChecklist',
    title: 'Buying Checklist',
    description: 'Track purchase tasks with a category, priority, and deadline.',
    icon: 'checkbox-outline',
  },
];

const BuyingToolsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<Pick<RootStackParamList, ToolScreen>>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Buying Tools</Text>
      {TOOLS.map((tool) => (
        <TouchableOpacity
          key={tool.screen}
          style={styles.toolCard}
          onPress={() => navigation.navigate(tool.screen)}
        >
          <Ionicons name={tool.icon} size={24} color="#2563eb" />
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>{tool.title}</Text>
            <Text style={styles.toolDescription}>{tool.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  toolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  toolContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
    color: '#64748b',
  },
});

export default BuyingToolsScreen;
