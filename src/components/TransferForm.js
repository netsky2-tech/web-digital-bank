"use client";
import { useState } from "react";

import SelectAccount from "./SelectAccount";
import TransactionDetails from "./TransactionDetails";

import { useAccounts } from "@/contexts/AccountsContext";
import { transactionRequest } from "@/services/transactionRequestService";

const TransferForm = () => {
  const { accounts } = useAccounts();
  const [formData, setFormData] = useState({
    originAccount: "",
    destinationAccount: "",
    amount: "",
    currency: "USD",
    debitDescription: "",
    creditDescription: "",
    beneficiaryName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setTransactionStatus(null);

    try {
      // Encuentra las cuentas seleccionadas
      const originAccount = accounts.find(
        (acc) => acc.account_number === Number(formData.originAccount),
      );
      const destinationAccount = accounts.find(
        (acc) => acc.account_number === Number(formData.destinationAccount),
      );

      if (!originAccount || !destinationAccount) {
        throw new Error("Por favor selecciona cuentas válidas.");
      }
      const transactionBody = {
        transfer_type: "OwnAccounts",
        debit_description: formData.debitDescription,
        to_transfer_to_own_accounts: {
          credit_description: formData.creditDescription,
          to: {
            name: destinationAccount.label,
            bank_code: destinationAccount.bankId,
            account: {
              number: destinationAccount.account_number,
              iban: "",
            },
          },
          value: {
            currency: formData.currency,
            amount: parseFloat(formData.amount),
          },
        },
      };

      const result = await transactionRequest(
        originAccount.bankId,
        originAccount.account_number,
        1,
        transactionBody,
      );
      setTransactionStatus(result);
    } catch (err) {
      setError(err.message || "Error al realizar la solicitud de transacción.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-white shadow rounded-lg p-6 space-y-6"
    >
      {/** Titulo */}
      <h1 className="text-xl font-bold text-gray-700">Transferir</h1>
      <p className="text-sm text-gray-500">
        Transferencia entre cuentas propias
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/**Cuenta Origen  */}
        <SelectAccount
          title="1. Cuenta origen"
          accounts={accounts}
          selected={formData.originAccount}
          onChange={(value) => handleInputChange("originAccount", value)}
        />
        {/**Cuenta Destino  */}
        <SelectAccount
          title="2. Cuenta origen"
          accounts={accounts}
          selected={formData.destinationAccount}
          onChange={(value) => handleInputChange("destinationAccount", value)}
        />
      </div>

      {/**Detalles */}
      <TransactionDetails formData={formData} onChange={handleInputChange} />

      {/**Botones */}
      <div className="flex flex-wrap justify-end gap-4">
        <button
          type="reset"
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Limpiar
        </button>
        <button
          type="button"
          className="bg-red-200 px-4 py-2 rounded-lg hover:bg-red-300 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          {loading ? "Procesando..." : "Continuar"}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {transactionStatus && (
        <p className="text-green-500 text-sm">Transacción exitosa</p>
      )}
    </form>
  );
};

export default TransferForm;
