import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '/Users/manish.jindal/Desktop/codeforces-react-native/CodeforcesApp/Welcome';
import GoogleAuth from '/Users/manish.jindal/Desktop/codeforces-react-native/CodeforcesApp/GoogleAuth';
import EventsList from '/Users/manish.jindal/Desktop/codeforces-react-native/CodeforcesApp/EventsList';
import SuccessPage from '/Users/manish.jindal/Desktop/codeforces-react-native/CodeforcesApp/SuccessPage';


const Stack = createStackNavigator();

export default function Screens() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Sign In" component={GoogleAuth} />

            <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ title: 'Welcome', 
                headerLeft: () => (
                    null
                ), 
            }}
            />

            <Stack.Screen 
                name="Events" 
                component={EventsList}
                options={{
                    headerLeft: () => (
                      null
                    ),
                  }}
            />
            <Stack.Screen name="Success" component={SuccessPage} options={{
                    headerLeft: () => (
                      null
                    ),
                  }}/>
            
        </Stack.Navigator>
      </NavigationContainer>
    );
  }