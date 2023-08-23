import { StyleSheet, View } from 'react-native';
import RegistrationScreen from './Screens/RegistrationScreen';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { openBrowserAsync } from 'expo-web-browser';

export default function App() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
        Roboto_500Medium,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <RegistrationScreen />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
