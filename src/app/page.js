import Shortcuts from "@/components/home/ShortcutsCard";

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
        <Shortcuts></Shortcuts>
      </main>
    </div>
  );
}
