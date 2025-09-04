import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import BackgroundTema from '../components/BackgroundTema';

export default function UsersScreen() {
    const { logout, user } = useAuth();

    return (
        <BackgroundTema>
            <View style={styles.container}>
                <Text style={{}}>Bienvenido, usuario logueado {user.fullname}</Text>
                <Pressable onPress={logout} style={{}}>
                    <Text style={{}}>Cerrar sesión</Text>
                </Pressable>
            </View>
        </BackgroundTema>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#81818100'
    },
});