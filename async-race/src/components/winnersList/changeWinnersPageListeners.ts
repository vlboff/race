import { state } from "../state/state";
import { newWinState } from "../state/state";
import { createWinnersList } from "./createWinnersList";
import { sortListeners } from "./sortListeners";

export const changeWinnersPageListeners = () => {
    const prev = <HTMLButtonElement>document.querySelector(".win-prev-page");
    const next = <HTMLButtonElement>document.querySelector(".win-next-page");
    const winnersCarsList = <HTMLElement>document.querySelector(".winners-list");

    const createPrevWinners = async () => {
        if (state.winnersPage > 1) {
            state.winnersPage--;
            await newWinState();
            winnersCarsList.innerHTML = createWinnersList();
            await sortListeners();
        }
    };

    const createNextWinners = async () => {
        if (state.winnersPage < Math.ceil(state.winnersAmounth / 10)) {
            state.winnersPage++;
            await newWinState();
            winnersCarsList.innerHTML = createWinnersList();
        }
    };

    prev.addEventListener("click", createPrevWinners);

    next.addEventListener("click", createNextWinners);
};
