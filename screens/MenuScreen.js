import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  Platform,
} from "react-native";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import MenuItem from "../components/MenuItem";
import CartButton from "../components/CartButton";
import { MenuSkeleton } from "../components/MenuSkeleton";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 48) / 2;

const CATEGORIES = [
  "All",
  "Popular",
  "Starters",
  "Main Course",
  "Desserts",
  "Beverages",
];

const DAILY_SPECIALS = [
  {
    id: "1",
    name: "Weekend Special Pizza",
    description: "Fresh from our stone oven",
    price: 18.99,
    imageUrl: "https://images.unsplash.com/photo-1618213837799-25d5552820d3",
    discount: "20% OFF",
  },
  {
    id: "2",
    name: "Chef's Pasta",
    description: "Homemade sauce with fresh herbs",
    price: 16.99,
    imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    discount: "15% OFF",
  },
  {
    id: "3",
    name: "Grilled Chicken Platter",
    description: "24-hour marinated chicken",
    price: 21.99,
    imageUrl: "https://images.unsplash.com/photo-1597652096872-658bf24731ec",
    discount: "10% OFF",
  },
];

export default function MenuScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const startAutoScroll = () => {
    let scrollIndex = 0;
    const scroll = () => {
      if (flatListRef.current) {
        scrollIndex = (scrollIndex + 1) % DAILY_SPECIALS.length;
        flatListRef.current.scrollToIndex({
          index: scrollIndex,
          animated: true,
        });
      }
      setTimeout(scroll, 4000);
    };
    scroll();
  };

  const filterItems = () => {
    let filtered = [...menuItems];
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredItems(filtered);
  };

  useEffect(() => {
    fetchMenuItems();
    startAutoScroll();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchText, selectedCategory, menuItems]);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "menuItems"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setMenuItems(items);
      setFilteredItems(items);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <MenuSkeleton />;
  }

  const renderSpecialsCarousel = () => (
    <View style={styles.specialsSection}>
      <Text style={styles.sectionTitle}>Today's Specials</Text>
      <Animated.FlatList
        horizontal
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={DAILY_SPECIALS}
        keyExtractor={(item) => item.id}
        snapToInterval={width - 60}
        decelerationRate="fast"
        contentContainerStyle={styles.specialsContainer}
        renderItem={({ item }) => (
          <View style={styles.specialCard}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.specialImage}
              resizeMode="cover"
            />
            <View style={styles.overlay} />
            <View style={styles.specialContent}>
              <Text style={styles.specialName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.specialDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={styles.specialPrice}>
                ₹{item.price.toFixed(2)} {item.discount && `(${item.discount})`}
              </Text>
            </View>
          </View>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search-outline"
        size={20}
        color="#666"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for dishes..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#666"
      />
    </View>
  );

  const renderCategories = () => (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={CATEGORIES}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => setSelectedCategory(item)}
          style={[
            styles.categoryItem,
            selectedCategory === item && styles.selectedCategory,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item && styles.selectedCategoryText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
      style={styles.categoriesList}
    />
  );

  const renderMenuItem = ({ item, index }) => (
    <View
      style={[
        styles.menuItemContainer,
        index % 2 === 0 ? styles.leftColumn : styles.rightColumn,
      ]}
    >
      <MenuItem item={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        ListHeaderComponent={
          <>
            {renderSpecialsCarousel()}
            {renderSearchBar()}
            {renderCategories()}
            <Text style={styles.menuTitle}>Our Menu</Text>
          </>
        }
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuList}
      />
      <CartButton onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  specialsSection: {
    marginBottom: 24,
  },
  specialsContainer: {
    paddingHorizontal: 16,
  },
  specialCard: {
    width: width - 60,
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100%",
  },
  specialImage: {
    width: "100%",
    height: 200,
  },
  specialContent: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  specialName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  specialDescription: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
  specialPrice: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  categoriesList: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 3 ,},
    }),
  },
  selectedCategory: {
    backgroundColor: "#f36c3d",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 16,
    marginBottom: 16,
    color: "#333",
  },
  menuList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  menuItemContainer: {
    flex: 1,
    marginBottom: 16,
  },
  leftColumn: {
    marginRight: 8,
  },
  rightColumn: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 18,
    color: "#333",
  },
});
