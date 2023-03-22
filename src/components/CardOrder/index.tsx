import React from 'react';

import { Container, Title, Text, ItemContainer } from './styles';

interface ordersProps {
  data: {
    order_id: string;
    amount: string;
    type_delivery: string;
    object: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function CardOrder({ data }: ordersProps) {
  const totalValue = Number(data.amount) / 100;

  const createdDate = new Date(data.createdAt);
  const createdDay = (createdDate.getDate() + 1).toString().padStart(2, '0');
  const createdMonth = (createdDate.getMonth() + 1).toString().padStart(2, '0');
  const createdYear = createdDate.getFullYear();
  const createdDateFormatted = `${createdDay}/${createdMonth}/${createdYear}`;

  const updatedDate = new Date(data.updatedAt);
  const updatedDay = (updatedDate.getDate() + 1).toString().padStart(2, '0');
  const updatedMonth = (updatedDate.getMonth() + 1).toString().padStart(2, '0');
  const updatedYear = updatedDate.getFullYear();
  const updatedDateFormatted = `${updatedDay}/${updatedMonth}/${updatedYear}`;
  return (
    <Container>
      <ItemContainer>
        <Title>Pedido: </Title>
        <Text> {data.order_id}</Text>
      </ItemContainer>
      <ItemContainer>
        <Title>Total: </Title>
        <Text> R$ {totalValue.toFixed(2).replace('.', ',')}</Text>
      </ItemContainer>
      <ItemContainer>
        <Title>Tipo de entrega: </Title>
        <Text> {data.type_delivery}</Text>
      </ItemContainer>
      <ItemContainer>
        <Title>Forma de pagamento: </Title>
        <Text> {data.object === 'card' ? 'Cartão' : 'Erro'}</Text>
      </ItemContainer>
      <ItemContainer>
        <Title>Status: </Title>
        <Text> {data.status}</Text>
      </ItemContainer>
      <ItemContainer>
        <Title>Data da compra: </Title>
        <Text> {createdDateFormatted}</Text>
      </ItemContainer>
      <ItemContainer>
        <Title>Ultima Alteração: </Title>
        <Text> {updatedDateFormatted}</Text>
      </ItemContainer>
    </Container>
  );
}
