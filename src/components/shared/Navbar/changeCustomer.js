// components/BankIdModal.js

import { useState } from "react";

import { fetchAccounts } from "@/services/account/accountsService";

const ChangeCustomer = ({ isOpen, onClose, onSave }) => {
  const [bankId, setBankId] = useState("BLNI");
  const [customerId, setCustomerId] = useState("100200");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!bankId || !customerId) {
      setError("Ambos campos son requeridos.");
      return;
    }

    onSave({ bankId, customerId });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Configurar Datos</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="bankId"
            className="block text-sm font-medium text-gray-700"
          >
            Bank ID
          </label>
          <input
            id="bankId"
            type="text"
            value={bankId}
            onChange={(e) => setBankId(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="customerId"
            className="block text-sm font-medium text-gray-700"
          >
            Customer ID
          </label>
          <input
            id="customerId"
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeCustomer;
