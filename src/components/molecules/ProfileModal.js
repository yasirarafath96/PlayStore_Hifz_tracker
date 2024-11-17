import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AddStudentModal from "./AddStudentModal";

const ProfileModal = ({ visible, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(300));
  const [addStudentModalVisible, setAddStudentModalVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleSaveStudent = (studentName) => {
    console.log("Student Saved:", studentName);
    setAddStudentModalVisible(false);
  };

  const handleAddStudentPress = () => {
    setAddStudentModalVisible(true);
  };

  return (
    <>
      {visible && (
          <SafeAreaView style={styles.centeredView}>
            <Animated.View
              style={[
                styles.modalView,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalText}>Student</Text>
                <TouchableOpacity onPress={onClose}>
                  <Fontisto name="close-a" size={18} color="#FF6347" />
                </TouchableOpacity>
              </View>

              {/* Modal Items */}
              <TouchableOpacity
                style={styles.modalItem}
                onPress={handleAddStudentPress}
              >
                <FontAwesome6 name="add" size={20} color="#007BFF" />
                <Text style={styles.modalItemText}>Add Student</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalItem}
                onPress={onClose}
              >
                <Ionicons name="remove-outline" size={18} color="#FF6347" />
                <Text style={styles.modalItemText}>Remove Student</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalItem}
                onPress={onClose}
              >
                <FontAwesome name="exchange" size={20} color="#28A745" />
                <Text style={styles.modalItemText}>Switch Student</Text>
              </TouchableOpacity>
            </Animated.View>
          </SafeAreaView>
      )}

      {/* AddStudentModal */}
      <AddStudentModal
        visible={addStudentModalVisible}
        setAddStudentModalVisible={setAddStudentModalVisible}
        handleSaveStudent={handleSaveStudent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: 'transparent',
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: 300,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  modalItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
});

export default ProfileModal;
