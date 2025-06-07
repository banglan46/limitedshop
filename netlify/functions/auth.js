exports.handler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);
    const API_KEY = process.env.MAIL_SERVICE_API_KEY;
    
    // Ganti dengan API endpoint asli Anda
    const API_ENDPOINT = "https://api.smtp.dev/accounts";
    
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "X-API-Key": API_KEY,
        "Accept": "application/json"
      },
      body: JSON.stringify({ 
        email, 
        password,
        client_id: "webmail-app" 
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login gagal");
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        token: data.access_token,
        user: {
          email: data.email,
          name: data.name
        }
      })
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ 
        error: error.message || "Terjadi kesalahan" 
      })
    };
  }
};