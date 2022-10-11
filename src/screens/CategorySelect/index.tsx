import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Button';
import { categories } from '../../utils/categories';
import {
  Category,
  Container,
  Header,
  Icon,
  Name,
  Separator,
  Title,
} from './styles';

interface Category {
  key: string;
  name: string;
}
interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  setSearchText: any;
  closeSelectCategory: () => void;
}
export function CategorySelect({
  category,
  setCategory,
  setSearchText,
  closeSelectCategory,
}: Props) {
  function handleCategorySelect(category: Category) {
    closeSelectCategory();
    setCategory(category);
    setSearchText('');
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
}
