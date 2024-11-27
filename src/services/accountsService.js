import { fetchAuthToken } from "./authService"

export const fetchAccounts = async({bankId = "BLNI", customerId = "100200", accountType = "S001"} = {}) => {
    const baseUrl = `http://localhost:3000/api/obl/v1/banks/${bankId}/customers/${customerId}/accounts`
    const queryParams = new URLSearchParams({ ACCOUNT_TYPE: accountType })

    try {

        const token = await fetchAuthToken()

        const response = await fetch(`${baseUrl}?${queryParams.toString()}`,{
            headers: {
                Authorization: `Bearer ${token}`,
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