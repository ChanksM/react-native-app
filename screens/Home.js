import { useNavigation } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EntypoIcons from "react-native-vector-icons/Entypo";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import HttpRequests from "../httpRequests/httpRequests";
import { getFromCart } from "../localStore/localStore";

const httpRequests = new HttpRequests();

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);

  const cartItems = useSelector(getFromCart);
  useEffect(() => {
    httpRequests
      .getProducts()
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log("error? ", error);
      });
  }, []);

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={{ width: "20%" }}>
          <TouchableOpacity
            style={styles.myDrawerButton}
            onPress={() => navigation.openDrawer()}
          >
            <EntypoIcons name="menu" size={35} color="orange" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "75%",
            position: "relative",
            justifyContent: "center",
          }}
        >
          <TextInput
            style={styles.mySearch}
            placeholder="მოძებნე პროდუქტი"
            onChangeText={(text) => setSearchText(text)}
          />
          <Ionicons
            name="search"
            size={20}
            color="orange"
            style={{ position: "absolute", left: 10 }}
          />
        </View>
      </View>
      <FlatList
        data={products.filter((product) =>
          product?.title
            ?.toLocaleLowerCase()
            ?.includes(searchText?.toLocaleLowerCase())
        )}
        keyExtractor={(item) => item.id}
        style={{ paddingHorizontal: 20, paddingTop: 20 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("ProductDetails", { product: item });
            }}
          >
            <View
              style={{
                marginBottom: 30,
                position: "relative",
              }}
            >
              <Image
                source={{
                  uri: item.thumbnail,
                }}
                style={{ width: "100%", height: 300, borderRadius: 8 }}
              />
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  backgroundColor: "black",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "white", fontSize: 22 }}>
                  {item.title}
                </Text>
                <Text style={{ color: "white", fontSize: 18 }}>
                  ფასი - {item.price}ლ
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />

      <View style={{ position: "absolute", right: 20, bottom: 40 }}>
        <TouchableOpacity
          style={{
            borderRadius: 35,
            width: 70,
            height: 70,
            backgroundColor: "orange",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,

            justifyContent: "center",
            alignItems: "center",
          }}

          onPress={() => {
            Notifications.scheduleNotificationAsync({
              content: {
                title: 'Look at that notification',
                body: "I'm so proud of myself!",
              },
              trigger: null,
            });
          }}
        >
          {cartItems.length > 0 && (
            <View
              style={{
                position: "absolute",
                left: -2.5,
                top: -2.5,
                backgroundColor: "red",
                width: 25,
                height: 25,
                borderRadius: 12.5,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {cartItems?.length }
              </Text>
            </View>
          )}

          <FontAwesomeIcons name="shopping-cart" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mySearch: {
    paddingLeft: 35,
    paddingRight: 10,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 8,
  },
  myDrawerButton: {
    backgroundColor: "white",
    borderRadius: 35,
    padding: 10,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
