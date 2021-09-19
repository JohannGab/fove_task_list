import React from 'react';
import { View, Text } from 'react-native';
import { TASK } from '../../components/model';
import { APP_COLORS } from '../../styles/color'

const TaskList = ({ taskList, onPressCallBack, onLongPressCallBack }) => {
   console.log('taskList', taskList)

return ( 
<View>
{taskList?.map(res => 
   <View key={res.content}>
      <Text>{res.content}</Text>
   </View> 
)}

   {/* {taskList?.map(task => (
   <ListItem
   key={task.id}
   title={task.content}
   onPress={()=> onPressCallBack(task)}
   onLongPress= {() => onLongPressCallBack(task)}
   rightTitle={task.status}
   badge={{
      element: <Badge value={task.status} 
      containerStyle={
         task.status === TASK.todoStatus 
         ? { backgroundColor: APP_COLORS.accent }
         : { backgroundColor: APP_COLORS.lightPrimaryColor }
      }/>
   }}
   bottomDivider
   chevron
      />
   ))
} */}
</View>
);
}

export default TaskList;