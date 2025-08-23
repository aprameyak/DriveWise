import { Search, Car, Calculator, BarChart3 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ activeTab, setActiveTab, searchQuery, setSearchQuery }: HeaderProps) {
  const tabs = [
    { id: 'browse', label: 'Browse Cars', icon: Car },
    { id: 'compare', label: 'Compare', icon: BarChart3 },
    { id: 'calculator', label: 'TCO Calculator', icon: Calculator }
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-semibold">CarCompare</h1>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </Button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}