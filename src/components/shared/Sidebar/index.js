import Link from "next/link";
const Sidebar = () => {
  const menuItems = [
    { name: 'Cuentas', icon: 'account_balance', link: '/accounts' },
    { name: 'Transferencias', icon: 'sync_alt', link: '/transfer' },
    { name: 'Transacciones', icon: 'history', link: '/transactions' },
    { name: 'Configuración', icon: 'settings', link: '/settings' },
  ];

  return (
    <>
      <aside className="bg-gray-100 w-64 p-4 hidden md:block">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link className="flex items-center space-x-2 text-gray-700 hover:text-blue-600" href={item.link}>
                  {/*<span className="material-icons">{item.icon}</span>*/}
                  <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>

  );
};
export default Sidebar;