import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import dataNotFound from "../../assets/dataNotFound.json";
import categoryAutomotive from "../../assets/categoryAutomotive.png";
import categoryBeauty from "../../assets/categoryBeauty.png";
import categoryClothes from "../../assets/categoryClothes.png";
import categoryElectronics from "../../assets/categoryElectronics.png";
import categoryFood from "../../assets/categoryFood.png";
import categoryToy from "../../assets/categoryToy.png";
import categoryAccessories from "../../assets/categoryAccessories.png";
import categoryHealth from "../../assets/categoryHealth.png";
import categoryHome from "../../assets/categoryHome.png";
import categorySport from "../../assets/categorySport.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorProducts } from "../../redux/features/vendorProductSlice";
import { addToCart } from "../../redux/features/cartSlice";
import LottieView from "lottie-react-native";

const categories = [
  { id: "1", name: "accessories", image: categoryAccessories },
  { id: "2", name: "beauty and cares", image: categoryBeauty },
  { id: "3", name: "electronic", image: categoryElectronics },
  { id: "4", name: "fashion", image: categoryClothes },
  { id: "5", name: "food and beverages", image: categoryFood },
  { id: "6", name: "hobby", image: categoryToy },
  { id: "7", name: "automotive", image: categoryAutomotive },
  { id: "8", name: "health", image: categoryHealth },
  { id: "9", name: "home and living", image: categoryHome },
  { id: "10", name: "sports", image: categorySport },
];

export default function Vendor() {
  const [numColumns] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.vendorProducts.products);

  useEffect(() => {
    dispatch(fetchVendorProducts());
  }, [dispatch]);

  const filteredData = products?.filter(
    (item) =>
      item.productName?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || item.productCategory === selectedCategory)
  );

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  function getShortProductName(name) {
    return name.split(" ").slice(0, 1).join(" ");
  }

  const renderItem = ({ item }) => (
    <View className="flex-1 p-1.5">
      <View className="bg-white shadow shadow-gray-500 rounded-lg overflow-hidden">
        <TouchableOpacity onPress={() => handleProductPress(item)}>
          <View className="self-end mx-2">
            <Text className="text-base font-thin italic text-end">
              {item.vendorName}
            </Text>
          </View>
          <View className="w-full h-36">
            <Image
              source={{ uri: item.productImage.url }}
              className="w-4/5 h-full self-center mt-2"
              style={{
                resizeMode: "contain",
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
              }}
            />
          </View>
          <View className="pb-4 pt-1">
            <View className="flex-row justify-between mx-2 mt-2">
              <Text className="text-lg font-normal self-center">
                {getShortProductName(item.productName)}
              </Text>
            </View>
            <Text className="text-gray-600 mx-2 font-medium text-lg">
              Rp. {item.price}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleCategoryPress = (categoryName) => {
    setSelectedCategory(
      categoryName === selectedCategory ? null : categoryName
    );
  };

  return (
    <View className="flex-1 bg-orange-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-11/12 self-center mt-4">
          <View className="flex-row items-center border border-gray-300 rounded-lg p-2 h-14 bg-gray-50">
            <Ionicons name="search-outline" size={24} color="gray" />
            <TextInput
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              className="flex-1 ml-2"
              style={{ fontSize: 16 }}
              placeholderTextColor="gray"
            />
          </View>
        </View>

        <View className="mx-4">
          <ScrollView
            horizontal
            className="mt-4"
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-row space-x-2 m-2 h-24">
              {categories.map((category) => (
                <View key={category.id} className="w-20">
                  <TouchableOpacity
                    onPress={() => handleCategoryPress(category.name)}
                    className="items-center rounded-lg"
                  >
                    <Image
                      source={category.image}
                      className={`${
                        selectedCategory === category.name
                          ? "w-16 h-16"
                          : "w-14 h-14"
                      } rounded-full`}
                      style={{
                        borderColor: "#ddd",
                        borderWidth: 2,
                      }}
                    />
                    <Text className={"text-sm text-center"}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View className="flex-1 mt-4 mx-2">
          {filteredData.length > 0 ? (
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.vendorProductId}
              numColumns={numColumns}
              columnWrapperStyle={{
                justifyContent:
                  filteredData.length % numColumns !== 0
                    ? "flex-start"
                    : "space-between",
              }}
              key={`${numColumns}`}
              scrollEnabled={false}
            />
          ) : (
            <View className="h-full justify-center">
              <LottieView
                source={dataNotFound}
                className="self-center"
                autoPlay
                loop
                style={{ width: 400, height: 400, resizeMode: "contain" }}
              />
            </View>
          )}
        </View>

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-gray-500 opacity-90">
            <View className="bg-white p-4 rounded-lg w-11/12 shadow shadow-gray-500">
              {selectedProduct && (
                <>
                  <TouchableOpacity
                    className="self-end"
                    onPress={() => setModalVisible(false)}
                  >
                    <AntDesign name="closecircleo" size={28} color="black" />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: selectedProduct.productImage.url }}
                    className="w-40 h-40 self-center mt-2"
                    style={{
                      resizeMode: "contain",
                      borderBottomWidth: 1,
                      borderBottomColor: "#ddd",
                    }}
                  />
                  <Text className="text-lg font-bold mt-2 self-center">
                    Rp. {selectedProduct.price}
                  </Text>
                  <Text className="text-base font-normal mt-2">
                    <Text className="font-medium">Category</Text> :{" "}
                    {selectedProduct.productCategory}
                  </Text>
                  <Text className="text-base font-normal">
                    <Text className="font-medium">Product</Text> :{" "}
                    {selectedProduct.productName}
                  </Text>
                  <Text className="text-base font-normal">
                    <Text className="font-medium">Description</Text> :{" "}
                    {selectedProduct.productDescription}
                  </Text>
                  <Text className="text-base font-normal">
                    <Text className="font-medium">Vendor</Text> :{" "}
                    {selectedProduct.vendorName}
                  </Text>
                </>
              )}
              <TouchableOpacity
                onPress={() => {
                  if (selectedProduct) {
                    dispatch(addToCart(selectedProduct));
                  }
                  setModalVisible(false);
                }}
                className="mt-4 mb-2 p-4 bg-amber-500 rounded-lg"
              >
                <Text className="text-center text-white">Add To Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
