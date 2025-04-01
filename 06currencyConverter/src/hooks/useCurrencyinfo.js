import { useEffect, useState } from "react";

function useCurrencyInfo(currencyFrom) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                const response = await fetch(
                    `https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${currencyFrom}`
                );
                if (!response.ok) throw new Error("Failed to fetch");
                
                const result = await response.json();
                console.log("API Response:", result); // ✅ Debugging line
                setData(result.conversion_rates);
            } catch (error) {
                console.error("Error fetching currency data:", error);
            }
        };
    
        fetchCurrencyData();
    }, [currencyFrom]);
    

    return data;
}

export default useCurrencyInfo;
