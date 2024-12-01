import React, { useEffect, useState } from "react";
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
import { TextInput } from "react-native-paper";
import { z } from 'zod';

const UpdateProgram = () => {
  const [page, setPage] = useState(1);

  const [selectedSurah, setSelectedSurah] = useState(null);
  const [PagesofSelectedSurah, setPagesofSelectedSurah] = useState([]);

  const [filterPara, setFilterPara] = useState();
  const [filterSurah, setFilterSurah] = useState();
  const [filterPage, setFilterPage] = useState();

  const totalPages = pages.length;
  const PageDetail = pages[page - 1];

  console.log("totalPages -> ", totalPages);
  console.log("page", page);
  console.log("specific page", PageDetail);

  const currentPage = Number(page);

  const pageSurah = pages.at(page - 1)?.surah;
  const pageStartAyat = pages.at(page - 1)?.ayah;

  console.log("Surah in Page", pageSurah);
  console.log("pageStartAyat", pageStartAyat);

  const surahNumber = surah[pageSurah - 1]?.number;
  const surahName = surah[pageSurah - 1]?.englishName;
  const surahAyats = surah[pageSurah - 1]?.numberOfAyahs;

  console.log("surahNumber", surahNumber);
  console.log("surahName", surahName);
  console.log("Number of Ayats in Surah", surahAyats);

  const nextPage = currentPage + 1;
  const nextPageStartAyat = pages.at(currentPage)?.ayah;

  console.log("nextPage", nextPage);
  console.log("nextPageStartAyat", nextPageStartAyat);

  const totalJuzzs = juzzs.length;
  const juzzStartSurah = juzzs[0].surah;
  const juzzStartAyat = juzzs[0].ayah;

  console.log("totalJuzzs", totalJuzzs);
  console.log("juzzStartSurah , juzzStartAyat", juzzStartSurah, juzzStartAyat);
  console.log("filterPara", filterPara)

  console.log("Juzz->", juzzs.length, "  details-> surah", juzzs[2].surah, "ayat", juzzs[2].ayah)

  const handleParaChange = (paraNumber) => {
    setFilterPara(paraNumber);
  
    const start = juzzs[paraNumber - 1];
    const end = juzzs[paraNumber] || { surah: 114, ayah: 6 };
  
    const filtered = surah.filter((s) => {
      const startsInPara =
        s.number === start.surah && s.numberOfAyahs >= start.ayah;
  
      const endsInPara =
        s.number === end.surah && s.numberOfAyahs <= end.ayah;
  
      const fullyInPara = s.number > start.surah && s.number < end.surah;
  
      return startsInPara || endsInPara || fullyInPara;
    });
  
    setFilterSurah(filtered);
    console.log("filtered", filtered)
  };
  

  const userSchema = z.object({
    page: z.number().min(1).max(604, 'page must be from 1 to 604')
  });

  useEffect(() => {
    const allPages = Array.from({ length: 604 }, (_, index) => ({
      pageNumber: index + 1,
      description: `Page ${index + 1}`,
    }));
    setPagesofSelectedSurah(allPages);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>

        <Picker
            selectedValue={filterPara}
            onValueChange={(para) => handleParaChange(para)}
            // onValueChange={(para) => {
            //   setFilterPara(para)
            // }}
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

          <Picker
            selectedValue={selectedSurah}
            onValueChange={(itemValue) => setSelectedSurah(itemValue)}
            style={styles.picker}
          >
            {surah.map((s, index) => (
              <Picker.Item
                key={index}
                label={`${s.englishName}`}
                value={s.number}
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
          </Picker>

          {filterPara !== null && (
            <View style={styles.selectionContainer}>
              <Text style={styles.selectedText}>
                Selected Para:{"  "}
                <Text style={styles.bold}>Para {filterPara}</Text>
              </Text>
            </View>
          )}

          {selectedSurah !== null && (
            <View style={styles.selectionContainer}>
              <Text style={styles.selectedText}>
                Selected Surah:{"  "}
                <Text style={styles.bold}>
                  {surah.find((s) => s.number === selectedSurah)?.englishName ||
                    "Unknown"}
                </Text>
              </Text>
            </View>
          )}

          {page !== null && (
            <View style={styles.selectionContainer}>
              <Text style={styles.selectedText}>
                Selected Page:  <Text style={styles.bold}>Page {page}</Text>
              </Text>
            </View>
          )}
          <Text>Page: </Text>
          <TextInput
            onChangeText={(e) => setPage(e)}
            value={page}
            keyboardType="numeric"
          />
          <Text style={styles.label}>
            Page {page} surah : {pageSurah}
          </Text>
          <Text style={styles.label}>
            Page {page} Ayat Start: {pageStartAyat}
          </Text>
          <Text style={styles.label}>Page {page}</Text>

          <Text style={styles.label}>surah Number: {surahNumber}</Text>
          <Text style={styles.label}>Surah Name: {surahName}</Text>
          <Text style={styles.label}>Number of Ayats in Surah: {surahAyats}</Text>

          <Text style={styles.label}>Next Page: {nextPage}</Text>

          <Text style={styles.label}>Select Para: {filterPara}</Text>
          
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
    color: '#112A46'
  },
  selectionContainer: {
    marginTop: 10,
    backgroundColor: "#C6DAF0",
    padding: 10,
    paddingVertical: 15,
    borderRadius: 5,
    elevation: 2,
    width: '70%'
  },
  selectedText: {
    fontSize: 14,
  },
  bold: {
    fontWeight: "bold",
    // color: "#007BFF",
    color: '#0D1804'
  },
});
