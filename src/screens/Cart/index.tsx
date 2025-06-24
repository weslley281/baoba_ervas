import React, { useContext, useState } from 'react';
import { 
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from '../../components/Button';
import { CartContext } from '../../contexts/CartContext';
import { useAuth } from '../../hooks/auth';
import { ContainerUser } from '../../components/ContainerUser';
import { ButtonOrAndRemove } from '../../components/ButtonOrAndRemove';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { TypeOfDeliverySelect } from '../TypeOfDeliverySelect';
import { CategorySelectButton } from '../../components/CategorySelectButton';

export function Cart() {
    const { signOut, user } = useAuth();
  const { productsCart, addProductToCart, removeProductToCart } =
    useContext(CartContext);

  const [cardNumber, setCardNumber] = useState(0);
  const [expiryMonth, setExpiryMonth] = useState(0);
  const [expiryYear, setExpiryYear] = useState(0);
  const [installments, setInstallments] = useState(0);
  const [object, setObject] = useState('card');

  const [description, setDescription] = useState('Compra geral');
  const [cvc, setCvc] = useState(0);
  const [currency, setCurrency] = useState('brl');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState(0);
  // const [addressLine1, setAddressLine1] = useState('');
  // const [addressLine2, setAddressLine2] = useState('');
  // const [city, setCity] = useState('');
  // const [state, setState] = useState('');
  // const [postalCode, setPostalCode] = useState('');
  // const [country, setCountry] = useState('');
  const [installmentModalOpen, setInstallmentModalOpen] = useState(false);
  const [installment, setInstallment] = useState({
    key: '1',
    name: '1x',
  });
  const [typeOfDeliveryModalOpen, setTypeOfDeliveryModalOpen] = useState(false);
  const [type_delivery, setType_delivery] = useState({
    key: 'loja',
    name: 'Retirar na Loja',
  });

  const { navigate } = useNavigation<any>();

  const totalItems = productsCart.reduce(
    (accumulator, product) => accumulator + product.qtd,
    0
  );

  const totalItemsValue = productsCart.reduce(
    (accumulator, product) => accumulator + product.value,
    0
  );

  const [amount, setAmount] = useState(totalItemsValue);

  const handlePayment = async () => {
    setAmount(totalItemsValue);
    const amountFormatted = Math.round(amount * 100);
    console.log('------------------------CLicou------------------');

    console.log(`cardNumber = ${cardNumber}`);
    console.log(`expiryMonth = ${expiryMonth}`);
    console.log(`expiryYear = ${expiryYear}`);
    console.log(`installments = ${installments}`);
    console.log(`cpf = ${cpf}`);
    console.log(`cvc = ${cvc}`);
    console.log(`name = ${name}`);
    console.log(`amount = ${amount}`);

    if (
      cardNumber === 0 ||
      expiryMonth === 0 ||
      expiryYear === 0 ||
      installments === 0 ||
      amount === 0 ||
      cpf === 0 ||
      cvc === 0 ||
      name === ''
    ) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    const obj = {
      user_id: user.id,
      user_email: user.email,
      user_name: user.name,
      amount: amountFormatted,
      currency,
      description,
      type_delivery: type_delivery.key,
      source: {
        object,
        number: cardNumber.toString(),
        exp_month: expiryMonth.toString(),
        exp_year: expiryYear.toString(),
        cvc: cvc.toString(),
        installments,
      },
    };

    console.log(obj);

    try {
      const response = await api.post('payments/stripe', obj);
      console.log(response.data);
      Alert.alert('Alerta', 'Venda efetuada com sucesso');
      navigate('Checkout');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Erro', error.message);
    }
  };

  const totalItemsValueFormatted = totalItemsValue
    .toFixed(2)
    .toString()
    .replace('.', ',');

  function handleAddToCart(
    id: number,
    value: number,
    valueFixed: number,
    name: string,
    photo: string
  ) {
    addProductToCart(id, value, valueFixed, name, photo);
  }

  function handleRemoveToCart(id: number, value: number) {
    removeProductToCart(id, value);
  }

  function changeDate(text: string) {
    const date = text.split('/');
    setExpiryMonth(Number(date[0]));
    setExpiryYear(Number(date[1]));
  }

  function handleCardNumberChange(text: any) {
    const cleanedText = text.replace(/\s+/g, ''); // remove espaços em branco da string
    setCardNumber(Number(cleanedText));
  }

  function handleCpf(text: any) {
    const cleanedText = text.replace(/[^\d]/g, ''); // remove espaços em branco da string
    setCpf(Number(cleanedText));
  }

  function handleOpenSelectTypeOfDeliveryModal() {
    setTypeOfDeliveryModalOpen(true);
  }

  function handleCloseSelectTypeOfDeliveryModal() {
    setTypeOfDeliveryModalOpen(false);
  }

  function handleOpenSelectInstallmentModal() {
    setInstallmentModalOpen(true);
  }

  function handleCloseSelectInstallmentModal() {
    setInstallmentModalOpen(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ContainerUser name={user.name} photo={user.photo!} signOut={signOut} />
        <View style={styles.header}>
          <Text style={styles.title}>Meus Produtos</Text>
        </View>

        <ScrollView style={styles.cartContainer}>
          {productsCart.map((product) => {
            const priceFormated = product.value
              .toFixed(2)
              .toString()
              .replace('.', ',');
            const priceFixed = product.value / product.qtd;

            return (
              <View key={product.id} style={styles.productContainer}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: product.photo }} style={styles.imageCart} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textCart}>
                    {product.name} - {product.qtd} und - R$ {priceFormated}
                  </Text>
                </View>
                <View style={styles.addOrRemoveContainer}>
                  <ButtonOrAndRemove
                    sizeButton={35}
                    sizeIcon={20}
                    type="add"
                    onPress={() => {
                      handleAddToCart(
                        product.id,
                        priceFixed,
                        priceFixed,
                        product.name,
                        product.photo
                      );
                    }}
                  />
                  <ButtonOrAndRemove
                    sizeButton={35}
                    sizeIcon={20}
                    type="remove"
                    onPress={() => {
                      handleRemoveToCart(product.id, product.valueFixed);
                    }}
                  />
                </View>
              </View>
            );
          })}

          <View style={styles.footer}>
            <Text style={styles.textFooter}>Quantidade de itens = {totalItems}</Text>
            <Text style={styles.textFooter}>Total = {totalItemsValueFormatted}</Text>

            <View style={styles.form}>
              <Text style={styles.textFooter}>Nome:</Text>
              <TextInput
                style={styles.bigInput}
                onChangeText={setName}
                value={name}
                placeholder="fulano de tal"
              />

              <Text style={styles.textFooter}>Numero do Cartão:</Text>
              <TextInputMask
                style={styles.inputMaskedCard}
                type={'credit-card'}
                placeholder="4242 4242 4242 4242"
                onChangeText={handleCardNumberChange}
              />

              <View style={styles.mediumForm}>
                <View style={styles.smallForm}>
                  <Text style={styles.textFooter}>Data:</Text>
                  <TextInputMask
                    style={styles.mediumInput}
                    type="custom"
                    options={{ mask: '99/99' }}
                    onChangeText={changeDate}
                    placeholder="12/24"
                  />
                </View>
                <View style={styles.smallForm}>
                  <Text style={styles.textFooter}>Cvc:</Text>
                  <TextInputMask
                    style={styles.mediumInput}
                    type="custom"
                    options={{ mask: '999' }}
                    onChangeText={(text) => setCvc(Number(text))}
                    maxLength={16}
                    placeholder="123"
                  />
                </View>
              </View>

              <Text style={styles.textFooter}>Cpf:</Text>
              <TextInputMask
                style={styles.inputMaskedCard}
                type="cpf"
                onChangeText={handleCpf}
                maxLength={16}
                placeholder="000.000.000-00"
              />

              <Text style={styles.textFooter}>Numero de Parcelas:</Text>
              <TextInput
                style={styles.bigInput}
                onChangeText={(text) => setInstallments(Number(text))}
                placeholder=""
                keyboardType="numeric"
              />

              <CategorySelectButton
                onPress={handleOpenSelectTypeOfDeliveryModal}
                title={type_delivery.name}
              />
            </View>

            <Button
              title="Comprar"
              light="true"
              onPress={handlePayment}
            />
          </View>
        </ScrollView>

        <Modal visible={installmentModalOpen}>
          <TypeOfDeliverySelect
            typeOfDelivery={type_delivery}
            setTypeOfDelivery={setType_delivery}
            closeSelectTypeOfDelivery={handleCloseSelectInstallmentModal}
          />
        </Modal>

        <Modal visible={typeOfDeliveryModalOpen}>
          <TypeOfDeliverySelect
            typeOfDelivery={type_delivery}
            setTypeOfDelivery={setType_delivery}
            closeSelectTypeOfDelivery={handleCloseSelectTypeOfDeliveryModal}
          />
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold' },
  cartContainer: { flex: 1, padding: 16 },
  productContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  imageContainer: { marginRight: 8 },
  imageCart: { width: 60, height: 60, borderRadius: 8 },
  textContainer: { flex: 1 },
  textCart: { fontSize: 16 },
  addOrRemoveContainer: { flexDirection: 'row', alignItems: 'center' },
  footer: { marginTop: 16 },
  textFooter: { fontSize: 16, marginVertical: 4 },
  form: { marginTop: 16 },
  bigInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 8 },
  inputMaskedCard: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 8 },
  mediumForm: { flexDirection: 'row', justifyContent: 'space-between' },
  smallForm: { flex: 1, marginRight: 8 },
  mediumInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 8 },
});

