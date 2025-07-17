// CartItem.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const scaleValue = new Animated.Value(1);

  const animatePress = () => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleIncrement = () => {
    animatePress();
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    animatePress();
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleValue }] }]}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity
            onPress={() => removeFromCart(item.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close-circle" size={24} color="#ff4444" />
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>
          ₹{(item.price * item.quantity).toFixed(2)}
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={handleDecrement}
            style={styles.quantityButton}
          >
            <Ionicons name="remove-circle-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>

          <View style={styles.quantityWrapper}>
            <Text style={styles.quantity}>{item.quantity}</Text>
          </View>

          <TouchableOpacity
            onPress={handleIncrement}
            style={styles.quantityButton}
          >
            <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 18,
    color: "#4CAF50",
    fontWeight: "700",
    marginVertical: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  quantityButton: {
    padding: 8,
  },
  quantityWrapper: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 48,
    alignItems: "center",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default CartItem;
