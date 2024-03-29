import "react-native-gesture-handler";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import Home from "./screens/Home";
import Profile from "./screens/Profile";

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
        <Drawer.Navigator>
          <Drawer.Screen
            name="მთავარი"
            component={Home}
            options={{ headerShown: false, headerTintColor: "white" }}
          />
          <Drawer.Screen name="პროფილი" component={Profile} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
