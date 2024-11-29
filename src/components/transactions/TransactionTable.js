import PropTypes from "prop-types";
const TransactionTable = ({
  transactions,
  handleOrderChange,
  orderBy,
  order,
  formatCurrency,
}) => {
  const processedTransactions = transactions.map((transaction) => {
    const transactionDate = new Date(
      transaction.transaction_date,
    ).toLocaleString();
    const transactionAmount = transaction.transaction_amount;
    const transactionType = transaction.transaction_type;
    const transactionDescription = transaction.transaction_description;

    const balance =
      transactionType === "DEBIT"
        ? transaction.account_balance - transactionAmount
        : transaction.account_balance + transactionAmount;

    return {
      ...transaction,
      transactionDate,
      transactionDescription,
      debit:
        transactionType === "DEBIT" ? formatCurrency(transactionAmount) : "-",
      credit:
        transactionType === "CREDIT" ? formatCurrency(transactionAmount) : "-",
      balance: formatCurrency(balance),
    };
  });
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="table-auto min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th
              scope="col"
              onClick={() => handleOrderChange("transaction_date")}
              className="cursor-pointer border border-gray-300 p-2 text-left md:text-base"
            >
              Fecha{" "}
              {orderBy === "transaction_date" && (order === "ASC" ? "↑" : "↓")}
            </th>
            <th
              scope="col"
              onClick={() => handleOrderChange("transaction_description")}
              className="cursor-pointer border border-gray-300 p-2 text-left md:text-base"
            >
              Descripción
            </th>
            <th
              scope="col"
              onClick={() => handleOrderChange("transaction_amount")}
              className="cursor-pointer border border-gray-300 p-2 text-left md:text-base"
            >
              Débito
            </th>
            <th
              scope="col"
              onClick={() => handleOrderChange("transaction_amount")}
              className="cursor-pointer border border-gray-300 p-2 text-left md:text-base"
            >
              Crédito
            </th>
            <th scope="col" className="border border-gray-300 p-2 text-right">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {processedTransactions.map((transaction, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">
                {transaction.transactionDate}
              </td>
              <td className="border border-gray-300 p-2">
                {transaction.transactionDescription}
              </td>
              <td className="border border-gray-300 p-2 text-right">
                {transaction.debit}
              </td>
              <td className="border border-gray-300 p-2 text-right">
                {transaction.credit}
              </td>
              <td className="border border-gray-300 p-2 text-right">
                {transaction.balance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOrderChange: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.oneOf(["ASC", "DESC"]).isRequired,
  formatCurrency: PropTypes.func.isRequired,
};
export default TransactionTable;
