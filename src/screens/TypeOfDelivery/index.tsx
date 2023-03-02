import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Button';
import { categories } from '../../utils/categories';
import {
  TypeOfDelivery,
  Container,
  Header,
  Icon,
  Name,
  Separator,
  Title,
} from './styles';

interface TypeOfDelivery {
  key: string;
  name: string;
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
  function handleTypeOfDeliverySelect(typeOfDelivery: TypeOfDelivery) {
    closeSelectTypeOfDelivery();
    setTypeOfDelivery(typeOfDelivery);
  }

  return (
    <Container>
      <Header>
        <Title>Tipo de Entrega</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TypeOfDelivery
            onPress={() => handleTypeOfDeliverySelect(item)}
            isActive={typeOfDelivery.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </TypeOfDelivery>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
}
