import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import AdminScreen from '../screens/AdminScreen';
import UserScreen from '../screens/UserScreen';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { token, loading, user } = useAuth();

    // if (loading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDFDFD33' }}>
    //             <ActivityIndicator size="large" />
    //         </View>
    //     );
    // }

    return (
        <Stack.Navigator id="AppStack" screenOptions={{ headerShown: false }}>
            {!token ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) :
                user?.admin ? (
                    <Stack.Screen name="Admin" component={AdminScreen} />
                ) : (
                    <Stack.Screen name="Users" component={UserScreen} />
                )
            }
            
        </Stack.Navigator>
    );
}