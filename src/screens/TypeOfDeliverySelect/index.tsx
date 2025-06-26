import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from '../../components/Button';
import { typeOfDeliverys } from '../../utils/typeOfDeliverys';
import { MaterialIcons } from '@expo/vector-icons'; // ou o pacote de ícones que você usa

interface TypeOfDelivery {
  key: string;
  name: string;
  icon: string;
}

interface Props {
  typeOfDelivery: TypeOfDelivery;
  setTypeOfDelivery: (typeOfDelivery: TypeOfDelivery) => void;
  closeSelectTypeOfDelivery: () => void;
}

export function TypeOfDeliverySelect({
  typeOfDelivery,
  setTypeOfDelivery,
  closeSelectTypeOfDelivery,
}: Props) {
  function handleTypeOfDeliverySelect(selected: TypeOfDelivery) {
    closeSelectTypeOfDelivery();
    setTypeOfDelivery(selected);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tipo de Entrega</Text>
      </View>

      <FlatList
        data={typeOfDeliverys}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.typeOfDelivery,
              typeOfDelivery.key === item.key && styles.activeTypeOfDelivery,
            ]}
            onPress={() => handleTypeOfDeliverySelect(item)}
          >
            <MaterialIcons name={item.icon} size={24} color="#333" />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  typeOfDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  activeTypeOfDelivery: {
    backgroundColor: '#e0e0e0',
  },
  name: {
    marginLeft: 16,
    fontSize: 16,
  },
  separator: {
    height: 8,
  },
});
