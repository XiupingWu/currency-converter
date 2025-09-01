const token = process.env.NEXT_PUBLIC_API_KEY;

export async function fetch_currencies() {
    const api_url = process.env.NEXT_PUBLIC_CURRENCIES_API;
    
    if (!api_url) {
        throw new Error('CURRENCIES_API environment variable is not defined');
    }

    try {
        const response = await fetch(api_url, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('The API fetch call has failed due to:', error);
        throw error;
    }
}

export async function fetch_converted_currencies({from, to, amount} : {
    from: string,
    to: string,
    amount: number;
}) {
    const base_url = process.env.NEXT_PUBLIC_CURRENCIES_CONVERT_API;
    
    if (!base_url) {
        throw new Error('CURRENCIES_API environment variable is not defined');
    }

    const request_url = new URL(base_url);
    request_url.searchParams.append('from', from);
    request_url.searchParams.append('to', to);
    request_url.searchParams.append('amount', amount.toString());

    try {
        const response = await fetch(request_url, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('The API fetch call has failed due to:', error);
        throw error;
    }
}
