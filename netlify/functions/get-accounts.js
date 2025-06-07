const axios = require('axios');

exports.handler = async (event) => {
  try {
    const response = await axios.get('https://api.sampel.mx/accounts', {
      headers: {
        'X-API-KEY': process.env.SAMPLE_MX_API_KEY,
        'Accept': 'application/json'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};