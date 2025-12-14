import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,+
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { storage } from '../utils/storage';

type SignupScreenProps = {
  navigation: any;
};

export default function SignupScreen({ navigation }: SignupScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const exists = await storage.userExists(email.trim());
      if (exists) {
        Alert.alert('Error', 'An account with this email already exists');
        setLoading(false);
        return;
      }

      const user = {
        name: name.trim(),
        email: email.trim(),
        password: password,
      };

      await storage.saveUser(user);
      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.replace('Profile'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return '';
    if (password.length < 6) return 'Weak';
    if (password.length < 10) return 'Medium';
    return 'Strong';
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#04668D' }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-8">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text className="text-white text-base">←</Text>
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">AllergyGenie</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-white text-sm">
                Already have an account? <Text className="font-bold">Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {/* White Card */}
            <View
              className="flex-1 bg-white"
              style={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                marginTop: 'auto',
                paddingTop: 40,
                paddingHorizontal: 24,
                paddingBottom: 40,
              }}
            >
              <Text className="text-3xl font-bold text-gray-900 mb-2">Get started free.</Text>
              <Text className="text-gray-500 text-base mb-8">Free forever. No credit card needed.</Text>

              {/* Form */}
              <View className="mb-6">
                <View className="mb-5">
                  <Text className="text-gray-700 text-sm font-medium mb-2">Email address</Text>
                  <TextInput
                    className="bg-white border border-gray-200 rounded-2xl px-5 py-4 text-base"
                    placeholder="Email address"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.05,
                      shadowRadius: 2,
                      elevation: 1,
                    }}
                  />
                </View>

                <View className="mb-5">
                  <Text className="text-gray-700 text-sm font-medium mb-2">Your name</Text>
                  <TextInput
                    className="bg-white border border-gray-200 rounded-2xl px-5 py-4 text-base"
                    placeholder="Your name"
                    placeholderTextColor="#9CA3AF"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.05,
                      shadowRadius: 2,
                      elevation: 1,
                    }}
                  />
                </View>

                <View className="mb-5">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-gray-700 text-sm font-medium">Password</Text>
                    {password.length > 0 && (
                      <Text className="text-secondary font-semibold text-sm">
                        {getPasswordStrength()}
                      </Text>
                    )}
                  </View>
                  <View className="relative">
                    <TextInput
                      className="bg-white border border-gray-200 rounded-2xl px-5 py-4 text-base pr-14"
                      placeholder="Password"
                      placeholderTextColor="#9CA3AF"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.05,
                        shadowRadius: 2,
                        elevation: 1,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-0 bottom-0 justify-center"
                    >
                      <Text className="text-primary font-semibold text-sm">
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View className="mb-6">
                  <Text className="text-gray-700 text-sm font-medium mb-2">Confirm Password</Text>
                  <View className="relative">
                    <TextInput
                      className="bg-white border border-gray-200 rounded-2xl px-5 py-4 text-base pr-14"
                      placeholder="Confirm Password"
                      placeholderTextColor="#9CA3AF"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.05,
                        shadowRadius: 2,
                        elevation: 1,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-5 top-0 bottom-0 justify-center"
                    >
                      <Text className="text-primary font-semibold text-sm">
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Sign Up Button with Gradient */}
                <TouchableOpacity
                  onPress={handleSignup}
                  disabled={loading}
                  className="rounded-2xl py-5 items-center justify-center mb-4"
                  style={{
                    shadowColor: '#04668D',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                  }}
                >
                  <LinearGradient
                    colors={['#04668D', '#01C49A']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="absolute inset-0 rounded-2xl"
                  />
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text className="text-white text-base font-bold">Sign up</Text>
                  )}
                </TouchableOpacity>

                {/* Divider */}
                <View className="flex-row items-center mb-6">
                  <View className="flex-1 h-px bg-gray-200" />
                  <Text className="px-4 text-gray-500 text-sm">Or sign up with</Text>
                  <View className="flex-1 h-px bg-gray-200" />
                </View>

                {/* Social Login Buttons */}
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    className="flex-1 bg-white border border-gray-200 rounded-2xl py-4 items-center justify-center"
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.05,
                      shadowRadius: 2,
                      elevation: 1,
                    }}
                  >
                    <Text className="text-gray-700 font-semibold">Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 bg-white border border-gray-200 rounded-2xl py-4 items-center justify-center"
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.05,
                      shadowRadius: 2,
                      elevation: 1,
                    }}
                  >
                    <Text className="text-gray-700 font-semibold">Facebook</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
