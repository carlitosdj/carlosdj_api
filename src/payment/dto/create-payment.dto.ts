export class CreatePaymentDto {
  payment_method: string;
  user: PaymentUser;
  cart: PaymentCart;
}

class PaymentUser {
  address: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  name: string;
  email: string;
}

class PaymentCart {
  numcartao: string;
  nomecartao: string;
  expiryMonth: string;
  expiryYear: string;
  codcartao: string;
  installments: string;
  statement_descriptor: string;
  description: string;
  amount: string;
  code: string;
}
