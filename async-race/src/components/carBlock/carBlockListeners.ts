import { deleteCar, getWinner, deleteWinner } from "../api/api";
import { createCarsList } from "../garage/garage";
import { state, newCarState, newWinState } from "../state/state";
import { startCar, stopCar } from "../animation/animation";
import { createWinnersList } from "../winnersList/createWinnersList";

export const carBlockListeners = () => {
    const garageCarsList = <HTMLElement>document.querySelector(".cars-list");
    const winnersCarsList = <HTMLElement>document.querySelector(".winners-list");

    const carBlock = async (e: MouseEvent) => {
        if (e.target instanceof HTMLButtonElement) {
            if (e.target.classList.contains("remove_button")) {
                const id = Number(e.target.id.slice(11));
                await deleteCar(id);
                await newCarState();
                garageCarsList.innerHTML = createCarsList();
                if (await getWinner(id)) {
                    await deleteWinner(id);
                    await newWinState();
                    winnersCarsList.innerHTML = createWinnersList();
                }
            }

            if (e.target.classList.contains("select_button")) {
                const id = Number(e.target.id.slice(11));
                state.idSelectCar = id;

                const updateCarName = <HTMLInputElement>document.querySelector(".update-car_name");
                const updateCarColor = <HTMLInputElement>document.querySelector(".update-car_color");
                const updateCarButton = <HTMLButtonElement>document.querySelector(".update-car_button");

                updateCarName.disabled = false;
                updateCarColor.disabled = false;
                updateCarButton.disabled = false;

                const idArray = state.cars.map((car) => car.id);
                const getIndex = idArray.findIndex((i) => i === id);

                updateCarName.value = state.cars[getIndex].name;
                updateCarColor.value = state.cars[getIndex].color;
            }

            if (e.target.classList.contains("start_button")) {
                const id = Number(e.target.id.slice(10));
                startCar(id);
            }

            if (e.target.classList.contains("stop_button")) {
                const id = Number(e.target.id.slice(9));
                stopCar(id);
            }
        }
    };

    garageCarsList.addEventListener("click", (e) => carBlock(e));
};
