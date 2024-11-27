
const AccountCard = ({ accountType, number, bank, owner, currency, balance }) => {
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
                <h3 className="text-lg font-bold">{accountType}</h3>
                <p className="text-sm text-gray-500">{number}</p>
                <p className="text-sm text-gray-500">{bank}</p>
                <p className="text-sm text-gray-500">{owner}</p>
            </div>
        </div>
        {/**Saldos */}
        <div className="text-right">
            <p className="font-bold">
                {currency} {balance.available.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">Saldo disponible</p>
            <p className="font-bold mt-2">
                {currency} {balance.total.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">Saldo total</p>
        </div>
    </div>
  );
};

export default AccountCard;
