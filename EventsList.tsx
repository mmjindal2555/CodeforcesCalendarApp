import React, { useEffect } from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface DataSource {
    key: string;
    startTime: string;
    endTime: string;
    isSelected: boolean;
    isAlreadySelected: boolean;
    selectedClass: {};
}
 
/* style={data.isSelected ? styles.selected : styles.item}> */

export default function EventsList({ route, navigation }) {
    const [at, setat] = React.useState(""+route.params.r);
    const [cnt, setcnt] = React.useState(0);
    const [cl, setcl] = React.useState(route.params.calendarList);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [succsess, setS] = React.useState<boolean>(false);

    let [listt, setList] = React.useState<DataSource[]>(route.params.listTemp);

    useEffect( ()=> {
        const k = 0
        if(succsess) {
            navigation.navigate("Success");
        }

        navigation.setOptions({
            headerRight: () => (
                     <TouchableOpacity
                     style = {styles.rightHeader}
                     onPress={() => {
                        navigation.navigate('Sign In');
                      }} >
                     <View >
                         <Text 
                              style={styles.rightHeaderText}>Sign Out
                          </Text>
                     </View>
                 </TouchableOpacity>
            ),
          });
    })    

    const selectItem = (data) => {
        setList((prevList) => {
            let listTemp = listt;
            const listEmpty: DataSource[] = []
            for(let d of listTemp){
                if(d == data.data) {
                    setcnt((prev) => {
                        return prev + (d.isSelected ? -1 : 1);
                    })
                }
                listEmpty.push({
                    key: d.key, 
                    startTime: d.startTime,
                    endTime: d.endTime,
                    isSelected: d == data.data ? !d.isSelected : d.isSelected,
                    isAlreadySelected: d.isAlreadySelected,
                    selectedClass: d == data.data ? (d.isSelected ? styles.selected : styles.item) : d.selectedClass
                });
            } 
            return listEmpty
        });
    }
   const Item = ( data ) => {
       return (
           <TouchableOpacity
               style={
                   data.data.isAlreadySelected ? styles.alreadySelected : 
                   (data.data.isSelected ? styles.selected : styles.item)
                }
                activeOpacity={data.data.isAlreadySelected ? 1 : 0.4}
               onPress={() => {
                    if(!data.data.isAlreadySelected){
                        selectItem(data);
                    }
                }} >
               <View >
                   <Text 
                        style={[styles.h2, (!data.data.isAlreadySelected &&!data.data.isSelected) ? styles.itemColor : styles.selectedTextColor]}>{data.data.key}
                    </Text>
                   <Text style={styles.h3}>{data.data.startTime}</Text>
               </View>
           </TouchableOpacity>
       );
    }

    const createEvent = (list: DataSource[]) => {
        setLoading(() => {
            return true
        })
        let l = list.length
        for(var i = 0; i < l; i++) {

            if(list[i].isSelected) {
                let name = list[i].key;
                let body = {
                    'start': {
                        'dateTime': list[i].startTime,
                        'timeZone': 'Asia/Kolkata'
                    },
                    'end': {
                        'dateTime': list[i].endTime,
                        'timeZone': 'Asia/Kolkata'
                    },
                    'summary': name
                }
                
                fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${at}`,
                    'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                })
                .then((response) => {
                    response.json()
                    setLoading(()=>{
                        return false;
                    })
                    setS(()=> {
                        return true;
                    })
                    
                })
                .catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                    setLoading(()=>{
                        return false;
                    })
                    throw error;
                });
            }
        }
    }

    return (
        <View style={styles.superview}>

            <FlatList
                style = {styles.list}
                data = {listt}
                keyExtractor={item => item.key}
                renderItem = { ({ item }) => 
                    <Item data={item} />
                }
            />

            <Button
                onPress={()=>{createEvent(listt)}}
                title={"Create Events in Calendar"}
                color="#00743f"
                disabled={loading || cnt == 0}
            />

        </View>
    )

}


const styles = StyleSheet.create({
    list: {
        height: 300,
        marginBottom: 20,
        marginTop: 10,
        borderTopLeftRadius: 20,
        marginLeft: -20,
        marginRight: -20,
        paddingBottom: 60,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20

    },
    superview: {
        padding:30,
        backgroundColor: "#ffffff",
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        backgroundColor: '#f5ede9',
        color: "#000",
        padding: 8,
        borderRadius: 10,
        borderStyle: 'dashed',
        borderWidth: 1,
        marginBottom: 10,
        borderColor: '#583e2e'

    },
    h2: {
        fontSize: 16,
    },
    h3: {
        fontSize: 12,
        fontStyle: 'italic',
        color: "#6e5c51"
    },
    selected: {
        backgroundColor: '#e3c5bf',
        color: "#888888",
        padding: 8,
        borderRadius: 10,
        borderStyle: 'dashed',
        borderWidth: 1,
        marginBottom: 10,
        borderColor: '#4d3323'
    },
    itemColor: {
        color: '#583e2e'
    },
    selectedTextColor: {
        color: '#4d3323'
    },
    alreadySelected: {
        backgroundColor: '#54d198',
        color: '#1c5239',
        padding: 8,
        borderRadius: 10,
        borderStyle: 'dashed',
        borderWidth: 1,
        marginBottom: 10,
        borderColor: '#4d3323',
    },

    rightHeaderText: {
        color: '#fff',
        fontSize: 16,
    },

    rightHeader: {
        borderRadius: 6,
        backgroundColor: '#000',

        paddingRight: 12,
        paddingLeft: 12,
        paddingTop: 6,
        paddingBottom: 6,

        marginRight: 10,
        marginBottom: -4,
    }
  });
  