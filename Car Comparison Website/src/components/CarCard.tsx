import { Car } from '../types/car';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Fuel, Shield, Plus, BarChart3 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CarCardProps {
  car: Car;
  onCompare: (car: Car) => void;
  onViewDetails: (car: Car) => void;
  isInComparison: boolean;
}

export function CarCard({ car, onCompare, onViewDetails, isInComparison }: CarCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative">
          <ImageWithFallback
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Badge className="absolute top-2 left-2" variant="secondary">
            {car.year}
          </Badge>
          <Badge 
            className="absolute top-2 right-2" 
            variant={car.fuelType === 'Electric' ? 'default' : 'outline'}
          >
            {car.fuelType}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg">{car.make} {car.model}</h3>
          <p className="text-2xl font-bold text-primary">${car.price.toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-1">
            <Fuel className="h-4 w-4 text-muted-foreground" />
            <span>{car.mpg.combined} {car.fuelType === 'Electric' ? 'MPGe' : 'MPG'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <div className="flex">
              {[...Array(car.safetyRating)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current text-yellow-500" />
              ))}
            </div>
          </div>
          <div className="text-muted-foreground">
            Reliability: {car.reliability}/10
          </div>
          <div className="text-muted-foreground">
            Size: {car.size}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">5-Year TCO</p>
          <p className="text-lg font-semibold">${car.tcoData.total.toLocaleString()}</p>
        </div>

        <div className="flex space-x-2">
          <Button 
            variant={isInComparison ? "secondary" : "outline"} 
            size="sm" 
            className="flex-1"
            onClick={() => onCompare(car)}
          >
            <Plus className="h-4 w-4 mr-1" />
            {isInComparison ? 'Added' : 'Compare'}
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(car)}
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}