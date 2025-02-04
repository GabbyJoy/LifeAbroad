import React, { useState } from "react";
import { 
  View, Text, TextInput, Button, FlatList, TouchableOpacity, 
  StyleSheet, Modal,  Alert 
} from "react-native";
import { Picker } from "@react-native-picker/picker"; 
import { Ionicons } from "@expo/vector-icons";



const JournalScreen = () => {
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Travel");
  const [customCategory, setCustomCategory] = useState("");
  const [entryText, setEntryText] = useState("");
  const [rating, setRating] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);

  // Open Modal for New or Editing Entry
  const openModal = (entry = null, index = null) => {
    if (entry) {
      setTitle(entry.title);
      setCategory(entry.category);
      setEntryText(entry.text);
      setRating(entry.rating);
      setEditingIndex(index);
    } else {
      setTitle("");
      setCategory("Travel");
      setCustomCategory("");
      setEntryText("");
      setRating(0);
      setEditingIndex(null);
    }
    setModalVisible(true);
  };

  // Save Entry (New or Edited)
  const saveEntry = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title cannot be empty!");
      return;
    }
    const newEntry = {
      title,
      category: category === "Custom" ? customCategory : category,
      text: entryText,
      rating,
    };
    if (editingIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries[editingIndex] = newEntry;
      setEntries(updatedEntries);
    } else {
      setEntries([...entries, newEntry]);
    }
    setModalVisible(false);
  };

  // Delete Entry
  const deleteEntry = (index) => {
    const filteredEntries = entries.filter((_, i) => i !== index);
    setEntries(filteredEntries);
  };

  return (
    <View style={styles.container}>
      <Button title="New Journal Entry" onPress={() => openModal()} />
      
      {/* Journal Entries List */}
      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.entryItem}>
            <Text style={styles.entryTitle}>{item.title}</Text>
            <Text style={styles.entryText}>Category: {item.category}</Text>
            <Text style={styles.entryText}>Rating: {"⭐".repeat(item.rating)}</Text>
            <View style={styles.entryButtons}>
              <TouchableOpacity onPress={() => openModal(item, index)}>
                <Ionicons name="create-outline" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteEntry(index)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal for Creating/Editing Entry */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>New Journal Entry</Text>

          {/* Title Input */}
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          {/* Category Picker */}
          <Picker selectedValue={category} onValueChange={(value) => setCategory(value)}>
            <Picker.Item label="Travel" value="Travel" />
            <Picker.Item label="School" value="School" />
            <Picker.Item label="Mental Health" value="Mental Health" />
            <Picker.Item label="Custom" value="Custom" />
          </Picker>

          {/* Custom Category Input */}
          {category === "Custom" && (
            <TextInput
              placeholder="Enter custom category"
              value={customCategory}
              onChangeText={setCustomCategory}
              style={styles.input}
            />
          )}

          {/* Journal Entry Input */}
          <TextInput
            placeholder="Write your journal entry..."
            value={entryText}
            onChangeText={setEntryText}
            style={[styles.input, styles.entryInput]}
            multiline
          />

          {/* Star Rating Selection */}
          <Text>Rate Your Entry:</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Ionicons name={star <= rating ? "star" : "star-outline"} size={30} color="gold" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Save & Close Buttons */}
          <Button title="Save Entry" onPress={saveEntry} />
          <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  entryItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  entryTitle: { fontSize: 18, fontWeight: "bold" },
  entryText: { fontSize: 14, color: "#555" },
  entryButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  modalContainer: { flex: 1, padding: 20, justifyContent: "center" },
  modalTitle: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  entryInput: { height: 100, textAlignVertical: "top" },
  ratingContainer: { flexDirection: "row", justifyContent: "center", marginVertical: 10 },
});

export default JournalScreen;
