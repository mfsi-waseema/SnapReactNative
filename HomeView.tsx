import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Ensure correct imports
import SingleProductView from './SingleProductView'; // Correct default import
import GroupProductView from './GroupProductView';   // Correct default import

const HomeView = () => {
  const [showSingleProduct, setShowSingleProduct] = useState(false);
  const [showGroupProduct, setShowGroupProduct] = useState(false);

  const handleSingleProduct = () => {
    if (!showSingleProduct) {
      setShowSingleProduct(true);  // Show Single Product View
      setShowGroupProduct(false);  // Hide Group Product View if visible
    }
  };

  const handleGroupProduct = () => {
    if (!showGroupProduct) {
      setShowGroupProduct(true);  // Show Group Product View
      setShowSingleProduct(false);  // Hide Single Product View if visible
    }
  };

  return (
    <View style={styles.container}>
      {/* Content area */}
      <View style={styles.content}>
        {showSingleProduct && <SingleProductView />}
        {showGroupProduct && <GroupProductView />}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: showSingleProduct ? '#cccccc' : '#007bff' }, // Disabled color if active
          ]}
          onPress={handleSingleProduct}
          disabled={showSingleProduct} // Disable button once it's clicked
        >
          <Text style={styles.buttonText}>Single Product</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: showGroupProduct ? '#cccccc' : '#007bff' }, // Disabled color if active
          ]}
          onPress={handleGroupProduct}
          disabled={showGroupProduct} // Disable button once it's clicked
        >
          <Text style={styles.buttonText}>Group Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // To separate content and button container
  },
  content: {
    flex: 1, // Takes remaining space above the buttons
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row', // Side-by-side buttons
    justifyContent: 'space-around', // Space between buttons
    paddingHorizontal: 20,
    paddingBottom: 30, // Padding to keep space at the bottom
  },
  button: {
    padding: 15,
    borderRadius: 8,
    width: '45%',  // Ensure buttons have similar width
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeView;
