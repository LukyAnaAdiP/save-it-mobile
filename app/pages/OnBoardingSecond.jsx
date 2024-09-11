import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function OnBoardingSecond() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View>
        <View className="flex-row justify-between">
          <TouchableOpacity
            className="p-4"
            onPress={() => navigation.navigate("OnBoardingFirst")}
          >
            <Ionicons name="arrow-back" size={36} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-5"
            onPress={() => navigation.navigate("OnBoarding")}
          >
            <Text className="text-lg text-center font-semibold">Skip</Text>
          </TouchableOpacity>
        </View>
        <View className="h-4/6">
          <Image
            className="w-80 h-96 self-center"
            source={require("../../assets/onBoardingSecond.png")}
          />
          <Text className="font-semibold text-2xl mx-4 mt-8 mb-2">
            Buy Products From The Desired Vendor
          </Text>
          <Text className="mx-4 text-base">
            This application provides features for making product purchase
            transactions from vendors
          </Text>
        </View>
        <TouchableOpacity
          className="p-4 rounded-lg self-end mt-32 mx-4"
          onPress={() => navigation.navigate("OnBoarding")}
        >
          <Text className="text-lg text-center font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
