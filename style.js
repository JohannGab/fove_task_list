import { StyleSheet } from 'react-native';
import {APP_COLORS} from './styles/color';

export const style = StyleSheet.create({
    noTask: {
        marginTop: 30,
    },
    containerButton: {
        alignItems: "flex-end",
        margin: 10,
    },
    buttonRight: {
        backgroundColor: APP_COLORS.darkPrimary,
        width: 50,
        height: 50,
        textAlign: 'center',
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        justifyContent: "center",
        backgroundColor: 'white',
        borderRadius: 20,
        width: 300,
        height: 200,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    titleModal: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: '#2196F3',
    },
    inputText: {
        width: 200,
        height: 35,
        borderColor: '#2196F3',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
    }
});