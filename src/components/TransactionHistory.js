import PropTypes from "prop-types";

import Pagination from "./Pagination";

const TransactionHistory = ({
  transactions,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Fecha</th>
            <th className="border border-gray-300 p-2 text-left">
              Descripción
            </th>
            <th className="border border-gray-300 p-2 text-right">Monto</th>
            <th className="border border-gray-300 p-2 text-right">Tipo</th>
            <th className="border border-gray-300 p-2 text-right">Balance</th>
            <th className="border border-gray-300 p-2 text-left">
              Confirmación
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">
                {new Date(transaction.transaction_date).toLocaleString()}
              </td>
              <td className="border border-gray-300 p-2">
                {transaction.transaction_description}
              </td>
              <td className="border border-gray-300 p-2 text-right">
                {transaction.transaction_amount}
              </td>
              <td className="border border-gray-300 p-2 text-right">
                {transaction.transaction_type}
              </td>
              <td className="border border-gray-300 p-2 text-right">
                {transaction.account_balance}
              </td>
              <td className="border border-gray-300 p-2">
                {transaction.confirmation_number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default TransactionHistory;
