import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const BarGraph = ({ progress }) => {
  // Ensure we have exactly 30 values, filling with zeros if necessary
  const paraData = Array.from({ length: 30 }, (_, index) => ({
    para: index + 1,
    value: progress[index] !== undefined ? Math.max(0, Math.min(100, progress[index])) : 0, // Clamp values between 0 and 100
  }));

  const renderItem = ({ item }) => {
    const barWidth = (item.value / 100) * screenWidth; // Calculate width based on percentage
    return (
      <View style={styles.barContainer}>
        <Text style={styles.paraText}>Para {item.para}</Text>
        <View style={styles.barWrapper}>
          <View style={[styles.bar, { width: barWidth }]}>
            <Text style={styles.valueText}>{item.value}%</Text>
          </View>
        </View>
      </View>
    );
  };

  // Create an array for percentage labels
  const percentageLabels = Array.from({ length: 10 }, (_, index) => (index + 1) * 10);

  return (
    <View style={styles.container}>
      <View style={styles.labelsContainer}>
      </View>
      <FlatList
        data={paraData}
        renderItem={renderItem}
        keyExtractor={(item) => item.para.toString()}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

export default BarGraph;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  labelText: {
    fontSize: 16,
    color: '#333',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  paraText: {
    width: '10%',
    textAlign: 'left',
    fontSize: 12,
    color: '#333',
  },
  barWrapper: {
    flex: 1,
    marginLeft: 3,
    width: 200,
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  bar: {
    height: 30, // Increased thickness
    backgroundColor: 'lightblue',
    borderRadius: 5,
    justifyContent: 'center', // Center the text inside the bar
    alignItems: 'center', // Center the text horizontally
  },
  valueText: {
    color: '#333',
    fontWeight: 'bold', // Make the percentage text bold
  },
});
