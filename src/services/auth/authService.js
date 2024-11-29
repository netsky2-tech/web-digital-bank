let accessToken = null;
let tokenExpiration = null;
let cachedToken = null;

export const fetchAuthToken = async () => {
  if (cachedToken) {
    return cachedToken;
  }
  const tokenUrl = "http://localhost:3000/api/oauth2/token";

  try {
    if (accessToken && tokenExpiration > Date.now()) {
      return accessToken;
    }

    const formData = new URLSearchParams({
      grant_type: "client_credentials",
    });

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error("Error al obtener el token de autenticación");
    }

    const data = await response.json();

    // Guardamos el token y su expiración
    accessToken = data.access_token;
    tokenExpiration = Date.now() + data.expires_in * 1000;
    cachedToken = accessToken;

    return cachedToken;
  } catch (error) {
    console.error("Error al obtener el token:", error);
    throw error;
  }
};
