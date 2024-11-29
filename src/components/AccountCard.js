import Image from "next/image";
import Link from "next/link";
const AccountCard = ({
  account_number,
  account_type,
  balance,
  currency,
  customer_number,
  label,
  bankId,
}) => {
  return (
    <Link
      href={`/transactions?accountNumber=${account_number}&bankId=${bankId}`}
      className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center mb-4 hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {/** Informacion de la cuenta */}
      <div className="flex items-center space-x-4">
        {/**Icono */}
        <div className="bg-gray-200 p-2 rounded-full">
          <Image
            src="icon-account-card.svg"
            width={24}
            height={24}
            className="h-6 w-6"
            alt="icono cuenta"
          ></Image>
        </div>
        {/**Detalles */}
        <div>
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
    </Link>
  );
};

export default AccountCard;
