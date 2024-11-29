"use client";
import { useState } from "react";

import SelectAccount from "../account/SelectAccount";
import Notification from "../UI/Notification";
import TransferResultModal from "../UI/TransferResultModal";

import TransactionDetails from "./TransactionDetails";

import { useAccounts } from "@/contexts/AccountsContext";
import { transactionRequest } from "@/services/transactions/transactionRequestService";

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

    if (
      !formData.originAccount ||
      !formData.destinationAccount ||
      !formData.amount
    ) {
      setError("Por favor, complete los campos requeridos.");
      setLoading(false);
      return;
    }

    if (formData.originAccount === formData.destinationAccount) {
      setError(
        "La cuenta de origen y la cuenta de destino deben ser diferentes.",
      );
      setLoading(false);
      return;
    }

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

      if (parseFloat(formData.amount) > originAccount.balance) {
        setError("Saldo insuficiente en la cuenta de origen.");
        setLoading(false);
        return;
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
  const resetForm = () => {
    setFormData({
      originAccount: "",
      destinationAccount: "",
      amount: "",
      currency: "USD",
      debitDescription: "",
      creditDescription: "",
      beneficiaryName: "",
    });
  };

  const availableDestinationAccounts = accounts.filter(
    (acc) => acc.account_number !== Number(formData.originAccount),
  );
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
          accounts={availableDestinationAccounts}
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
          onClick={resetForm}
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
      {error && (
        <Notification
          message={error}
          type="error"
          persistent={true}
          onClose={() => setError(null)}
        />
      )}
      {transactionStatus && (
        <Notification
          message={`Transacción realizada con éxito. ${transactionStatus}`}
          type="success"
        />
      )}
      {transactionStatus && (
        <TransferResultModal
          transactionData={transactionStatus}
          onClose={() => {
            setTransactionStatus(null);
            resetForm();
          }}
        ></TransferResultModal>
      )}
    </form>
  );
};

export default TransferForm;
