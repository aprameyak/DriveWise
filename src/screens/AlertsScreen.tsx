import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock alerts data
const mockAlerts = [
  {
    id: '1',
    type: 'price_change' as const,
    title: 'Price Drop Alert',
    message: '2019 Toyota Camry price dropped by $500',
    priority: 'high' as const,
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    type: 'buy_window' as const,
    title: 'Buy Window Open',
    message: '2018 Subaru Outback is at optimal buying price',
    priority: 'medium' as const,
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '3',
    type: 'sell_window' as const,
    title: 'Sell Opportunity',
    message: 'Your 2020 Mazda 3 has reached peak resale value',
    priority: 'high' as const,
    isRead: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: '4',
    type: 'maintenance' as const,
    title: 'Maintenance Due',
    message: '2019 Honda Accord needs oil change in 500 miles',
    priority: 'low' as const,
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
];

const AlertsScreen = () => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'price_change':
        return 'trending-down';
      case 'buy_window':
        return 'cart';
      case 'sell_window':
        return 'cash';
      case 'maintenance':
        return 'construct';
      default:
        return 'notifications';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#64748b';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Alerts</Text>
      {mockAlerts.length > 0 ? (
        mockAlerts.map((alert) => (
          <TouchableOpacity key={alert.id} style={[styles.alertCard, !alert.isRead && styles.unreadAlert]}>
            <View style={styles.alertHeader}>
              <View style={styles.alertIconContainer}>
                <Ionicons 
                  name={getAlertIcon(alert.type) as any} 
                  size={20} 
                  color={getPriorityColor(alert.priority)} 
                />
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertMessage}>{alert.message}</Text>
                <Text style={styles.alertTime}>{formatTimeAgo(alert.createdAt)}</Text>
              </View>
              {!alert.isRead && <View style={styles.unreadDot} />}
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off" size={64} color="#cbd5e1" />
          <Text style={styles.emptyTitle}>No Alerts</Text>
          <Text style={styles.emptyMessage}>
            You're all caught up! We'll notify you when there are important updates about your cars.
          </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  alertCard: {
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
  unreadAlert: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
    marginLeft: 8,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#64748b',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 20,
  },
});

export default AlertsScreen; 