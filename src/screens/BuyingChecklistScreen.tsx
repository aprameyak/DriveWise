import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useChecklistStore } from '../store/checklistStore';
import { TASK_PRIORITIES } from '../constants';
import { BuyingTask } from '../types';

const BuyingChecklistScreen = () => {
  const { tasks, addTask, toggleTask, removeTask } = useChecklistStore();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<BuyingTask['priority']>('medium');
  const [deadline, setDeadline] = useState('');

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  const validateDeadline = (date: string) => {
    return date === '' || (/^\d{4}-\d{2}-\d{2}$/.test(date) && !isNaN(new Date(date).getTime()));
  };

  const getPriorityColor = (value: string) => {
    switch (value) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#64748b';
    }
  };

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a task.');
      return;
    }
    if (!validateDeadline(deadline.trim())) {
      Alert.alert('Validation Error', 'Please enter the deadline as YYYY-MM-DD.');
      return;
    }

    addTask({
      title: title.trim(),
      category: category.trim(),
      priority,
      deadline: deadline.trim(),
    });
    setTitle('');
    setCategory('');
    setPriority('medium');
    setDeadline('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add a Task</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Task:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Get pre-approval letter"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldContainer, styles.rowItem]}>
            <Text style={styles.fieldLabel}>Category:</Text>
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={setCategory}
              placeholder="Financing"
            />
          </View>
          <View style={[styles.fieldContainer, styles.rowItem]}>
            <Text style={styles.fieldLabel}>Deadline:</Text>
            <TextInput
              style={styles.input}
              value={deadline}
              onChangeText={setDeadline}
              placeholder="YYYY-MM-DD"
              maxLength={10}
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Priority:</Text>
          <View style={styles.priorityRow}>
            {TASK_PRIORITIES.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[styles.priorityOption, priority === option.value && { backgroundColor: getPriorityColor(option.value) }]}
                onPress={() => setPriority(option.value)}
              >
                <Text style={[styles.priorityText, priority === option.value && styles.priorityTextSelected]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <Text style={styles.summaryText}>
          {pendingCount} pending, {completedCount} completed
        </Text>

        {tasks.map((task) => (
          <View key={task.id} style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTask(task.id)}>
              <Ionicons
                name={task.status === 'completed' ? 'checkbox' : 'square-outline'}
                size={24}
                color={task.status === 'completed' ? '#10b981' : '#64748b'}
              />
            </TouchableOpacity>
            <View style={styles.taskContent}>
              <Text style={[styles.taskTitle, task.status === 'completed' && styles.taskTitleDone]}>
                {task.title}
              </Text>
              <View style={styles.taskMeta}>
                <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
                <Text style={styles.taskMetaText}>
                  {[task.priority, task.category, task.deadline && `due ${task.deadline}`].filter(Boolean).join(' · ')}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeTask(task.id)}>
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowItem: {
    flex: 1,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityOption: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  priorityTextSelected: {
    color: 'white',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  taskContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  taskTitleDone: {
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  taskMetaText: {
    fontSize: 12,
    color: '#64748b',
  },
});

export default BuyingChecklistScreen;
