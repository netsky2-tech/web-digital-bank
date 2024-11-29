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
      const transactionData = {
        bankId: "BLNI",
        accountNumber: formData.originAccount,
        accountNumberTo: formData.destinationAccount,
        currency: formData.currency,
        amount: formData.amount,
        debitDescription: formData.debitDescription,
        creditDescription: formData.creditDescription,
        emailConfirmation: formData.emailConfirmation,
      };

      const result = await transactionRequest(transactionData);
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
          Continuar
        </button>
      </div>
    </form>
  );
};

export default TransferForm;
