import { Car } from '../types/car';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, Fuel, Shield, Star, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CarComparisonProps {
  comparisonCars: Car[];
  onRemoveCar: (carId: string) => void;
}

export function CarComparison({ comparisonCars, onRemoveCar }: CarComparisonProps) {
  if (comparisonCars.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Add cars to compare them side by side</p>
      </div>
    );
  }

  // Prepare depreciation data for chart
  const depreciationData = comparisonCars[0]?.depreciation.map(point => {
    const dataPoint: any = { year: point.year };
    comparisonCars.forEach(car => {
      const carPoint = car.depreciation.find(p => p.year === point.year);
      dataPoint[car.make + ' ' + car.model] = carPoint?.value || 0;
    });
    return dataPoint;
  }) || [];

  // Prepare TCO comparison data
  const tcoData = comparisonCars.map(car => ({
    name: car.make + ' ' + car.model,
    depreciation: car.tcoData.depreciation,
    fuel: car.tcoData.fuelCosts,
    insurance: car.tcoData.insurance,
    maintenance: car.tcoData.maintenance,
    financing: car.tcoData.financing,
    total: car.tcoData.total
  }));

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comparisonCars.map((car, index) => (
          <Card key={car.id} className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={() => onRemoveCar(car.id)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <CardHeader className="pb-2">
              <ImageWithFallback
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold">{car.make} {car.model}</h3>
                <p className="text-xl font-bold text-primary">${car.price.toLocaleString()}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Fuel Economy:</span>
                  <span>{car.mpg.combined} {car.fuelType === 'Electric' ? 'MPGe' : 'MPG'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Safety:</span>
                  <div className="flex">
                    {[...Array(car.safetyRating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current text-yellow-500" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Reliability:</span>
                  <span>{car.reliability}/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">5-Year TCO:</span>
                  <span className="font-semibold">${car.tcoData.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">{car.fuelType}</Badge>
                <Badge variant="outline">{car.size}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {comparisonCars.length > 1 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5" />
                <span>Depreciation Curves</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={depreciationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    {comparisonCars.map((car, index) => (
                      <Line
                        key={car.id}
                        type="monotone"
                        dataKey={car.make + ' ' + car.model}
                        stroke={colors[index % colors.length]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Cost of Ownership (5 Years)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tcoData}>
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
                    <Bar dataKey="total" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}