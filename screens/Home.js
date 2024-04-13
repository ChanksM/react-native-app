import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
} from "react-native";
import EntypoIcons from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import HttpRequests from "../httpRequests/httpRequests";

const httpRequests = new HttpRequests();

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    httpRequests
      .getProducts()
      .then((response) => {
        console.log("response? ", response.data.products.length);
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
          <TextInput style={styles.mySearch} placeholder="მოძებნე პროდუქტი" />
          <Ionicons
            name="search"
            size={20}
            color="orange"
            style={{ position: "absolute", left: 10 }}
          />
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        style={{ paddingHorizontal: 20, paddingTop: 20 }}
        renderItem={({ item }) => (
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
              <Text style={{ color: "white", fontSize: 22 }}>{item.title}</Text>
              <Text style={{ color: "white", fontSize: 18 }}>
                ფასი - {item.price}ლ
              </Text>
            </View>
          </View>
        )}
      />
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
