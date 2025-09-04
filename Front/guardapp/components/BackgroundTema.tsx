import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginDecoration from '../components/LoginDecoration';
import LoginDecorationBoton from '../components/LoginDecoration2';

export default function BackgroundTema({ children }: { children: React.ReactNode }) {
    return (
        <LinearGradient
            colors={['#0f2027', '#203a43', '#2c5364']}
            style={styles.container}
        >
            <LoginDecoration />
            <View style={styles.content}>
                {children}
            </View>
            <LoginDecorationBoton />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 0
    },
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    }
});