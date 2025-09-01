import { currency } from "@/app/utils/types";

// CurrencyBeacon API response structure
interface CurrencyApiResponse {
    [id: number]: currency,
    meta: {
        code: number,
        disclaimer: string
    },
    response: {
        [id: number]: currency,
    }
}

interface ConvertAPIReponse {

}

// DTO for a single currency (array element)
export interface CurrencyDTO {
    id: number;
    code: string,
    short_code: string;
    name: string;
    symbol: string;
}

// Helper to transform API response to array of CurrencyDTO
export function currenciesToArrayDTO(response: CurrencyApiResponse): CurrencyDTO[] {
    
    return Object.values(response.response).map((currency : currency) => ({
        id: currency.id,
        code: currency.code,
        short_code: currency.short_code,
        name: currency.name,
        symbol: currency.symbol,
    }))
}

export function convertedToNumberDTO(response: ConvertAPIReponse): number {

}