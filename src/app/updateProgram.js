import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import SurahList from "../data/SurahList";
import QuranPage from "../data/QuranPage";

const UpdateProgram = () => {
  const [pageNumber, setPageNumber] = useState("1");
  const [selectedPage, setSelectedPage] = useState(null);

  const handleShowPage = () => {
    if (!pageNumber || isNaN(pageNumber) || pageNumber < 1 || pageNumber > 604) {
      alert("Please enter a valid page number (1-604).");
      return;
    }
    setSelectedPage(pageNumber); 
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Page Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Page Number:</Text>
        <TextInput
          mode="outlined"
          placeholder="Enter a page number (1-604)"
          keyboardType="numeric"
          value={pageNumber}
          onChangeText={(text) => setPageNumber(text)}
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleShowPage}>
          <Text style={styles.buttonText}>Show Page</Text>
        </TouchableOpacity>
      </View>

      {/* Surah List */}
      <SurahList />

      {/* Quran Page */}
      {selectedPage && <QuranPage pageNumber={selectedPage} />}
    </SafeAreaView>
  );
};

export default UpdateProgram;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textInput: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
