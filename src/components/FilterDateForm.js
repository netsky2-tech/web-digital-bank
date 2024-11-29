import PropTypes from "prop-types";

const FilterDateForm = ({
  setDateFrom,
  setDateTo,
  setTransactionType,
  dateFrom,
  dateTo,
  transactionType,
}) => (
  <div className="mb-6">
    <fieldset className="border border-gray-300 rounded-md p-4">
      <legend className="text-xl font-semibold mb-4 text-gray-900">
        Filtros de búsqueda
      </legend>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-auto flex-col">
          <label
            htmlFor="fecha_desde"
            className="text-sm font-medium text-gray-700 mb-2"
            aria-label="Fecha desde"
          >
            Fecha desde:
          </label>
          <input
            id="fecha_desde"
            type="date"
            value={dateFrom || ""}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-full md:w-40"
            aria-describedby="fecha_desde_help"
          />
        </div>
        <div className="flex flex-auto flex-col">
          <label
            htmlFor="fecha_hasta"
            className="text-sm font-medium text-gray-700 mb-2"
            aria-describedby="fecha_hasta_help"
            aria-label="Fecha hasta"
          >
            Fecha hasta:
          </label>
          <input
            id="fecha_hasta"
            type="date"
            value={dateTo || ""}
            onChange={(e) => setDateTo(e.target.value)}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-full md:w-40"
          />
        </div>
        <div className="flex flex-auto flex-col">
          <label
            htmlFor="tipo_transaccion"
            className="text-sm font-medium text-gray-700 mb-2"
            aria-describedby="tipo_transaccion_help"
            aria-label="Tipo transaccion"
          >
            Tipo de transacción:
          </label>
          <select
            id="tipo_transaccion"
            value={transactionType || "ALL"}
            onChange={(e) => setTransactionType(e.target.value)}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-full md:w-40"
          >
            <option value="ALL">Todos</option>
            <option value="DEBIT">Débito</option>
            <option value="CREDIT">Crédito</option>
          </select>
        </div>
      </div>
    </fieldset>
  </div>
);
FilterDateForm.propTypes = {
  setDateFrom: PropTypes.func.isRequired,
  setDateTo: PropTypes.func.isRequired,
  setTransactionType: PropTypes.func.isRequired,
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  transactionType: PropTypes.string.isRequired,
};
export default FilterDateForm;
