import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import pages from "../../constants/pages.json";
import rukus from "../../constants/rukus.json";
import surah from "../..//constants/surah.json";
import { TextInput } from "react-native-paper";

const UpdateProgram = () => {
  const [selectedPara, setSelectedPara] = useState(1);
  const [page, setPage] = useState(1);

  const totalPages = pages.length;
  const PageDetail = pages[page - 1];

  console.log("totalPages -> ", totalPages);
  console.log("page", page);
  console.log("specific page", PageDetail);

  const pageSurah = pages.at(page - 1).surah;
  const pageStartAyat = pages.at(page - 1).ayah;

  console.log("Surah in Page", pageSurah);
  console.log("pageStartAyat", pageStartAyat);

  const surahNumber = surah[pageSurah - 1].number;
  const surahName = surah[pageSurah - 1].englishName;
  const surahAyats = surah[pageSurah - 1].numberOfAyahs;  

  console.log("surahNumber", surahNumber)
  console.log("surahName", surahName)
  console.log("Number of Ayats in Surah", surahAyats)

  const nextPage = page + 1;
  const nextPageStartAyat = pages.at(page).ayah;

  console.log("nextPage", nextPage)
  console.log("nextPageStartAyat", nextPageStartAyat)

  const numberOfAyatsInPage = (page, pageStartAyat) => {
    let currentPage = page;
    let nextPage = currentPage + 1;
    const numberofPages = nextPage - currentPage;
  }

  // console.log("selectedPara ",selectedPara)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Page: </Text>
        <TextInput
          onChangeText={(e) => setPage(e)}
          value={page}
          keyboardType="numeric"
        />
        <Text>Page {page} surah : {pageSurah}</Text>
        <Text>Page {page} Ayat Start: {pageStartAyat}</Text>
        <Text>Page {page}</Text>

        <Text>surah Number: {surahNumber}</Text>
        <Text>Surah Name: {surahName}</Text>
        <Text>Number of Ayats in Surah: {surahAyats}</Text>

        <Text>Next Page: {nextPage}</Text>

        <Text style={styles.label}>Select Para:</Text>
        <Picker
          selectedValue={selectedPara}
          onValueChange={(itemValue) => setSelectedPara(itemValue)}
          style={styles.picker}
        >
          {Array.from({ length: 30 }, (_, index) => (
            <Picker.Item
              key={index}
              label={`Para ${index + 1}`}
              value={index}
              color={selectedPara === index ? "#007BFF" : "#000"}
            />
          ))}
        </Picker>

        {/* Display selected Para */}
        {selectedPara !== null && (
          <View style={styles.selectionContainer}>
            <Text style={styles.selectedText}>
              Selected Para:{" "}
              <Text style={styles.bold}>Para {selectedPara + 1}</Text>
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UpdateProgram;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    height: 70,
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  selectionContainer: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 5,
    elevation: 2,
  },
  selectedText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
    color: "#007BFF",
  },
});
