import { NativeModules } from 'react-native';
const { StripeModule } = NativeModules;

// export const setPublishableKey = (key) => StripeModule.init(key);
// export const createTokenWithCard = (params) =>
//   StripeModule.createTokenWithCard(params);

export const stripeModule = {
  setPublishableKey: (key) => StripeModule.init(key),
  createTokenWithCard: (params) => StripeModule.createTokenWithCard(params),
};
