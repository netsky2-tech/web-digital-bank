"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getAccountWithBalances } from "@/services/accountsService";
import { getTransactionHistory } from "@/services/transactionsService";

const AccountsContexts = createContext();

export const useAccounts = () => {
  const context = useContext(AccountsContexts);
  if (!context) {
    throw new Error("useAccounts debe usarse dentro de AccountsProvider");
  }
  return context;
};

export const AccountsProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [errorTransactions, setErrorTransactions] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadAccounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAccountWithBalances({
          bankId: "BLNI",
          customerId: "100200",
          accountType: "S001",
        });
        setAccounts(data);
      } catch (error) {
        setError(error.message || "Error al cargar las cuentas.");
      } finally {
        setLoading(false);
      }
    };
    loadAccounts();
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      setLoadingTransactions(true);
      setErrorTransactions(null);
      getTransactionHistory(
        selectedAccount.bankId,
        selectedAccount.number,
        currentPage,
      )
        .then((data) => {
          setTransactions(data);
        })
        .catch((error) => {
          setErrorTransactions(
            error.message || "Error al cargar las transacciones",
          );
        })
        .finally(() => {
          setLoadingTransactions(false);
        });
    }
  }, [selectedAccount, currentPage]);

  const changeSelectedAccount = (account) => {
    setSelectedAccount(account);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const value = useMemo(
    () => ({
      accounts,
      setAccounts,
      loading,
      error,
      selectedAccount,
      setSelectedAccount,
      transactions,
      setTransactions,
      loadingTransactions,
      errorTransactions,
      changeSelectedAccount,
      handlePageChange,
    }),
    [
      accounts,
      loading,
      error,
      selectedAccount,
      transactions,
      loadingTransactions,
      errorTransactions,
    ],
  );

  return (
    <AccountsContexts.Provider value={value}>
      {children}
    </AccountsContexts.Provider>
  );
};
