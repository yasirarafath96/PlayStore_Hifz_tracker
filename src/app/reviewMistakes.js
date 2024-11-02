import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

const ReviewMistakes = () => {
  // Sample data for the table
  const data = [
    { juzz: '1', surah: 'Al-Fatiha', pageNumber: 1, mistakes: 2 },
    { juzz: '2', surah: 'Al-Baqarah', pageNumber: 2, mistakes: 3 },
    { juzz: '3', surah: 'Al-Imran', pageNumber: 3, mistakes: 1 },
    { juzz: '4', surah: 'An-Nisa', pageNumber: 4, mistakes: 0 },
    { juzz: '5', surah: 'Al-Ma\'idah', pageNumber: 5, mistakes: 4 },
    // Add more data as needed
  ];

  // Filter out entries with 0 mistakes and sort by mistakes in descending order
  const filteredData = data
    .filter(item => item.mistakes > 0)
    .sort((a, b) => b.mistakes - a.mistakes);

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.juzz}</Text>
      <Text style={styles.tableCell}>{item.surah}</Text>
      <Text style={styles.tableCell}>{item.pageNumber}</Text>
      <Text style={styles.tableCell}>{item.mistakes}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Juzz</Text>
        <Text style={styles.headerCell}>Surah</Text>
        <Text style={styles.headerCell}>Page Number</Text>
        <Text style={styles.headerCell}>Mistakes</Text>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.juzz}
      />
    </View>
  );
};

export default ReviewMistakes;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
});
