import {
  Button,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Warehouse from "../tabs/Warehouse";
import Vendor from "../tabs/Vendor";
import History from "../tabs/History";
import Cart from "../tabs/Cart";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logout from "../../assets/logout.json";
import LottieView from "lottie-react-native";

export default function HomeNavigation() {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    setModalVisible(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Failed to clear AsyncStorage:", error);
    } finally {
      setModalVisible(false);
    }
  };

  const handleCancelLogout = () => {
    setModalVisible(false);
  };

  const CustomHeader = ({ title, showLogout }) => (
    <View className="flex-row justify-between bg-orange-200">
      <View className="flex-row items-center py-1.5">
        <Image
          source={require("../../assets/logo.png")}
          className="w-12 h-12 mx-2"
        />
        <Text className="text-2xl font-semibold">{title}</Text>
      </View>

      {showLogout && (
        <TouchableOpacity className="self-center mx-4" onPress={handleLogout}>
          <SimpleLineIcons name="logout" size={28} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );

  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaView className="flex-1 bg-white pt-7">
      <Tab.Navigator
        initialRouteName="Warehouse"
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Warehouse") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Vendor") {
              iconName = focused ? "bag" : "bag-handle-outline";
            } else if (route.name === "Cart") {
              iconName = focused ? "cart" : "cart-outline";
            } else if (route.name === "History") {
              iconName = focused ? "time" : "time-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "rgb(245, 158, 11)",
          tabBarInactiveTintColor: "gray",
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen
          name="Warehouse"
          component={Warehouse}
          options={{
            header: () => <CustomHeader title="Save It" showLogout={true} />,
          }}
        />
        <Tab.Screen
          name="Vendor"
          component={Vendor}
          options={{
            header: () => <CustomHeader title="Shop" showLogout={false} />,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            header: () => <CustomHeader title="Cart" showLogout={false} />,
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            header: () => <CustomHeader title="History" showLogout={false} />,
          }}
        />
      </Tab.Navigator>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelLogout}
      >
        <View className="flex-1 justify-center items-center bg-gray-500 opacity-90">
          <View className="w-4/5 p-4 rounded-lg bg-slate-50 shadow shadow-gray-500">
            <Text className="text-lg mb-4 font-bold text-center">
              Apakah Anda yakin ingin logout?
            </Text>
            <LottieView
              source={logout}
              className="self-center"
              autoPlay
              loop
              style={{ width: 200, height: 300, resizeMode: "contain" }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "rgb(245, 158, 11)",
                padding: 14,
                borderRadius: 5,
                marginBottom: 10,
              }}
              onPress={handleConfirmLogout}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Ya, Logout
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "gray",
                padding: 14,
                borderRadius: 5,
              }}
              onPress={handleCancelLogout}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
