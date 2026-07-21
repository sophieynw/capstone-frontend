import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable } from 'react-native';
import '../global.css';
import { globalStyles } from '@/styles/globalStyles';
import { Image } from 'react-native';

export default function LoginPage({ navigation }: any) {
  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>RESTful Housekeeping</Text>
      <Text style={globalStyles.subtitle}>
        Cleaning accountability made simple
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
        />

        <Text>Password</Text>
        <TextInput
          style={globalStyles.input}
          placeholder='Enter your password'
          secureTextEntry
        />

        <Pressable style={globalStyles.button}>
          <Text
            style={globalStyles.buttonText}
            onPress={() => navigation.navigate('MainPage')} // TODO: actual security implementation required
          >
            Log In
          </Text>
        </Pressable>

        <Text style={globalStyles.link}>Find Password</Text>
      </View>

      <StatusBar style='auto' />
    </View>
  );
}
