import PropTypes from "prop-types";
const SelectAccount = ({ title, accounts, selected, onChange }) => (
  <div>
    <label
      htmlFor="account-select"
      className="block font-bold text-gray-700 mb-2"
    >
      {title}
    </label>
    <select
      id="account-select"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      aria-label="Seleccionar cuenta bancaria"
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
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default SelectAccount;
