import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

interface FilterSidebarProps {
  filters: {
    priceRange: [number, number];
    yearRange: [number, number];
    fuelTypes: string[];
    sizes: string[];
    makes: string[];
    minReliability: number;
    minSafetyRating: number;
  };
  setFilters: (filters: any) => void;
  availableYears: number[];
  availableMakes: string[];
}

export function FilterSidebar({ filters, setFilters, availableYears, availableMakes }: FilterSidebarProps) {
  const fuelTypeOptions = ['Gasoline', 'Hybrid', 'Electric', 'Diesel'];
  const sizeOptions = ['Compact', 'Midsize', 'Full-size', 'SUV', 'Truck', 'Luxury'];

  const minYear = Math.min(...availableYears);
  const maxYear = Math.max(...availableYears);

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  return (
    <Card className="w-80 h-fit">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="mt-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value)}
              max={60000}
              min={15000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>${filters.priceRange[0].toLocaleString()}</span>
              <span>${filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium">Model Year</Label>
          <div className="mt-2">
            <Slider
              value={filters.yearRange}
              onValueChange={(value) => updateFilter('yearRange', value)}
              max={maxYear}
              min={minYear}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>{filters.yearRange[0]}</span>
              <span>{filters.yearRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium">Make</Label>
          <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
            {availableMakes.map((make) => (
              <div key={make} className="flex items-center space-x-2">
                <Checkbox
                  id={make}
                  checked={filters.makes.includes(make)}
                  onCheckedChange={() => toggleArrayFilter('makes', make)}
                />
                <Label htmlFor={make} className="text-sm cursor-pointer">
                  {make}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium">Fuel Type</Label>
          <div className="mt-2 space-y-2">
            {fuelTypeOptions.map((fuelType) => (
              <div key={fuelType} className="flex items-center space-x-2">
                <Checkbox
                  id={fuelType}
                  checked={filters.fuelTypes.includes(fuelType)}
                  onCheckedChange={() => toggleArrayFilter('fuelTypes', fuelType)}
                />
                <Label htmlFor={fuelType} className="text-sm cursor-pointer">
                  {fuelType}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium">Vehicle Size</Label>
          <div className="mt-2 space-y-2">
            {sizeOptions.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={size}
                  checked={filters.sizes.includes(size)}
                  onCheckedChange={() => toggleArrayFilter('sizes', size)}
                />
                <Label htmlFor={size} className="text-sm cursor-pointer">
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium">
            Minimum Reliability: {filters.minReliability}/10
          </Label>
          <Slider
            value={[filters.minReliability]}
            onValueChange={(value) => updateFilter('minReliability', value[0])}
            max={10}
            min={1}
            step={1}
            className="w-full mt-2"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">
            Minimum Safety Rating: {filters.minSafetyRating}/5
          </Label>
          <Slider
            value={[filters.minSafetyRating]}
            onValueChange={(value) => updateFilter('minSafetyRating', value[0])}
            max={5}
            min={1}
            step={1}
            className="w-full mt-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}