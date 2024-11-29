import { fetchAuthToken } from "../auth/authService";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
if (!API_KEY) {
  throw new Error(
    "No se ha definico la llavel del API, favor agregala en el archivo .env.local",
  );
}
export const getTransactionHistory = async (
  bankId = "BLNI",
  accountNumber = "",
  dateFrom = "",
  dateTo = "",
  page = 1,
  pageSize = 20,
  orderBy = "transaction_date",
  order = "ASC",
  transactionType = "ALL",
) => {
  const baseUrl = `http://localhost:3000/api/obl/v1/banks/${bankId}/accounts/${accountNumber}/transactions`;
  const queryParams = new URLSearchParams({
    date_from: dateFrom,
    date_to: dateTo,
    page_number: page,
    page_size: pageSize,
    order_by: orderBy,
    order: order,
    transaction_type: transactionType,
  });
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
