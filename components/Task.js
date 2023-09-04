import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.listEmoji}>📝</Text>
        <View>
          <Text style={styles.itemText}>{props.text}</Text>
          <Text style={styles.dueDateText}>Due Date: {props.dueDate}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={props.onComplete} style={styles.checkButton}>
        {/* Add a green checkmark button here */}
        <Text style={styles.checkText}>✓</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  listEmoji: {
    fontSize: 24, 
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  checkButton: {
    width: 30,
    height: 30,
    backgroundColor: 'green', 
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    color: 'white', 
    fontSize: 18,
  },
  dueDateText: {
    marginTop: 5,
    color: '#888',
  },
});

export default Task;
