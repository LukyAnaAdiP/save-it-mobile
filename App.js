import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import AppNavigation from "./app/pages/AppNavigation";
import store from "./redux/store";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  return (
    <View className="bg-orange-100 flex-1 justify-center items-center">
      <Image className="w-40 h-40" source={require("./assets/logo.png")} />
      <Text className="text-4xl font-extrabold">Save It</Text>
    </View>
  );
};

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    const checkAppState = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const hasSeenOnboarding = await AsyncStorage.getItem(
          "hasSeenOnboarding"
        );

        if (token) {
          setInitialRoute("HomeNavigation");
        } else if (hasSeenOnboarding) {
          setInitialRoute("Login");
        } else {
          setInitialRoute("OnBoardingFirst");
        }
      } catch (error) {
        console.error("Failed to fetch data from AsyncStorage:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };

    checkAppState();
  }, []);

  if (isLoading) return <SplashScreen />;
  return <AppNavigation initialRoute={initialRoute} />;
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
