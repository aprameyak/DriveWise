import { Alert } from '../types';
import { dataService } from './dataService';
import { calculateTCO } from '../utils/calculateTCO';

class AlertsService {
  private alerts: Alert[] = [];
  private lastCheck: Date | null = null;
  private readonly CHECK_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours

  async generateAlerts(userProfile: any): Promise<Alert[]> {
    if (this.shouldSkipCheck()) {
      return this.alerts;
    }

    try {
      const cars = await dataService.getCarData();
      const newAlerts: Alert[] = [];

      // Generate price change alerts
      const priceAlerts = await this.generatePriceChangeAlerts(cars, userProfile);
      newAlerts.push(...priceAlerts);

      // Generate buy window alerts
      const buyAlerts = await this.generateBuyWindowAlerts(cars, userProfile);
      newAlerts.push(...buyAlerts);

      // Generate maintenance alerts
      const maintenanceAlerts = await this.generateMaintenanceAlerts(userProfile);
      newAlerts.push(...maintenanceAlerts);

      this.alerts = newAlerts;
      this.lastCheck = new Date();
      return newAlerts;
    } catch (error) {
      console.error('Error generating alerts:', error);
      return this.alerts;
    }
  }

  private async generatePriceChangeAlerts(cars: any[], userProfile: any): Promise<Alert[]> {
    const alerts: Alert[] = [];
    
    // Simulate price changes for demo
    const priceChanges = [
      { carId: 'toyota-camry-2019', change: -500, percentage: -2.5 },
      { carId: 'honda-accord-2021', change: 300, percentage: 1.5 },
    ];

    for (const change of priceChanges) {
      const car = cars.find(c => `${c.make.toLowerCase()}-${c.model.toLowerCase()}-${c.year}` === change.carId);
      if (car) {
        alerts.push({
          id: `price-${Date.now()}-${car.id}`,
          type: 'price_change',
          title: 'Price Change Alert',
          message: `${car.make} ${car.model} ${car.year} price has ${change.direction} by ${change.percentage}%`,
          carId: car.id,
          priority: 'medium',
          isRead: false,
          createdAt: new Date(),
        });
      }
    }

    return alerts;
  }

  private async generateBuyWindowAlerts(cars: any[], userProfile: any): Promise<Alert[]> {
    const alerts: Alert[] = [];
    
    // Find cars within budget that are at good buying points
    const affordableCars = cars.filter(car => {
      const estimatedPrice = car.msrp * 0.8;
      return estimatedPrice >= userProfile.budgetRange.min && estimatedPrice <= userProfile.budgetRange.max;
    });

    for (const car of affordableCars.slice(0, 3)) {
      const tco = await calculateTCO({
        make: car.make,
        model: car.model,
        year: car.year,
        purchasePrice: car.msrp * 0.8,
        ownershipYears: userProfile.ownershipDuration,
        annualMileage: userProfile.annualMileage,
        zipCode: userProfile.zipCode,
      });

      if (tco && tco.costPerMile < 0.50) {
        alerts.push({
          id: `buy-${Date.now()}-${car.make}-${car.model}`,
          type: 'buy_window',
          title: 'Good Buy Opportunity',
          message: `${car.year} ${car.make} ${car.model} is at a good price point with low TCO`,
          carId: `${car.make.toLowerCase()}-${car.model.toLowerCase()}-${car.year}`,
          priority: 'medium',
          isRead: false,
          createdAt: new Date(),
        });
      }
    }

    return alerts;
  }

  private async generateMaintenanceAlerts(userProfile: any): Promise<Alert[]> {
    const alerts: Alert[] = [];
    
    // Simulate maintenance alerts based on user's cars
    const maintenanceItems = [
      { item: 'Oil Change', miles: 500, urgency: 'low' },
      { item: 'Tire Rotation', miles: 1000, urgency: 'medium' },
      { item: 'Brake Inspection', miles: 2000, urgency: 'high' },
    ];

    for (const item of maintenanceItems) {
      if (Math.random() > 0.7) { // 30% chance of maintenance alert
        alerts.push({
          id: `maintenance-${Date.now()}-${item.item}`,
          type: 'maintenance',
          title: 'Maintenance Due',
          message: `${item.item} needed in ${item.miles} miles`,
          priority: item.urgency as 'low' | 'medium' | 'high',
          isRead: false,
          createdAt: new Date(),
        });
      }
    }

    return alerts;
  }

  private shouldSkipCheck(): boolean {
    if (!this.lastCheck) return false;
    return Date.now() - this.lastCheck.getTime() < this.CHECK_INTERVAL;
  }

  markAsRead(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.isRead = true;
    }
  }

  markAllAsRead(): void {
    this.alerts.forEach(alert => {
      alert.isRead = true;
    });
  }

  getUnreadCount(): number {
    return this.alerts.filter(alert => !alert.isRead).length;
  }

  clearAlerts(): void {
    this.alerts = [];
  }
}

export const alertsService = new AlertsService();
