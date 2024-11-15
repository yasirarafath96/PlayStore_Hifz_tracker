import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    const fetchSurahs = async () => {
      try {
        const response = await axios.get("https://api.alquran.cloud/v1/surah");
        setSurahs(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching Surah data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  // Render each item in the FlatList
  const renderSurah = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.englishName}>{item.englishName}</Text>
      <Text>Number of Ayahs: {item.numberOfAyahs}</Text>
      <Text>Revelation Type: {item.revelationType}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={surahs}
        renderItem={renderSurah}
        keyExtractor={(item) => item.number.toString()}
      />
    </SafeAreaView>
  );
};

export default SurahList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
  },
  englishName: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 5,
  },
});
