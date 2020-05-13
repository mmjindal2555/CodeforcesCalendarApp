import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
 



export default function SuccessPage({ navigation }){

    // First- obtain access token from Expo's Google API

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



    return (
        <View style={styles.superview}>
            <View style={styles.alreadySelected}>
                <Text style={styles.h}>Successfully created new event(s) into your calendar.</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
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
    h: {
        fontSize: 20,
        fontStyle: 'normal',
        color: "#1c5239"
    },
    alreadySelected: {
        backgroundColor: '#a2f2ce',
        color: '#1c5239',
        padding: 16,
        borderRadius: 10,
        borderWidth: 0,
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
  