import { convertedToNumberDTO, currenciesToArrayDTO } from "./response.dto";
import { fetch_converted_currencies, fetch_currencies } from "./route";

export async function getCurrienciesList() {
    const currencies = await fetch_currencies();

    return currenciesToArrayDTO(currencies);
}

export async function getConvertedValue({from, to, amount} : {
    from: string,
    to: string,
    amount: number;
}) {
    const converted = await fetch_converted_currencies({from, to, amount});
    return convertedToNumberDTO(converted);
}