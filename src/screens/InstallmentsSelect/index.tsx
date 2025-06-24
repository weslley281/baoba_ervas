import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from '../../components/Button';
import { installments } from '../../utils/installments';

interface Installment {
  key: string;
  name: string;
}

interface Props {
  installment: Installment;
  setInstallment: (installment: Installment) => void;
  closeSelectInstallment: () => void;
}

export function InstallmentSelect({
  installment,
  setInstallment,
  closeSelectInstallment,
}: Props) {
  function handleInstallmentsSelect(typeOfDelivery: Installment) {
    closeSelectInstallment();
    setInstallment(typeOfDelivery);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tipo de Entrega</Text>
      </View>

      <FlatList
        data={installments}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleInstallmentsSelect(item)}
            style={[
              styles.installment,
              installment.key === item.key && styles.activeInstallment,
            ]}
          >
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
  installment: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  activeInstallment: {
    backgroundColor: '#cce5ff',
  },
  name: {
    fontSize: 16,
  },
  separator: {
    height: 8,
  },
});
