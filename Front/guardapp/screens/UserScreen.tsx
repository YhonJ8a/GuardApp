import {
    View, Text, Pressable, StyleSheet, Alert,
    KeyboardAvoidingView, Platform, TextInput
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import BackgroundTema from '../components/BackgroundTema';
import { useState } from 'react';
import api from '../api/axiosInstance';

export default function UserScreen() {
    const { logout, user } = useAuth();
    const [input, setInput] = useState('');
    const [userData, setUserData] = useState<null | {
        estado: boolean,
        id: String,
        nombre: String,
        apellido: String,
        identificacion: String,
        email: String,
        categoria: String,
        registro: Date
    }>(null);
    const [vehiculoData, setVehiculoData] = useState<null | {
        id: String,
        placa: String,
        estado: boolean,
        cateforia: String,
        registro: Date,
        residente: {
            estado: Boolean,
            id: String,
            nombre: String,
            apellido: String,
            identificacion: String,
            email: String,
            categoria: String,
            registro: Date

        }
    }>(null);

    const handleCheck = async () => {
        const trimmed = input.trim();

        if (trimmed === '') {
            Alert.alert('Campo vacío', 'Por favor ingresa una cédula o una placa.');
            return;
        }
        const isCedula = /^[0-9]{6,10}$/.test(trimmed);
        const isPlaca = /^[A-Z]{3}[0-9]{3}$|^[A-Z]{3}[0-9]{2}[A-Z]{1}$/.test(trimmed.toUpperCase());

        if (isCedula) {
            const { data } = await api.get(`/residentes/cc/${trimmed}`);
            if (!data['message']) setUserData(data);
            else {
                Alert.alert('Tipo: Cédula', `${data['message']}`);
                setUserData(null);
            }
        } else if (isPlaca) {
            const { data } = await api.get(`/vehiculo/placa/${trimmed}`);
            if (!data['message']) setVehiculoData(data);
            else {
                Alert.alert('Tipo: Placa', `${data['message']}`);
                setVehiculoData(null);
            }
        } else {
            Alert.alert('Formato inválido', 'No parece una cédula válida ni una placa válida.');
        }
    };

    const validateStyle = (tipo) => tipo == 'RESIDENTE' || tipo == 'CARRO' ? styles.residente : styles.visitante;

    const Ingresar = async () => {
        const trimmed = input.trim();
        const isCedula = /^[0-9]{6,10}$/.test(trimmed);
        const isPlaca = /^[A-Z]{3}[0-9]{3}$|^[A-Z]{3}[0-9]{2}[A-Z]{1}$/.test(trimmed.toUpperCase());

        const DATA = { "cc": "", "placa": "" };
        if (isCedula) {
            DATA.cc = trimmed;
            setUserData(null);
        } else if (isPlaca) {
            DATA.placa = trimmed;
            setVehiculoData(null);
        }
        console.log(DATA);
        const res = await api.post(`/ingreso`, DATA);
        console.log(res.data);
    };

    return (
        <BackgroundTema>
            <View style={styles.container}>
                <View style={styles.containeruser}>
                    <Text
                        style={styles.user}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        Bienvenido {user?.fullname}
                    </Text>
                    <Pressable onPress={logout} style={styles.cerrarsesion}>
                        <Text style={{ color: '#ffffff', fontSize: 20 }}>Cerrar sesión</Text>
                    </Pressable>
                </View>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.select({ ios: 'padding', android: undefined })}
                >
                    <Text style={styles.title}>Consulta por Cédula o Placa</Text>

                    <View style={styles.containeruser}>

                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa una cédula o placa"
                            value={input}
                            onChangeText={setInput}
                            autoCapitalize="characters"
                            keyboardType="default"
                        />

                        <Pressable
                            onPress={handleCheck}
                            style={{ ...styles.boton, backgroundColor: '#0AB5FFFF' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: '#FFFFFFFF', fontWeight: 'bold' }}>
                                Consultar
                            </Text>
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={handleCheck}
                        style={{ ...styles.boton, width: '100%', backgroundColor: '#0AB5FFFF' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: '#FFFFFFFF', fontWeight: 'bold' }}>
                            Agregar nuevo usuario
                        </Text>
                    </Pressable>
                    {userData && (
                        <View style={styles.card}>
                            <View style={styles.cardTitleContent}>
                                <Text style={styles.cardTitle}>Usuario</Text>
                                <View style={validateStyle(userData.categoria)}>
                                    <Text style={{ ...styles.cardTitle, color: '#fff' }}>{userData.categoria}</Text>
                                </View>
                            </View>
                            <Text style={styles.cardText}>Nombre: {userData.nombre} {userData.apellido}</Text>
                            <Text style={styles.cardText}>Estado: {userData.estado}</Text>
                            <Text style={styles.cardText}>Identificacion: {userData.identificacion}</Text>
                            <Text style={styles.cardText}>Email: {userData.email}</Text>
                            <View style={styles.containeruser}>

                                <Pressable
                                    onPress={Ingresar}
                                    style={{ ...styles.boton, backgroundColor: '#0AB5FFFF' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, color: '#FFFFFFFF', fontWeight: 'bold' }}>
                                        Ingresar
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => setUserData(null)}
                                    style={styles.boton}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, color: '#FFFFFFFF', fontWeight: 'bold' }}>
                                        Canselar
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                    {vehiculoData && (
                        <View style={styles.card}>
                            <View style={styles.cardTitleContent}>
                                <Text style={styles.cardTitle}>Usuario</Text>
                                <View style={validateStyle(vehiculoData.cateforia)}>
                                    <Text style={{ ...styles.cardTitle, color: '#fff' }}>{vehiculoData.cateforia}</Text>
                                </View>
                            </View>
                            <Text style={styles.cardText}>Placa: {vehiculoData.placa}</Text>
                            <Text style={styles.cardText}>Estado: {"" + vehiculoData.estado}</Text>
                            <Text style={styles.cardText}>Email: {vehiculoData.residente.nombre}</Text>
                            <View style={styles.containeruser}>

                                <Pressable
                                    onPress={Ingresar}
                                    style={{ ...styles.boton, backgroundColor: '#0AB5FFFF' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, color: '#FFFFFFFF', fontWeight: 'bold' }}>
                                        Ingresar
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => setVehiculoData(null)}
                                    style={styles.boton}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, color: '#FFFFFFFF', fontWeight: 'bold' }}>
                                        Canselar
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                </KeyboardAvoidingView>
            </View >
        </BackgroundTema >
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
    boton: {
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#0AB5FFFF',
        borderRadius: 8,
        marginBottom: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        height: 50,
        width: '45%',
    },
    title: {
        paddingTop: '20%',
        fontWeight: 'bold',
        fontSize: 28,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        width: '50%',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        height: 50,
        borderColor: '#0AB5FFFF',
    },
    user: {
        flex: 1,
        fontSize: 20,
        height: 48,
        textAlign: 'left',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#051C25B2',
        fontWeight: 'bold',
        borderRadius: 8,
        borderColor: '#0AB5FFFF',
        borderWidth: 2,
        color: '#fff',
    },
    containeruser: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        width: '100%',
        gap: 10,
    },
    cerrarsesion: {
        backgroundColor: '#0AB5FF34',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: '#0AB5FFFF',
        borderWidth: 2,
    },
    card: {
        backgroundColor: '#1f1f1f',
        padding: 20,
        borderRadius: 12,
        marginTop: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    cardTitle: {
        fontSize: 18,
        color: '#00bcd4',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    cardTitleContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10,
    },
    cardText: {
        color: '#fff',
        fontSize: 18,
        marginTop: 4,
    },
    residente: {
        backgroundColor: '#339E02FF',
        alignItems: 'center',
        borderRadius: 50,
        justifyContent: 'center',
        marginHorizontal: 10,
        paddingHorizontal: 5
    },
    visitante: {
        backgroundColor: '#D4C707FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginHorizontal: 10,
        paddingHorizontal: 5
    }
});