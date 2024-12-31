import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Stack } from "expo-router";
import { Portal, Button, PaperProvider } from "react-native-paper";
import ProfileModal from "../components/molecules/ProfileModal";
import AddStudentModal from "../components/molecules/AddStudentModal";
import { Avatar, Icon } from "react-native-magnus";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  // const [modalVisible, setModalVisible] = useState(false);
  const [resetConfirmationVisible, setResetConfirmationVisible] =
    useState(false);
  // const [addStudentModalVisible, setAddStudentModalVisible] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState({});
  const [switchStudentModalVisible, setSwitchStudentModalVisible] =
    useState(false);
  const [currentStudent, setCurrentStudent] = useState("");

  const [profileModal, setProfileModal] = useState(false);
  const [addStudentModalVisible, setAddStudentModalVisible] = useState(false);

  const handleSaveStudent = () => {
    if (studentName.trim()) {
      setStudents((prevStudents) => [...prevStudents, studentName]);
      console.log("Student added:", studentName);
      setStudentName(""); // Clear the input
      setAddStudentModalVisible(false); // Close the modal
    } else {
      console.log("Please enter a student name.");
    }
  };

  const handleResetProgress = () => {
    console.log("Progress reset!");
    setResetConfirmationVisible(false);
  };
  return (
    <>
      <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer>
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: "Dashboard",
                headerShown: true,
                title: "Dashboard",
                drawerIcon: () => (
                  <AntDesign name="home" size={24} color="black" />
                ),
                headerRight: () => (
                  <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => setProfileModal(true)}
                  >
                    <Avatar bg="green800" rounded="sm" size={32}>
                      <Icon name="user" color="white" fontFamily="Feather" />
                    </Avatar>
                  </TouchableOpacity>
                ),
              }}
            ></Drawer.Screen>
            <Drawer.Screen
              name="updateProgram"
              options={{
                drawerLabel: "Update Program",
                headerShown: true,
                title: "Update Program",
                drawerIcon: () => (
                  <MaterialIcons name="update" size={24} color="black" />
                ),
              }}
            ></Drawer.Screen>
            <Drawer.Screen
              name="updateRevision"
              options={{
                drawerLabel: "Update Revision",
                headerShown: true,
                title: "Update Revision",
                drawerIcon: () => (
                  <MaterialIcons name="update" size={24} color="black" />
                ),
              }}
            ></Drawer.Screen>
            <Drawer.Screen
              name="summary"
              options={{
                drawerLabel: "Summary",
                headerShown: true,
                title: "Summary",
                drawerIcon: () => (
                  <MaterialIcons name="summarize" size={24} color="black" />
                ),
              }}
            ></Drawer.Screen>
            <Drawer.Screen
              name="reviewMistakes"
              options={{
                drawerLabel: "Review Mistakes",
                headerShown: true,
                title: "Review Mistakes",
                drawerIcon: () => (
                  <MaterialIcons name="reviews" size={24} color="black" />
                ),
              }}
            ></Drawer.Screen>
            <Drawer.Screen
              name="resetProgress"
              options={{
                drawerLabel: "Reset Progress",
                headerShown: true,
                title: "Reset Mistakes",
                drawerIcon: () => (
                  <MaterialIcons name="reset-tv" size={24} color="black" />
                ),
              }}
            ></Drawer.Screen>
            <Drawer.Screen
              name="rateApp"
              options={{
                drawerLabel: "Rate App",
                headerShown: true,
                title: "Rate App",
                drawerIcon: () => (
                  <MaterialIcons name="rate-review" size={24} color="black" />
                ),
              }}
            ></Drawer.Screen>
          </Drawer>
        </GestureHandlerRootView>
      </PaperProvider>

      {profileModal && (
        <ProfileModal
          visible={profileModal}
          onClose={() => setProfileModal(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  modalContent: {
    width: "45%",
    height: 260,
    backgroundColor: "white",
    borderTopLeftRadius: 0, // Rounded corners
    borderTopRightRadius: 0,
    padding: 20,
    elevation: 10, // Enhanced shadow effect on Android
    marginTop: 0, // Spacing from the top
  },
  modalHeader: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0", // Light border for separation
    paddingBottom: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold", // Bold header text
    color: "#333", // Darker text color for readability
  },
  modalItem: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10, // Space between items
  },
  modalItemText: {
    marginLeft: 15, // Space between icon and text
    fontSize: 14,
    color: "#555", // Slightly lighter text color
  },
  closeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

// ADD STUDENT MODAL
const addStudentModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 5, // Space between buttons
  },
  cancelButton: {
    backgroundColor: "#FF6347",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 5, // Space between buttons
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

// Remove Student Modal

// const removeStudentModalStyles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   content: {
//     width: "80%",
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 20,
//     elevation: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   studentName: {
//     fontSize: 16,
//     color: "#555",
//   },
//   checkbox: {
//     width: 30, // Fixed width for checkbox area
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   checkboxText: {
//     fontSize: 18,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   removeButton: {
//     backgroundColor: "#FF6347",
//     borderRadius: 5,
//     padding: 10,
//     flex: 1,
//     marginRight: 10, // Space between buttons
//   },
//   cancelButton: {
//     backgroundColor: "#007BFF",
//     borderRadius: 5,
//     padding: 10,
//     flex: 1,
//     marginLeft: 10, // Space between buttons
//   },
//   buttonText: {
//     color: "white",
//     textAlign: "center",
//   },
// });

// Switch Student Modal
// const switchStudentModalStyles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   content: {
//     width: "80%",
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 20,
//     elevation: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   modalItem: {
//     height: 40,
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   modalItemText: {
//     marginLeft: 15,
//     fontSize: 16,
//     color: "#555",
//   },
//   closeButton: {
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     backgroundColor: "#007BFF",
//     borderRadius: 5,
//     alignSelf: "center", // Center the close button
//     marginTop: 10, // Space above the button
//   },
//   closeButtonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });
