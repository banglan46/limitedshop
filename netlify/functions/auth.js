const axios = require('axios');

exports.handler = async (event) => {
    try {
        const { email, password } = JSON.parse(event.body);
        
        // API_KEY sudah diset di Netlify Environment Variables
        const API_KEY = process.env.MAIL_SERVICE_API_KEY;
        
        // Contoh integrasi dengan layanan email API
        const response = await axios.post(
            'https://api.smtp.dev/account/{id}',
            { 
                email, 
                password,
                client_id: 'webmail-app' 
            },
            {
                headers: {
                    'X-API-Key': API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify({
                token: response.data.access_token,
                user: {
                    email: response.data.email,
                    name: response.data.name
                }
            })
        };
    } catch (error) {
        // Tangani error dari API eksternal
        const status = error.response?.status || 500;
        const message = error.response?.data?.error || 'Login gagal';

        return {
            statusCode: status,
            body: JSON.stringify({ error: message })
        };
    }
};