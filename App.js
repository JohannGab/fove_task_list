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

export default function App() {

  const [taskList, setTaskList] = useState(undefined)
  const [addList, setAddList] = useState(undefined)
  const [valueSelector, setValueSelector] = useState(undefined)
  const [updateTaskVisible, setUpdateTaskVisible] = useState(false)
  const [idGenerator, setIdGenerator] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)

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