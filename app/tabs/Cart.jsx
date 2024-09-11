import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../../redux/features/cartSlice";
import { AntDesign } from "@expo/vector-icons";
import cartNull from "../../assets/cartNull.json";
import axiosInstance from "../../api/axiosInstance";
import LottieView from "lottie-react-native";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState("success");
  const [redirectUrl, setRedirectUrl] = useState(null);
  const navigation = useNavigation();

  const handleQuantityChange = (vendorProductId, change) => {
    const item = cartItems.find((i) => i.vendorProductId === vendorProductId);
    if (item) {
      const newQuantity = item.quantity + change;
      dispatch(updateQuantity({ vendorProductId, quantity: newQuantity }));
    }
  };

  const handleTransaction = async () => {
    try {
      const transactionDetail = cartItems.map((item) => ({
        vendorProductId: item.vendorProductId,
        quantity: item.quantity.toString(),
      }));
      console.log("Transaction Data:", { transactionDetail });
      const response = await axiosInstance.post("/transactions", {
        transactionDetail,
      });
      console.log("Transaksi berhasil:", response.data);
      const { redirectUrl } = response.data.paymentResponse;
      setRedirectUrl(redirectUrl);
      Linking.openURL(redirectUrl);
      cartItems.forEach((item) => {
        dispatch(
          updateQuantity({ vendorProductId: item.vendorProductId, quantity: 0 })
        );
      });
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat memproses transaksi:",
        error.response ? error.response.data : error.message
      );
      setTransactionStatus("failed");
      setModalVisible(true);
    }
  };

  const handleGoToVendor = () => {
    navigation.navigate("Vendor");
  };

  const handleDelete = () => {
    if (deleteItemId !== null) {
      dispatch(updateQuantity({ vendorProductId: deleteItemId, quantity: 0 }));
      setDeleteItemId(null);
    }
    setDeleteConfirmationVisible(false);
  };

  const renderItem = ({ item }) => {
    const totalPrice = item.price * item.quantity;

    return (
      <View className="p-2 bg-slate-50 mt-2 mx-4 rounded-lg shadow shadow-gray-500">
        <Text className="p-2 text-base font-thin italic">
          {item.vendorName}
        </Text>
        <View className="flex-row items-center">
          <Image
            source={{ uri: item.productImage.url }}
            className="w-20 h-20"
            style={{ resizeMode: "contain" }}
          />
          <View className="flex-1 mx-2">
            <Text className="text-medium font-semibold">
              {item.productName}
            </Text>
            <Text className="text-gray-600 text-sm">Rp. {totalPrice}</Text>
          </View>
          <View className="flex-row items-center">
            {item.quantity === 1 ? (
              <TouchableOpacity
                onPress={() => {
                  setDeleteItemId(item.vendorProductId);
                  setDeleteConfirmationVisible(true);
                }}
                className="p-1 bg-red-500 rounded"
              >
                <AntDesign name="delete" size={24} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => handleQuantityChange(item.vendorProductId, -1)}
                className="p-1 bg-red-500 rounded"
              >
                <AntDesign name="minus" size={24} color="white" />
              </TouchableOpacity>
            )}
            <View className="w-8">
              <Text className="mx-2 self-center">{item.quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleQuantityChange(item.vendorProductId, 1)}
              className="p-1 bg-green-500 rounded"
            >
              <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-orange-50">
      {cartItems.length === 0 ? (
        <View className="h-full justify-center">
          <View className="justify-center">
            <Text className="text-center text-xl font-bold">
              Oops! You don't have any products to buy.
            </Text>
          </View>
          <LottieView
            source={cartNull}
            className="w-3/4 h-1/2 self-center"
            autoPlay
            loop
            style={{ resizeMode: "contain" }}
          />
          <TouchableOpacity
            className="self-center p-4 bg-amber-500 rounded-lg"
            onPress={handleGoToVendor}
          >
            <Text className="text-white textl-lg">Go To Vendor Product</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.vendorProductId}
        />
      )}
      {cartItems.length > 0 && (
        <TouchableOpacity
          onPress={() => setConfirmationVisible(true)}
          className="bg-blue-500 p-4 rounded-lg my-4 mx-4"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Proses Transaksi
          </Text>
        </TouchableOpacity>
      )}
      <Modal
        transparent={true}
        animationType="fade"
        visible={confirmationVisible}
        onRequestClose={() => setConfirmationVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-500 opacity-90">
          <View className="w-4/5 p-4 rounded-lg border-white bg-slate-50 shadow shadow-gray-500">
            <Text className="text-lg font-semibold text-center">
              Apakah Anda yakin ingin melanjutkan proses transaksi?
            </Text>
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={() => {
                  setConfirmationVisible(false);
                  handleTransaction();
                }}
                className="bg-green-500 p-2 rounded flex-1 mr-2"
              >
                <Text className="text-white text-center">Ya</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setConfirmationVisible(false)}
                className="bg-red-500 p-2 rounded flex-1 ml-2"
              >
                <Text className="text-white text-center">Tidak</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="fade"
        visible={deleteConfirmationVisible}
        onRequestClose={() => setDeleteConfirmationVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-500 opacity-90">
          <View className="w-4/5 p-4 rounded-lg border-white bg-slate-50 shadow shadow-gray-500">
            <Text className="text-lg font-semibold text-center">
              Apakah Anda yakin ingin menghapus item ini dari keranjang?
            </Text>
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={handleDelete}
                className="bg-green-500 p-2 rounded flex-1 mr-2"
              >
                <Text className="text-white text-center">Ya</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDeleteConfirmationVisible(false)}
                className="bg-red-500 p-2 rounded flex-1 ml-2"
              >
                <Text className="text-white text-center">Tidak</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
