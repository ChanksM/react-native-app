import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Image, Text } from "react-native";

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          width: "100%",
          height: 200,
          backgroundColor: "orange",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Image
          source={require("../assets/image.png")}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ color: "white", fontSize: 20 }}>
          მუშნი ჩანქსელიანი
        </Text>
      </View>
      <DrawerItemList {...props}></DrawerItemList>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
