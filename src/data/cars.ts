import { CarData } from '../types';

export const CARS_DATA: CarData[] = [
  {
    make: "Toyota",
    model: "Camry",
    year: 2019,
    msrp: 25000,
    usedPrices: {
      "20000": 20000,
      "40000": 18000,
      "60000": 16000,
      "80000": 14000
    },
    mpg: 32,
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
    taxRate: 0.08
  },
  {
    make: "Honda",
    model: "Accord",
    year: 2021,
    msrp: 26000,
    usedPrices: {
      "20000": 22000,
      "40000": 20000,
      "60000": 18000,
      "80000": 16000
    },
    mpg: 33,
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
    taxRate: 0.08
  },
  {
    make: "Mazda",
    model: "3",
    year: 2020,
    msrp: 23000,
    usedPrices: {
      "20000": 19000,
      "40000": 17000,
      "60000": 15000,
      "80000": 13000
    },
    mpg: 30,
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
    taxRate: 0.08
  },
  {
    make: "Subaru",
    model: "Outback",
    year: 2018,
    msrp: 28000,
    usedPrices: {
      "20000": 22000,
      "40000": 20000,
      "60000": 18000,
      "80000": 16000
    },
    mpg: 28,
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
    taxRate: 0.08
  },
  {
    make: "Hyundai",
    model: "Elantra",
    year: 2022,
    msrp: 22000,
    usedPrices: {
      "20000": 19000,
      "40000": 17000,
      "60000": 15000,
      "80000": 13000
    },
    mpg: 35,
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
    taxRate: 0.08
  }
];

export const ALL_CARS = CARS_DATA; 