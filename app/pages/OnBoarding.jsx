import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnBoarding() {
  const navigation = useNavigation();

  const handleGetStarted = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View>
        <TouchableOpacity
          className="p-4"
          onPress={() => navigation.navigate("OnBoardingSecond")}
        >
          <Ionicons name="arrow-back" size={36} color="black" />
        </TouchableOpacity>
        <Image
          className="w-80 h-96 self-center"
          source={require("../../assets/onBoardingThird.png")}
        />
        <Text className="font-semibold text-2xl mx-4 mt-8 mb-2">
          Save Your Goods Storage Here
        </Text>
        <Text className="mx-4 text-base">
          Data warehouse is a goods storage area that has been tested for
          security, so you can store your goods here safely and not be afraid of
          being stolen by others
        </Text>
        <TouchableOpacity
          className="bg-orange-500 py-4 w-11/12 rounded-lg self-center mt-32"
          onPress={handleGetStarted}
        >
          <Text className="text-white text-lg text-center">Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
