"use client";
import { useState, useEffect } from "react";

import Notification from "@/components/UI/Notification";
import Spinner from "@/components/UI/Spinner";
import { fetchExchangesRates } from "@/services/exchanges-rates/exchangesRatesService";
const ExchangesRates = () => {
  const [exchangesRates, setExchangesRates] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchExchangesRates("BLNI")
      .then((data) => {
        setExchangesRates(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error || "Ocurrio un error al obtener las tasas");
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (!exchangesRates || !exchangesRates.rates) return <Spinner />;
  if (error)
    return (
      <Notification
        message={error}
        type="error"
        persistent={true}
        onClose={() => setError(null)}
      />
    );
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6 border-gray-500">
        <h1 className="text-2xl font-semibold  mb-4">Tasas de cambio</h1>
        <p className="text-sm">Fecha de actualizacion: {exchangesRates.date}</p>
        <div className="space-y-6 border">
          {Object.entries(exchangesRates.rates).map(([currency, values]) => (
            <div key={currency} className="py-4 border-b border-gray-900">
              <h2 className="text-lg font-medium text-gray-700">{currency}</h2>
              <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                <div>
                  <p className="text-gray-600">Compra</p>
                  <p className="font-medium">{values.buying.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Venta</p>
                  <p className="font-medium">{values.selling.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Oficial</p>
                  <p className="font-medium">{values.official.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ExchangesRates;
