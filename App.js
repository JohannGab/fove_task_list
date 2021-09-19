import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal, TouchableHighlight, TextInput } from 'react-native';
import Header from './components/header/index';
import TaskList from './components/task-list';
// import MenuTask from './components/menu-task';
// import TextPrompt from './components/text-prompt';
import ButtonAddTask from './components/button-add-task';
import { TASK } from './components/model';
import { style } from './style'

export default function App() {

  const [taskList, setTaskList] = useState(undefined)
  const [addList, setAddList] = useState(undefined)
  const [isMenuTaskVisible, setIsMenuTaskVisible] = useState(false)
  const [currentTask, setCurrentTask] = useState({})
  const [isAddPrompVisible, setIsAddPrompVisible] = useState(false)
  const [isRenamePromptVisible, setIsRenamePromptVisible] = useState(false)
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


  
  const toggleMenuTaskVisibility = task => {
    console.log('task ==>',task)
    currentTask = task;
    if(isMenuTaskVisible) {
      currentTask = {};
    }
    setIsMenuTaskVisible(!isMenuTaskVisible, 
    currentTask)
  }

  const deleteCurrentTask = () => {
    const index = lodash.findIndex(taskList,{
      id: currentTask.id
    })
    const list = taskList;
    list.splice(index, 1);
    setTaskList(list)
    setCurrentTask({})
    toggleMenuTaskVisibility();
    saveTaskList();
  }

  const toggleTaskStatus = () => {
    const updatedTask = currentTask;
    updatedTask.status =  currentTask.status === TASK.doneStatus 
    ? TASK.todoStatus 
    : TASK.doneStatus;
    const index = lodash.findIndex(this.state.taskList,{
      id: currentTask.id
    })
    const updatedTaskList = taskList;
    updatedTaskList[index] = updatedTask;
    setTaskList(updatedTaskList)
    setIsMenuTaskVisible(false)
    setCurrentTask({}), () => {
        saveTaskList();
      };
  };

  const hideAddPrompt = () => {
    setIsAddPrompVisible(false);
  }

  const onAddTask = value => {
    const newTask = {
      id: idGenerator,
      content: value,
      status: TASK.todoStatus
    };
    setTaskList(taskList ? [...taskList, newTask] : [newTask])
    // setIsAddPrompVisible(false)
    setIdGenerator(idGenerator +1)
    // , () => {
    //   saveTaskList();
    // };
  };

  const displayAddPrompt = () => {
    setIsAddPrompVisible(true)
  }

  const diplayRenameTask = task => {
    setCurrentTask(task)
    setIsRenamePromptVisible(true)
  }

  const hideRenamePrompt = () => {
    setIsRenamePromptVisible(false)
    setCurrentTask({})
  }

  const renameTask = (value)=> {
    const updatedTask = currentTask;
    updatedTask.content = value;

    const index = lodash.findIndex(taskList,{
      id: currentTask.id
    })
    const updatedTaskList = taskList;
    updatedTaskList[index] = updatedTask;

    setTaskList(updatedTaskList), () => {
      hideRenamePrompt();
      saveTaskList();
    }
  }

  const saveTaskList = () => {
    AsyncStorage.setItem(storageKey,JSON.stringify(taskList));
  }

  const renderTaskList = () => {
    if (taskList !== undefined) {
      return ( 
      <TaskList 
        onPressCallBack={toggleMenuTaskVisibility} 
        onLongPressCallBack={diplayRenameTask}
        taskList={taskList}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
          <Text style={style.titleModal}>ADD LIST</Text>
          <TextInput
            style={style.inputText}
            onChangeText={text => setAddList(text)}
            // value={value}
            />

            <TouchableHighlight
              style={{ ...style.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(false);
                onAddTask(addList)
              }}>
              <Text style={style.textStyle}>Validate</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <View style={style.containerButton}>
        <TouchableOpacity
          style={style.buttonRight}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{color: 'white', fontSize: 30}}>+</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}