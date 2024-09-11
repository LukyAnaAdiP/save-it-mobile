import { FlatList, Image, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../../redux/features/reportSlice";
import { useFocusEffect } from "@react-navigation/native";

export default function History() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.report.transactions);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchReports());
    }, [dispatch])
  );

  const renderItem = ({ item }) => {
    let statusColorClass = "text-black";
    let statusBgColor = "bg-black";

    if (item.paymentStatus === "awaiting payment") {
      statusColorClass = "text-red-500";
      statusBgColor = "bg-red-100";
    } else if (item.paymentStatus === "pending") {
      statusColorClass = "text-yellow-500";
      statusBgColor = "bg-yellow-100";
    } else if (item.paymentStatus === "settlement") {
      statusColorClass = "text-green-500";
      statusBgColor = "bg-green-100";
    }

    return (
      <View className="p-4 border-b border-gray-300 bg-white rounded-lg m-1">
        <View className="flex-row justify-between">
          <Text className="text-sm text-gray-600">
            Date: {item.transactionDate}
          </Text>
          <View className={`px-2 py-1 rounded-lg ${statusBgColor}`}>
            <Text className={`${statusColorClass} font-semibold`}>
              {item.paymentStatus}
            </Text>
          </View>
        </View>
        <Text className="text-sm text-gray-600">
          Total Price: {item.totalPrice}
        </Text>
        <Text className="text-sm text-gray-600">
          Quantity: {item.totalQuantity}
        </Text>
        <View className="mt-2">
          {item.items.map((product, index) => (
            <View key={index} className="flex-row items-center mb-2">
              <Image
                source={{ uri: product.productDetails.image.url }}
                className="w-16 h-16 rounded"
              />
              <View className="ml-2">
                <Text className="text-base font-semibold">
                  {product.productDetails.name}
                </Text>
                <Text className="text-sm text-gray-600">
                  {product.productDetails.category}
                </Text>
                <Text className="text-sm text-gray-600">
                  Price: {product.price}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View className="h-full px-4 bg-orange-50">
      <View className="my-2">
        {transactions.length > 0 ? (
          <FlatList
            data={transactions}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.transactionId}
          />
        ) : (
          <View className="flex-1 justify-center">
            <Text className="self-center text-gray-500">
              No reports available
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
