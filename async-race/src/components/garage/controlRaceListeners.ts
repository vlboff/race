import { startCar, stopCar } from "../animation/animation";
import { state, newWinState } from "../state/state";
import { IResult } from "../../types/interfaces";
import { setWinners } from "../api/api";
import { createWinnersList } from "../winnersList/createWinnersList";
import { sortListeners } from "../winnersList/sortListeners";

export const controlRaceListeners = () => {
    const raceButton = <HTMLButtonElement>document.querySelector(".race_button");
    const resetButton = <HTMLButtonElement>document.querySelector(".reset_button");
    const winMassageBlock = <HTMLElement>document.querySelector(".win-massage");
    const stopButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(`.stop_button`);
    const winnersCarsList = <HTMLElement>document.querySelector(".winners-list");
    const winnersPageButton = <HTMLButtonElement>document.querySelector(".to-winners_button");

    const startRace = async () => {
        raceButton.disabled = true;
        winnersPageButton.disabled = true;

        const resultsArray: Promise<IResult>[] = state.cars.map((item) => startCar(item.id));
        const idArray = state.cars.map((car) => car.id);

        stopButtons.forEach((button) => (button.disabled = true));

        let result = (await getResult(resultsArray, idArray)) as IResult;

        resetButton.disabled = !result.success;
        winnersPageButton.disabled = !result.success;
        stopButtons.forEach((button) => (button.disabled = !result.success));

        if (result) {
            winMassageBlock.innerHTML = `${result.name} went first (${result.time.toFixed(2)}s)!`;
            await setWinners(result.id, Number(result.time.toFixed(2)));
            await newWinState();
            winnersCarsList.innerHTML = createWinnersList();
            await sortListeners();
        } else {
            resetButton.disabled = false;
        }
    };

    const resetRace = async () => {
        setTimeout(() => (raceButton.disabled = false), 3000);
        resetButton.disabled = true;
        winnersPageButton.disabled = false;

        state.cars.forEach((item) => stopCar(item.id));

        winMassageBlock.innerHTML = ``;
    };

    raceButton.addEventListener("click", startRace);

    resetButton.addEventListener("click", resetRace);
};

const getResult = async (resultsArray: Promise<IResult>[], idArray: number[]): Promise<IResult | null> => {
    const { success, id, time, name } = await Promise.race(resultsArray);
    if (!success) {
        const getIndex = idArray.findIndex((i) => i === id);
        resultsArray.splice(getIndex, 1);
        idArray.splice(getIndex, 1);
        if (resultsArray.length < 1) return null;
        return getResult(resultsArray, idArray);
    }
    const result = {
        success,
        id,
        time,
        name,
    };
    return result;
};
