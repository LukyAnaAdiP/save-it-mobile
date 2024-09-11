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
import { register } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";

export default function Register() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("The email you entered is incorrect!");
      return;
    }

    if (password.length < 8) {
      setPasswordError("The password must consist of at least 8 characters!");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("The password you entered does not match.");
      return;
    }

    const userData = { username, email, password };
    dispatch(register(userData))
      .unwrap()
      .then(() => {
        setModalTitle("Success");
        setModalMessage("Registration successful");
        setIsSuccess(true);
        setModalVisible(true);
      })
      .catch((err) => {
        setModalTitle("Registration Failed");
        setModalMessage(err.message || "An error occurred");
        setIsSuccess(false);
        setModalVisible(true);
      });
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (isSuccess) {
      navigation.navigate("Login");
    }
  };

  const getBorderColor = (value, isFocused, error) => {
    if (error) {
      return "border-red-500";
    }
    if (isFocused) {
      return value === "" ? "border-red-500" : "border-green-500";
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
          <Text className="text-4xl font-bold mt-2 mx-4">Register</Text>
          <Text className="text-lg font-normal mt-2 mx-4">
            Please complete the information to create your account and enjoy all
            Save It features.
          </Text>
          <TextInput
            className={`border-2 border-gray-300 rounded-lg py-4 w-11/12 self-center mb-1 px-4 mt-16 text-lg bg-gray-50 ${getBorderColor(
              username,
              focusedField === "username",
              false
            )}`}
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={setUserName}
            value={username}
            onFocus={() => setFocusedField("username")}
            onBlur={() => setFocusedField(null)}
          />
          <TextInput
            className={`border-2 rounded-lg py-4 w-11/12 self-center mb-1 px-4 mt-2 text-lg bg-gray-50 ${getBorderColor(
              email,
              focusedField === "email",
              emailError
            )}`}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
          />
          {emailError ? (
            <Text className="text-red-500 self-center mb-4 w-11/12">
              {emailError}
            </Text>
          ) : null}
          <View
            className={`border-2 rounded-lg flex-row items-center mb-1 px-4 py-4 w-11/12 self-center mt-2 bg-gray-50 ${getBorderColor(
              password,
              focusedField === "password",
              passwordError
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
          {passwordError ? (
            <Text className="text-red-500 self-center mb-4 w-11/12">
              {passwordError}
            </Text>
          ) : null}
          <View
            className={`border-2 rounded-lg flex-row items-center mb-1 px-4 py-4 w-11/12 self-center mt-2 bg-gray-50 ${getBorderColor(
              confirmPassword,
              focusedField === "confirmPassword",
              confirmPasswordError
            )}`}
          >
            <TextInput
              className="flex-1 text-lg"
              placeholder="Confirm Password"
              secureTextEntry={!confirmPasswordVisible}
              autoCapitalize="none"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              onFocus={() => setFocusedField("confirmPassword")}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              <Ionicons
                name={confirmPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {confirmPasswordError ? (
            <Text className="text-red-500 self-center mb-4 w-11/12">
              {confirmPasswordError}
            </Text>
          ) : null}
          <TouchableOpacity
            className="bg-blue-500 py-4 w-11/12 rounded-lg self-center mt-12"
            onPress={handleRegister}
          >
            <Text className="text-white text-lg text-center font-semibold">
              Register
            </Text>
          </TouchableOpacity>
          <View className="flex-1 justify-center flex-row mt-4">
            <Text>Already have an account?</Text>
            <TouchableOpacity
              className="mx-2"
              onPress={() => navigation.navigate("Login")}
            >
              <Text className="text-blue-500">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-500 opacity-90">
          <View className="w-4/5 p-4 rounded-lg bg-slate-50 shadow shadow-gray-500">
            <Text
              className={`mb-2 text-2xl font-bold self-center ${
                isSuccess ? "text-black" : "text-red-500"
              }`}
            >
              {modalTitle}
            </Text>
            <Text className="mb-4 text-lg font-seibold self-center">
              {modalMessage}
            </Text>
            <TouchableOpacity
              className="bg-blue-500 p-4 rounded-lg"
              onPress={handleModalClose}
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
