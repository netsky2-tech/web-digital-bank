import Link from "next/link";
const Shortcuts = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Mis Productos</h2>
          <p className="text-gray-600">Consulta tus cuentas y productos.</p>
        </div>
        <Link className="text-blue-400 hover:text-blue-900" href="/accounts">
          Ver más
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Transferencias
          </h2>
          <p className="text-gray-600">
            Realiza transferencias entre cuentas facilmente.
          </p>
        </div>
        <Link className="text-blue-400 hover:text-blue-900" href="/transfer">
          Ver más
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Historial de Movimientos
          </h2>
          <p className="text-gray-600">Revisa tus últimas transacciones.</p>
        </div>
        <Link
          className="text-blue-400 hover:text-blue-900"
          href="/transactions"
        >
          Ver más
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Tasas de cambio
          </h2>
          <p className="text-gray-600">Consulta la tasa de cambio del dia.</p>
        </div>
        <Link
          className="text-blue-400 hover:text-blue-900"
          href="/exchanges-rates"
        >
          Ver más
        </Link>
      </div>
    </section>
  );
};

export default Shortcuts;
