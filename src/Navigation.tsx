import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import SignUpScreen from "./screens/SignUpScreen";
import Dashboard from "./screens/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Color } from "./core/utils/GlobalStyles";
import ShowScreen from "./screens/ShowScreen";
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: Color.labelColorLightPrimary },
          headerShown: false,
          navigationBarColor: Color.colorGray_100,
          statusBarColor: Color.colorGray_100,
        }}
      >
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShowScreen"
          component={ShowScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
