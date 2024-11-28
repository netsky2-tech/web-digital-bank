"use client";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import TransactionHistory from "@/components/TransactionHistory";
import { useAccounts } from "@/contexts/AccountsContext";

const Transactions = () => {
  const {
    accounts,
    selectedAccount,
    transactions,
    loading,
    errorTransactions,
    changeSelectedAccount,
    handlePageChange,
    currentPage,
    dateFrom,
    dateTo,
    transactionType,
    setDateFrom,
    setDateTo,
    setTransactionType,
    page,
    totalPages,
    setPage,
    setOrderBy,
    setOrder,
  } = useAccounts();

  const handleAccountChange = (event) => {
    const accountId = event.target.value;
    const account = accounts.find(
      (acc) => acc.account_number === Number(accountId),
    );
    changeSelectedAccount(account);
  };

  if (loading) return <Spinner />;
  if (errorTransactions)
    return (
      <p className="text-red-500">
        Error al cargar las cuentas: {errorTransactions}
      </p>
    );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
          Historial de Transacciones
        </h1>
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
          <label htmlFor="cuenta_bancaria">Cuenta: </label>
          <select
            id="cuenta_bancaria"
            className="mb-4 p-2 border rounded"
            onChange={handleAccountChange}
            value={selectedAccount ? selectedAccount.account_number : ""}
          >
            <option value="">Selecciona una cuenta</option>
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

        <div className="w-full">
          <TransactionHistory
            transactions={transactions}
            dateFrom={dateFrom}
            dateTo={dateTo}
            transactionType={transactionType}
            setDateFrom={setDateFrom}
            setDateTo={setDateTo}
            setTransactionType={setTransactionType}
            onPageChange={handlePageChange}
            selectedAccount={selectedAccount}
            currentPage={currentPage}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
          />
        </div>

        <div className="mt-6 flex justify-center md:justify-between items-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          ></Pagination>
        </div>

        {errorTransactions && (
          <p className="text-red-500 text-center mt-4">{errorTransactions}</p>
        )}
      </div>
    </div>
  );
};
export default Transactions;
