import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import BackgroundTema from '../components/BackgroundTema';

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await api.post('/login', { email, password });
            const { token, user } = res.data;
            if (!token || !user) {
                Alert.alert('Error', `${res.data.message || 'No se pudo iniciar sesión'}`);
                return;
            }
            await login(token, { email: user.email, admin: user.admin, fullname: user.fullname });
        } catch (err) {
            Alert.alert('Error', 'Credenciales incorrectas o problema de red' + err.message);
        }
    };

    return (
        <>
            <BackgroundTema>
                <View
                    style={styles.container}
                >
                    <View style={styles.container}>
                        <Text style={styles.title}>
                            GuardApp Login
                        </Text>
                        <TextInput
                            placeholder="Correo"
                            placeholderTextColor="#0AB5FF99"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <View style={{ width: '100%', position: 'relative', marginBottom: 12 }}>
                            <TextInput
                                placeholder="Contraseña"
                                placeholderTextColor="#0AB5FF99"
                                secureTextEntry={!showPassword}
                                style={[styles.input, { marginBottom: 0 }]}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <Pressable
                                onPress={() => setShowPassword((prev) => !prev)}
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: 12,
                                    padding: 4,
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>
                                    {showPassword ? '🙈' : '👁️'}
                                </Text>
                            </Pressable>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 10 }}>
                            <Pressable
                                onPress={handleLogin}
                                style={{ ...styles.boton, backgroundColor: '#0AB5FFFF' }}>
                                <Text style={{ textAlign: 'center', color: '#FFFFFFFF', fontWeight: 'bold' }}>Iniciar sesión</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => Alert.alert('¿Olvidaste tu contraseña?', 'Contacta al administrador')}
                                style={{ ...styles.boton }}>
                                <Text style={{ textAlign: 'center', color: '#0AB5FFFF', fontWeight: 'bold' }}>¿Olvidaste tu contraseña?</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </BackgroundTema>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        padding: 30
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#0AB5FFFF',
        marginTop: '20%',
        marginBottom: '30%',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        color: '#0AB5FFFF',
        borderColor: '#0AB5FFFF',
        borderRadius: 8,
        fontSize: 18,
        backgroundColor: '#051C25B2',
        marginBottom: 12,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        height: 48,
        width: '100%',
    },
    boton: {
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#0AB5FFFF',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 20,
        height: 48,
        flex: 1,
    },
});