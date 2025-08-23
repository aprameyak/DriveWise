import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Car } from '../types/car';
import { mockCars } from '../data/cars';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calculator, DollarSign, Clock, TrendingDown } from 'lucide-react';

interface TCOInputs {
  selectedCarId: string;
  annualMiles: number;
  gasPrice: number;
  electricityRate: number;
  loanTerm: number;
  downPayment: number;
  interestRate: number;
  insuranceAnnual: number;
  ownershipYears: number;
}

export function TCOCalculator() {
  const [inputs, setInputs] = useState<TCOInputs>({
    selectedCarId: '',
    annualMiles: 12000,
    gasPrice: 3.50,
    electricityRate: 0.12,
    loanTerm: 5,
    downPayment: 5000,
    interestRate: 6.5,
    insuranceAnnual: 1200,
    ownershipYears: 5
  });

  const [calculatedTCO, setCalculatedTCO] = useState<any>(null);
  const [ownershipAnalysis, setOwnershipAnalysis] = useState<any[]>([]);

  const selectedCar = mockCars.find(car => car.id === inputs.selectedCarId);

  // Group cars by make and model for better selection
  const carGroups = mockCars.reduce((groups, car) => {
    const key = `${car.make} ${car.model}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(car);
    return groups;
  }, {} as Record<string, Car[]>);

  const calculateTCO = () => {
    if (!selectedCar) return;

    const years = inputs.ownershipYears;
    const totalMiles = inputs.annualMiles * years;
    
    // Get depreciation value at the ownership year
    const depreciationPoint = selectedCar.depreciation.find(d => d.year === years) || 
                             selectedCar.depreciation[selectedCar.depreciation.length - 1];
    const finalValue = depreciationPoint.value;
    const depreciation = selectedCar.price - finalValue;

    // Fuel costs
    let fuelCosts = 0;
    if (selectedCar.fuelType === 'Electric') {
      const kWhPer100Miles = 100 / (selectedCar.mpg.combined / 33.7);
      fuelCosts = (totalMiles / 100) * kWhPer100Miles * inputs.electricityRate;
    } else {
      fuelCosts = (totalMiles / selectedCar.mpg.combined) * inputs.gasPrice;
    }

    // Financing costs
    const loanAmount = Math.max(0, selectedCar.price - inputs.downPayment);
    const loanYears = Math.min(inputs.loanTerm, years);
    let totalInterest = 0;
    
    if (loanAmount > 0 && loanYears > 0) {
      const monthlyRate = inputs.interestRate / 100 / 12;
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanYears * 12)) / 
                            (Math.pow(1 + monthlyRate, loanYears * 12) - 1);
      totalInterest = (monthlyPayment * loanYears * 12) - loanAmount;
    }

    // Insurance
    const totalInsurance = inputs.insuranceAnnual * years;

    // Maintenance (increases with age)
    const baseMaintenancePerMile = selectedCar.fuelType === 'Electric' ? 0.06 : 
                                  selectedCar.size === 'Luxury' ? 0.12 : 0.08;
    // Add age factor - older cars cost more to maintain
    const ageFactor = 1 + (years - 1) * 0.1; // 10% increase per year after first
    const maintenance = totalMiles * baseMaintenancePerMile * ageFactor;

    const total = depreciation + fuelCosts + totalInterest + totalInsurance + maintenance;

    const breakdown = {
      depreciation: Math.round(depreciation),
      fuel: Math.round(fuelCosts),
      financing: Math.round(totalInterest),
      insurance: Math.round(totalInsurance),
      maintenance: Math.round(maintenance),
      total: Math.round(total),
      finalValue: Math.round(finalValue)
    };

    setCalculatedTCO(breakdown);

    // Calculate ownership analysis for different time periods
    const analysis = [];
    for (let year = 1; year <= 7; year++) {
      const yearlyMiles = inputs.annualMiles * year;
      const depPoint = selectedCar.depreciation.find(d => d.year === year) || 
                      selectedCar.depreciation[selectedCar.depreciation.length - 1];
      const yearlyDepreciation = selectedCar.price - depPoint.value;
      
      let yearlyFuel = 0;
      if (selectedCar.fuelType === 'Electric') {
        const kWhPer100Miles = 100 / (selectedCar.mpg.combined / 33.7);
        yearlyFuel = (yearlyMiles / 100) * kWhPer100Miles * inputs.electricityRate;
      } else {
        yearlyFuel = (yearlyMiles / selectedCar.mpg.combined) * inputs.gasPrice;
      }
      
      const yearlyInsurance = inputs.insuranceAnnual * year;
      const yearlyAgeFactor = 1 + (year - 1) * 0.1;
      const yearlyMaintenance = yearlyMiles * baseMaintenancePerMile * yearlyAgeFactor;
      
      const yearlyLoanYears = Math.min(inputs.loanTerm, year);
      let yearlyInterest = 0;
      if (loanAmount > 0 && yearlyLoanYears > 0) {
        const monthlyRate = inputs.interestRate / 100 / 12;
        const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, yearlyLoanYears * 12)) / 
                              (Math.pow(1 + monthlyRate, yearlyLoanYears * 12) - 1);
        yearlyInterest = (monthlyPayment * yearlyLoanYears * 12) - loanAmount;
      }
      
      const yearlyTotal = yearlyDepreciation + yearlyFuel + yearlyInsurance + yearlyMaintenance + yearlyInterest;
      
      analysis.push({
        year,
        totalCost: Math.round(yearlyTotal),
        depreciation: Math.round(yearlyDepreciation),
        residualValue: Math.round(depPoint.value),
        costPerYear: Math.round(yearlyTotal / year),
        costPerMile: Math.round((yearlyTotal / yearlyMiles) * 100) / 100
      });
    }
    
    setOwnershipAnalysis(analysis);
  };

  const updateInput = (key: keyof TCOInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const chartData = calculatedTCO ? [
    { name: 'Depreciation', value: calculatedTCO.depreciation, fill: '#8884d8' },
    { name: 'Fuel', value: calculatedTCO.fuel, fill: '#82ca9d' },
    { name: 'Financing', value: calculatedTCO.financing, fill: '#ffc658' },
    { name: 'Insurance', value: calculatedTCO.insurance, fill: '#ff7300' },
    { name: 'Maintenance', value: calculatedTCO.maintenance, fill: '#8dd1e1' }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>TCO Calculator</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="car-select">Select Car</Label>
              <Select value={inputs.selectedCarId} onValueChange={(value) => updateInput('selectedCarId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a car" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(carGroups).map(([groupName, cars]) => (
                    <div key={groupName}>
                      <div className="px-2 py-1 text-sm font-medium text-muted-foreground">
                        {groupName}
                      </div>
                      {cars.map(car => (
                        <SelectItem key={car.id} value={car.id} className="pl-4">
                          {car.year} - ${car.price.toLocaleString()}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="annual-miles">Annual Miles</Label>
                <Input
                  id="annual-miles"
                  type="number"
                  value={inputs.annualMiles}
                  onChange={(e) => updateInput('annualMiles', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="ownership-years">Ownership Years</Label>
                <Input
                  id="ownership-years"
                  type="number"
                  min="1"
                  max="7"
                  value={inputs.ownershipYears}
                  onChange={(e) => updateInput('ownershipYears', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gas-price">Gas Price ($/gallon)</Label>
                <Input
                  id="gas-price"
                  type="number"
                  step="0.01"
                  value={inputs.gasPrice}
                  onChange={(e) => updateInput('gasPrice', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="electricity-rate">Electricity ($/kWh)</Label>
                <Input
                  id="electricity-rate"
                  type="number"
                  step="0.01"
                  value={inputs.electricityRate}
                  onChange={(e) => updateInput('electricityRate', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="down-payment">Down Payment ($)</Label>
                <Input
                  id="down-payment"
                  type="number"
                  value={inputs.downPayment}
                  onChange={(e) => updateInput('downPayment', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                <Input
                  id="interest-rate"
                  type="number"
                  step="0.1"
                  value={inputs.interestRate}
                  onChange={(e) => updateInput('interestRate', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loan-term">Loan Term (Years)</Label>
                <Input
                  id="loan-term"
                  type="number"
                  value={inputs.loanTerm}
                  onChange={(e) => updateInput('loanTerm', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="insurance">Annual Insurance ($)</Label>
                <Input
                  id="insurance"
                  type="number"
                  value={inputs.insuranceAnnual}
                  onChange={(e) => updateInput('insuranceAnnual', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <Button onClick={calculateTCO} className="w-full" disabled={!inputs.selectedCarId}>
              Calculate TCO
            </Button>
          </CardContent>
        </Card>

        {calculatedTCO && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Cost Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Cost of Ownership</p>
                  <p className="text-3xl font-bold text-primary">
                    ${calculatedTCO.total.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Over {inputs.ownershipYears} year{inputs.ownershipYears !== 1 ? 's' : ''}
                  </p>
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Estimated Resale Value</p>
                    <p className="text-lg font-semibold text-green-600">
                      ${calculatedTCO.finalValue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        formatter={(value: number) => `$${value.toLocaleString()}`}
                      />
                      <Bar dataKey="value" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2 text-sm">
                  {chartData.map(item => (
                    <div key={item.name} className="flex justify-between items-center">
                      <span className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded" 
                          style={{ backgroundColor: item.fill }}
                        />
                        <span>{item.name}</span>
                      </span>
                      <span className="font-medium">${item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {ownershipAnalysis.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Ownership Duration Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Total Cost by Ownership Period</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ownershipAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: 'Years Owned', position: 'insideBottom', offset: -5 }} />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                      <Bar dataKey="totalCost" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Cost Per Mile vs Residual Value</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ownershipAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: 'Years Owned', position: 'insideBottom', offset: -5 }} />
                      <YAxis 
                        yAxisId="cost"
                        orientation="left"
                        label={{ value: 'Cost per Mile ($)', angle: -90, position: 'insideLeft' }}
                      />
                      <YAxis 
                        yAxisId="value"
                        orientation="right"
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        label={{ value: 'Resale Value', angle: 90, position: 'insideRight' }}
                      />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          name === 'costPerMile' ? `$${value.toFixed(2)}` : `$${value.toLocaleString()}`,
                          name === 'costPerMile' ? 'Cost per Mile' : 'Resale Value'
                        ]}
                      />
                      <Line yAxisId="cost" type="monotone" dataKey="costPerMile" stroke="#8884d8" strokeWidth={2} />
                      <Line yAxisId="value" type="monotone" dataKey="residualValue" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-3">Ownership Analysis Table</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Years</th>
                      <th className="text-right p-2">Total Cost</th>
                      <th className="text-right p-2">Cost/Year</th>
                      <th className="text-right p-2">Cost/Mile</th>
                      <th className="text-right p-2">Resale Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ownershipAnalysis.map(item => (
                      <tr key={item.year} className="border-b hover:bg-muted/50">
                        <td className="p-2">{item.year}</td>
                        <td className="text-right p-2">${item.totalCost.toLocaleString()}</td>
                        <td className="text-right p-2">${item.costPerYear.toLocaleString()}</td>
                        <td className="text-right p-2">${item.costPerMile}</td>
                        <td className="text-right p-2">${item.residualValue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}