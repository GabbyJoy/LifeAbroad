// HomeScreen.js
import React from "react";
import { View, Text, Button, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import BottomNavigation from "./BottomNavigation"; // Ensure the path is correct

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.container}>
        <Text style={styles.text}>Hello!</Text>
        <Text style={styles.description}>
          This is where users can view their content or navigate to other sections of the app.
        </Text>

        {/* Ensure BottomNavigation is rendered here */}
        <BottomNavigation />

        {/* Button to navigate to the To-Do List */}
        <Button
          title="Go to To-Do list"
          onPress={() => navigation.navigate("ToDoList")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});
