import { Injectable } from '@nestjs/common';
const axios = require('axios');

const currencies = {
  USD: null,
  EUR: null,
  ILS: null,
};

const timeout = (from_currency_code) =>
  setTimeout(() => {
    currencies[from_currency_code] = null;
  }, 10000);

@Injectable()
export class AppService {
  async getHello(from_currency_code, to_currency_code, amount): Promise<any> {
    try {
      if (!from_currency_code || !to_currency_code || !amount) {
        return { error: 'Missed some props' };
      }

      if (from_currency_code === to_currency_code) {
        return {
          exchange_rate: 1,
          currency_code: to_currency_code,
          amount: amount,
        };
      }
      if (currencies[from_currency_code] === null) {
        const currentData = await axios.get(
          `https://freecurrencyapi.net/api/v2/latest?apikey=${process.env.API_KEY}&base_currency=${from_currency_code}`,
          );
          currencies[from_currency_code] = currentData;
          timeout(from_currency_code);
        }
      const exchange_rate =
        currencies[from_currency_code].data.data[to_currency_code];
      return {
        exchange_rate: exchange_rate.toFixed(3),
        currency_code: to_currency_code,
        amount: (exchange_rate * amount).toFixed(2),
      };
    } catch (e) {
      return e.message;
    }
  }
}
