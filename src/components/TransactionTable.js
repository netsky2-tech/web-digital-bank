const TransactionTable = (
{  sortedTransactions,
  handleOrderChange,
  orderBy,
  order,
  formatCurrency,}
) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="table-auto min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th
              onClick={() => handleOrderChange("transaction_date")}
              className="cursor-pointer border border-gray-300 p-2 text-left md:text-base"
            >
              Fecha{" "}
              {orderBy === "transaction_date" && (order === "ASC" ? "↑" : "↓")}
            </th>
            <th
              onClick={() => handleOrderChange("transaction_description")}
              className="cursor-pointer border border-gray-300 p-2 text-left md:text-base"
            >
              Descripción
            </th>
            <th
              onClick={() => handleOrderChange("transaction_amount")}
              className="cursor-pointer border border-gray-300 p-2 text-left md:text-base"
            >
              Débito
            </th>
            <th
              onClick={() => handleOrderChange("transaction_amount")}
              className="cursor-pointer border border-gray-300 p-2 text-left md:text-base"
            >
              Crédito
            </th>
            <th className="border border-gray-300 p-2 text-right">Balance</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction, index) => {
            let previousBalance = transaction.account_balance;
            const transactionAmount = transaction.transaction_amount;
            const transactionType = transaction.transaction_type;
            const transactionDate = new Date(
              transaction.transaction_date,
            ).toLocaleString();
            const transactionDescription = transaction.transaction_description;

            let currentBalance = previousBalance;
            if (transactionType === "DEBIT") {
              currentBalance -= transactionAmount;
            } else if (transactionType === "CREDIT") {
              currentBalance += transactionAmount;
            } else {
              currentBalance = previousBalance;
            }

            previousBalance = currentBalance;

            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">
                  {transactionDate}
                </td>
                <td className="border border-gray-300 p-2">
                  {transactionDescription}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {transactionType === "DEBIT"
                    ? formatCurrency(transactionAmount)
                    : "-"}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {transactionType === "CREDIT"
                    ? formatCurrency(transactionAmount)
                    : "-"}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {formatCurrency(currentBalance)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
