import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput,
  Vibration
} from 'react-native';
import Header from './components/header/index';
import TaskList from './components/task-list';
// import MenuTask from './components/menu-task';
// import TextPrompt from './components/text-prompt';
// import ButtonAddTask from './components/button-add-task';
import { TASK } from './components/model';
import { style } from './style'
import ModalTask from './components/modal/ModalTask';

export default function App() {

  const [taskList, setTaskList] = useState(undefined)
  const [addList, setAddList] = useState(undefined)
  const [valueSelector, setValueSelector] = useState(undefined)
  const [updateTaskVisible, setUpdateTaskVisible] = useState(false)
  const [idGenerator, setIdGenerator] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)

  //   useEffect(() => {
  //     LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  // }, [])

  // useEffect(() => {
  //   AsyncStorage.getItem(storageKey).then(storedTaskList => {
  //     if (storedTaskList) {
  //       this.setState({ taskList: JSON.parse(storedTaskList) }, () => {
  //         if (this.state.taskList >= 1 ) { // if 0 list corrects the error problem
  //         this.setState({
  //           idGenerator: this.state.taskList[this.state.taskList.length - 1]
  //             .id + 1
  //           })
  //         }
  //       });
  //     }
  //   });
  // },[storageKey])
  // const valueStorageKey = AsyncStorage.getItem(storageKey)
  // useEffect(() => {

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@storage_Key')
  //     if(value !== null) {
  //       // value previously stored
  //     }
  //   } catch(e) {
  //     // error reading value
  //   }
  // }
  //     if (valueStorageKey) {
  //       setTaskList(JSON.parse(valueStorageKey))
  //         if (taskList >= 1 ) { // if 0 list corrects the error problem
  //           setIdGenerator(taskList[taskList.length - 1].id + 1)
  //         }
  //     }
  // },[valueStorageKey])

  const deleteCurrentTask = (value) => {
    const deleteTask = taskList?.filter(res => res.id !== value.id)
    setTaskList(deleteTask)
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
  };

  const onAddTask = value => {
    const newTask = {
      id: idGenerator,
      content: value,
      status: TASK.todoStatus
    };
    setTaskList(taskList ? [...taskList, newTask] : [newTask])
    setIdGenerator(idGenerator + 1)
    Vibration.vibrate()
    setAddList(undefined)
  };

  const updatedTaskContent = (value) => {
    let updatedTask = taskList
    updatedTask[valueSelector.data.id] = {
      id: valueSelector.data.id,
      content: value,
      status: valueSelector.data.status,
    }
    setTaskList([...updatedTask])
    setValueSelector(undefined)
  }

  const diplayRenameTask = (value, i) => {
    setValueSelector({ data: value, index: i })
    setAddList(value)
    setUpdateTaskVisible(true)
    setModalVisible(true)
  }

  // const saveTaskList = () => {
  //   AsyncStorage.setItem(storageKey, JSON.stringify(taskList));
  // }

  const renderTaskList = () => {
    if (taskList !== undefined) {
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
            taskList ? style.noTask : { alignItems: "center", marginTop: 20 }
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