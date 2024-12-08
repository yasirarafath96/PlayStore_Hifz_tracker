import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import pages from "../../constants/pages.json";
import rukus from "../../constants/rukus.json";
import surah from "../..//constants/surah.json";
import juzzs from "../../constants/juzzs.json";
import Surahinpara from "../../constants/SurahInPara.json";
import { Button, TextInput } from "react-native-paper";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateProgram = () => {
  const [page, setPage] = useState();
  const [filterPara, setFilterPara] = useState();
  const [paraPercent, setParaPercent] = useState();
  const [overallPercent, setOverallPercent] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const data = [
    { para: 1, pages: 20 },
    { para: 2, pages: 22 },
    { para: 3, pages: 24 },
    { para: 4, pages: 26 },
    { para: 5, pages: 24 },
    { para: 6, pages: 24 },
    { para: 7, pages: 26 },
    { para: 8, pages: 24 },
    { para: 9, pages: 26 },
    { para: 10, pages: 22 },
    { para: 11, pages: 24 },
    { para: 12, pages: 24 },
    { para: 13, pages: 24 },
    { para: 14, pages: 24 },
    { para: 15, pages: 24 },
    { para: 16, pages: 24 },
    { para: 17, pages: 24 },
    { para: 18, pages: 24 },
    { para: 19, pages: 24 },
    { para: 20, pages: 26 },
    { para: 21, pages: 24 },
    { para: 22, pages: 24 },
    { para: 23, pages: 24 },
    { para: 24, pages: 24 },
    { para: 25, pages: 24 },
    { para: 26, pages: 24 },
    { para: 27, pages: 24 },
    { para: 28, pages: 24 },
    { para: 29, pages: 24 },
    { para: 30, pages: 26 },
  ];

  const [selectedSurah, setSelectedSurah] = useState(null);
  const [PagesofSelectedSurah, setPagesofSelectedSurah] = useState([]);

  const [filterSurah, setFilterSurah] = useState([]);
  const [filterPage, setFilterPage] = useState();

  const totalPages = pages.length;
  const PageDetail = pages[page - 1];

  // console.log("totalPages -> ", totalPages);
  // console.log("specific page", PageDetail);

  const currentPage = Number(page);

  const pageSurah = pages.at(page - 1)?.surah;
  const pageStartAyat = pages.at(page - 1)?.ayah;

  // console.log("Surah in Page", pageSurah);
  // console.log("pageStartAyat", pageStartAyat);

  const surahNumber = surah[pageSurah - 1]?.number;
  const surahName = surah[pageSurah - 1]?.englishName;
  const surahAyats = surah[pageSurah - 1]?.numberOfAyahs;

  // console.log("surahNumber", surahNumber);
  // console.log("surahName", surahName);
  // console.log("Number of Ayats in Surah", surahAyats);

  const nextPage = currentPage + 1;
  const nextPageStartAyat = pages.at(currentPage)?.ayah;

  // console.log("nextPage", nextPage);
  // console.log("nextPageStartAyat", nextPageStartAyat);

  const totalJuzzs = juzzs.length;
  const juzzStartSurah = juzzs[0].surah;
  const juzzStartAyat = juzzs[0].ayah;

  // console.log("totalJuzzs", totalJuzzs);
  // console.log("juzzStartSurah , juzzStartAyat", juzzStartSurah, juzzStartAyat);
  console.log("filtered Para ----------", filterPara);
  console.log("page -----------", page);
  // console.log("Surahinpara", Surahinpara.paras[filterPara]);

  // console.log(
  //   "Juzz->",
  //   juzzs.length,
  //   "  details-> surah",
  //   juzzs[2].surah,
  //   "ayat",
  //   juzzs[2].ayah
  // );

  const handleParaChange = (paraNumber) => {
    setFilterPara(paraNumber);
  };

  useEffect(() => {
    const allPages = Array.from({ length: 604 }, (_, index) => ({
      pageNumber: index + 1,
      description: `Page ${index + 1}`,
    }));
    setPagesofSelectedSurah(allPages);
  }, []);

  const storeData = async (dataObject) => {
    try {
      const jsonData = JSON.stringify(dataObject); // Convert object to string
      await AsyncStorage.setItem(`student_${1}`, jsonData);
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`student_${1}`);
      if (jsonData) {
        const dataObject = JSON.parse(jsonData);
        // console.log("Retrieved data:", dataObject);
        return dataObject;
      } else {
        console.log("No data found");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  const saveData = async (dataObject) => {
    if (!dataObject) {
      console.error("No data provided to save.");
      return;
    }
    await storeData(dataObject);
  };

  const loadData = async () => {
    const data = await getData();
    console.log("Loaded Data:", data);
  };

  // console.log("pages is para", data.at(filterPara).pages)

  const calculatePercentage = () => {
    const currentParaData = data[filterPara - 1];
    const totalPagesRead = parseInt(page, 10) || 0;

    if (currentParaData) {
      const paraTotalPages = currentParaData.pages;

      const paraPercentage = Math.min(
        (totalPagesRead / paraTotalPages) * 100,
        100
      ).toFixed(2);
      setParaPercent(paraPercentage);

      const totalPagesInQuran = data.reduce((sum, para) => sum + para.pages, 0);
      const overallPagesRead =
        data
          .slice(0, filterPara - 1)
          .reduce((sum, para) => sum + para.pages, 0) + totalPagesRead;
      const overallPercentage = Math.min(
        (overallPagesRead / totalPagesInQuran) * 100,
        100
      ).toFixed(2);
      setOverallPercent(overallPercentage);

      console.log(`Para ${filterPara} Percentage: ${paraPercentage}%`);
      console.log(`Overall Percentage: ${overallPercentage}%`);
    } else {
      console.error("Invalid para data or filterPara");
    }
  };

  const AddPage = () => {
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    setStartDate(now);
    calculatePercentage();
    const dataToSave = [
      {
        ActiveStudent: '1'
      },
      {
      id: 1,
      name: "User",
      current: {
        currentPara: filterPara,
        currentParaPages: page,
        currentParaPercent: paraPercent,
        startDate: startDate,
        endDate: endDate,
      },
      overAll: {
        totalParaCompleted: 0,
        overAllPercent: overallPercent
      }
    }, {
      id: 2,
      name: "Noman",
      current: {
        currentPara: filterPara,
        currentParaPages: page,
        currentParaPercent: paraPercent,
        startDate: startDate,
        endDate: endDate,
      },
      overAll: {
        totalParaCompleted: 0,
        overAllPercent: overallPercent
      }
    }];
    saveData(dataToSave);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => saveData()}>
            <Text>Store</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => loadData()}>
            <Text>Retrieve</Text>
          </TouchableOpacity>
          <Picker
            selectedValue={filterPara}
            onValueChange={(para) => handleParaChange(para)}
            style={styles.picker}
          >
            {juzzs.map((juzz, index) => {
              const paraValue = index + 1;
              return (
                <Picker.Item
                  key={paraValue}
                  label={`Para ${paraValue}`}
                  value={paraValue}
                  color={filterPara === paraValue ? "#007BFF" : "#000"}
                />
              );
            })}
          </Picker>
          {/* <Text>Para {filterPara} contains {data.at(filterPara).pages}</Text> */}

          {/* <Picker
            selectedValue={selectedSurah}
            onValueChange={(surah) => setSelectedSurah(surah)}
            style={styles.picker}
          >
            {filterSurah.map((surah) => (
              <Picker.Item
                key={surah.number}
                label={surah.name}
                value={surah.number}
              />
            ))}
          </Picker>

          <Picker
            selectedValue={page}
            onValueChange={(itemValue) => setPage(itemValue)}
            style={styles.picker}
          >
            {PagesofSelectedSurah.map((pageData, index) => (
              <Picker.Item
                key={index}
                label={pageData.description}
                value={pageData.pageNumber}
              />
            ))}
          </Picker> */}

          {/* {selectedSurah !== null && (
            <View style={styles.selectionContainer}>
              <Text style={styles.selectedText}>
                Selected Surah:{"  "}
                <Text style={styles.bold}>
                  {surah.find((s) => s.number === selectedSurah)?.englishName ||
                    "Unknown"}
                </Text>
              </Text>
            </View>
          )} */}

          <View
            style={{
              width: "50%",
              backgroundColor: "#ACC8E5",
              paddingBottom: 10,
              marginTop: 10,
              paddingHorizontal: 10,
              paddingTop: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: "black", fontWeight: 500 }}>
              Enter Pages:{" "}
            </Text>
            <TextInput
              onChangeText={(text) => setPage(text)} // Update state with user input
              value={page?.toString() || ""} // Convert `page` to string for display
              keyboardType="numeric"
              style={{
                backgroundColor: "white",
                color: "black",
                marginVertical: 10,
              }}
            />
          </View>

          {page !== null && (
            <View style={styles.selectionContainer}>
              <Text style={styles.selectedText}>
                Selected Pages: <Text style={styles.bold}>{page}</Text>
              </Text>
            </View>
          )}
          {filterPara !== null && (
            <View style={styles.selectionContainer}>
              <Text style={styles.selectedText}>
                Selected Para:{"  "}
                <Text style={styles.bold}>Para {filterPara}</Text>
              </Text>
            </View>
          )}

          <View
            style={{
              width: "100%",
              paddingVertical: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                width: "50%",
                backgroundColor: "lightgreen",
              }}
              labelStyle={{
                color: "black",
              }}
              onPress={() => AddPage()}
            >
              <Text>Add Pages</Text>
            </Button>
          </View>

          {/* <Text style={styles.label}>
            Page {page} surah : {pageSurah}
          </Text>
          <Text style={styles.label}>
            Page {page} Ayat Start: {pageStartAyat}
          </Text>
          <Text style={styles.label}>Page {page}</Text>

          <Text style={styles.label}>surah Number: {surahNumber}</Text>
          <Text style={styles.label}>Surah Name: {surahName}</Text>
          <Text style={styles.label}>
            Number of Ayats in Surah: {surahAyats}
          </Text>

          <Text style={styles.label}>Next Page: {nextPage}</Text>

          <Text style={styles.label}>Select Para: {filterPara}</Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProgram;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    padding: 10,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  label: {
    fontSize: 14,
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
    height: 50,
    width: "50%",
    backgroundColor: "#ACC8E5",
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
    color: "#112A46",
  },
  selectionContainer: {
    marginTop: 10,
    backgroundColor: "#C6DAF0",
    padding: 10,
    paddingVertical: 15,
    borderRadius: 5,
    elevation: 2,
    width: "60%",
  },
  selectedText: {
    fontSize: 14,
  },
  bold: {
    fontWeight: "bold",
    // color: "#007BFF",
    color: "#0D1804",
  },
});
