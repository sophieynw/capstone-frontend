import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, Alert } from 'react-native';
import '../global.css';
import { globalStyles } from '@/styles/globalStyles';
import { Image } from 'react-native';
import { useState } from 'react';
import api from '../api/api';
import { useContext } from 'react';
import { AuthContext } from '@/auth/AuthContext';
import { authenticate } from '@/api/auth';

export default function LoginPage({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const { token, user } = await authenticate(username, password);
      await login(token, user);
      Alert.alert('Login successful', 'You have been logged in successfully.');
    } catch (error) {
      console.error('Login error', error);
      Alert.alert('Login failed', 'Invalid username or password.');
    }
  };

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>RESTful Housekeeping</Text>
      <Text style={globalStyles.subtitle}>
        Cleaning Accountability Made Simple
      </Text>

      <Image
        source={require('../assets/clean.png')}
        style={globalStyles.logoImage}
      />

      <View style={globalStyles.card}>
        <Text>Email</Text>
        <TextInput
          style={globalStyles.input}
          placeholder='Enter your email'
          keyboardType='email-address'
          value={username}
          onChangeText={setUsername}
        />

        <Text>Password</Text>
        <TextInput
          style={globalStyles.input}
          placeholder='Enter your password'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          style={globalStyles.button}
          onPress={handleLogin}
          // onPress={navigation.navigate('MainPage')}
        >
          <Text style={globalStyles.buttonText}>Log In</Text>
        </Pressable>

        <Text style={globalStyles.link}>Find Password</Text>
      </View>

      <StatusBar style='auto' />
    </View>
  );
}
