import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserProfileStore } from '../store/userProfileStore';
import { alertsService } from '../services/alertsService';
import { Alert } from '../types';

const AlertsScreen = () => {
  const { profile } = useUserProfileStore();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadAlerts();
  }, [profile]);

  const loadAlerts = async () => {
    if (!profile) return;
    
    setLoading(true);
    try {
      const newAlerts = await alertsService.generateAlerts(profile);
      setAlerts(newAlerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAlerts();
    setRefreshing(false);
  };

  const handleAlertPress = (alert: Alert) => {
    alertsService.markAsRead(alert.id);
    setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, isRead: true } : a));
  };

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

  if (!profile) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Alerts</Text>
        <Text style={styles.subtitle}>Complete onboarding to receive alerts</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Alerts</Text>
      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <TouchableOpacity 
            key={alert.id} 
            style={[styles.alertCard, !alert.isRead && styles.unreadAlert]}
            onPress={() => handleAlertPress(alert)}
          >
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
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