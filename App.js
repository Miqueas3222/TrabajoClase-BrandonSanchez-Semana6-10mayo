//Creado por Brandon Daniel Sanchez Santamaria - 20220632
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AlumnosScreen from './AlumnosScreen';
import ClientesScreen from './ClientesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Alumnos">
        <Stack.Screen name="Alumnos" component={AlumnosScreen} />
        <Stack.Screen name="Clientes" component={ClientesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
