"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getAccountWithBalances } from "@/services/account/accountsService";
import { getTransactionHistory } from "@/services/transactions/transactionsService";

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

  // Parámetros para las transacciones
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [orderBy, setOrderBy] = useState("transaction_date");
  const [order, setOrder] = useState("ASC");
  const [transactionType, setTransactionType] = useState("ALL");
  const [bankId, setBankId] = useState("BLNI");
  const [customerId, setCustomerId] = useState("100200");

  // Totales de paginación
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadAccounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAccountWithBalances({
          bankId: bankId,
          customerId: customerId,
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
  }, [bankId, customerId]);

  useEffect(() => {
    if (selectedAccount) {
      setLoading(true);
      setErrorTransactions(null);
      getTransactionHistory(
        selectedAccount.bankId,
        selectedAccount.account_number,
        dateFrom,
        dateTo,
        currentPage,
        pageSize,
        orderBy,
        order,
        transactionType,
      )
        .then((data) => {
          setTransactions(data.content);
          setTotalPages(data.totalPages || 1);
          setCurrentPage(data.current_page_number);
          setLoading(false);
        })
        .catch((error) => {
          setErrorTransactions(
            error.message || "Error al cargar las transacciones",
          );
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [
    selectedAccount,
    currentPage,
    dateFrom,
    dateTo,
    pageSize,
    orderBy,
    order,
    transactionType,
  ]);

  const changeSelectedAccount = (account) => {
    setSelectedAccount(account);
    setPage(1);
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
      dateFrom,
      dateTo,
      page,
      pageSize,
      orderBy,
      order,
      transactionType,
      totalPages,
      setDateFrom,
      setDateTo,
      setPage,
      setPageSize,
      setOrderBy,
      setOrder,
      setTransactionType,
      currentPage,
      setLoading,
      setError,
      setTotalPages,
      setCurrentPage,
      bankId,
      setBankId,
      customerId,
      setCustomerId,
    }),
    [
      accounts,
      loading,
      error,
      selectedAccount,
      transactions,
      loadingTransactions,
      errorTransactions,
      currentPage,
      dateFrom,
      dateTo,
      page,
      pageSize,
      orderBy,
      order,
      transactionType,
      totalPages,
      bankId,
      setBankId,
      customerId,
      setCustomerId,
    ],
  );

  return (
    <AccountsContexts.Provider value={value}>
      {children}
    </AccountsContexts.Provider>
  );
};
