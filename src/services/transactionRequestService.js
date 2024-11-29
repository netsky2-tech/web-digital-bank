import { fetchAuthToken } from "./authService";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
if (!API_KEY) {
  throw new Error(
    "No se ha definico la llavel del API, favor agregala en el archivo .env.local",
  );
}

export const transactionRequest = async (
  bankId,
  accountNumber,
  viewId,
  transferType,
  debitDescription,
  creditDescription,
  beneficiaryName,
  bankCode,
  accountNumberTo,
  currency,
  amount,
) => {
  const baseUrl = `http://localhost:3000/api/obl/v1//banks/${bankId}/accounts/${accountNumber}/${viewId}/transaction-request-types/FREE_FORM/transaction-requests`;
  const body = {
    transfer_type: transferType,
    debit_description: debitDescription,
    to_transfer_to_own_accounts: {
      credit_description: creditDescription,
      to: {
        name: beneficiaryName,
        bank_code: bankCode,
        number: accountNumberTo,
        iban: "",
      },
    },
    value: {
      currency: currency,
      amount: amount,
    },
  };
  const token = await fetchAuthToken();

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud de transacción.");
  }
  return await response.json();
};
