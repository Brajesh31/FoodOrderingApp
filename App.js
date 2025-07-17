// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { CartProvider } from "./context/CartContext";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Import screens
import SplashScreen from "./screens/SplashScreen";
import MenuScreen from "./screens/MenuScreen";
import CartScreen from "./screens/CartScreen";
import OrderSummaryScreen from "./screens/OrderSummaryScreen";

// Firebase configuration - Replace with your config
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.FIREBASE_API_KEY,
  authDomain: Constants.expoConfig.extra.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig.extra.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig.extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig.extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig.extra.FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#2ecc71",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Menu"
              component={MenuScreen}
              options={{
                title: "Food Menu",
                headerLeft: null, 
                gestureEnabled: false, 
              }}
            />

            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{
                title: "Your Cart",
              }}
            />
            <Stack.Screen
              name="OrderSummary"
              component={OrderSummaryScreen}
              options={{
                title: "Order Summary",
              }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}
