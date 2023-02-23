import React, { useEffect, useState } from 'react';
import { Container, Form, Header, Input, LoadContainer, Title } from './styles';
import { ActivityIndicator, FlatList, Modal } from 'react-native';
import { CategorySelectButton } from '../../components/CategorySelectButton';
import { CardProducts } from '../../components/CardProducts';
import { CategorySelect } from '../CategorySelect';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { ProductsProps } from '../../DTO/ProductsDTO';
import theme from '../../global/styles/theme';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

interface CardProductsProps {
  data: ProductsProps;
  onPress: () => void;
  onAddToCart: () => void;
}
export function Products() {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'todos',
    name: 'Categorias',
  });
  const [filteredProducts, setFilteredProducts] = useState<ProductsProps[]>([]);

  const { navigate } = useNavigation<any>();
  const cartContext = useContext(CartContext);

  async function loadProducts() {
    try {
      setIsLoading(true);
      const response = await api.get(`products/product_list`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (category.key === 'todos') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (item) => item.category.toLowerCase() === category.key
      );
      setFilteredProducts(filtered);
    }
  }, [category, products]);

  useEffect(() => {
    if (searchText === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (item) => item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
      setFilteredProducts(filtered);
    }
  }, [searchText, products]);

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleChangeToProductDetail(product: ProductsProps) {
    navigate('Product', { product });
  }

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

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <FlatList
          data={filteredProducts}
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

      <Modal visible={categoryModalOpen}>
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
