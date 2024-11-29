import { fetchAuthToken } from "./authService";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
if (!API_KEY) {
  throw new Error(
    "No se ha definico la llavel del API, favor agregala en el archivo .env.local",
  );
}

export const fetchExchangesRates = async (bankId) => {
  const baseUrl = `http://localhost:3000/api/obl/v1/banks/${bankId}/rates`;

  const token = await fetchAuthToken();

  const response = await fetch(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-api-key": API_KEY,
    },
  });
  if (!response.ok) {
    throw new Error("No se pudieron cargar las tasas de cambio.");
  }
  return await response.json();
};
