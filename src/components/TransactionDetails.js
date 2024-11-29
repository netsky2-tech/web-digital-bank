import PropTypes from "prop-types";
const TransactionDetails = ({ formData, onChange }) => (
  <div>
    <h2 className="font-bold text-gray-700">3. Monto a transferir</h2>
    {/**Moneda */}
    <div className="flex items-center space-x-4">
      <select
        value={formData.currency}
        onChange={(e) => onChange("currency", e.target.value)}
        className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="USD">$</option>
        <option value="NIO">C$</option>
      </select>
      {/**Monto */}
      <input
        type="number"
        value={formData.amount}
        onChange={(e) => onChange("amount", e.target.value)}
        min={0}
        placeholder="1,000.00"
        className="w-1/2 p-2 border rounded-md text-right focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div className="mt-4">
      <h2 className="font-bold text-gray-700">4. Datos adicionales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/**Concepto del débito */}
        <div>
          <label
            htmlFor="concepto_debito"
            className="block text-sm text-gray-600"
          >
            Concepto del débito
          </label>
          <input
            id="concepto_debito"
            type="text"
            value={formData.debitDescription}
            onChange={(e) => onChange("debitDescription", e.target.value)}
            placeholder="Escriba el concepto del débito"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></input>
        </div>
        {/**Concepto del crédito */}
        <div>
          <label
            htmlFor="concepto_credito"
            className="block text-sm text-gray-600"
          >
            Concepto del crédito
          </label>
          <input
            id="concepto_credito"
            type="text"
            value={formData.creditDescription}
            onChange={(e) => onChange("creditDescription", e.target.value)}
            placeholder="Escriba el concepto del crédito"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></input>
        </div>
      </div>
      {/**Correo confirmacion */}
      <div className="mt-4">
        <label
          htmlFor="email_confirmacion"
          className="block text-sm text-gray-600"
        >
          Enviar confirmación a:
        </label>
        <input
          id="email_confirmacion"
          type="email"
          value={formData.emailConfirmation}
          onChange={(e) => onChange("emailConfirmation", e.target.value)}
          placeholder="correo@example.com"
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></input>
      </div>
    </div>
  </div>
);
TransactionDetails.propTypes = {
  formData: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
};
export default TransactionDetails;
