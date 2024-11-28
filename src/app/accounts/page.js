"use client";
import { useEffect, useState } from "react";

import AccountCard from "@/components/AccountCard";
import FilterProduct from "@/components/FilterProduct";
import { useAccounts } from "@/contexts/AccountsContext";

const Accounts = () => {
  const { accounts, loading, error } = useAccounts();
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);

  useEffect(() => {
    setFilteredAccounts(accounts);
  }, [accounts]);

  const handleFilterChange = (searchTerm) => {
    const filtered = accounts.filter(
      (account) =>
        account.account_number.toString().includes(searchTerm.toLowerCase()) ||
        account.account_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredAccounts(filtered);
  };

  if (loading) return <p>Cargando cuentas...</p>;
  if (error) return <p>{error}</p>;
  if (accounts.length === 0)
    return <p>No hay cuentas disponibles para mostrar.</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/** Filtro */}
      <div className="container mx-auto p-4">
        <FilterProduct onFilterChange={handleFilterChange}></FilterProduct>
        {/**Lista de cuentas */}
        <div>
          {filteredAccounts.map((account, index) => (
            <AccountCard key={index} {...account} />
          ))}

          {filteredAccounts.length === 0 && (
            <div className="text-center text-gray-600 col-span-full">
              No se encontraron cuentas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
