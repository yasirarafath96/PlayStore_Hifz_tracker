import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const UpdateRevision = () => {
  const [selectedJuz, setSelectedJuz] = useState("30");
  const [selectedSurah, setSelectedSurah] = useState("");
  const [selectedPage, setSelectedPage] = useState("");
  const [surahs, setSurahs] = useState([]);
  const [pages, setPages] = useState([]);
  const [data, setData] = useState([
    { surah: "Al-Fatiha", page: 1, mistakes: "0" },
  ]);

  const getDotColor = (mistakes) => {
    if (mistakes === "0") return "green";
    if (mistakes === "1" || mistakes === "2") return "orange";
    return "red";
  };

  const handleJuzChange = async (juz) => {
    setSelectedJuz(juz);
    setSelectedSurah("");
    setSelectedPage("");
    setSurahs([]);
    setPages([]);
    try {
      const response = await axios.get(
        `http://api.alquran.cloud/v1/juz/${juz}/en.asad`
      );
      const ayahs = response.data.data.ayahs;

      const uniqueSurahs = Array.from(
        new Set(ayahs.map((ayah) => ayah.surah.englishName))
      );
      setSurahs(uniqueSurahs);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch Surahs for the selected Juz.");
    }
  };

  const handleSurahChange = async (surah) => {
    setSelectedSurah(surah);
    setSelectedPage("");
    setPages([]);
    try {
      const response = await axios.get(
        `http://api.alquran.cloud/v1/juz/${selectedJuz}/en.asad`
      );
      const ayahs = response.data.data.ayahs;

      const filteredPages = Array.from(
        new Set(
          ayahs
            .filter((ayah) => ayah.surah.englishName === surah)
            .map((ayah) => ayah.page)
        )
      );
      setPages(filteredPages);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch pages for the selected Surah.");
    }
  };

  const handleAddRow = () => {
    if (!selectedJuz || !selectedSurah || !selectedPage) {
      Alert.alert("Error", "Please select Juz, Surah, and Page.");
      return;
    }

    const newRow = {
      surah: selectedSurah,
      page: parseInt(selectedPage),
      mistakes: "0", 
    };

    setData((prevData) => [...prevData, newRow]);
    Alert.alert("Success", "Record added successfully!");
  };

  const handleMistakeChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index].mistakes = value;
    setData(updatedData);
  };

  console.log(data)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Input Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Juz:</Text>
          <Picker
            selectedValue={selectedJuz}
            style={styles.picker}
            onValueChange={(itemValue) => handleJuzChange(itemValue)}
          >
            {Array.from({ length: 30 }, (_, i) => (
              <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
            ))}
          </Picker>

          {surahs.length > 0 && (
            <>
              <Text style={styles.label}>Select Surah:</Text>
              <Picker
                selectedValue={selectedSurah}
                style={styles.picker}
                onValueChange={(itemValue) => handleSurahChange(itemValue)}
              >
                {surahs.map((surah, index) => (
                  <Picker.Item key={index} label={surah} value={surah} />
                ))}
              </Picker>
            </>
          )}

          {pages.length > 0 && (
            <>
              <Text style={styles.label}>Select Page:</Text>
              <Picker
                selectedValue={selectedPage}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedPage(itemValue)}
              >
                {pages.map((page, index) => (
                  <Picker.Item key={index} label={`${page}`} value={`${page}`} />
                ))}
              </Picker>
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={handleAddRow}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Surah</Text>
            <Text style={styles.tableHeaderText}>Page</Text>
            <Text style={styles.tableHeaderText}># of Mistakes</Text>
          </View>
          {data.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.surah}</Text>
              <Text style={styles.tableCell}>{item.page}</Text>
              <View style={styles.mistakesContainer}>
                <Picker
                  selectedValue={item.mistakes}
                  style={styles.mistakesPicker}
                  onValueChange={(value) => handleMistakeChange(index, value)}
                >
                  <Picker.Item label="0" value="0" />
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                </Picker>
                <View
                  style={[styles.dot, { backgroundColor: getDotColor(item.mistakes) }]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateRevision;

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
  picker: {
    height: 50,
    width: "100%",
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
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  mistakesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
});
