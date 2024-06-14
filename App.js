import "react-native-gesture-handler";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import EntypoIcons from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Provider } from "react-redux";
import CustomDrawer from "./components/CustomDrawer";
import ProductDetails from "./components/ProductDetails";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import { store } from "./store";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

Notifications.scheduleNotificationAsync({
  content: {
    title: "Look at that notification",
    body: "I'm so proud of myself!",
  },
  trigger: null,
});
axios.defaults.baseURL = "https://dummyjson.com/";

const App = () => {
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => console.log(token));
    const notificationListener = useRef();
    const responseListener = useRef();

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const Drawer = createDrawerNavigator();

  return (
    <Provider store={store}>
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              drawerActiveBackgroundColor: "orange",
              drawerActiveTintColor: "white",
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}
          >
            <Drawer.Screen
              name="მთავარი"
              component={Home}
              options={{
                headerShown: false,
                headerTintColor: "white",
                drawerIcon: (props) => (
                  <EntypoIcons name="home" size={20} color={props.color} />
                ),
                drawerLabelStyle: { marginLeft: -20 },
              }}
            />
            <Drawer.Screen
              name="პროფილი"
              component={Profile}
              options={{
                headerShown: false,
                headerTintColor: "white",
                drawerIcon: (props) => (
                  <Ionicons name="person" size={20} color={props.color} />
                ),
                drawerLabelStyle: { marginLeft: -20 },
              }}
            />

            <Drawer.Screen
              name="პარამეტრები"
              component={Settings}
              options={{
                headerShown: false,
                headerTintColor: "white",
                drawerIcon: (props) => (
                  <Ionicons
                    name="settings-sharp"
                    size={20}
                    color={props.color}
                  />
                ),
                drawerLabelStyle: { marginLeft: -20 },
              }}
            />

            <Drawer.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{
                drawerItemStyle: { display: "none" },
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  try {
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      throw new Error("Project ID not found");
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
  } catch (e) {
    token = `${e}`;
  }

  return token;
}

export default App;
