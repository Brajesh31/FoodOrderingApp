import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function OrderSummaryScreen({ navigation }) {
  const { cart, getTotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const submitOrder = async () => {
    setSubmitting(true);
    try {
      const db = getFirestore();
      await addDoc(collection(db, "orders"), {
        items: cart,
        total: getTotal(),
        timestamp: new Date().toISOString(),
        status: "pending",
      });

      clearCart();

      Alert.alert(
        "Order Placed Successfully! 🎉",
        "Thank you for your order. Your food is being prepared and will be delivered soon.",
        [
          {
            text: "Continue Shopping",
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Menu" }],
              }),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Order Failed",
        "We couldn't process your order. Please try again.",
        [{ text: "OK", style: "cancel" }]
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderOrderItem = (item) => (
    <View key={item.id} style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>×{item.quantity}</Text>
      </View>

      <View style={styles.itemDetails}>
        <Text style={styles.itemPrice}>
          ₹{item.price.toFixed(2)}
          <Text style={styles.perUnit}> / unit</Text>
        </Text>
        <Text style={styles.itemTotal}>
          ₹{(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Order Summary</Text>
          <Text style={styles.subtitle}>Please review your order</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {cart.map(renderOrderItem)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Items Total</Text>
            <Text style={styles.priceValue}>₹{getTotal().toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Fee</Text>
            <Text style={styles.priceValue}>₹0.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalAmount}>₹{getTotal().toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          <Text style={styles.deliveryInfo}>
            Estimated delivery time: 30-45 minutes
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitOrder}
          disabled={submitting}
        >
          <LinearGradient
            colors={["#4CAF50", "#2E7D32"]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Text style={styles.submitText}>Place Order</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  itemCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginLeft: 8,
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
  },
  perUnit: {
    fontSize: 12,
    color: "#999",
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 15,
    color: "#666",
  },
  priceValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4CAF50",
  },
  deliveryInfo: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  submitButton: {
    overflow: "hidden",
    borderRadius: 12,
  },
  gradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 8,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
