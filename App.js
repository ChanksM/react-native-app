import "react-native-gesture-handler";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { Platform, SafeAreaView, StatusBar } from "react-native";

import EntypoIcons from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

import CustomDrawer from "./components/CustomDrawer";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import ProductDetails from "./components/ProductDetails";

axios.defaults.baseURL = "https://dummyjson.com/";

const App = () => {
  const Drawer = createDrawerNavigator();

  return (
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
                <Ionicons name="settings-sharp" size={20} color={props.color} />
              ),
              drawerLabelStyle: { marginLeft: -20 },
            }}
          />

          <Drawer.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{
              drawerItemStyle: { display: 'none' }
            }}

            // options={{ DrawerItemStyle: { display: "none" } }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
