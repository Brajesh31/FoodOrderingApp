// CartScreen.js
import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function CartScreen({ navigation }) {
  const { cart, getTotal } = useCart();

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color="#ddd" />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>
          Start shopping to add items to your cart
        </Text>
        <TouchableOpacity
          style={styles.continueShopping}
          onPress={() => navigation.navigate("Menu")}
        >
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.itemCount}>{cart.length} items</Text>
      </View>

      <FlatList
        data={cart}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{getTotal().toFixed(2)}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("OrderSummary")}>
          <LinearGradient
            colors={["#4CAF50", "#2E7D32"]}
            style={styles.checkoutButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  itemCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  continueShopping: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
  },
  continueShoppingText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    color: "#666",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  checkoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
