import React from 'react';
import { StyleSheet, View } from 'react-native';
// import ActionButton from 'react-native-action-button';
// // import { Icon } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/Ionicons';
// import { APP_COLORS } from '../../styles/color';

const ButtonAddTask = ({onPressCallBack}) => (
    // <ActionButton>
    //     <ActionButton.Item 
    //         buttonColor={APP_COLORS.primaryAction} 
    //         onPress={() => onPressCallBack()}
    //     >
    //         {/* <Icon color={APP_COLORS.primaryText} name={'add'} />  */}
    //         <Icon name="add" style={styles.actionButtonIcon} />
    //     </ActionButton.Item>
    // </ActionButton>
    <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        {/* Rest of the app comes ABOVE the action button component !*/}
        {/* <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item  buttonColor='#1abc9c' title="Add Tasks" onPress={() => console.log("notes tapped!")}>
                <Icon name="add" style={styles.actionButtonIcon} />
            </ActionButton.Item>
        </ActionButton> */}
    </View>


);

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default ButtonAddTask;