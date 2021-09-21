import React from 'react';
import {
    Text,
    View,
    Modal,
    TouchableHighlight,
    TextInput
} from 'react-native';
import { style } from '../../style'

const ModalTask = ({
    modalVisible,
    setAddList,
    addList,
    setModalVisible,
    onAddTask,
    title,
    updatedTaskContent,
    updateTaskVisible,
    setUpdateTaskVisible,
    valueSelector
}) => {

    const onPressTask = () => {
        if (updateTaskVisible) {
            updatedTaskContent(addList)
        } else {
            onAddTask(addList)
        }
        setModalVisible(false);
        setUpdateTaskVisible(false)
    }
    return (
        <View style={style.containerModal}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.titleModal}>{title}</Text>
                        <TextInput
                            style={style.inputText}
                            onChangeText={text => setAddList(text)}
                            value={addList?.content && addList.content}
                        />
                        <View style={{ flexDirection: "row" }}>
                            <TouchableHighlight
                                style={{ ...style.openButton, backgroundColor: '#2196F3', marginRight: 5 }}
                                onPress={() => onPressTask()}>
                                <Text style={style.textStyle}>Validate</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{ ...style.openButton, backgroundColor: '#ff7575' }}
                                onPress={() => [setModalVisible(false), setAddList(undefined), setUpdateTaskVisible(false)]}>
                                <Text style={style.textStyle}>Cancel</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ModalTask