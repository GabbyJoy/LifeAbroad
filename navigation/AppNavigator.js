import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import HomeScreen from "../navigation/screens/HomeScreen";
import ProfileScreen from "../navigation/screens/ProfileScreen";
import CurrencyConverter from "../CurrencyConverter";
import JournalScreen from "../JournalScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="CurrencyConverter" component={CurrencyConverter} />
      <Stack.Screen name="Journal" component={JournalScreen} />

    </Stack.Navigator>
  );
}
