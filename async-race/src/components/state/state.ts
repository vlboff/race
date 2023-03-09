import { IState } from "../../types/interfaces";
import { getPageCar, getWinners } from "../api/api";

export const state: IState = {
    cars: await getPageCar(1)
        .then((res) => res.carArray)
        .catch(() => {
            throw new Error("Ooops... Something wrong happened.");
        }),
    amounth: await getPageCar(1)
        .then((res) => res.amounth)
        .catch(() => {
            throw new Error("Ooops... Something wrong happened.");
        }),
    page: 1,
    idSelectCar: 0,
    generateCarAmounth: 100,
    winners: [],
    winnersAmounth: await getWinners(1, "", "")
        .then((res) => res.amounth)
        .catch(() => {
            throw new Error("Ooops... Something wrong happened.");
        }),
    winnersPage: 1,
    winnersSort: "",
    winnersSortOrder: "",
};

export const newCarState = async () => {
    const { carArray, amounth } = await getPageCar(state.page);
    state.cars = carArray;
    state.amounth = amounth;
};

export const newWinState = async () => {
    const { winArray, amounth } = await getWinners(state.winnersPage, state.winnersSort, state.winnersSortOrder);
    state.winners = winArray;
    state.winnersAmounth = amounth;
};
