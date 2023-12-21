import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { InvalidRelationError } from 'src/errors/invalid-relation.error';

@Injectable()
export class PaymentService {
  constructor(private readonly httpService: HttpService) {}

  async createOrder(createPaymentDto: CreatePaymentDto) {
    const selectedPayment = createPaymentDto.payment_method;

    console.log('selectedPayment', selectedPayment);
    let credit_card = {};
    let pix = {};
    let boleto = {};
    let checkoutPagarMe = {};

    if (selectedPayment === 'credit_card') {
      credit_card = {
        credit_card: {
          card: {
            billing_address: {
              line_1: createPaymentDto.user.address,
              zip_code: createPaymentDto.user.postalCode,
              city: createPaymentDto.user.city,
              state: createPaymentDto.user.state,
              country: createPaymentDto.user.country,
            },
            number: createPaymentDto.cart.numcartao.replace(/\D/g, ''), //'4000000000000010', //request.body.cart.numcartao.replace(/\D/g, ''), //'4000000000000010',
            holder_name: createPaymentDto.cart.nomecartao, //'Carlos Api', //request.body.cart.nomecartao, //'Carlos API',
            exp_month: createPaymentDto.cart.expiryMonth, //'1', //request.body.cart.expiryMonth, //1,
            exp_year: createPaymentDto.cart.expiryYear, //'30', //request.body.cart.expiryYear, //30,
            cvv: createPaymentDto.cart.codcartao, //'3531', // request.body.cart.codcartao, //'3531'
          },
          recurrence: false,
          installments: createPaymentDto.cart.installments, //'3', //request.body.cart.parcelas,
          statement_descriptor: createPaymentDto.cart.statement_descriptor,
        },
        payment_method: 'credit_card',
      };
    }

    if (selectedPayment === 'pix') {
      pix = {
        payment_method: 'pix',
        pix: {
          expires_in: '52134613',
          additional_information: [
            {
              name: 'Quantidade',
              value: '2',
            },
          ],
        },
      };
    }

    if (selectedPayment === 'boleto') {
      boleto = {
        payment_method: 'boleto',
        boleto: {
          instructions: 'Pagar até o vencimento',
          due_at: '2023-12-22T00:00:00Z',
          document_number: '123',
          type: 'DM',
        },
      };
    }

    if (selectedPayment === 'checkoutPagarMe') {
      checkoutPagarMe = {
        amount: '', //request.body.cart.total * 100,
        payment_method: 'checkout',
        checkout: {
          expires_in: 120,
          billing_address_editable: false,
          customer_editable: true,
          accepted_payment_methods: [
            'credit_card',
            'boleto',
            'pix',
            'bank_transfer',
            'debit_card',
          ],
          accepted_multi_payment_methods: [
            ['credit_card', 'credit_card'],
            ['credit_card', 'boleto'],
          ],
          bank_transfer: {
            bank: ['237', '001', '341'],
          },
          boleto: {
            bank: '033',
            instructions: 'Pagar até o vencimento',
            due_at: '2023-08-25T00:00:00Z',
          },
          credit_card: {
            capture: true,
            statement_descriptor: 'Desc na fatura',
            installments: [
              {
                number: 1,
                total: 2000,
              },
              {
                number: 2,
                total: 2500,
              },
            ],
          },
          pix: {
            expires_in: 100000,
          },
          // voucher: {
          //   capture: true,
          //   statement_descriptor: "pagar.me",
          // },
          debit_card: {
            authentication: {
              statement_descriptor: 'Desc na fatura',
              type: 'threed_secure',
              threed_secure: {
                mpi: 'acquirer',
                success_url: 'http://www.pagar.me',
              },
            },
          },

          success_url: 'http://localhost:3013/thankyou/carlos',
        },
      };
    }

    let paymentChoose;
    if (selectedPayment === 'credit_card') paymentChoose = credit_card;
    if (selectedPayment === 'pix') paymentChoose = pix;
    if (selectedPayment === 'boleto') paymentChoose = boleto;
    if (selectedPayment === 'checkoutPagarMe') paymentChoose = checkoutPagarMe;

    const options = {
      method: 'POST',
      url: 'https://api.pagar.me/core/v5/orders',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic c2tfdGVzdF9MV2dBcG0xU2FmcGRuNjFZOg==',
      },
      data: {
        customer: {
          name: createPaymentDto.user.name, //'Carlos Defelicibus Junior', //'Tony Stark',
          email: createPaymentDto.user.email, //'carlitosceo@gmail.com', //'avengerstark@ligadajustica.com.br',
          document_type: createPaymentDto.user.document_type,
          document: createPaymentDto.user.document,
          type: createPaymentDto.user.type,
          phones: {
            mobile_phone: {
              country_code: createPaymentDto.user.country_code,
              number: createPaymentDto.user.number,
              area_code: createPaymentDto.user.area_code,
            },
          },
        },
        items: [
          {
            amount: createPaymentDto.cart.amount, //2990 = 29,90
            description: createPaymentDto.cart.description, //'Chaveiro do Tesseract',
            quantity: 1,
            code: createPaymentDto.cart.code,
          },
        ],
        //ip: '52.168.67.32',
        //location: { latitude: '-22.970722', longitude: '43.182365' },
        antifraud: { type: 'clearsale', clearsale: { custom_sla: '90' } },
        //session_id: '322b821a',
        //device: { platform: 'ANDROID OS' },
        payments: [
          {
            ...paymentChoose,
          },
        ],
      },
    };

    return axios
      .request(options)
      .then(function (response) {
        //console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error.response.data);
        //throw new (error.response.data.errors);
        throw new InvalidRelationError(
          JSON.stringify(error.response.data.errors),
        );
      });
  }


  async webHook(webHook: any) {
    console.log("webHook received..", webHook)
    console.log("webHook received...")
    return 'opa';
  }
}
