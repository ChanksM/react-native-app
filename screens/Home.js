import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EntypoIcons from 'react-native-vector-icons/Entypo';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        gap: 10,
        flexDirection: "row",
      }}
    >
      <View style={{ width: "20%", backgroundColor: "yellow" }}>
        <TouchableOpacity
          style={styles.myDrawerButton}
          onPress={() => navigation.openDrawer()}
        >
          <EntypoIcons name="menu" size={35} color={'red'} />
        </TouchableOpacity>
      </View>
      <View style={{ width: "80%", backgroundColor: "red" }}>
        <Text>Mushni</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  myDrawerButton: {
    backgroundColor: 'white',
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
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
  },
});
