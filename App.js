import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Task from './components/Task';
import { Calendar } from 'react-native-calendars';

export default function App() {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddTask = () => {
    Keyboard.dismiss();
    const newTask = { text: task, dueDate: dueDate };
    setTaskItems([...taskItems, newTask]);
    setTask('');
    setDueDate('');
    setShowModal(false); // Close the calendar modal
  };

  const handleCompleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const sortTasksByDueDate = () => {
    const sortedTasks = [...taskItems].sort((a, b) => {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    setTaskItems(sortedTasks);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks 🎯</Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <Task
                  key={index}
                  text={item.text}
                  dueDate={item.dueDate}
                  onComplete={() => handleCompleteTask(index)} // Handle task completion
                />
              );
            })}
          </View>
        </View>
      </ScrollView>

      <Modal animationType='slide' transparent={true} visible={showModal} onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Calendar 📅 </Text>
          <TextInput
            style={styles.input}
            placeholder={'Due Date (MM-DD-YYYY)'}
            value={dueDate}
            onChangeText={(text) => setDueDate(text)}
          />
          {showModal && (
            <Calendar
              onDayPress={(day) => setDueDate(day.dateString)} // Update dueDate when a day is selected
              current={dueDate} // Pass the current dueDate to highlight it on the calendar
              style={styles.calendar}
              theme={{
                selectedDayBackgroundColor: 'blue',
                selectedDayTextColor: 'white',
              }}
            />
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleAddTask()} style={styles.addButton}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
            <View style={styles.redButtonContainer}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <ScrollView contentContainerStyle={styles.inputSection}>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder={'Write a Task...✍️'}
              value={task}
              onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity onPress={() => handleAddTask()} style={styles.addButton}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={openModal} style={styles.dueDateButton}>
              <Text style={styles.dueDateButtonText}>Due Date</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sortTasksByDueDate} style={styles.sortButton}>
              <Text style={styles.sortText}>Sort by Due Date</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  inputSection: {
    width: '100%',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    maxWidth: 250,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginRight: 15,
  },
  sortButton: {
    maxWidth: 250,
    backgroundColor: '#55BCF6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  sortText: {
    color: '#FFF',
  },
  dueDateButton: {
    backgroundColor: '#00008B',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  dueDateButtonText: {
    color: 'white',
  },
  centered: {
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#009E60',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  addText: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  redButtonContainer: {
    paddingVertical: 9,
    paddingHorizontal: 7,
    backgroundColor: 'red',
    borderRadius: 10,
    overflow: 'hidden',
  },
  closeButton: {
    backgroundColor: 'red', 
    borderRadius: 10,
    marginLeft: 5,
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  
  closeText: {
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendar: {
    marginBottom: 10,
  },
});



  
