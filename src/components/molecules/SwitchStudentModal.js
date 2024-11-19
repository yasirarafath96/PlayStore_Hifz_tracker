import React from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";

const SwitchStudentModal = ({
    visible,
    setSwitchStudentModalVisible,
    handleSwitchStudent,
    students,
}) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setSwitchStudentModalVisible(false)}
        >
            <View style={Styles.overlay}>
                <View style={Styles.content}>
                    {/* Title */}
                    <Text style={Styles.title}>Switch Student</Text>

                    {/* List of Students */}
                    {students.map((student, index) => (
                        <TouchableOpacity
                            key={index}
                            style={Styles.studentItem}
                            onPress={() => handleSwitchStudent(student)}
                        >
                            <Text style={Styles.studentName}>{student}</Text>
                        </TouchableOpacity>
                    ))}

                    {/* Cancel Button */}
                    <View style={Styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => setSwitchStudentModalVisible(false)}
                            style={Styles.cancelButton}
                        >
                            <Text style={Styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default SwitchStudentModal;

const Styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    content: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 15,
    },
    studentItem: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    studentName: {
        fontSize: 18,
        color: "#555",
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
    },
    cancelButton: {
        backgroundColor: "#FF6347",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
