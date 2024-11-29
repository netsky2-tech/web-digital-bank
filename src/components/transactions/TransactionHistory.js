import PropTypes from "prop-types";

import FilterDateForm from "./FilterDateForm";
import TransactionTable from "./TransactionTable";

const TransactionHistory = ({
  transactions,
  dateFrom,
  dateTo,
  transactionType,
  setDateFrom,
  setDateTo,
  setTransactionType,
  orderBy,
  order,
  setOrderBy,
  setOrder,
}) => {
  const handleOrderChange = (column) => {
    if (orderBy === column) {
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else {
      setOrderBy(column);
      setOrder("ASC");
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.transaction_date);
    const dateB = new Date(b.transaction_date);
    return dateA.getTime() - dateB.getTime(); // Orden ascendente
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-NI", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  return (
    <>
      <FilterDateForm
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        setTransactionType={setTransactionType}
        dateFrom={dateFrom}
        dateTo={dateTo}
        transactionType={transactionType}
      ></FilterDateForm>

      <TransactionTable
        sortedTransactions={sortedTransactions}
        handleOrderChange={handleOrderChange}
        orderBy={orderBy}
        order={order}
        formatCurrency={formatCurrency}
      ></TransactionTable>
    </>
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  transactionType: PropTypes.string,
  setDateFrom: PropTypes.func.isRequired,
  setDateTo: PropTypes.func.isRequired,
  setTransactionType: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(["ASC", "DESC"]),
  setOrderBy: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
};
export default TransactionHistory;
