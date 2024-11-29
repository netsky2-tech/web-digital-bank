import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Contenido principal */}
      <main className="flex-grow p-6">
        {/* Bienvenida */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            ¡Hola, bienvenido! ¿Qué deseas hacer hoy?
          </h1>
          <p className="text-lg text-gray-600 mt-2">Saldo disponible: $0</p>
        </section>

        {/* Accesos directos*/}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Mis Productos
              </h2>
              <p className="text-gray-600">Consulta tus cuentas y productos.</p>
            </div>
            <Link href="/accounts">Ver más</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Transferencias
              </h2>
              <p className="text-gray-600">Envía dinero rápidamente.</p>
            </div>
            <Link href="/transfer">Ver más</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Historial de Movimientos
              </h2>
              <p className="text-gray-600">Revisa tus últimas transacciones.</p>
            </div>
            <Link href="/transactions">Ver más</Link>
          </div>
        </section>

        {/* Transacciones */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Últimas Transacciones
          </h2>
          <ul className="space-y-4">
            <li className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-800 font-semibold">
                Transferencia a Juan Pérez
              </p>
              <p className="text-gray-600">Monto: $500.00</p>
              <p className="text-gray-600">Fecha: 10 de Noviembre, 2024</p>
            </li>
            <li className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-800 font-semibold">Depósito de nómina</p>
              <p className="text-gray-600">Monto: $1,200.00</p>
              <p className="text-gray-600">Fecha: 9 de Noviembre, 2024</p>
            </li>
            <li className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-800 font-semibold">
                Pago de tarjeta de crédito
              </p>
              <p className="text-gray-600">Monto: $150.00</p>
              <p className="text-gray-600">Fecha: 8 de Noviembre, 2024</p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
