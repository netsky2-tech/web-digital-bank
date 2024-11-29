import { fetchAuthToken } from "../auth/authService";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
if (!API_KEY) {
  throw new Error(
    "No se ha definico la llavel del API, favor agregala en el archivo .env.local",
  );
}

export const transactionRequest = async (
  bankId,
  accountNumber,
  viewId = 1,
  transactionBody,
) => {
  const baseUrl = `http://localhost:3000/api/obl/v1/banks/${bankId}/accounts/${accountNumber}/${viewId}/transaction-request-types/FREE_FORM/transaction-requests`;

  const token = await fetchAuthToken();
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      accept: "application/json",
      "x-api-key": API_KEY,
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transactionBody),
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud de transacción.");
  }
  return await response.json();
};
