import React, { useEffect } from 'react';
import {View, Text, Button, ActivityIndicator, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { useBackHandler } from '@react-native-community/hooks'

interface DataSource {
    key: string;
    startTime: string;
    endTime: string;
    isSelected: boolean;
    isAlreadySelected: boolean;
    selectedClass: {};
}

export default function Welcome({ route, navigation}) {

    const [at, setat] = React.useState(""+route.params.access);
    //console.log(route.params);
    const [calendarList, setCL] = React.useState<string[]>(route.params.listTemp);
    let [listt, setList] = React.useState<DataSource[]>([]);
    let [loaded, setLoaded] = React.useState<boolean>(false);

    React.useEffect(() => {
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
    

    useBackHandler(() => {
        return true
    })
    
    const onPressLearnMore = () => {
        setLoaded(() => {
            return true
        })
        fetch('https://codeforces.com/api/contest.list?gym=false')
        .then((response) => response.json())
        .then((data) => {
            let respL = data.result.length;
            var listTemp: DataSource[] = [];
            
            for(let i = 0; i < respL; i++) {
                var ate = new Date(data.result[i].startTimeSeconds * 1000);
                var end = new Date((data.result[i].durationSeconds + data.result[i].startTimeSeconds) * 1000);
                
                
                if(data.result[i].phase == "BEFORE") {
                    var isAlreadyPresent = false
                    for(var evt of calendarList) {
                        if(evt == data.result[i].name) {
                            isAlreadyPresent = true;
                            break;
                        }
                    }
                    listTemp.push({
                        key: data.result[i].name, 
                        startTime: ate.toISOString(),
                        endTime: end.toISOString(),
                        isSelected: false,
                        isAlreadySelected: isAlreadyPresent,
                        selectedClass: styles.item
                    });
                }
            }
            setList(listTemp);
            setLoaded(() => {
                return false
            })
            console.log(at);
            let r = at;
            navigation.navigate('Events',{r, listTemp, calendarList})
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        });
        
    }

    

    return (
        <View style={ styles.superview }>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: 'https://www.ime.usp.br/~arcjr/image/codeforces.png',
                    }}
                />
                <Text style={[styles.heading]}>Greetings Codeforcer!</Text>
            </View>
            <ActivityIndicator
                style = { [styles.progressBar] }
                animating = {loaded}
                size = {'large'}
            />
            <Button
                onPress={onPressLearnMore}
                title={"Search future contests"}
                color="#1d65a6"
                disabled= {loaded}
            />
            
        </View>
    )

}


const styles = StyleSheet.create({
    superview: {
        padding:50,
        backgroundColor: "#ffffff",
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    progressBar: {
        marginTop: 40
    },
    translucent: {
        opacity: .5,
        backgroundColor: "#ffffff"
    }, 
    transparent: {
        opacity: 0,
        backgroundColor: "#ffffff"
    },
    container: {
      alignItems: 'flex-start',

    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 100,
      height: 58,
      margin: 'auto',
      alignSelf: 'flex-end'
    },
    heading: {
        fontSize: 40,
        color: '#000',
        marginTop: 20,
        fontWeight: 'bold',
        textAlign: 'right',
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
  