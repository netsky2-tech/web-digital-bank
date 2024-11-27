"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchAccounts } from "@/services/accountsService";


const AccountsContexts = createContext();

export const useAccounts = () => {
    const context = useContext(AccountsContexts);
    if(!context){
        throw new Error("useAccounts debe usarse dentro de AccountsProvider")
    }
    return context;
}

export const AccountsProvider = ({children}) => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAccounts = async () => {
            setLoading(true)
            try {
                const data = await fetchAccounts({
                    bankId: "BLNI",
                    customerId: "100200",
                    accountType: "S001"
                })
                setAccounts(data)
            } catch (error) {
                setError(error.message || "Error al cargar las cuentas.")
            } finally {
                setLoading(false)
            }
        }
        loadAccounts()
    }, [])

    const value = useMemo(() => ({ accounts, setAccounts, loading, error }), [accounts, loading, error])

    return <AccountsContexts.Provider value={value}>{children}</AccountsContexts.Provider>
}