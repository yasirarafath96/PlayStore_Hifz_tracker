import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";

const ResetProgress = () => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    GetProduct();
    GetRevision();
  }, []);

  const GetProduct = async () => {
    try {
      const response = await axios.get("http://192.168.31.181:5000/api/result");
      console.log("response", response.status);
    } catch (error) {
      console.log("error", error);
    }
  };

  const GetRevision = async () => {
    try {
      const response = await axios.get(
        "http://192.168.31.181:5000/api/revision"
      );
      if (response.status == 200) {
        console.log("response", response.data.data);
        const allData = response.data.data;
        const filterData = allData.filter((item) => item.juzz === 30);
        console.log("filterData", filterData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetProgress = () => {
    console.log("Progress reset!");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Reset Progress</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to reset your progress?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleResetProgress}
                style={styles.confirmButton}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ResetProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#28A745",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
});
