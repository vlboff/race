import { state } from "../state/state";
import { newCarState } from "../state/state";
import { createCarsList } from "./garage";
import { sortListeners } from "../winnersList/sortListeners";

export const changePageListeners = () => {
    const prev = <HTMLButtonElement>document.querySelector(".prev-page");
    const next = <HTMLButtonElement>document.querySelector(".next-page");
    const garageCarsList = <HTMLElement>document.querySelector(".cars-list");
    const garagePage = <HTMLElement>document.querySelector(".garage");
    const winnersPage = <HTMLElement>document.querySelector(".winners");
    const garagePageButton = <HTMLButtonElement>document.querySelector(".to-garage_button");
    const winnersPageButton = <HTMLButtonElement>document.querySelector(".to-winners_button");

    const createPrevCars = async () => {
        if (state.page > 1) {
            state.page--;
            await newCarState();
            garageCarsList.innerHTML = createCarsList();
        }
    };

    const createNextCars = async () => {
        if (state.page < Math.ceil(state.amounth / 7)) {
            state.page++;
            await newCarState();
            garageCarsList.innerHTML = createCarsList();
        }
    };

    const hideWinnerPage = () => {
        garagePage.classList.remove("hide");
        winnersPage.classList.add("hide");
        garagePageButton.disabled = true;
        winnersPageButton.disabled = false;
    };

    const hideGaragePage = async () => {
        await sortListeners();
        garagePage.classList.add("hide");
        winnersPage.classList.remove("hide");
        garagePageButton.disabled = false;
        winnersPageButton.disabled = true;
    };

    prev.addEventListener("click", createPrevCars);

    next.addEventListener("click", createNextCars);

    garagePageButton.addEventListener("click", hideWinnerPage);

    winnersPageButton.addEventListener("click", hideGaragePage);
};
