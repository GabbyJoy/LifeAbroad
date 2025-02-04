import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, StatusBar } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ToDoListScreen from "./ToDoListScreen";
import { Ionicons } from '@expo/vector-icons';  // OR
import { MaterialIcons } from '@expo/vector-icons';
import JournalScreen from "./JournalScreen";
import TranslatorScreen from "./TranslatorScreen";
import CurrencyConverter from "./CurrencyConverter";


const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
console.log("Redirect URI:", redirectUri);

WebBrowser.maybeCompleteAuthSession();

// Home Screen Component
function HomeScreen({ navigation, route }) {
  const userInfo = route.params?.userInfo || null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen</Text>
      <Button title="Go to To-Do List" onPress={() => navigation.navigate("ToDoList")} />
      {userInfo && (
        <View style={styles.card}>
          {userInfo.picture && <Image source={{ uri: userInfo.picture }} style={styles.image} />}
          <Text style={styles.text}>Email: {userInfo.email}</Text>
          <Text style={styles.text}>Verified: {userInfo.verified_email ? "Yes" : "No"}</Text>
          <Text style={styles.text}>Name: {userInfo.name}</Text>
        </View>
      )}
    </View>
  );
}

// Login Screen Component
function LoginScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "",
    iosClientId: "914681682716-bf2aerdt3r00g8re55k9hcp7rvug21s4.apps.googleusercontent.com",
    webClientId: "914681682716-qhf6v8jl71205gao5n0mc8ebt58oj25m.apps.googleusercontent.com",
    redirectUri: redirectUri,
    useProxy: true,
  });

  useEffect(() => {
    handleEffect();
  }, [response]);

  async function handleEffect() {
    const user = await getLocalUser();
    if (!user && response?.type === "success") {
      getUserInfo(response.authentication.accessToken);
    } else {
      setUserInfo(user);
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    return data ? JSON.parse(data) : null;
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <View style={styles.container}>
      {!userInfo ? (
        <Button title="Sign in with Google" disabled={!request} onPress={() => promptAsync()} />
      ) : (
        <View style={styles.card}>
          {userInfo.picture && <Image source={{ uri: userInfo.picture }} style={styles.image} />}
          <Text style={styles.text}>Email: {userInfo.email}</Text>
          <Text style={styles.text}>Verified: {userInfo.verified_email ? "Yes" : "No"}</Text>
          <Text style={styles.text}>Name: {userInfo.name}</Text>
        </View>
      )}

      {/* Skip Login Button */}
      <Button
        title="Skip Login"
        onPress={() => {
          const guestUser = {
            email: "guest@example.com",
            name: "Guest User",
            picture: "https://example.com/guest-profile-pic.png",
            verified_email: true,
          };
          setUserInfo(guestUser);
          navigation.replace("Main", { userInfo: guestUser });
        }}
      />

      {/* Sign Out Button */}
      <Button title="Sign Out" onPress={async () => await AsyncStorage.removeItem("@user")} />
    </View>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
function MainTabNavigator({ route }) {
  const userInfo = route.params?.userInfo || null;

  return (
    <Tab.Navigator>
      <Tab.Screen 
    name="Journal" 
    component={JournalScreen} 
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="book-outline" size={size} color={color} />
      ),
    }}
  />
    <Tab.Screen 
    name="Translator" 
    component={TranslatorScreen} 
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="globe-outline" size={size} color={color} />
      ),
    }}
  />
  <Tab.Screen 
    name="Home" 
    component={HomeScreen} 
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home-outline" size={size} color={color} />
      ),
    }}
  />
    
  <Tab.Screen 
    name="Currency Converter" 
    component={CurrencyConverter} 
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home-outline" size={size} color={color} />
      ),
    }}
  />
  <Tab.Screen 
    name="To-Do" 
    component={ToDoListScreen} 
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="list-outline" size={size} color={color} />
      ),
    }}
  />
</Tab.Navigator>

  );
}

// Stack Navigator
const Stack = createStackNavigator();

// Main App Component
export default function App() {
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
