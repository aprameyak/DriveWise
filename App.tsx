import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import TCOOptimizerScreen from './src/screens/TCOOptimizerScreen';
import CarCompareScreen from './src/screens/CarCompareScreen';
import DepreciationExplorerScreen from './src/screens/DepreciationExplorerScreen';
import AlertsScreen from './src/screens/AlertsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Import auth store
import { useAuthStore } from './src/store/authStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { logout } = useAuthStore();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'TCOOptimizer') {
            iconName = focused ? 'calculator' : 'calculator-outline';
          } else if (route.name === 'CarCompare') {
            iconName = focused ? 'git-compare' : 'git-compare-outline';
          } else if (route.name === 'DepreciationExplorer') {
            iconName = focused ? 'trending-down' : 'trending-down-outline';
          } else if (route.name === 'Alerts') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
        },
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#1e293b',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerRight: () => (
          <Ionicons 
            name="log-out-outline" 
            size={24} 
            color="#ef4444" 
            onPress={logout}
            style={{ marginRight: 16 }}
          />
        ),
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'DriveWise' }}
      />
      <Tab.Screen 
        name="TCOOptimizer" 
        component={TCOOptimizerScreen}
        options={{ title: 'TCO Optimizer' }}
      />
      <Tab.Screen 
        name="CarCompare" 
        component={CarCompareScreen}
        options={{ title: 'Compare Cars' }}
      />
      <Tab.Screen 
        name="DepreciationExplorer" 
        component={DepreciationExplorerScreen}
        options={{ title: 'Depreciation' }}
      />
      <Tab.Screen 
        name="Alerts" 
        component={AlertsScreen}
        options={{ title: 'Alerts' }}
      />
    </Tab.Navigator>
  );
};

const AuthNavigator = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
