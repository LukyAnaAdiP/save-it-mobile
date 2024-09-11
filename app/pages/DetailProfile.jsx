import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileData } from "../../redux/features/profileSlice";
import userIcon from "../../assets/user.png";

export default function DetailProfile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    username,
    fullNameCustomer,
    emailCustomer,
    phoneCustomer,
    addressCustomer,
    customerImage,
    loading,
    error,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  const getImageSource = () => {
    if (
      typeof customerImage.url === "string" &&
      customerImage.url.trim() !== "" &&
      customerImage.url !== "null"
    ) {
      return { uri: customerImage.url };
    } else {
      return userIcon;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1">
          <View className="flex-row mx-2 mb-2">
            <TouchableOpacity
              className="p-2"
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={36} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold self-center">
              Detail Profile
            </Text>
          </View>
          {loading ? (
            <View className="flex-1 justify-center">
              <ActivityIndicator
                className="self-center"
                size="large"
                color="#0000ff"
              />
            </View>
          ) : error ? (
            <Text className="text-red-500 mx-4">Error: {error}</Text>
          ) : (
            <View className="mx-4 my-4">
              <View className="justify-center">
                <View className="w-32 h-32 rounded-full mx-1 bg-white shadow shadow-gray-500 self-center">
                  <Image
                    source={getImageSource()}
                    className="w-24 h-24 self-center mt-3"
                    defaultSource={userIcon}
                  />
                </View>
              </View>
              <View className="mt-4">
                <View className="flex-row mb-2">
                  <Text className="text-lg font-medium w-1/3">Username</Text>
                  <Text className="text-lg w-2/3">: {username}</Text>
                </View>
                <View className="flex-row mb-2">
                  <Text className="text-lg font-medium w-1/3">Full Name</Text>
                  <Text className="text-lg w-2/3">: {fullNameCustomer}</Text>
                </View>
                <View className="flex-row mb-2">
                  <Text className="text-lg font-medium w-1/3">Email</Text>
                  <Text className="text-lg w-2/3">: {emailCustomer}</Text>
                </View>
                <View className="flex-row mb-2">
                  <Text className="text-lg font-medium w-1/3">Phone</Text>
                  <Text className="text-lg w-2/3">: {phoneCustomer}</Text>
                </View>
                <View className="flex-row">
                  <Text className="text-lg font-medium w-1/3">Address</Text>
                  <Text className="text-lg w-2/3">: {addressCustomer}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
