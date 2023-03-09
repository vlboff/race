import { carNames } from "./carNames";
import { carModels } from "./carModels";
import { state, newCarState } from "../state/state";
import { createCar } from "../api/api";
import { createCarsList } from "../garage/garage";

const TRUE_COLOR_AMOUNT = 16777215;

const getRandomName = () => {
    const name = carNames[Math.floor(Math.random() * carNames.length)];
    const model = carModels[Math.floor(Math.random() * carModels.length)];
    return `${name} ${model}`;
};

const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * TRUE_COLOR_AMOUNT).toString(16);
    return `#${randomColor}`;
};

export const generateCar = () => {
    const garageCarsList = <HTMLElement>document.querySelector(".cars-list");
    const generateCarsButton = <HTMLButtonElement>document.querySelector(".generate-cars_button");

    const generateNewCarsList = async () => {
        generateCarsButton.disabled = true;

        const carsBodyArray = new Array(state.generateCarAmounth)
            .fill({})
            .map(() => ({ name: getRandomName(), color: getRandomColor() }));

        await Promise.all(carsBodyArray.map(async (body) => createCar(body)));
        await newCarState();
        garageCarsList.innerHTML = createCarsList();

        generateCarsButton.disabled = false;
    };

    generateCarsButton.addEventListener("click", generateNewCarsList);
};
