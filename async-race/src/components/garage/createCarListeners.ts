import { createCar } from "../api/api";
import { createCarsList } from "./garage";
import { newCarState } from "../state/state";
import { updateCar } from "../api/api";
import { state } from "../state/state";

export const createCarListeners = () => {
    const createCarForm = <HTMLInputElement>document.querySelector(".create-car");
    const updateCarForm = <HTMLInputElement>document.querySelector(".update-car");
    const garageCarsList = <HTMLElement>document.querySelector(".cars-list");
    const updateCarName = <HTMLInputElement>document.querySelector(".update-car_name");
    const updateCarColor = <HTMLInputElement>document.querySelector(".update-car_color");
    const updateCarButton = <HTMLButtonElement>document.querySelector(".update-car_button");

    const addNewCar = async (e: SubmitEvent) => {
        e.preventDefault();

        if (!(e.target instanceof HTMLFormElement)) {
            throw new Error("Error");
        }

        const carNameTarget = <HTMLInputElement>e.target.querySelector(".create-car_name");
        const carColorTarget = <HTMLInputElement>e.target.querySelector(".create-car_color");

        const bodyArr = new Map();
        bodyArr.set(carNameTarget.name, carNameTarget.value);
        bodyArr.set(carColorTarget.name, carColorTarget.value);
        const body = Object.fromEntries(bodyArr);

        await createCar(body);
        await newCarState();
        garageCarsList.innerHTML = createCarsList();
        carNameTarget.value = "";
        carColorTarget.value = "#000000";
    };

    const updateSomeCar = async (e: SubmitEvent) => {
        e.preventDefault();

        if (!(e.target instanceof HTMLFormElement)) {
            throw new Error("Error");
        }

        const carNameTarget = <HTMLInputElement>e.target.querySelector(".update-car_name");
        const carColorTarget = <HTMLInputElement>e.target.querySelector(".update-car_color");

        const bodyArr = new Map();
        bodyArr.set(carNameTarget.name, carNameTarget.value);
        bodyArr.set(carColorTarget.name, carColorTarget.value);
        const body = Object.fromEntries(bodyArr);

        await updateCar(body, state.idSelectCar);
        await newCarState();
        garageCarsList.innerHTML = createCarsList();

        updateCarName.disabled = true;
        updateCarColor.disabled = true;
        updateCarButton.disabled = true;

        updateCarName.value = "";
        updateCarColor.value = "#000000";
    };

    createCarForm?.addEventListener("submit", (e) => addNewCar(e));

    updateCarForm?.addEventListener("submit", (e) => updateSomeCar(e));
};
