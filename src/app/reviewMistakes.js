import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewMistakes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefresing] = useState(false);

  useEffect(() => {
    GetRevision();
  }, []);

  const GetRevision = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://192.168.31.181:5000/api/revision"
      );
      if (response.status == 200) {
        console.log("response", response.status);
        setData(response.data.data);
      }
    } catch (error) {
      console.log("error get revison", error);
    }
    setLoading(false);
  };

  const filteredData = data.filter((item) => item.mistakes >= 1);
  const sortedData = filteredData.sort((a, b) => b.mistakes - a.mistakes);
  console.log("data", sortedData);

  const renderItem = ({ item }) => (
    <View style={styles.tableRow} key={item._id}>
      <Text style={styles.tableCell}>{item.juzz}</Text>
      <Text style={styles.tableCell}>{item.surahName}</Text>
      <Text style={styles.tableCell}>{item.page}</Text>
      <Text
        style={[
          styles.tableCell,
          {
            color:
              item.mistakes == 3
                ? "red"
                : item.mistakes == 2
                ? "orange"
                : "green",
          },
        ]}
      >
        {item.mistakes}
      </Text>
    </View>
  );

  const OnRefresh = async () => {
    setRefresing(true);
    try {
      const response = await axios.get(
        "http://192.168.31.181:5000/api/revision"
      );
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log("Error refreshing data:", error);
    } finally {
      setRefresing(false);
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (
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
            keyExtractor={(item) => item._id.toString()}
            ListEmptyComponent={<Text>No data available</Text>}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
            }
          />
        </View>
      )}
    </>
  );
};

export default ReviewMistakes;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "white",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginTop: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
});
