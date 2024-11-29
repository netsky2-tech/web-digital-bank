import PropTypes from "prop-types";
const SelectAccount = ({ title, accounts, selected, onChange }) => (
  <div>
    <h2 className="font-bold text-gray-700">{title}</h2>
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <option value="" disabled>
        Selecciona una cuenta
      </option>
      {accounts.map((account) => (
        <option key={account.account_number} value={account.account_number}>
          {account.bankId} {account.account_number} - {account.currency}{" "}
          {account.balance}
        </option>
      ))}
    </select>
  </div>
);
SelectAccount.propTypes = {
  title: PropTypes.string.isRequired,
  accounts: PropTypes.array.isRequired,
  selected: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default SelectAccount;
