import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

export default function MenuItem({ item }) {
  const { addToCart } = useCart();

  const renderBadges = () => (
    <View style={styles.badgeContainer}>
      {item.isSpicy && (
        <View style={styles.badge}>
          <Ionicons name="flame" size={10} color="#FF4B3A" />
        </View>
      )}
      {item.isVegetarian && (
        <View
          style={[styles.badge, { backgroundColor: "rgba(76, 175, 80, 0.1)" }]}
        >
          <Ionicons name="leaf" size={10} color="#4CAF50" />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {renderBadges()}
      </View>

      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {item.name}
        </Text>

        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item)}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 120,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badgeContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    gap: 4,
  },
  badge: {
    backgroundColor: "rgba(255, 75, 58, 0.1)",
    padding: 4,
    borderRadius: 4,
  },
  contentContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
    marginBottom: 8,
    height: 32, // Fixed height for 2 lines
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF4B3A",
  },
  addButton: {
    backgroundColor: "#FF4B3A",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
