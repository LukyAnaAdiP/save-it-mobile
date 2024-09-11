import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import OnBoarding from "./OnBoarding";
import Login from "./Login";
import Register from "./Register";
import HomeNavigation from "./HomeNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DetailProduct from "./DetailProduct";
import OnBoardingFirst from "./OnBoardingFirst";
import OnBoardingSecond from "./OnBoardingSecond";
import DetailProfile from "./DetailProfile";

export default function AppNavigation({ initialRoute }) {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="OnBoardingFirst"
            component={OnBoardingFirst}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnBoardingSecond"
            component={OnBoardingSecond}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeNavigation"
            component={HomeNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailProduct"
            component={DetailProduct}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailProfile"
            component={DetailProfile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
