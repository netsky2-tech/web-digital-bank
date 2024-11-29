"use client";
import { useState } from "react";

import { useAccounts } from "@/contexts/AccountsContext";
import { transactionRequest } from "@/services/transactionRequestService";

const TransferForm = () => {
  const { accounts } = useAccounts();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const transactionData = {
      bankId: "BLNI",
      accountNumber: "100200",
      viewId: "view123",
      transferType: "OwnAccounts",
      debitDescription: "Debit description",
      creditDescription: "Credit description",
      beneficiaryName,
      bankCode: "BLNI",
      accountNumberTo: "100200300",
      currency: "USD",
      amount,
    };

    setLoading(true);
    setError(null);
    setTransactionStatus(null);

    try {
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
      className="bg-white shadow rounded-lg p-6 space-y-6"
    >
      {/** Titulo */}
      <h1 className="text-xl font-bold text-gray-700">Transferir</h1>
      <p className="text-sm text-gray-500">
        Transferencia entre cuentas propias
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/**Cuenta Origen  */}
        <div>
          <h2 className="font-bold text-gray-700">1. Cuenta origen</h2>
          <select value={""} className="w-full p-2 border rounded-md">
            <option value="" disabled>
              Selecciona una cuenta
            </option>
            {accounts.map((account) => (
              <option
                key={account.account_number}
                value={account.account_number}
              >
                {account.bankId} {account.account_number} - {account.currency}{" "}
                {account.balance}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="font-bold text-gray-700">2. Cuenta destino</h2>
          <select value={""} className="w-full p-2 border rounded-md">
            <option value="" disabled>
              Selecciona una cuenta
            </option>
            {accounts.map((account) => (
              <option
                key={account.account_number}
                value={account.account_number}
              >
                {account.bankId} {account.account_number} - {account.currency}{" "}
                {account.balance}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/**Monto a transferir */}
      <div>
        <h2 className="font-bold text-gray-700">3. Monto a transferir</h2>
        <div className="flex items-center space-x-4">
          <select className="w-1/2 p-2 border rounded-md">
            <option value="NIO">C$</option>
            <option value="USD">$</option>
          </select>
          <input
            type="number"
            min={0}
            placeholder="1,000.00"
            className="w-1/2 p-2 border rounded-md text-right"
          ></input>
        </div>
      </div>

      {/**Detalles */}
      <div>
        <h2 className="font-bold text-gray-700">4. Datos adicionales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/**Concepto del débito */}
          <div>
            <label
              htmlFor="concepto_debito"
              className="block text-sm text-gray-600"
            >
              Concepto del débito
            </label>
            <input
              id="concepto_debito"
              type="text"
              placeholder="Escriba el concepto del débito"
              className="w-full p-2 border rounded-md"
            ></input>
          </div>
          {/**Concepto del crédito */}
          <div>
            <label
              htmlFor="concepto_credito"
              className="block text-sm text-gray-600"
            >
              Concepto del crédito
            </label>
            <input
              id="concepto_credito"
              type="text"
              placeholder="Escriba el concepto del crédito"
              className="w-full p-2 border rounded-md"
            ></input>
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="email_confirmacion"
            className="block text-sm text-gray-600"
          >
            Enviar confirmación a:
          </label>
          <input
            id="email_confirmacion"
            type="email"
            placeholder="correo@example.com"
            className="w-full p-2 border rounded-md"
          ></input>
        </div>
      </div>

      {/**Botones */}
      <div className="flex justify-end space-x-4">
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
