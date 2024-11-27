"use client"
import { useState } from "react";

const TransferForm = () => {
    const [amount, setAmount] = useState(0)
    const [scheduleTransfer, setScheduleTransfer] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!originAccount || !destinationAccount || !amount) {
          alert('Por favor, completa todos los campos obligatorios.');
          return;
        }
    
        // Simulación de envío de datos
        console.log({
          originAccount,
          destinationAccount,
          amount,
        });
    
        alert('¡Transferencia realizada con éxito!');
      };

    return (
        <form 
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-6">
            {/** Titulo */}
            <h1 className="text-xl font-bold text-gray-700">Transferir</h1>
            <p className="text-sm text-gray-500">
                Transferencia entre cuentas propias
            </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/**Cuenta Origen  */}
                <div>
                    <h2 className="font-bold text-gray-700">1. Cuenta origen</h2>
                    <select
                    value={""}
                    
                    className="w-full p-2 border rounded-md">
                        <option value="" disabled>
                            Selecciona una cuenta
                        </option>
                    </select>
                </div>

                
                <div>
                    <h2 className="font-bold text-gray-700">2. Cuenta destino</h2>
                    <select
                    value={""}
                    
                    className="w-full p-2 border rounded-md">
                        <option value="" disabled>
                            Selecciona una cuenta
                        </option>
                    </select>
                </div>
                </div>
                
                {/**Monto a transferir */}
                <div>
                    <h2 className="font-bold text-gray-700">3. Monto a transferir</h2>
                    <div className="flex items-center space-x-4">
                        <select className="w-1/2 p-2 border rounded-md">
                            <option value="NIO">C$</option>
                            <option value="USD">$</option>
                        </select>
                        <input type="number" min={0} placeholder="1,000.00" className="w-1/2 p-2 border rounded-md text-right"></input>
                    </div>
                </div>

                {/**Detalles */}
                <div>
                    <h2 className="font-bold text-gray-700">4. Datos adicionales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/**Concepto del débito */}
                        <div>
                            <label className="block text-sm text-gray-600">Concepto del débito</label>
                            <input type="text" placeholder="Escriba el concepto del débito" className="w-full p-2 border rounded-md"></input>
                        </div>
                        {/**Concepto del crédito */}
                        <div>
                            <label className="block text-sm text-gray-600">Concepto del crédito</label>
                            <input type="text" placeholder="Escriba el concepto del crédito" className="w-full p-2 border rounded-md"></input>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm text-gray-600">Enviar confirmación a:</label>
                        <input type="email" placeholder="correo@example.com" className="w-full p-2 border rounded-md"></input>
                    </div>
                </div>

                {/**Botones */}
                <div className="flex justify-end space-x-4">
                    <button type="reset" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">Limpiar</button>
                    <button type="button" className="bg-red-200 px-4 py-2 rounded-lg hover:bg-red-300 transition-colors">Cancelar</button>
                    <button type="submit" className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">Continuar</button>
                </div>
        </form>
    )
}

export default TransferForm;