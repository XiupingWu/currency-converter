'use client';
import { useEffect, useState } from "react";
import { getConvertedValue, getCurrienciesList } from "./utils/currencies/handler";
import { CurrencyDTO } from "./utils/currencies/response.dto";

export default function HomePage() {
    const [currencies, setCurrencies] = useState<CurrencyDTO[]>([]);
    
    const [amount, setAmount] = useState<string>('0');
    const [converted, setConverted] = useState<string>('0');

    const [fromCurrency, setFromCurrency] = useState<string>('');
    const [toCurrency, setToCurrency] = useState<string>('');

    const [errors, setErrors] = useState<{
        fromCurrency?: string,
        toCurrency?: string,
        amount?: string
    }>({});
    
    // Siwtch function to switching the currencies on 'from' and 'to'
    const handleSwitchCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setConverted('0'); // Reset converted value when switching
    };
    
    // Prevent the user to have invalid input
    const validateForm = (): boolean => {
        const newErrors: {fromCurrency?: string; toCurrency?: string; amount?: string} = {};
        
        if (!fromCurrency) {
            newErrors.fromCurrency = 'Please select a currency to convert from';
        }
        
        if (!toCurrency) {
            newErrors.toCurrency = 'Please select a currency to convert to';
        }
        
        if (!amount || amount === '0' || Number(amount) <= 0) {
            newErrors.amount = 'Please enter a valid amount greater than 0';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    // Fetch the list will inital the page
    useEffect(() => {

        async function fetchData() {
            const data = await getCurrienciesList();
            setCurrencies(data);
        }

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header / Banner */}
            <header className="bg-blue-600 text-white py-6 shadow">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold">Currency Converter</h1>
                    <p className="mt-1 text-blue-100">Convert currencies instantly with live rates</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    <form className="space-y-6 text-black">
                        {/* From Currency */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="from-currency">
                                From
                            </label>
                            <select
                                id="from-currency"
                                value={fromCurrency}
                                onChange={event => setFromCurrency(event.currentTarget.value)}
                                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.fromCurrency ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select currency</option>
                                {currencies.length > 0 &&
                                    currencies.map((currency) => (
                                        <option
                                            key={currency.id}
                                            value={currency.short_code}
                                            label={`${currency.symbol} -- ${currency.name}`}
                                        />
                                    ))}
                            </select>
                            {errors.fromCurrency && (
                                <p className="text-red-500 text-sm mt-1">{errors.fromCurrency}</p>
                            )}
                        </div>

                        {/* Amount Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="amount">
                                Amount
                            </label>
                            <input
                                type="number"
                                step={0.01}
                                id="amount-input"
                                onChange={event => setAmount(event.target.value)}
                                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.amount ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter amount"
                            />
                            {errors.amount && (
                                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                            )}
                        </div>
                        
                        {/* Switch Button */}
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={handleSwitchCurrencies}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full transition flex items-center justify-center"
                                title="Switch currencies"
                                aria-label="Switch currencies"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                >
                                    <path
                                        d="M10 6L7 3M7 3L4 6M7 3V17M14 18L17 21M17 21L20 18M17 21V7"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        
                        {/* To Currency */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="to-currency">
                                To
                            </label>
                            <select
                                id="to-currency"
                                value={toCurrency}
                                onChange={event => setToCurrency(event.currentTarget.value)}
                                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.toCurrency ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select currency</option>
                                {currencies.length > 0 &&
                                    currencies.map((currency) => (
                                        <option
                                            key={currency.id}
                                            value={currency.short_code}
                                            label={`${currency.symbol} -- ${currency.name}`}
                                        />
                                    ))}
                            </select>
                            {errors.toCurrency && (
                                <p className="text-red-500 text-sm mt-1">{errors.toCurrency}</p>
                            )}
                        </div>

                        {/* Converted Value */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Converted Value
                            </label>
                            <div className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-100 text-gray-500">
                                {converted}
                            </div>
                        </div>

                        {/* Convert Button */}
                        <button
                            type="button"
                            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                            onClick={async () => {
                                if (validateForm()) {
                                    const value = await getConvertedValue({
                                        from: fromCurrency,
                                        to: toCurrency,
                                        amount: Number(amount)
                                    });

                                    setConverted(value.toString());
                                }
                            }}
                        >
                            Convert
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
