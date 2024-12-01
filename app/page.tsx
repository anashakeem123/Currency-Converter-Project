'use client'
import React, { useState } from "react";
import Head from "next/head";

const currencyRates = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.76,
  INR: 74.57,
  PKR: 28,
};

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState<number | "">("");
  const [result, setResult] = useState<string | null>(null);

  const convertCurrency = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof amount === "number") {
      const fromRate = currencyRates[fromCurrency as keyof typeof currencyRates];
      const toRate = currencyRates[toCurrency as keyof typeof currencyRates];
      const baseAmount = amount / fromRate;
      const convertedAmount = baseAmount * toRate;
      setResult(`Converted Amount: ${Math.round(convertedAmount)} ${toCurrency}`);
    }
  };

  return (
    <>
      <Head>
        <title>Currency Converter</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br px-4 animate-gradient">
        <div className="bg-black p-8 sm:p-12 rounded-2xl shadow-2xl max-w-md w-full transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-6 sm:mb-8 tracking-wide">
            💸 Currency Converter
          </h1>
          <form onSubmit={convertCurrency} className="space-y-6 sm:space-y-8">
            <div>
              <label htmlFor="from" className="block text-lg sm:text-xl font-semibold text-white">
                From Currency
              </label>
              <select
                id="from"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition text-black font-extrabold"
              >
                {Object.keys(currencyRates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="to" className="block text-lg sm:text-xl font-semibold text-white">
                To Currency
              </label>
              <select
                id="to"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition text-black font-extrabold"
              >
                {Object.keys(currencyRates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="amount" className="block text-lg sm:text-xl font-semibold text-white">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || "")}
                placeholder="Type an amount to see magic ✨"
                required
                className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition text-black font-extrabold"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition"
            >
              Convert Now
            </button>
          </form>
          {result && (
            <p className="mt-6 text-center text-lg sm:text-xl text-black font-extrabold bg-gray-100 p-4 rounded-lg border-2 border-gray-300 shadow-md">
              {result}
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-gradient {
          background: linear-gradient(270deg, #ff7eb3, #ff758c, #f54ea2, #a667e4, #6a8aff);
          background-size: 150% 150%;
          animation: gradientAnimation 8s ease infinite;
        }

        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}
