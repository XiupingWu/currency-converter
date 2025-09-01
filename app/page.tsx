import { getCurrienciesList } from "./api/currencies/handler";

export default async function HomePage() {
    
    const currencies = await getCurrienciesList();
    
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
                    <form className="space-y-6">
                        {/* From Currency */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="from-currency">
                                From
                            </label>
                            <select
                                id="from-currency"
                                className="w-full border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        </div>

                        {/* To Currency */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="to-currency">
                                To
                            </label>
                            <select
                                id="to-currency"
                                className="w-full border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        </div>

                        {/* Amount Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="amount">
                                Amount
                            </label>
                            <input
                                type="number"
                                step={0.01}
                                id="amount"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter amount"
                            />
                        </div>

                        {/* Converted Value */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Converted Value
                            </label>
                            <div className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-100 text-gray-500">
                                {/* Placeholder for converted value */}
                                --
                            </div>
                        </div>

                        {/* Convert Button */}
                        <button
                            type="button"
                            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                            disabled
                        >
                            Convert
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}