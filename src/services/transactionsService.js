import { fetchAuthToken } from "./authService";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
if (!API_KEY) {
  throw new Error(
    "No se ha definico la llavel del API, favor agregala en el archivo .env.local",
  );
}

export const getTransactionHistory = async (bankId, accountNumber, page) => {
  const baseUrl = `http://localhost:3000/api/obl/v1/banks/${bankId}/accounts/${accountNumber}/transactions`;
  const queryParams = new URLSearchParams({ page_number: page });
  const token = await fetchAuthToken();
  const response = await fetch(`${baseUrl}?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-api-key": API_KEY,
    },
  });
  if (!response.ok) {
    throw new Error("No se pudieron cargar las cuentas.");
  }
  return await response.json();
};
