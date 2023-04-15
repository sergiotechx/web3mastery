import axios from 'axios';


// URL de la API de CoinMarketCap v2
const url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest';
// Parámetros de la solicitud
const params = {
  symbol: 'BNB', // ID de símbolo de Binance Coin
  convert: 'USD' // ID de conversión de moneda para obtener el precio
};


// Encabezados de la solicitud con su clave de API de CoinMarketCap
const headers = {
  'Accepts': 'application/json',
  'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_CMC_KEY
};



async function getBNBQTY() {
  try {
    const response = await axios.get(url, { params: params, headers: headers });
    //Ruta de extracción del dato en Dolares
    const bnbPrice = response.data.data.BNB[0].quote.USD.price;
    //Cual es la fracción equivalente a 1 dolar en bnb
    const operation = 1 / bnbPrice;
    //redondeo a 18 decimales
    let roundedNumber = parseFloat(operation.toFixed(18));
    return roundedNumber;
    return 1;
  }
  catch (error) {

    console.error("error", error);
  }
}

export default getBNBQTY;