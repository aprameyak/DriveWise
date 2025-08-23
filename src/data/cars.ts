import { CarData } from '../types';

export const CARS_DATA: CarData[] = [
  // Toyota Camry - Multiple Years
  {
    id: '1',
    make: "Toyota",
    model: "Camry",
    year: 2024,
    price: 28000,
    msrp: 35000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 28, highway: 39, combined: 32 },
    size: 'Midsize',
    reliability: 9,
    safetyRating: 5,
    features: ['Apple CarPlay', 'Android Auto', 'Backup Camera', 'Blind Spot Monitor'],
    usedPrices: {
      "20000": 20000,
      "40000": 18000,
      "60000": 16000,
      "80000": 14000
    },
    maintenanceByMileage: {
      "20000": 500,
      "40000": 1000,
      "60000": 1800,
      "80000": 2500
    },
    insuranceByState: {
      "CA": 1600,
      "TX": 1500,
      "NY": 1800
    },
    taxRate: 0.08,
    depreciation: [
      { year: 0, value: 28000, percentage: 0 },
      { year: 1, value: 23800, percentage: 15 },
      { year: 2, value: 21560, percentage: 23 },
      { year: 3, value: 19600, percentage: 30 },
      { year: 4, value: 17920, percentage: 36 },
      { year: 5, value: 16520, percentage: 41 }
    ],
    tcoData: {
      depreciation: 11480,
      fuelCosts: 8500,
      insurance: 6000,
      maintenance: 4200,
      financing: 3200,
      total: 33380
    }
  },
  {
    id: '1b',
    make: "Toyota",
    model: "Camry",
    year: 2023,
    price: 25200,
    msrp: 33000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 28, highway: 39, combined: 32 },
    size: 'Midsize',
    reliability: 9,
    safetyRating: 5,
    features: ['Apple CarPlay', 'Android Auto', 'Backup Camera', 'Blind Spot Monitor'],
    usedPrices: {
      "20000": 22000,
      "40000": 20000,
      "60000": 18000,
      "80000": 16000
    },
    maintenanceByMileage: {
      "20000": 450,
      "40000": 900,
      "60000": 1700,
      "80000": 2400
    },
    insuranceByState: {
      "CA": 1650,
      "TX": 1550,
      "NY": 1850
    },
    taxRate: 0.08,
    depreciation: [
      { year: 0, value: 25200, percentage: 0 },
      { year: 1, value: 21420, percentage: 15 },
      { year: 2, value: 19404, percentage: 23 },
      { year: 3, value: 17640, percentage: 30 },
      { year: 4, value: 16128, percentage: 36 },
      { year: 5, value: 14868, percentage: 41 }
    ],
    tcoData: {
      depreciation: 10332,
      fuelCosts: 7650,
      insurance: 5400,
      maintenance: 4500,
      financing: 2880,
      total: 30762
    }
  },
  {
    id: '1c',
    make: "Toyota",
    model: "Camry",
    year: 2022,
    price: 22800,
    msrp: 31000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 28, highway: 39, combined: 32 },
    size: 'Midsize',
    reliability: 9,
    safetyRating: 5,
    features: ['Apple CarPlay', 'Android Auto', 'Backup Camera'],
    usedPrices: {
      "20000": 19000,
      "40000": 17000,
      "60000": 15000,
      "80000": 13000
    },
    maintenanceByMileage: {
      "20000": 550,
      "40000": 1100,
      "60000": 1900,
      "80000": 2600
    },
    insuranceByState: {
      "CA": 1700,
      "TX": 1600,
      "NY": 1900
    },
    taxRate: 0.08,
    depreciation: [
      { year: 0, value: 22800, percentage: 0 },
      { year: 1, value: 19380, percentage: 15 },
      { year: 2, value: 17556, percentage: 23 },
      { year: 3, value: 15960, percentage: 30 },
      { year: 4, value: 14592, percentage: 36 },
      { year: 5, value: 13452, percentage: 41 }
    ],
    tcoData: {
      depreciation: 9348,
      fuelCosts: 6900,
      insurance: 4800,
      maintenance: 5200,
      financing: 2592,
      total: 28840
    }
  },

  // Tesla Model 3 - Multiple Years
  {
    id: '2',
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    price: 40000,
    msrp: 45000,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500',
    fuelType: 'Electric',
    mpg: { city: 140, highway: 132, combined: 136 },
    size: 'Midsize',
    reliability: 7,
    safetyRating: 5,
    features: ['Autopilot', 'Over-the-air Updates', 'Supercharging', 'Glass Roof'],
    usedPrices: {
      "20000": 32000,
      "40000": 28000,
      "60000": 24000,
      "80000": 20000
    },
    maintenanceByMileage: {
      "20000": 300,
      "40000": 600,
      "60000": 1200,
      "80000": 1800
    },
    insuranceByState: {
      "CA": 2000,
      "TX": 1800,
      "NY": 2200
    },
    taxRate: 0.08,
    depreciation: [
      { year: 0, value: 40000, percentage: 0 },
      { year: 1, value: 32000, percentage: 20 },
      { year: 2, value: 27200, percentage: 32 },
      { year: 3, value: 23600, percentage: 41 },
      { year: 4, value: 20800, percentage: 48 },
      { year: 5, value: 18400, percentage: 54 }
    ],
    tcoData: {
      depreciation: 21600,
      fuelCosts: 3200,
      insurance: 7200,
      maintenance: 2800,
      financing: 4800,
      total: 39600
    }
  },
  {
    id: '2b',
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 35000,
    msrp: 42000,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500',
    fuelType: 'Electric',
    mpg: { city: 140, highway: 132, combined: 136 },
    size: 'Midsize',
    reliability: 7,
    safetyRating: 5,
    features: ['Autopilot', 'Over-the-air Updates', 'Supercharging', 'Glass Roof'],
    usedPrices: {
      "20000": 28000,
      "40000": 24500,
      "60000": 21000,
      "80000": 17500
    },
    maintenanceByMileage: {
      "20000": 350,
      "40000": 700,
      "60000": 1400,
      "80000": 2100
    },
    insuranceByState: {
      "CA": 1900,
      "TX": 1700,
      "NY": 2100
    },
    taxRate: 0.08,
    depreciation: [
      { year: 0, value: 35000, percentage: 0 },
      { year: 1, value: 28000, percentage: 20 },
      { year: 2, value: 23800, percentage: 32 },
      { year: 3, value: 20650, percentage: 41 },
      { year: 4, value: 18200, percentage: 48 },
      { year: 5, value: 16100, percentage: 54 }
    ],
    tcoData: {
      depreciation: 18900,
      fuelCosts: 2880,
      insurance: 6300,
      maintenance: 3200,
      financing: 4200,
      total: 35480
    }
  },

  // Honda CR-V - Multiple Years
  {
    id: '3',
    make: "Honda",
    model: "CR-V",
    year: 2024,
    price: 32000,
    msrp: 38000,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 28, highway: 34, combined: 31 },
    size: 'SUV',
    reliability: 8,
    safetyRating: 5,
    features: ['All-Wheel Drive', 'Honda Sensing', 'Remote Start', 'Power Tailgate'],
    usedPrices: {
      "20000": 26000,
      "40000": 23500,
      "60000": 21000,
      "80000": 18500
    },
    maintenanceByMileage: {
      "20000": 600,
      "40000": 1200,
      "60000": 2000,
      "80000": 2700
    },
    insuranceByState: {
      "CA": 1750,
      "TX": 1650,
      "NY": 1950
    },
    taxRate: 0.08,
    depreciation: [
      { year: 0, value: 32000, percentage: 0 },
      { year: 1, value: 26880, percentage: 16 },
      { year: 2, value: 24320, percentage: 24 },
      { year: 3, value: 22080, percentage: 31 },
      { year: 4, value: 20160, percentage: 37 },
      { year: 5, value: 18560, percentage: 42 }
    ],
    tcoData: {
      depreciation: 13440,
      fuelCosts: 9200,
      insurance: 6400,
      maintenance: 4800,
      financing: 3600,
      total: 37440
    }
  },
  {
    id: '3b',
    make: "Honda",
    model: "CR-V",
    year: 2023,
    price: 29500,
    msrp: 36000,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 28, highway: 34, combined: 31 },
    size: 'SUV',
    reliability: 8,
    safetyRating: 5,
    features: ['All-Wheel Drive', 'Honda Sensing', 'Remote Start', 'Power Tailgate'],
    usedPrices: {
      "20000": 24000,
      "40000": 21700,
      "60000": 19400,
      "80000": 17100
    },
    maintenanceByMileage: {
      "20000": 650,
      "40000": 1300,
      "60000": 2200,
      "80000": 2900
    },
    insuranceByState: {
      "CA": 1700,
      "TX": 1600,
      "NY": 1900
    },
    taxRate: 0.08,
    depreciation: [
      { year: 0, value: 29500, percentage: 0 },
      { year: 1, value: 24780, percentage: 16 },
      { year: 2, value: 22420, percentage: 24 },
      { year: 3, value: 20355, percentage: 31 },
      { year: 4, value: 18585, percentage: 37 },
      { year: 5, value: 17110, percentage: 42 }
    ],
    tcoData: {
      depreciation: 12390,
      fuelCosts: 8280,
      insurance: 5760,
      maintenance: 5100,
      financing: 3240,
      total: 34770
    }
  },

  // BMW 3 Series - Multiple Years
  {
    id: '4',
    make: "BMW",
    model: "3 Series",
    year: 2024,
    price: 45000,
    msrp: 52000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 26, highway: 36, combined: 30 },
    size: 'Luxury',
    reliability: 6,
    safetyRating: 5,
    features: ['Leather Seats', 'Premium Audio', 'Navigation', 'Heated Seats'],
    usedPrices: {
      "20000": 36000,
      "40000": 31500,
      "60000": 27000,
      "80000": 22500
    },
    maintenanceByMileage: {
      "20000": 1200,
      "40000": 2400,
      "60000": 4200,
      "80000": 6000
    },
    insuranceByState: {
      "CA": 2500,
      "TX": 2200,
      "NY": 2800
    },
    taxRate: 0.08,
    depreciation: [
      { year: 0, value: 45000, percentage: 0 },
      { year: 1, value: 34200, percentage: 24 },
      { year: 2, value: 28800, percentage: 36 },
      { year: 3, value: 24750, percentage: 45 },
      { year: 4, value: 21600, percentage: 52 },
      { year: 5, value: 19125, percentage: 57.5 }
    ],
    tcoData: {
      depreciation: 25875,
      fuelCosts: 10000,
      insurance: 8500,
      maintenance: 7500,
      financing: 5400,
      total: 57275
    }
  },

  // Toyota Prius - Multiple Years
  {
    id: '5',
    make: "Toyota",
    model: "Prius",
    year: 2024,
    price: 27000,
    msrp: 32000,
    image: 'https://images.unsplash.com/photo-1572318389516-e06873bb055c?w=500',
    fuelType: 'Hybrid',
    mpg: { city: 58, highway: 53, combined: 56 },
    size: 'Compact',
    reliability: 9,
    safetyRating: 4,
    features: ['Hybrid Synergy Drive', 'Eco Mode', 'Solar Roof', 'Advanced Safety'],
    usedPrices: {
      "20000": 22000,
      "40000": 19500,
      "60000": 17000,
      "80000": 14500
    },
    maintenanceByMileage: {
      "20000": 400,
      "40000": 800,
      "60000": 1600,
      "80000": 2300
    },
    insuranceByState: {
      "CA": 1550,
      "TX": 1450,
      "NY": 1750
    },
    taxRate: 0.08,
    depreciation: [
      { year: 0, value: 27000, percentage: 0 },
      { year: 1, value: 21870, percentage: 19 },
      { year: 2, value: 18900, percentage: 30 },
      { year: 3, value: 16740, percentage: 38 },
      { year: 4, value: 15120, percentage: 44 },
      { year: 5, value: 13770, percentage: 49 }
    ],
    tcoData: {
      depreciation: 13230,
      fuelCosts: 4800,
      insurance: 5400,
      maintenance: 3800,
      financing: 3240,
      total: 30470
    }
  }
];

export const ALL_CARS = CARS_DATA; 