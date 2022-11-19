import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Form,
  Header,
  Input,
  LoadContainer,
  Ordination,
  Title,
} from './styles';
import { ActivityIndicator, FlatList, Modal } from 'react-native';
import { CategorySelectButton } from '../../components/CategorySelectButton';
import { CardProducts } from '../../components/CardProducts';
import { CategorySelect } from '../CategorySelect';
import { api } from '../../services/api';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Load } from '../../components/Load';
import { useIsFocused } from '@react-navigation/native';
import { ProductsProps } from '../../DTO/ProductsDTO';

export function Products() {
  const isFocused = useIsFocused();
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState<any>('');
  const [cagoryModalOpen, setCagoryModalOpen] = useState(false);
  const { navigate, goBack } = useNavigation<any>();
  const [category, setCategory] = useState({
    key: 'todos',
    name: 'Categorias',
  });
  const [searchProducts, setSearchProducts] = useState(products);

  async function listProducts() {
    try {
      setIsLoading(true);
      const response = await api.get(`products/product_list`);
      // console.log(response);

      // if (products.length >= response.data.totalItems) return;

      setProducts([...products, ...response.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenSelectCategoryModal() {
    setCagoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCagoryModalOpen(false);
  }

  function handleChangeToProductDetail(product: ProductsProps) {
    navigate('Product', { product });
  }

  useEffect(() => {
    listProducts();
  }, []);

  useEffect(() => {
    listProducts();
  }, [isFocused]);

  //busca por texto
  useEffect(() => {
    if (searchText === '') {
      setSearchProducts(products);
    } else {
      setSearchProducts(
        products.filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  //busca por categoria
  useEffect(() => {
    setSearchProducts(
      products.filter((item) => item.category.toLowerCase() === category.key)
    );
  }, [category]);

  return (
    <Container>
      <Header>
        <Title>Produtos</Title>
      </Header>

      <Form>
        <CategorySelectButton
          onPress={handleOpenSelectCategoryModal}
          title={category.name}
        />
        <Input
          placeholder="Pesquise pelo nome"
          onChangeText={(text: string) => setSearchText(text)}
        />
      </Form>
      {searchText === '' && category.key === 'todos' ? (
        isLoading ? (
          <Load />
        ) : (
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.product_id.toString()}
            contentContainerStyle={{
              paddingLeft: 18,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            renderItem={({ item }) => (
              <CardProducts
                data={item}
                onPress={() => handleChangeToProductDetail(item)}
              />
            )}
          />
        )
      ) : (
        <FlatList
          data={searchProducts}
          numColumns={2}
          contentContainerStyle={{
            paddingLeft: 18,
            alignItems: 'center',
          }}
          keyExtractor={(item) => item.product_id.toString()}
          renderItem={({ item }) => (
            <CardProducts
              data={item}
              onPress={() => handleChangeToProductDetail(item)}
            />
          )}
        />
      )}

      <Modal visible={cagoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          setSearchText={setSearchText}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
