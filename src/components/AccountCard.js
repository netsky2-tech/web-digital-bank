
const AccountCard = ({ account_number, account_type, balance, currency, customer_number, label, bankId }) => {
  return (
    <div className="bg-white shadow, rounded-lg p-4 flex justify-between items-center mb-4">
      {/** Informacion de la cuenta */}
      <div className="flex items-center space-x-4">
        {/**Icono */}
        <div className="bg-gray-200 p-2 rounded-full">
            <span className="text-gray-700">..</span>
        </div>
        {/**Detalles */}
            <div>
                <h3 className="text-lg font-bold">{account_type}</h3>
                <p className="text-sm text-gray-500">{account_number}</p>
                <p className="text-sm text-gray-500">{bankId}</p>
                <p className="text-sm text-gray-500">{label}</p>
            </div>
        </div>
        {/**Saldos */}
        <div className="text-right">
            <p className="font-bold">
                {currency} {balance}
            </p>
            <p className="text-sm text-gray-500">Saldo disponible</p>

        </div>
    </div>
  );
};

export default AccountCard;
