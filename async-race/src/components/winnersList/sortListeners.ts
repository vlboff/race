import { state, newWinState } from "../state/state";
import { createWinnersList } from "./createWinnersList";
import { SortBy, SortOrder } from "../../types/interfaces";

export const sortListeners = async () => {
    const sortByWinsButton = <HTMLElement>document.querySelector(".sort-by-wins");
    const sortByTimeButton = <HTMLElement>document.querySelector(".sort-by-time");
    const winnersCarsList = <HTMLElement>document.querySelector(".winners-list");

    const sortByWins = async () => {
        state.winnersSort = SortBy.wins;
        state.winnersSortOrder = state.winnersSortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;

        await newWinState();
        winnersCarsList.innerHTML = createWinnersList();
        await sortListeners();
    };

    const sortByTime = async () => {
        state.winnersSort = SortBy.time;
        state.winnersSortOrder = state.winnersSortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;

        await newWinState();
        winnersCarsList.innerHTML = createWinnersList();
        await sortListeners();
    };

    sortByWinsButton.addEventListener("click", sortByWins);

    sortByTimeButton.addEventListener("click", sortByTime);
};
