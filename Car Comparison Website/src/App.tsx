import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterSidebar } from './components/FilterSidebar';
import { CarCard } from './components/CarCard';
import { CarComparison } from './components/CarComparison';
import { TCOCalculator } from './components/TCOCalculator';
import { mockCars } from './data/cars';
import { Car } from './types/car';

export default function App() {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [comparisonCars, setComparisonCars] = useState<Car[]>([]);

  // Get available years and makes from the data
  const availableYears = useMemo(() => {
    return [...new Set(mockCars.map(car => car.year))].sort((a, b) => b - a);
  }, []);

  const availableMakes = useMemo(() => {
    return [...new Set(mockCars.map(car => car.make))].sort();
  }, []);

  const [filters, setFilters] = useState({
    priceRange: [15000, 60000] as [number, number],
    yearRange: [Math.min(...availableYears), Math.max(...availableYears)] as [number, number],
    fuelTypes: [] as string[],
    sizes: [] as string[],
    makes: [] as string[],
    minReliability: 1,
    minSafetyRating: 1
  });

  // Filter cars based on search and filters
  const filteredCars = useMemo(() => {
    return mockCars.filter(car => {
      const matchesSearch = !searchQuery || 
        `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];
      const matchesYear = car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1];
      
      const matchesFuelType = filters.fuelTypes.length === 0 || 
        filters.fuelTypes.includes(car.fuelType);
      
      const matchesSize = filters.sizes.length === 0 || 
        filters.sizes.includes(car.size);

      const matchesMake = filters.makes.length === 0 || 
        filters.makes.includes(car.make);
      
      const matchesReliability = car.reliability >= filters.minReliability;
      const matchesSafety = car.safetyRating >= filters.minSafetyRating;

      return matchesSearch && matchesPrice && matchesYear && matchesFuelType && 
             matchesSize && matchesMake && matchesReliability && matchesSafety;
    });
  }, [searchQuery, filters]);

  // Group filtered cars by make and model for better display
  const groupedCars = useMemo(() => {
    const groups = filteredCars.reduce((acc, car) => {
      const key = `${car.make} ${car.model}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(car);
      return acc;
    }, {} as Record<string, Car[]>);

    // Sort each group by year (newest first)
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => b.year - a.year);
    });

    return groups;
  }, [filteredCars]);

  const handleCompare = (car: Car) => {
    setComparisonCars(prev => {
      const isAlreadyComparing = prev.find(c => c.id === car.id);
      if (isAlreadyComparing) {
        return prev.filter(c => c.id !== car.id);
      } else if (prev.length < 4) {
        return [...prev, car];
      }
      return prev;
    });
  };

  const handleRemoveFromComparison = (carId: string) => {
    setComparisonCars(prev => prev.filter(c => c.id !== carId));
  };

  const handleViewDetails = (car: Car) => {
    // Add to comparison if not already there
    if (!comparisonCars.find(c => c.id === car.id)) {
      handleCompare(car);
    }
    setActiveTab('compare');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'browse':
        return (
          <div className="flex gap-6">
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters}
              availableYears={availableYears}
              availableMakes={availableMakes}
            />
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">
                    {filteredCars.length} cars found across {Object.keys(groupedCars).length} models
                  </p>
                  {searchQuery && (
                    <p className="text-sm text-muted-foreground">
                      Searching for: "{searchQuery}"
                    </p>
                  )}
                </div>
                {comparisonCars.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    {comparisonCars.length} cars in comparison
                  </div>
                )}
              </div>

              <div className="space-y-8">
                {Object.entries(groupedCars).map(([modelName, cars]) => (
                  <div key={modelName}>
                    <h3 className="text-lg font-semibold mb-4 pb-2 border-b">
                      {modelName} ({cars.length} model{cars.length !== 1 ? 's' : ''})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cars.map(car => (
                        <CarCard
                          key={car.id}
                          car={car}
                          onCompare={handleCompare}
                          onViewDetails={handleViewDetails}
                          isInComparison={comparisonCars.some(c => c.id === car.id)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {Object.keys(groupedCars).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No cars match your current filters.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your price range, year range, or other filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'compare':
        return (
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-bold">Car Comparison</h2>
              <p className="text-muted-foreground">
                Compare up to 4 cars side by side including different model years
              </p>
            </div>
            <CarComparison
              comparisonCars={comparisonCars}
              onRemoveCar={handleRemoveFromComparison}
            />
          </div>
        );
      
      case 'calculator':
        return (
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-bold">TCO Calculator</h2>
              <p className="text-muted-foreground">
                Calculate the true cost of ownership and find the optimal ownership duration
              </p>
            </div>
            <TCOCalculator />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}