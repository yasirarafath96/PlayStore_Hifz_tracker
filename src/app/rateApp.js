import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Linking } from 'react-native';

const RateApp = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Handle the feedback submission here (e.g., send to a server)
    console.log("Feedback submitted:", feedback);
    setFeedback(''); // Clear the input after submission
  };

  const openPlayStore = () => {
    // Replace with your actual Play Store link
    Linking.openURL('https://play.google.com/store/apps/details?id=your_app_id');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate Our App</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your feedback..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={openPlayStore}>
        Rate us on Play Store
      </Text>
    </View>
  );
};

export default RateApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: '#007BFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
