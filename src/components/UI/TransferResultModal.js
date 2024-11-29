import PropTypes from "prop-types";
import { useState } from "react";

const TransferResultModal = ({ transactionData, onClose, updateAccounts }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const hasError = transactionData?.error_message?.length > 0;
  const statusClass = hasError ? "text-red-500" : "text-green-500";
  const statusText = hasError
    ? "Error en la transacción"
    : "Transacción exitosa";

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();

    if (updateAccounts) {
      updateAccounts(); // Actualiza las cuentas con los nuevos datos
    }
  };
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 md:max-w-4xl md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-semibold ${statusClass}`}>
                {statusText}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  onClose();
                }}
                className="text-gray-600 hover:text-gray-900 font-bold"
                aria-label="Cerrar modal"
              >
                X
              </button>
            </div>

            {/* Información de la transacción */}
            <div className="space-y-6">
              {/* Información de la transacción */}
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-semibold">Detalles de la Transacción</h3>
                <p>
                  <strong>Transacción: </strong>
                  {transactionData.transaction_number}
                </p>
                <p>
                  <strong>Descripción del Débito: </strong>
                  {transactionData.debit_description}
                </p>
                <p>
                  <strong>Tipo de Transacción: </strong>
                  {transactionData.type}
                </p>
              </div>

              {/* Información de la Cuenta de Origen */}
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-semibold">Cuenta de Origen</h3>
                <p>
                  <strong>Banco: </strong>
                  {transactionData.from.bank_id}
                </p>
                <p>
                  <strong>Cuenta: </strong>
                  {transactionData.from.account_id}
                </p>
                <p>
                  <strong>Moneda: </strong>
                  {transactionData.from.currency_id}
                </p>
                <p>
                  <strong>Monto: </strong>
                  {transactionData.from.amount}{" "}
                  {transactionData.from.currency_id}
                </p>
              </div>

              {/* Información del Destinatario */}
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-semibold">Destinatario</h3>
                <p>
                  <strong>Nombre: </strong>
                  {transactionData.details.to_transfer_to_own_account.to.name}
                </p>
                <p>
                  <strong>Banco: </strong>
                  {
                    transactionData.details.to_transfer_to_own_account.to
                      .bank_code
                  }
                </p>
                <p>
                  <strong>Número de Cuenta: </strong>
                  {
                    transactionData.details.to_transfer_to_own_account.to
                      .account.number
                  }
                </p>
                <p>
                  <strong>IBAN: </strong>
                  {transactionData.details.to_transfer_to_own_account.to.account
                    .iban || "N/A"}
                </p>
                <p>
                  <strong>Monto: </strong>
                  {
                    transactionData.details.to_transfer_to_own_account.value
                      .amount
                  }{" "}
                  {
                    transactionData.details.to_transfer_to_own_account.value
                      .currency
                  }
                </p>
              </div>

              {/* Tasa de Cambio */}
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-semibold">Tasa de Cambio</h3>
                <p>
                  <strong>Moneda de débito: </strong>
                  {transactionData.destiny_bank_exchange_rate.debit_currency}
                </p>
                <p>
                  <strong>Moneda de crédito: </strong>
                  {transactionData.destiny_bank_exchange_rate.credit_currency}
                </p>
                <p>
                  <strong>Tasa de venta: </strong>
                  {transactionData.destiny_bank_exchange_rate.sales_rate}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  onClose();
                }}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                aria-label="Cerrar modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
TransferResultModal.propTypes = {
  transactionData: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default TransferResultModal;
