import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { useState } from "react";
import { styles } from "./styles";

import { Participant } from "../../components/Participant";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')
 

  function handleParticipanteAdd() {
    if(participants.includes(participantName)) {
      return Alert.alert('Participante ja existe na lista!')
    }

    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')
  }

  
  function handleParticipantRemove(name: string) {

    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Nao',
        style: 'cancel'
      }
    ])
   
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.eventName}>Nome do Evento</Text>
        <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome do participante"
            placeholderTextColor="#6B6B6B"
            value={participantName}
            onChangeText={text => setParticipantName(text)}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleParticipanteAdd}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
        data={participants}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Participant
          key={item}
          name={item}
          onRemove={() => handleParticipantRemove(item)}
        />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguem chegou no evento ainda? Adicione participantes a sua lista de presenca.
          </Text>
        )}
        />

       
      </View>
    </>
  );
}
