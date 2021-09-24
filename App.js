import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Vibration
} from 'react-native';
import Header from './components/header/index';
import TaskList from './components/task-list';
import { TASK } from './components/model';
import { style } from './style'
import ModalTask from './components/modal/ModalTask';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [taskList, setTaskList] = useState(undefined)
  const [addList, setAddList] = useState(undefined)
  const [valueSelector, setValueSelector] = useState(undefined)
  const [updateTaskVisible, setUpdateTaskVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      if (jsonValue !== null) {
        // value previously stored
        jsonValue.length > 2 && setTaskList(JSON.parse(jsonValue))
      }

    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    if (taskList === undefined) {
      getData()
    }
  }, [taskList])

  const deleteCurrentTask = (value) => {
    const deleteTask = taskList?.filter(res => res.id !== value.id)
    setTaskList(deleteTask)
    storeData(deleteTask)
    Vibration.vibrate()
  }

  const toggleTaskStatus = (value, i) => {
    let updatedTask = taskList
    const changeStatus = value.status === TASK.doneStatus ? TASK.todoStatus : TASK.doneStatus
    updatedTask[i] = {
      id: value.id,
      content: value.content,
      status: changeStatus
    }
    setTaskList([...updatedTask])
    storeData([...updatedTask])
  };

  const onAddTask = value => {
    const newTask = {
      id: new Date().getTime(),
      content: value,
      status: TASK.todoStatus
    };
    setTaskList(taskList ? [...taskList, newTask] : [newTask])
    storeData(taskList ? [...taskList, newTask] : [newTask])
    Vibration.vibrate()
    setAddList(undefined)
  };

  const updatedTaskContent = (value) => {
    let updatedTask = taskList
    updatedTask[valueSelector.index] = {
      id: valueSelector.data.id,
      content: value,
      status: valueSelector.data.status,
    }
    setTaskList([...updatedTask])
    storeData([...updatedTask])
    setValueSelector(undefined)
  }

  const diplayRenameTask = (value, i) => {
    setValueSelector({ data: value, index: i })
    setAddList(value)
    setUpdateTaskVisible(true)
    setModalVisible(true)
  }

  const renderTaskList = () => {
    if (taskList !== undefined && taskList?.length > 0) {
      return (
        <TaskList
          onLongPressCallBack={diplayRenameTask}
          taskList={taskList}
          deleteCurrentTask={deleteCurrentTask}
          toggleTaskStatus={toggleTaskStatus}
        />
      );
    }
    return <Text>Cliquer sur le bouton ajouter pour créer une tâche</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <Header content="Liste de tâche" />
      <ScrollView>
        <View
          style={
            taskList !== undefined && taskList?.length > 0 ? style.noTask : { alignItems: "center", marginTop: 20 }
          }
        >
          {renderTaskList()}
        </View>
      </ScrollView>
      <ModalTask
        modalVisible={modalVisible}
        setAddList={setAddList}
        addList={addList}
        setModalVisible={setModalVisible}
        onAddTask={onAddTask}
        title={updateTaskVisible ? "UPDATE LIST" : "ADD LIST"}
        updatedTaskContent={updatedTaskContent}
        updateTaskVisible={updateTaskVisible}
        setUpdateTaskVisible={setUpdateTaskVisible}
      />
      <View style={style.containerButton}>
        {!modalVisible &&
          <TouchableOpacity
            style={style.buttonRight}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
          </TouchableOpacity>
        }
      </View>
      <StatusBar style="auto" />
    </View>
  );
}