import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DetailProduct = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-orange-200 pt-8">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 mb-2">
          <View className="flex-row mx-2 mb-2">
            <TouchableOpacity
              className="p-1.5"
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={36} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold self-center">
              Detail Product
            </Text>
          </View>
          <View className="bg-orange-50">
            <View className="items-center mt-2">
              <Image
                className="w-full h-96"
                source={{ uri: product.goodsImage.url }}
                style={{
                  resizeMode: "contain",
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                }}
              />
            </View>
            <View className="mx-2">
              <Text className="font-bold text-2xl mt-4 mb-2">Product</Text>
              <View className="flex-row mb-2">
                <Text className="text-base font-medium w-1/3">
                  Product Name
                </Text>
                <Text className="text-base w-2/3">: {product.goodsName}</Text>
              </View>
              <View className="flex-row mb-2">
                <Text className="text-base font-medium w-1/3">
                  Product Category
                </Text>
                <Text className="text-base w-2/3">
                  : {product.goodsCategoryName}
                </Text>
              </View>
              <View className="flex-row mb-2">
                <Text className="text-base font-medium w-1/3">
                  Product Description
                </Text>
                <Text className="text-base w-2/3">
                  : {product.goodsDescription}
                </Text>
              </View>
              <View className="flex-row mb-2">
                <Text className="text-base font-medium w-1/3">Price</Text>
                <Text className="text-base w-2/3">: {product.price}</Text>
              </View>
              <View className="flex-row mb-2">
                <Text className="text-base font-medium w-1/3">Total Item</Text>
                <Text className="text-base w-2/3">: {product.stocks}</Text>
              </View>
              <Text className="font-bold text-2xl mt-4 mb-2">Vendor</Text>
              <View className="flex-row mb-2">
                <Text className="text-base font-medium w-1/3">Vendor Name</Text>
                <Text className="text-base w-2/3">
                  : {product.vendorDetails?.vendorName || ""}
                </Text>
              </View>
              <View className="flex-row mb-2">
                <Text className="text-base font-medium w-1/3">
                  Vendor Email
                </Text>
                <Text className="text-base w-2/3">
                  : {product.vendorDetails?.vendorEmail || ""}
                </Text>
              </View>
              <View className="flex-row mb-2">
                <Text className="text-base font-medium w-1/3">
                  Vendor Phone
                </Text>
                <Text className="text-base w-2/3">
                  : {product.vendorDetails?.vendorPhone || ""}
                </Text>
              </View>
              <View className="flex-row mb-2">
                <Text className="text-base font-medium w-1/3">
                  Vendor Address
                </Text>
                <Text className="text-base w-2/3">
                  : {product.vendorDetails?.vendorAddress || ""}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailProduct;
