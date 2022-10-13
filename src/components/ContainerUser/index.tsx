import React from 'react';

import {
  Container,
  Header,
  Icon,
  LogoutButton,
  Photo,
  Title,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from './styles';

interface Props {
  name: string;
  photo: string;
  signOut: () => void;
}

export function ContainerUser({ name, photo, signOut }: Props) {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: photo,
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>{name}</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={signOut}>
            <Icon name="log-out" />
          </LogoutButton>
        </UserWrapper>
      </Header>
    </Container>
  );
}
