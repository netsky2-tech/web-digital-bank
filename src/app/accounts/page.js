"use client"
import { useEffect, useState } from "react";
import AccountCard from "@/components/AccountCard";
import FilterProduct from "@/components/FilterProduct";

const accounts = [
    {
      accountType: "Cuenta de Ahorro",
      number: "117279768",
      bank: "Banco LAFISE Nicaragua",
      owner: "Octavio Octavio Morales Ruiz",
      currency: "USD",
      balance: { available: 0.0, total: 0.0 },
    },
    {
      accountType: "Cuenta de Ahorro",
      number: "135044153",
      bank: "Banco LAFISE Nicaragua",
      owner: "Octavio Octavio Morales Ruiz",
      currency: "NIO",
      balance: { available: 10.28, total: 10.28 },
    },
  ];

const Accounts = () => {

    const [filteredAccounts, setFilteredAccounts] = useState(accounts);

      const handleFilterChange = (searchTerm) => {
        const filtered = accounts.filter((account) =>
          account.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.accountType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.currency.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAccounts(filtered);
      }
      
      useEffect(() => {
        setFilteredAccounts(accounts)
      }, [accounts])

    return (
       <div className="bg-gray-100 min-h-screen">
        {/** Filtro */}
        <div className="container mx-auto p-4">
            <FilterProduct onFilterChange={handleFilterChange}></FilterProduct>
            {/**Lista de cuentas */}
            <div>
                {filteredAccounts.map((account, index) => 
                <AccountCard key={index} {...account} />
                 )}
                 
                 {filteredAccounts.length === 0 && (
                    <div className="text-center text-gray-600 col-span-full">
                      No se encontraron cuentas.
                    </div>
                  )}

            </div>
        </div>
       </div>      
    )
}

export default Accounts;