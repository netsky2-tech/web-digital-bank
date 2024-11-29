"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const Navbar = () => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Mis Productos", href: "/accounts" },
    { label: "Transferencias", href: "/transfer" },
    { label: "Historial de movimientos", href: "/transactions" },
    { label: "Tasas", href: "/exchange-rates" },
  ];
  return (
    <>
      <header className="bg-green-700 text-white p-4 flex justify-between items-center">
        {/* Logotipo */}
        <div className="flex items-center">
          <span className="text-xl font-bold">Banco Digital</span>
        </div>
        {/* Menu */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:underline ${pathname === item.href ? "font-bold underline" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <span>Octavio Morales Ruiz</span>
          <span className="hover:underline text-xs">Salir</span>
        </div>

        {/* Icono hamburguesa */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Menú desplegable */}
        {isMenuOpen && (
          <nav className="md:hidden bg-green-700">
            <ul className="space-y-2 px-4 py-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block hover:underline ${
                      pathname === item.href ? "font-bold underline" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)} // Cierra el menú al hacer clic.
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="px-4 py-2 border-t border-green-600">
              <span>Octavio Octavio Morales Ruiz</span>
              <button className="block mt-2 hover:underline">
                Cerrar sesión
              </button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Navbar;
