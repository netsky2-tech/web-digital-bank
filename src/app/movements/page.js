"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import TransactionHistory from "@/components/TransactionHistory";

const Movements = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const route = useRouter();

  useEffect(() => {
    if (selectedAccount) {
      setLoading(true);
      fetchTransactions(
        selectedAccount.bankId,
        selectedAccount.number,
        currentPage,
      )
        .then((data) => {
          setTransactions(data.content);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedAccount, currentPage]);

  const handleAccountChange = (event) => {
    const accountId = event.target.value;
    const account = accounts.find((acc) => acc.id === accountId);
    setSelectedAccount(account);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Historial de Transacciones</h1>
      <select
        className="mb-4 p-2 border rounded"
        onChange={handleAccountChange}
        value={selectedAccount ? selectedAccount.id : ""}
      >
        <option value="">Selecciona una cuenta</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name} - {account.number}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Cargando transacciones...</p>
      ) : selectedAccount ? (
        <TransactionHistory
          transactions={transactions}
          currentPage={currentPage}
          totalPages={transactions.totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (
        <p>Por favor selecciona una cuenta.</p>
      )}
    </div>
  );
};
export default Movements;
