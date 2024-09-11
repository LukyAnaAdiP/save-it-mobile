import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { login } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import imageLogin from "../../assets/imageLogin.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    if (username === "superadmin" && password === "password") {
      setModalVisible(true);
    } else {
      dispatch(login({ username, password })).then(async (action) => {
        if (action.type === "auth/login/fulfilled") {
          await AsyncStorage.setItem("token", action.payload.token);
          await AsyncStorage.setItem("username", action.payload.username);
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeNavigation" }],
          });
        } else if (action.type === "auth/login/rejected") {
          setModalVisible(true);
        }
      });
    }
  };

  const getBorderColor = (value, isFocused) => {
    if (isFocused) {
      if (value === "") {
        return "border-red-500";
      } else {
        return "border-green-500";
      }
    } else {
      return "border-gray-300";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-orange-50 pt-7">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1">
          <View className="flex-row bg-orange-200 p-1.5">
            <Image
              className="w-12 h-12"
              source={require("../../assets/logo.png")}
            />
            <Text className="text-xl font-semibold m-2">Save It</Text>
          </View>
          <Text className="text-4xl font-bold mt-2 mx-4">Login</Text>
          <Text className="text-lg font-normal mt-2 mx-4">
            Welcome to Save It. Please enter your account informationto log in
          </Text>
          <View className="items-center mt-2">
            <Image className="w-56 h-56" source={imageLogin} />
          </View>
          <TextInput
            className={`border-2 border-gray-300 rounded-lg py-4 w-11/12 self-center mb-4 px-4 mt-2 text-lg bg-gray-50 ${getBorderColor(
              username,
              focusedField === "username"
            )}`}
            placeholder="Username"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setUsername}
            value={username}
            onFocus={() => setFocusedField("username")}
            onBlur={() => setFocusedField(null)}
          />
          <View
            className={`border-2 border-gray-300 rounded-lg flex-row items-center mb-8 px-4 py-4 w-11/12 self-center mt-2 bg-gray-50 ${getBorderColor(
              password,
              focusedField === "password"
            )}`}
          >
            <TextInput
              className="flex-1 text-lg"
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons
                name={passwordVisible ? "eye" : "eye-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="bg-blue-500 py-4 w-11/12 rounded-lg self-center mt-16"
            onPress={handleLogin}
          >
            <Text className="text-white text-lg text-center font-semibold">
              Login
            </Text>
          </TouchableOpacity>
          <View className="flex-1 justify-center flex-row mt-4">
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              className="mx-2"
              onPress={() => navigation.navigate("Register")}
            >
              <Text className="text-blue-500">Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-gray-500 opacity-90">
            <View className="w-4/5 p-4 rounded-lg bg-slate-50 shadow shadow-gray-500">
              <Text className="mb-2 text-2xl font-bold self-center text-red-500">
                Login Failed!
              </Text>
              <Text className="mb-4 text-lg font-seibold self-center">
                Check your Username or Password
              </Text>
              <TouchableOpacity
                className="bg-blue-500 p-4 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white text-center">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
