import { currenciesToArrayDTO } from "./response.dto";
import { fetch_currencies } from "./route";

export async function getCurrienciesList() {
    const currencies = await fetch_currencies();

    return currenciesToArrayDTO(currencies);
}