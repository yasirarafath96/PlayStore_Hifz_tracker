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
import AddStudent from "./AddStudentModal";
import RemoveStudent from "./RemoveStudent";
import SwitchStudent from "./SwitchStudentModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileModal = ({ visible, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(300));
  const [students, setStudents] = useState([]);
  const [activeStudent, setActiveStudent] = useState(null);
  const [addStudentModalVisible, setAddStudentModalVisible] = useState(false);
  const [removeStudentModalVisible, setRemoveStudentModalVisible] =
    useState(false);
  const [switchStudentModalVisible, setSwitchStudentModalVisible] =
    useState(false);

  useEffect(() => {
    getStudents();
  }, []);

  // const getStudents = async () => {
  //   try {
  //     const response = await AsyncStorage.getItem("students_list");
  //     const studentList = response
  //       ? JSON.parse(response)
  //       : [{ id: 1, student: "User", active: false }];
  //     setStudents(studentList);

  //     const active = studentList.find((s) => s.active);
  //     setActiveStudent(active ? active.student : null);
  //   } catch (error) {
  //     console.error("Error fetching students:", error);
  //   }
  // };

  const getStudents = async () => {
    try {
      const response = await axios.get("http://192.168.209.134:5001/");
      const studentList = response.data.length
        ? response.data
        : [{ id: 1, student: "User", active: false }];
      setStudents(studentList);

      const active = studentList.find((s) => s.active);
      setActiveStudent(active ? active.student : null);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveStudent = async (newStudent) => {
    try {
      const newStudentObject = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        student: newStudent,
        active: false,
      };

      const updatedStudents = [...students, newStudentObject];

      // const userData = { id: 1, name: studentName, acttive: true };
      // const response = await axios
      //   .post("http://192.168.209.134:5001/register", updatedStudents)
      //   .then((res) => console.log("response", res.data))
      //   .catch((err) => console.log(err));
      // console.log("Response:", response.data);

      await AsyncStorage.setItem(
        "students_list",
        JSON.stringify(updatedStudents)
      );

      setStudents(updatedStudents);
      setAddStudentModalVisible(false);
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

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

  const handleAddStudentPress = () => {
    setAddStudentModalVisible(true);
  };
  const handleRemoveStudentPress = () => {
    if (students.length > 1) {
      setRemoveStudentModalVisible(true); /// need to add Toast
    }
  };
  const handleSwitchStudentPress = () => {
    if (students.length > 1) {
      setSwitchStudentModalVisible(true); /// need to add toast
    }
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
              <Text style={styles.modalText}>{activeStudent}</Text>
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
              onPress={handleRemoveStudentPress}
            >
              <Ionicons name="remove-outline" size={18} color="#FF6347" />
              <Text style={styles.modalItemText}>Remove Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalItem}
              onPress={handleSwitchStudentPress}
            >
              <FontAwesome name="exchange" size={20} color="#28A745" />
              <Text style={styles.modalItemText}>Switch Student</Text>
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      )}

      <AddStudent
        visible={addStudentModalVisible}
        setAddStudentModalVisible={setAddStudentModalVisible}
        handleSaveStudent={saveStudent}
      />

      <RemoveStudent
        visible={removeStudentModalVisible}
        setRemoveStudentModalVisible={setRemoveStudentModalVisible}
        students={students}
        setStudents={setStudents}
      />
      <SwitchStudent
        visible={switchStudentModalVisible}
        setSwitchStudentModalVisible={setSwitchStudentModalVisible}
        students={students}
        onActiveStudentChange={(name) => {
          setActiveStudent(name);
          getStudents();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "transparent",
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
