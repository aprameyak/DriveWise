import { Car } from '../types/car';

export const mockCars: Car[] = [
  // Toyota Camry - Multiple Years
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 28000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 28, highway: 39, combined: 32 },
    size: 'Midsize',
    reliability: 9,
    safetyRating: 5,
    features: ['Apple CarPlay', 'Android Auto', 'Backup Camera', 'Blind Spot Monitor'],
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
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: 25200,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 28, highway: 39, combined: 32 },
    size: 'Midsize',
    reliability: 9,
    safetyRating: 5,
    features: ['Apple CarPlay', 'Android Auto', 'Backup Camera', 'Blind Spot Monitor'],
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
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 22800,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 28, highway: 39, combined: 32 },
    size: 'Midsize',
    reliability: 9,
    safetyRating: 5,
    features: ['Apple CarPlay', 'Android Auto', 'Backup Camera'],
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
  {
    id: '1d',
    make: 'Toyota',
    model: 'Camry',
    year: 2021,
    price: 20500,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 28, highway: 39, combined: 32 },
    size: 'Midsize',
    reliability: 9,
    safetyRating: 5,
    features: ['Apple CarPlay', 'Android Auto', 'Backup Camera'],
    depreciation: [
      { year: 0, value: 20500, percentage: 0 },
      { year: 1, value: 17425, percentage: 15 },
      { year: 2, value: 15785, percentage: 23 },
      { year: 3, value: 14350, percentage: 30 },
      { year: 4, value: 13120, percentage: 36 },
      { year: 5, value: 12095, percentage: 41 }
    ],
    tcoData: {
      depreciation: 8405,
      fuelCosts: 6200,
      insurance: 4200,
      maintenance: 6000,
      financing: 2340,
      total: 27145
    }
  },

  // Tesla Model 3 - Multiple Years
  {
    id: '2',
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    price: 40000,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500',
    fuelType: 'Electric',
    mpg: { city: 140, highway: 132, combined: 136 },
    size: 'Midsize',
    reliability: 7,
    safetyRating: 5,
    features: ['Autopilot', 'Over-the-air Updates', 'Supercharging', 'Glass Roof'],
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
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 35000,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500',
    fuelType: 'Electric',
    mpg: { city: 140, highway: 132, combined: 136 },
    size: 'Midsize',
    reliability: 7,
    safetyRating: 5,
    features: ['Autopilot', 'Over-the-air Updates', 'Supercharging', 'Glass Roof'],
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
  {
    id: '2c',
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    price: 32000,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500',
    fuelType: 'Electric',
    mpg: { city: 140, highway: 132, combined: 136 },
    size: 'Midsize',
    reliability: 7,
    safetyRating: 5,
    features: ['Autopilot', 'Over-the-air Updates', 'Supercharging'],
    depreciation: [
      { year: 0, value: 32000, percentage: 0 },
      { year: 1, value: 25600, percentage: 20 },
      { year: 2, value: 21760, percentage: 32 },
      { year: 3, value: 18880, percentage: 41 },
      { year: 4, value: 16640, percentage: 48 },
      { year: 5, value: 14720, percentage: 54 }
    ],
    tcoData: {
      depreciation: 17280,
      fuelCosts: 2560,
      insurance: 5400,
      maintenance: 3800,
      financing: 3840,
      total: 32880
    }
  },

  // Honda CR-V - Multiple Years
  {
    id: '3',
    make: 'Honda',
    model: 'CR-V',
    year: 2024,
    price: 32000,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 28, highway: 34, combined: 31 },
    size: 'SUV',
    reliability: 8,
    safetyRating: 5,
    features: ['All-Wheel Drive', 'Honda Sensing', 'Remote Start', 'Power Tailgate'],
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
    make: 'Honda',
    model: 'CR-V',
    year: 2023,
    price: 29500,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 28, highway: 34, combined: 31 },
    size: 'SUV',
    reliability: 8,
    safetyRating: 5,
    features: ['All-Wheel Drive', 'Honda Sensing', 'Remote Start', 'Power Tailgate'],
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
  {
    id: '3c',
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    price: 27200,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 28, highway: 34, combined: 31 },
    size: 'SUV',
    reliability: 8,
    safetyRating: 5,
    features: ['All-Wheel Drive', 'Honda Sensing', 'Remote Start'],
    depreciation: [
      { year: 0, value: 27200, percentage: 0 },
      { year: 1, value: 22848, percentage: 16 },
      { year: 2, value: 20672, percentage: 24 },
      { year: 3, value: 18768, percentage: 31 },
      { year: 4, value: 17136, percentage: 37 },
      { year: 5, value: 15776, percentage: 42 }
    ],
    tcoData: {
      depreciation: 11424,
      fuelCosts: 7440,
      insurance: 5040,
      maintenance: 5700,
      financing: 2988,
      total: 32592
    }
  },

  // BMW 3 Series - Multiple Years
  {
    id: '4',
    make: 'BMW',
    model: '3 Series',
    year: 2024,
    price: 45000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 26, highway: 36, combined: 30 },
    size: 'Luxury',
    reliability: 6,
    safetyRating: 5,
    features: ['Leather Seats', 'Premium Audio', 'Navigation', 'Heated Seats'],
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
  {
    id: '4b',
    make: 'BMW',
    model: '3 Series',
    year: 2023,
    price: 38500,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 26, highway: 36, combined: 30 },
    size: 'Luxury',
    reliability: 6,
    safetyRating: 5,
    features: ['Leather Seats', 'Premium Audio', 'Navigation', 'Heated Seats'],
    depreciation: [
      { year: 0, value: 38500, percentage: 0 },
      { year: 1, value: 29260, percentage: 24 },
      { year: 2, value: 24640, percentage: 36 },
      { year: 3, value: 21175, percentage: 45 },
      { year: 4, value: 18480, percentage: 52 },
      { year: 5, value: 16362.5, percentage: 57.5 }
    ],
    tcoData: {
      depreciation: 22137.5,
      fuelCosts: 9000,
      insurance: 7650,
      maintenance: 8500,
      financing: 4620,
      total: 51907.5
    }
  },
  {
    id: '4c',
    make: 'BMW',
    model: '3 Series',
    year: 2022,
    price: 33000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 26, highway: 36, combined: 30 },
    size: 'Luxury',
    reliability: 6,
    safetyRating: 5,
    features: ['Leather Seats', 'Premium Audio', 'Navigation'],
    depreciation: [
      { year: 0, value: 33000, percentage: 0 },
      { year: 1, value: 25080, percentage: 24 },
      { year: 2, value: 21120, percentage: 36 },
      { year: 3, value: 18150, percentage: 45 },
      { year: 4, value: 15840, percentage: 52 },
      { year: 5, value: 14025, percentage: 57.5 }
    ],
    tcoData: {
      depreciation: 18975,
      fuelCosts: 8100,
      insurance: 6600,
      maintenance: 9500,
      financing: 3960,
      total: 47135
    }
  },

  // Ford F-150 - Multiple Years
  {
    id: '5',
    make: 'Ford',
    model: 'F-150',
    year: 2024,
    price: 38000,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 20, highway: 25, combined: 22 },
    size: 'Truck',
    reliability: 7,
    safetyRating: 5,
    features: ['4WD', 'Towing Package', 'Bed Liner', 'Trailer Assist'],
    depreciation: [
      { year: 0, value: 38000, percentage: 0 },
      { year: 1, value: 30400, percentage: 20 },
      { year: 2, value: 26600, percentage: 30 },
      { year: 3, value: 23560, percentage: 38 },
      { year: 4, value: 21280, percentage: 44 },
      { year: 5, value: 19380, percentage: 49 }
    ],
    tcoData: {
      depreciation: 18620,
      fuelCosts: 13600,
      insurance: 7000,
      maintenance: 5500,
      financing: 4560,
      total: 49280
    }
  },
  {
    id: '5b',
    make: 'Ford',
    model: 'F-150',
    year: 2023,
    price: 35200,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500',
    fuelType: 'Gasoline',
    mpg: { city: 20, highway: 25, combined: 22 },
    size: 'Truck',
    reliability: 7,
    safetyRating: 5,
    features: ['4WD', 'Towing Package', 'Bed Liner', 'Trailer Assist'],
    depreciation: [
      { year: 0, value: 35200, percentage: 0 },
      { year: 1, value: 28160, percentage: 20 },
      { year: 2, value: 24640, percentage: 30 },
      { year: 3, value: 21824, percentage: 38 },
      { year: 4, value: 19712, percentage: 44 },
      { year: 5, value: 17952, percentage: 49 }
    ],
    tcoData: {
      depreciation: 17248,
      fuelCosts: 12240,
      insurance: 6300,
      maintenance: 6000,
      financing: 4224,
      total: 46012
    }
  },

  // Toyota Prius - Multiple Years
  {
    id: '6',
    make: 'Toyota',
    model: 'Prius',
    year: 2024,
    price: 27000,
    image: 'https://images.unsplash.com/photo-1572318389516-e06873bb055c?w=500',
    fuelType: 'Hybrid',
    mpg: { city: 58, highway: 53, combined: 56 },
    size: 'Compact',
    reliability: 9,
    safetyRating: 4,
    features: ['Hybrid Synergy Drive', 'Eco Mode', 'Solar Roof', 'Advanced Safety'],
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
  },
  {
    id: '6b',
    make: 'Toyota',
    model: 'Prius',
    year: 2023,
    price: 24500,
    image: 'https://images.unsplash.com/photo-1572318389516-e06873bb055c?w=500',
    fuelType: 'Hybrid',
    mpg: { city: 58, highway: 53, combined: 56 },
    size: 'Compact',
    reliability: 9,
    safetyRating: 4,
    features: ['Hybrid Synergy Drive', 'Eco Mode', 'Solar Roof', 'Advanced Safety'],
    depreciation: [
      { year: 0, value: 24500, percentage: 0 },
      { year: 1, value: 19845, percentage: 19 },
      { year: 2, value: 17150, percentage: 30 },
      { year: 3, value: 15190, percentage: 38 },
      { year: 4, value: 13720, percentage: 44 },
      { year: 5, value: 12495, percentage: 49 }
    ],
    tcoData: {
      depreciation: 12005,
      fuelCosts: 4320,
      insurance: 4860,
      maintenance: 4100,
      financing: 2940,
      total: 28225
    }
  },
  {
    id: '6c',
    make: 'Toyota',
    model: 'Prius',
    year: 2022,
    price: 22000,
    image: 'https://images.unsplash.com/photo-1572318389516-e06873bb055c?w=500',
    fuelType: 'Hybrid',
    mpg: { city: 54, highway: 50, combined: 52 },
    size: 'Compact',
    reliability: 9,
    safetyRating: 4,
    features: ['Hybrid Synergy Drive', 'Eco Mode', 'Advanced Safety'],
    depreciation: [
      { year: 0, value: 22000, percentage: 0 },
      { year: 1, value: 17820, percentage: 19 },
      { year: 2, value: 15400, percentage: 30 },
      { year: 3, value: 13640, percentage: 38 },
      { year: 4, value: 12320, percentage: 44 },
      { year: 5, value: 11220, percentage: 49 }
    ],
    tcoData: {
      depreciation: 10780,
      fuelCosts: 3840,
      insurance: 4200,
      maintenance: 4600,
      financing: 2640,
      total: 26060
    }
  }
];