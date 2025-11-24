import React, { useState } from 'react';
import { Text } from 'react-native';
import AuthScreen from './src/screens/AuthScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './src/screens/SearchScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import DiaryScreen from './src/screens/DiaryScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import { FavoritesProvider } from './src/context/FavoritesContext';
import CameraSearchScreen from './src/screens/CameraSearchScreen';
import { DiaryProvider } from './src/context/DiaryContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SearchStackScreen({ onLogout }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchHome"
        options={{ headerShown: false }}
      >
        {(props) => <SearchScreen {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{
          headerStyle: { backgroundColor: '#F3E8FF' },
          headerTintColor: '#7C3AED',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  if (!isLoggedIn) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <FavoritesProvider>
      <DiaryProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#A855F7',
              tabBarInactiveTintColor: '#9CA3AF',
              tabBarStyle: {
                backgroundColor: '#fff',
                borderTopWidth: 1,
                borderTopColor: '#E5E7EB',
              },
            }}
          >
            <Tab.Screen
              name="Search"
              options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🔍</Text>,
              }}
            >
              {(props) => <SearchStackScreen {...props} onLogout={handleLogout} />}
            </Tab.Screen>
            <Tab.Screen
              name="Camera"
              component={CameraSearchScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📷</Text>,
              }}
            />
            <Tab.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>💜</Text>,
              }}
            />
            <Tab.Screen
              name="Diary"
              component={DiaryScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📖</Text>,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </DiaryProvider>
    </FavoritesProvider>
  );
}
