import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card, Button, TextInput, Dialog, Portal, PaperProvider } from "react-native-paper";

function ToDoListScreen() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [visible, setVisible] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const openEditDialog = (index) => {
    setEditIndex(index);
    setEditTaskText(tasks[index]);
    setVisible(true);
  };

  const saveEdit = () => {
    if (editTaskText.trim()) {
      setTasks(tasks.map((task, i) => (i === editIndex ? editTaskText : task)));
    }
    setVisible(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>To-Do List</Text>

        <TextInput
          label="New Task"
          value={newTask}
          onChangeText={setNewTask}
          mode="outlined"
          style={styles.input}
        />
        
        <Button mode="contained" onPress={addTask} style={styles.addButton}>
          Add Task
        </Button>

        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Card style={styles.taskCard}>
              <Card.Content>
                <Text style={styles.taskText}>{item}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => openEditDialog(index)}>Edit</Button>
                <Button onPress={() => deleteTask(index)} color="red">
                  Delete
                </Button>
              </Card.Actions>
            </Card>
          )}
        />

        {/* Edit Task Modal */}
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Edit Task</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Edit Task"
                value={editTaskText}
                onChangeText={setEditTaskText}
                mode="outlined"
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Cancel</Button>
              <Button onPress={saveEdit}>Save</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2A52BE",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  addButton: {
    marginBottom: 20,
    backgroundColor: "#2A52BE",
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    elevation: 3,
    borderRadius: 8,
  },
  taskText: {
    fontSize: 16,
  },
});

export default ToDoListScreen;
