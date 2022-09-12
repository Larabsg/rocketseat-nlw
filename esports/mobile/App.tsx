import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  )
}
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Olá React Native!
        </Text>
        <Button title='Touchable Text'/>
      <StatusBar style="auto" backgroundColor='blue'/>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'purple',
    fontSize: 25
  },
});
