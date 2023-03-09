import { createGarage } from "./garage/garage";
import { createCarListeners } from "./garage/createCarListeners";
import { carBlockListeners } from "./carBlock/carBlockListeners";
import { changePageListeners } from "./garage/changePageListeners";
import { controlRaceListeners } from "./garage/controlRaceListeners";
import { generateCar } from "./generateCar/generateCar";
import { changeWinnersPageListeners } from "./winnersList/changeWinnersPageListeners";

export default async function app() {
    createGarage();
    createCarListeners();
    carBlockListeners();
    changePageListeners();
    changeWinnersPageListeners();
    controlRaceListeners();
    generateCar();
}
