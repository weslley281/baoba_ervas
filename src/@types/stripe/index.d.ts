declare module 'stripe' {
  export interface Stripe {
    setPublishableKey(key: string): void;
    createTokenWithCard(params: any): Promise<any>;
    // adicione outras propriedades e métodos do Stripe que você estiver usando
  }

  const Stripe: Stripe;
  export default Stripe;
}
