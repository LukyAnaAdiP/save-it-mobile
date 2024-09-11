import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
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
import userIcon from "../../assets/user.png";
import backgroundHome from "../../assets/backgroundHome.jpeg";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWarehouseProducts } from "../../redux/features/warehouseProductSlice";
import dataNotFound from "../../assets/dataNotFound.json";
import itemsNull from "../../assets/itemsNull.json";
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

export default function Warehouse() {
  const [numColumns] = useState(3);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.warehouseProducts.products);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchWarehouseProducts());
    }, [dispatch])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedToken = await AsyncStorage.getItem("token");
        const fetchedUsername = await AsyncStorage.getItem("username");
        setToken(fetchedToken);
        setUsername(fetchedUsername);
      } catch (error) {
        console.error("Failed to fetch data from AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(new Date());
    };

    const intervalId = setInterval(updateDate, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const allGoods = products.flatMap((product) => product.goods || []);
  const filteredData = allGoods.filter(
    (item) =>
      item.goodsName?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || item.goodsCategoryName === selectedCategory)
  );

  const handleProductPress = (product) => {
    navigation.navigate("DetailProduct", { product });
  };

  const handleProfilePress = () => {
    navigation.navigate("DetailProfile");
  };

  const renderItem = ({ item }) => (
    <View className="bg-white shadow shadow-gray-500 m-0.5 p-0.5">
      <TouchableOpacity onPress={() => handleProductPress(item)}>
        <Image
          source={{ uri: item.goodsImage.url }}
          className="w-32 h-32 self-center"
          style={{
            resizeMode: "contain",
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
          }}
        />
      </TouchableOpacity>
    </View>
  );

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    return `${hours % 12 || 12}:${minutes} ${period}`;
  };

  const handleCategoryPress = (categoryName) => {
    setSelectedCategory(
      categoryName === selectedCategory ? null : categoryName
    );
  };

  return (
    <View className="flex-1 bg-orange-50">
      <ScrollView className="flex-1">
        <View className="relative flex-1">
          <Image
            source={backgroundHome}
            className="h-40 w-full absolute inset-0 z-0"
          />
          <View className="mt-28">
            <View>
              <View className="flex-row justify-between">
                <View className="w-24 h-24 rounded-full mx-1 bg-white shadow shadow-gray-500">
                  <Image
                    source={userIcon}
                    className="w-16 h-16 self-center mt-3"
                    style={{
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <TouchableOpacity
                  className="mt-16"
                  onPress={handleProfilePress}
                >
                  <Text className="py-2 px-4 self-end mx-4 bg-white shadow shadow-gray-500 rounded-lg">
                    Profile
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="mx-2 mt-1">
                <Text className="text-lg font-semibold">{username}</Text>
              </View>
            </View>

            <View className="mt-2 mx-2">
              <Text className="text-sm">Bergabung Sejak : July 2024</Text>
              <Text className="text-sm">Nomor Telephon : 081227067394</Text>
              <Text className="text-sm">
                Alamat Kantor : Jl. Surowijoyo II Pengilon, Salatiga.
              </Text>
            </View>

            <View className="flex-row items-center justify-start mt-2 mx-1">
              <View className="flex-row items-center p-2">
                <Ionicons name="calendar-outline" size={24} color="gray" />
                <Text className="mx-2">{formatDate(currentDate)}</Text>
              </View>
              <View className="flex-row items-center p-4">
                <Ionicons name="time-outline" size={24} color="gray" />
                <Text className="mx-2">{formatTime(currentDate)}</Text>
              </View>
            </View>

            <View className="h-px bg-gray-300 mt-1" />
          </View>
        </View>

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
                  <Text className={"text-sm text-center"}>{category.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <View className="flex-1 my-2">
          {products.length === 0 ? (
            <View className="items-center mt-10">
              <LottieView
                source={itemsNull}
                className="self-center"
                autoPlay
                loop
                style={{ width: 400, height: 400, resizeMode: "contain" }}
              />
              <Text className="mt-4 text-lg">Tidak Ada Data</Text>
            </View>
          ) : filteredData.length > 0 ? (
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
              extraData={filteredData}
              key={`${numColumns}`}
              scrollEnabled={false}
            />
          ) : (
            <View className="items-center mt-10">
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
      </ScrollView>
    </View>
  );
}
