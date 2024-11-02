import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Layout() {
  const [modalVisible, setModalVisible] = useState(false);
  const [resetConfirmationVisible, setResetConfirmationVisible] =
    useState(false);

  const handleResetProgress = () => {
    // Your logic for resetting progress goes here
    console.log("Progress reset!");
    setResetConfirmationVisible(false);
  };
  return (
    <>
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
                  onPress={() => setModalVisible(true)}
                >
                  <FontAwesome name="user" size={24} color="black" />
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

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        onDismiss={() => console.log("Modal dismissed")}
        hardwareAccelerated={true}
        supportedOrientations={["portrait", "landscape"]}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalText}>Myself</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Fontisto name="close-a" size={18} color="#FF6347" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.modalItem}>
              <FontAwesome6 name="add" size={20} color="#007BFF" />
              <Text style={styles.modalItemText}>Add Student</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem}>
              <Ionicons name="remove-outline" size={18} color="#FF6347" />
              <Text style={styles.modalItemText}>Remove Student</Text>
            </TouchableOpacity>
            <View style={styles.modalItem}>
              <FontAwesome name="exchange" size={20} color="#28A745" />
              <Text style={styles.modalItemText}>Change Student</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* //////// */}

      <Modal
        visible={resetConfirmationVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setResetConfirmationVisible(false)}
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
                onPress={() => setResetConfirmationVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker semi-transparent background
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
    marginTop: 5, // Spacing from the top
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
