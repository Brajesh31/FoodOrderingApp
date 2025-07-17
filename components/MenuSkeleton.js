// components/MenuSkeleton.js
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Animated, Platform } from "react-native";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 48) / 2;

const SkeletonPlaceholder = ({ style }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return <Animated.View style={[styles.skeleton, style, { opacity }]} />;
};

export const MenuSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Specials Section Skeleton */}
      <View style={styles.specialsSection}>
        <SkeletonPlaceholder style={styles.sectionTitleSkeleton} />
        <View style={styles.specialCard}>
          <SkeletonPlaceholder style={styles.specialImageSkeleton} />
          <View style={styles.specialContent}>
            <SkeletonPlaceholder style={styles.specialNameSkeleton} />
            <SkeletonPlaceholder style={styles.specialDescriptionSkeleton} />
            <SkeletonPlaceholder style={styles.specialPriceSkeleton} />
          </View>
        </View>
      </View>

      {/* Search Bar Skeleton */}
      <View style={styles.searchContainer}>
        <SkeletonPlaceholder style={styles.searchSkeleton} />
      </View>

      {/* Categories Skeleton */}
      <View style={styles.categoriesContainer}>
        <View style={styles.categoryRow}>
          {[...Array(4)].map((_, index) => (
            <SkeletonPlaceholder
              key={`category-${index}`}
              style={styles.categorySkeleton}
            />
          ))}
        </View>
      </View>

      {/* Menu Title Skeleton */}
      <SkeletonPlaceholder style={styles.menuTitleSkeleton} />

      {/* Menu Items Grid Skeleton */}
      <View style={styles.menuGrid}>
        {[...Array(6)].map((_, index) => (
          <View
            key={`menu-item-${index}`}
            style={[
              styles.menuItemSkeleton,
              index % 2 === 0 ? styles.leftColumn : styles.rightColumn,
            ]}
          >
            <SkeletonPlaceholder style={styles.menuItemImageSkeleton} />
            <SkeletonPlaceholder style={styles.menuItemNameSkeleton} />
            <SkeletonPlaceholder style={styles.menuItemDescriptionSkeleton} />
            <SkeletonPlaceholder style={styles.menuItemPriceSkeleton} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  skeleton: {
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
  },
  specialsSection: {
    marginBottom: 24,
    padding: 16,
  },
  sectionTitleSkeleton: {
    width: 150,
    height: 24,
    marginBottom: 16,
  },
  specialCard: {
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
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
  specialImageSkeleton: {
    width: "100%",
    height: 200,
    borderRadius: 0,
  },
  specialContent: {
    padding: 16,
  },
  specialNameSkeleton: {
    width: "70%",
    height: 24,
    marginBottom: 8,
  },
  specialDescriptionSkeleton: {
    width: "100%",
    height: 16,
    marginBottom: 8,
  },
  specialPriceSkeleton: {
    width: "40%",
    height: 20,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchSkeleton: {
    width: "100%",
    height: 40,
    borderRadius: 8,
  },
  categoriesContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  categorySkeleton: {
    width: 80,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  menuTitleSkeleton: {
    width: 120,
    height: 24,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
  menuItemSkeleton: {
    width: COLUMN_WIDTH,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
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
  leftColumn: {
    marginRight: 16,
  },
  rightColumn: {
    marginLeft: 0,
  },
  menuItemImageSkeleton: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  menuItemNameSkeleton: {
    width: "80%",
    height: 20,
    marginBottom: 8,
  },
  menuItemDescriptionSkeleton: {
    width: "100%",
    height: 16,
    marginBottom: 8,
  },
  menuItemPriceSkeleton: {
    width: "40%",
    height: 20,
  },
});
