import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Button';
import { installments } from '../../utils/installments';
import {
  Installments,
  Container,
  Header,
  Icon,
  Name,
  Separator,
  Title,
} from './styles';

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
    <Container>
      <Header>
        <Title>Tipo de Entrega</Title>
      </Header>

      <FlatList
        data={installments}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Installments
            onPress={() => handleInstallmentsSelect(item)}
            isActive={installment.key === item.key}
          >
            <Name>{item.name}</Name>
          </Installments>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
}
