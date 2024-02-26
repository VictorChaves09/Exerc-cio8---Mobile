import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ScrollView} from 'react-native';
import axios from 'axios';
        
axios.defaults.baseURL = 'http://10.0.84.179:1337/api';

export default function App() {
  const [dados, setDados] = React.useState([]);
  const [usuario, setUsuario] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [jwt, setJwt] = React.useState('')
  return (
    <View style={styles.container}>
      <TextInput placeholder="Digite o usuário" onChangeText={setUsuario}></TextInput>
      <TextInput placeholder="Digite a senha" onChangeText={setSenha} secureTextEntry={true}></TextInput>
      <Button title="Login" onPress={ async()=>
        {
          try {
            const response = await axios.post('/auth/local', {identifier:usuario, password: senha});
            setJwt(response.data.jwt)
          } catch {
            console.log(error)
          }
        }
      }></Button>
      <Button title="Informes" onPress={ async()=>
        {
          const {data}= await axios.get('/Informes', {headers: {Authorization: "Bearer " + jwt}})
          setDados(data.data)
        }
      }></Button>
      <ScrollView>
        {dados.map((item) => (
            <Text key={item.id}>{item.attributes.mensagem} by {item.attributes.autor}</Text>
          )
        )}
      </ScrollView>
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
});
