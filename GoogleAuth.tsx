import React from 'react';
import {View, Text, Button, StyleSheet, ActivityIndicator} from 'react-native'
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';



export default function GoogleAuth({ navigation }){
    
    const config = {
        androidClientId: '1077447670583-k250og88dmhpognurrcc04vr9r7tikeq.apps.googleusercontent.com',
        androidStandaloneAppClientId: '1077447670583-45s5nlfur2u7s6bn6206aigvlsf4b4jg.apps.googleusercontent.com',
        scopes: ['https://www.googleapis.com/auth/calendar.events'],
        redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`
    }

    const [accessToken, setAT] = React.useState("");
    const [user, setUser] = React.useState({});
    const [signedIN, setSignedIn] = React.useState(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const [calendarList, setCalendarList] = React.useState<string[]>([]);

    const getList = (access: string) => {
        let d = new Date()
        d.setDate(d.getDate() + 60);

        fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMax='+d.toISOString(), {
            method: 'GET',
            headers: { Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then((data) => {
            var listTemp: string[] = []
            setCalendarList(() => {
                for(var item of data.items) {
                    listTemp.push(item.summary);
                }
                return listTemp
            })
            setLoading(() => {
                return false
            })
            navigation.navigate('Welcome', {access, listTemp})
        })
        .catch(() => {
            setLoading(() => {
                return true
            })
        })
        .finally(() => {
        })
    }

    const signin = () => {
        setLoading(() => {
            return true
        })
        Google.logInAsync(config)
            .then((data) => {
                var accessTokenTmp = ""
                if(data.type == 'success') {
                    if(data.accessToken != null){
                        setAT(() => {
                            return (""+data.accessToken)
                        })
                        accessTokenTmp = data.accessToken
                        getList(accessTokenTmp)
                    }
                    if(data.user != null) {
                        setUser(data.user)
                    } else {
                        setAT("")
                    }
                } else {
                    setAT("")
                    setLoading(() => {
                        return false
                    })
                }
            })
            .catch(() => {
                setLoading(() => {
                    return false
                })
            })
            .finally(() => {
            })
    }

    React.useEffect(() => {
    })

    return (

        <View style={styles.superView}>
            <Text style={styles.heading}>
                Codeforces Calendar App
            </Text>
            <Text style = {styles.description}>
                Please sign in using your google account so that Codeforces future contests can be added as events to your Google Calendar.
            </Text>
            <Button
                onPress={signin}
                title={"Sign in with Google"}
                color="#4c8bf5"
                disabled={loading}
            />
            <ActivityIndicator
                style = { [styles.progressBar] }
                animating = {loading}
                size = {'large'}
            />

        </View>
    )

    
}
const styles = StyleSheet.create({
    superView: {
        padding: 50,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    progressBar: {
        marginTop: 40
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'right'
    },
    description: {
        fontSize: 20,
        color: '#888',
        justifyContent: 'center',
        marginBottom: 80,
        marginTop:20,
        textAlign: 'right'
    }
})