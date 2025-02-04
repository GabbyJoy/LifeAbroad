import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const TranslatorScreen = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('es'); // Default to Spanish

  // Function to handle translation
  const handleTranslate = async () => {
    try {
      const apiKey = ''; 
      const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

      const response = await axios.post(url, {
        q: inputText,
        target: selectedLanguage,
      });

      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  // Handle the return button press to dismiss the keyboard
  const handleReturnPress = () => {
    Keyboard.dismiss(); // This dismisses the keyboard
  };

  // Handle onKeyPress for return key detection
  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter') {
      handleReturnPress();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translate Text</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter text to translate"
        value={inputText}
        onChangeText={setInputText}
        multiline
        onKeyPress={handleKeyPress} // Listen for key presses to handle return key
        returnKeyType="done" // Ensure the return key is visible as "done"
      />

      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Spanish" value="es" />
        <Picker.Item label="French" value="fr" />
        <Picker.Item label="German" value="de" />
        <Picker.Item label="Italian" value="it" />
        <Picker.Item label="Chinese" value="zh" />
        <Picker.Item label="Arabic" value="ar" />
        {/* Add more languages here */}
      </Picker>

      <Button title="Translate" onPress={handleTranslate} />

      {translatedText ? (
        <View style={styles.translatedContainer}>
          <Text style={styles.translatedText}>{translatedText}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    textAlignVertical: 'top',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  translatedContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f4f4f4',
  },
  translatedText: {
    fontSize: 16,
    color: '#333',
  },
});

export default TranslatorScreen;
