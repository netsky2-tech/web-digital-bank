import Image from "next/image";

const Navbar = () => {
  return (
    <>
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Image src="/logo.png" alt="Logo" width="100" height="100" className="w-8 h-8" />
        <span className="text-xl font-bold">Banco Digital</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-blue-500 px-3 py-1 rounded">Notificaciones</button>
        <button className="bg-blue-500 px-3 py-1 rounded">Perfil</button>
      </div>
    </header>
    </>

  );
};

export default Navbar;