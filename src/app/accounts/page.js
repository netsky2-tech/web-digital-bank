"use client"
import { useState } from "react";
import AccountCard from "@/components/AccountCard";

const accountsData = [
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
    const [filter, setFilter] = useState("");

    const filteredAccounts = accountsData.filter(
        (account) =>
          account.accountType.toLowerCase().includes(filter.toLowerCase()) ||
          account.number.includes(filter)
      );

    return (
       <div className="bg-gray-100 min-h-screen">
        {/** Filtro */}
        <div className="container mx-auto p-4">
            <div className="flex items-center space-x-4 mb-4">
                <input type="text" placeholder="Buscar" value={filter} onChange={(e) => setFilter(e.target.value)} className="flex-1 p-2 border rounded-md"></input>
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                    Todos mis productos
                </button>
            </div>
            {/**Lista de cuentas */}
            <div>
                {filteredAccounts.map((account, index) => 
                <AccountCard key={index} {...account} />
            )}
            </div>
        </div>
       </div>      
    )
}

export default Accounts;