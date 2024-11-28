import { fetchAuthToken } from "./authService"
require('dotenv').config()

export const fetchAccounts = async({bankId = "BLNI", customerId = "100200", accountType = "S001"} = {}) => {
    const baseUrl = `http://localhost:3000/api/obl/v1/banks/${bankId}/customers/${customerId}/accounts`
    const queryParams = new URLSearchParams({ ACCOUNT_TYPE: accountType })

    try {

        const token = await fetchAuthToken()

        const response = await fetch(`${baseUrl}?${queryParams.toString()}`,{
            headers: {
                Authorization: `Bearer ${token}`,
                'x-api-key': 'G3yCDUD91N4nW6YghwTdjJoA32gauL36pq2mWZH1'
            }
        })
        if(!response.ok){
            throw new Error("No se pudieron cargar las cuentas.")
        }
        return await response.json()
    } catch (error) {

        throw error;
    }
}

export const fetchBalance = async(bankId, accountNumber) => {
    const url = `http://localhost:3000/api/obl/v1/banks/${bankId}/accounts/${accountNumber}/balance`; 
    
    try {
        const API_KEY = process.env.API_KEY
        const token = await fetchAuthToken()
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'x-api-key': API_KEY
            }
        })
        if(!response.ok){
            throw new Error("No se pudo obtener el balance de las cuentas.")
        }
        return await response.json()
    } catch (error) {
        throw error;
    }
}

export const getAccountWithBalances = async(bankId, customerId, accountType) => {
    try {
        const accounts = await fetchAccounts(bankId, customerId,accountType)

        const accountDetails = await Promise.all(
            accounts.map(async (account) => {
                const balanceDetails = await fetchBalance(bankId = 'BLNI', account.account_number)

                return{
                    ...account,
                    balance: balanceDetails.balance.amount,
                    currency: balanceDetails.balance.currency,
                    label: balanceDetails.label,
                    bankId: balanceDetails.bank_id
                }
            })
        )
        return accountDetails;

    } catch (error) {
        throw error;
    }
}