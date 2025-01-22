import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DataTable } from "react-native-paper";
import axios from "axios";

const UpdateRevision = () => {
  const [filterPara, setFilterPara] = useState();
  const [surahs, setSurahs] = useState([]);
  const [selectedMistake, setSelectedMistake] = useState({});
  const [sortDirection, setSortDirection] = useState("ascending");
  const [page, setPage] = useState(0);
  const numberOfItemsPerPageList = [8, 10];
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(
    numberOfItemsPerPageList[0]
  );

  const sortedData = [...surahs].sort((a, b) =>
    sortDirection === "ascending" ? a.page - b.page : b.page - a.page
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, sortedData.length);
  const paginatedData = sortedData.slice(from, to);

  const handleParaChange = (paraNumber) => {
    setFilterPara(paraNumber);
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) =>
      prev === "ascending" ? "descending" : "ascending"
    );
  };

  const handlePickerChange = async (itemId, value) => {
    try {
      setSelectedMistake((prev) => ({ ...prev, [itemId]: value }));

      const selectedItem = paginatedData.find((item) => item._id === itemId);
      if (!selectedItem) {
        console.error("Item not found for the given ID:", itemId);
        return;
      }

      const pageNumber = selectedItem.page;
      const response = await axios.patch(
        `http://192.168.31.181:5000/api/revision/${pageNumber}`,
        { mistakes: value }
      );

      if (response.status === 200) {
        console.log(`Mistakes updated for page ${pageNumber}`);
      }
    } catch (error) {
      console.error("Error updating mistakes:", error);
    }
  };
  useEffect(() => {
    if (filterPara) {
    }
  }, [filterPara]);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  useEffect(() => {
    // GetRevision();
    GetOneParaRevision();
  }, [filterPara]);

  const GetRevision = async () => {
    try {
      const response = await axios.get(
        "http://192.168.31.181:5000/api/revision"
      );
      if (response.status == 200) {
        console.log("response", response.data.data);
        const allData = response.data.data;
        const filterData = allData.filter((item) => item.juzz === 1);
        console.log("filterData", filterData);
        setSurahs(filterData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetOneParaRevision = async () => {
    try {
      const response = await axios.get(
        `http://192.168.31.181:5000/api/revision/${filterPara}`
      );
      const allData = response.data.data;
      setSurahs(allData);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ paddingVertical: 5 }}>
          <Text style={{ fontSize: 14, fontWeight: "500" }}>Select Juzz</Text>
        </View>
        <Picker
          selectedValue={filterPara}
          onValueChange={(para) => handleParaChange(para)}
          style={styles.picker}
        >
          {[...Array(30).keys()].map((i) => (
            <Picker.Item
              key={i + 1}
              label={`Para ${i + 1}`}
              value={i + 1}
              color={filterPara === i + 1 ? "#007BFF" : "#000"}
              style={{ fontSize: 14 }}
            />
          ))}
        </Picker>

        <View style={{ paddingVertical: 5 }}>
          {filterPara ? (
            <Text style={{ fontSize: 14, fontWeight: "500" }}>
              Selected Juzz: {filterPara}
            </Text>
          ) : null}
        </View>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title
              sortDirection={sortDirection}
              onPress={toggleSortDirection}
            >
              Juzz {filterPara}
            </DataTable.Title>
          </DataTable.Header>

          <DataTable.Header>
            <DataTable.Title numeric style={{ flex: 1 }}>
              Surah
            </DataTable.Title>
            <DataTable.Title numeric style={{ flex: 1 }}>
              Page
            </DataTable.Title>
            <DataTable.Title numeric style={{ flex: 2 }}>
              Mistakes
            </DataTable.Title>
          </DataTable.Header>

          {paginatedData.map((item, index) => (
            <DataTable.Row key={item._id}>
              <DataTable.Cell numeric style={{ flex: 1 }}>
                {item.surahName}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1 }}>
                {item.page}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 2 }}>
                <Picker
                  selectedValue={selectedMistake[item._id] ?? item.mistakes}
                  onValueChange={(value) => handlePickerChange(item._id, value)}
                  style={{
                    height: 40,
                    width: 100,
                    color:
                      (selectedMistake[item._id] ?? item.mistakes) === "3"
                        ? "red"
                        : (selectedMistake[item._id] ?? item.mistakes) === "2"
                        ? "orange"
                        : "green",
                  }}
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                </Picker>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(surahs.length / numberOfItemsPerPage)}
            onPageChange={(newPage) => setPage(newPage)}
            label={`${from + 1}-${to} of ${surahs.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={setNumberOfItemsPerPage}
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  picker: {
    height: 40,
    width: "60%",
    marginBottom: 10,
    backgroundColor: "white",
  },
});

export default UpdateRevision;
