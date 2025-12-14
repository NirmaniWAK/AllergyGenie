import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={screenOptions}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={screenOptions}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={screenOptions}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={screenOptions}
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={screenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

