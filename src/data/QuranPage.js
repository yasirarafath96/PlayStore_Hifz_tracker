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

const QuranPage = ({pageNumber}) => {
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAyahs = async () => {
      try {
        const response = await axios.get(
          `http://api.alquran.cloud/v1/page/${pageNumber}/en.asad`
        );
        setAyahs(response.data.data.ayahs);
      } catch (error) {
        console.error("Error fetching Ayah data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAyahs();
  }, []);

  const renderAyah = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.ayahNumber}>Ayah {item.numberInSurah}</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detail}>Juz: {item.juz}</Text>
        <Text style={styles.detail}>Manzil: {item.manzil}</Text>
        <Text style={styles.detail}>Page: {item.page}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detail}>Ruku: {item.ruku}</Text>
        <Text style={styles.detail}>Hizb Quarter: {item.hizbQuarter}</Text>
      </View>
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
        data={ayahs}
        renderItem={renderAyah}
        keyExtractor={(item) => item.number.toString()}
      />
    </SafeAreaView>
  );
};

export default QuranPage;

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
  ayahNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  arabicText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 5,
  },
  englishText: {
    fontSize: 16,
    marginTop: 5,
    fontStyle: "italic",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  detail: {
    fontSize: 14,
    color: "#555",
  },
});
