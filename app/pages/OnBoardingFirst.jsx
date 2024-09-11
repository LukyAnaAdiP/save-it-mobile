import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function OnBoardingFirst() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View>
        <TouchableOpacity
          className="p-4 rounded-lg self-end mt-2 mx-4"
          onPress={() => navigation.navigate("OnBoarding")}
        >
          <Text className="text-lg text-center font-semibold">Skip</Text>
        </TouchableOpacity>
        <View className="h-4/6">
          <Image
            className="w-80 h-96 self-center"
            source={require("../../assets/onBoardingFirst.png")}
          />
          <Text className="font-semibold text-2xl mx-4 mt-8 mb-2">
            Wellcome App Management Warehouse
          </Text>
          <Text className="mx-4 text-base">
            Applications that can help you to make it easier to manage your
            warehouse by applications mobile and website.
          </Text>
        </View>
        <TouchableOpacity
          className="p-4 rounded-lg self-end mt-32 mx-4"
          onPress={() => navigation.navigate("OnBoardingSecond")}
        >
          <Text className="text-lg text-center font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
