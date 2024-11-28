const FilterDateForm = ({
  setDateFrom,
  setDateTo,
  setTransactionType,
  dateFrom,
  dateTo,
  transactionType,
}) => (
  <div className="mb-4 flex flex-col md:flex-row gap-6">
    <h4 className="text-xl font-semibold mb-4 md:mb-0">Filtros de busqueda</h4>
    <label htmlFor="fecha_desde">Fecha desde:</label>
    <input
      id="fecha_desde"
      type="date"
      value={dateFrom || ""}
      onChange={(e) => setDateFrom(e.target.value)}
      className="border p-2 w-full md:w-auto"
    />
    <label htmlFor="fecha_hasta">Fecha hasta:</label>
    <input
      id="fecha_hasta"
      type="date"
      value={dateTo || ""}
      onChange={(e) => setDateTo(e.target.value)}
      className="border p-2 w-full md:w-auto"
    />
    <label htmlFor="tipo_transaccion">Tipo de transacción:</label>
    <select
      id="tipo_transaccion"
      value={transactionType || "ALL"}
      onChange={(e) => setTransactionType(e.target.value)}
      className="border p-2 w-full md:w-auto"
    >
      <option value="ALL">Todos</option>
      <option value="DEBIT">Débito</option>
      <option value="CREDIT">Crédito</option>
    </select>
  </div>
);
export default FilterDateForm;
