import React from 'react';
import { View, Text } from 'react-native';
import { TASK } from '../../components/model';
import { APP_COLORS } from '../../styles/color'
import { ListItem, Button, Badge } from 'react-native-elements'


const TaskList = ({
   taskList,
   onLongPressCallBack,
   deleteCurrentTask,
   toggleTaskStatus
}) => {
   return (
      <View>
         {taskList?.map((res, i) =>
            <ListItem.Swipeable
               key={i}
               bottomDivider={true}
               topDivider={i === 0 && true}
               onLongPress={() => onLongPressCallBack(res, i)}
               leftContent={
                  <Button
                     title={res.status === TASK.doneStatus ? "not done" : "Done"}
                     icon={{ name: 'info', color: 'white' }}
                     buttonStyle={{ minHeight: '100%' }}
                     onPress={(() => toggleTaskStatus(res, i))}
                  />
               }
               rightContent={
                  <Button
                     title="Delete"
                     icon={{ name: 'delete', color: 'white' }}
                     buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                     onPress={(() => deleteCurrentTask(res))}
                  />
               }
            >
               {/* <Icon name="My Icon" /> */}
               <ListItem.Content>
                  <ListItem.Title>{res.content}</ListItem.Title>
               </ListItem.Content>
               <ListItem.Title>
                  <Badge status={res.status === TASK.doneStatus ? "success" : "primary"} right={12} />
                  {res.status}
               </ListItem.Title>
            </ListItem.Swipeable>
         )}
      </View>
   );
}

export default TaskList;