// components/CartButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

const CartButton = () => {
  const navigation = useNavigation();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Cart")}
    >
      <Ionicons name="cart" size={24} color="white" />
      <Text style={styles.text}>View Cart</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{totalItems}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2ecc71",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  badge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#e74c3c",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 6,
  },
});

export default CartButton;
