import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { setToCart } from "../localStore/localStore";

const ProductDetails = (props) => {
  const route = useRoute();

  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();

  const addToCart = () => {
    const productInfo = {...route.params.product, amount};
    dispatch(setToCart(productInfo));
  }

  return (
    <ScrollView>
      <View
        style={{
          marginBottom: 30,
          position: "relative",
          margin: 30,
        }}
      >
        <Image
          source={{
            uri: route.params.product.thumbnail,
          }}
          style={{
            width: "100%",
            height: 300,
            borderRadius: 8,
            marginBottom: 20,
          }}
        />
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            backgroundColor: "black",
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 22 }}>
            {route.params.product.title}
          </Text>
          <Text style={{ color: "white", fontSize: 18 }}>
            ფასი - {route.params.product.price}ლ
          </Text>
        </View>

        <View>
          <Text style={{ marginBottom: 20 }}>{route.params.product.title}</Text>
          <Text style={{ marginBottom: 20 }}>
            {route.params.product.description}
          </Text>
          {/* აქ წავა საჭირო დეტალები */}
        </View>

        <ScrollView horizontal style={{ marginBottom: 30 }}>
          {route.params.product.images.map((image, index) => (
            <Image
              key={index}
              source={{
                uri: image,
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 8,
                marginHorizontal: 10,
              }}
            />
          ))}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 30,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => amount > 1 && setAmount(amount - 1)}
            style={{
              backgroundColor: "red",
              width: 60,
              height: 60,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 40 }}>-</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 40 }}>{amount}</Text>
          <TouchableOpacity
            onPress={() =>
              amount < route.params.product.stock && setAmount(amount + 1)
            }
            style={{
              backgroundColor: "green",
              width: 60,
              height: 60,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 40 }}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 20, marginBottom: 30, textAlign: 'center' }}>
          Total: {route.params.product.price * amount}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "green",
            padding: 10,
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 10,
          }}
          onPress={() => {
            addToCart();
          }}
        >
            <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
