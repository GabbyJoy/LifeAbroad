import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Dummy Screens
const HomeScreen = () => <View style={styles.screen}><Text>Home Screen</Text></View>;
const ToDoScreen = () => <View style={styles.screen}><Text>To-Do List</Text></View>;
const JournalScreen = () => <View style={styles.screen}><Text>Journal</Text></View>;
const TranslatorScreen = () => <View style={styles.screen}><Text>Translator</Text></View>;
const ConverterScreen = () => <View style={styles.screen}><Text>Converter</Text></View>;

const Tab = createBottomTabNavigator();

// Custom Home Button in the Center
const CustomTabButton = ({ children, onPress }) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress}>
    <View style={styles.customButtonInner}>{children}</View>
  </TouchableOpacity>
);

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="ToDo"
        component={ToDoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="clipboard-text-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Journal"
        component={JournalScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={"white"} size={32} />
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Translator"
        component={TranslatorScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="translate" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Converter"
        component={ConverterScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="currency-usd" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F9FF",
  },
  tabBar: {
    position: "absolute",
    height: 60,
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  customButton: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  customButtonInner: {
    width: 65,
    height: 65,
    backgroundColor: "#2A52BE",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
