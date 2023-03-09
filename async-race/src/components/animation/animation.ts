import { startEngine, stopEngine, drive } from "../api/api";
import { state } from "../state/state";
import { getDistance } from "../carBlock/getDistance";
import { IResult } from "../../types/interfaces";

export const startCar = async (id: number): Promise<IResult> => {
    const startButton = <HTMLButtonElement>document.getElementById(`start_car-${id}`);
    const stopButton = <HTMLButtonElement>document.getElementById(`stop_car-${id}`);
    const car = <HTMLElement>document.getElementById(`car-${id}`);
    const flag = <HTMLElement>document.getElementById(`flag-${id}`);
    const carName = <HTMLSpanElement>document.getElementById(`car_name-${id}`);
    const engineStatus = <HTMLSpanElement>document.getElementById(`engine-status-${id}`);

    const name = carName.textContent;

    startButton.disabled = true;
    stopButton.disabled = false;

    const { velocity, distance } = await startEngine(id);
    const time = Math.round(distance / velocity) / 1000;

    const roadDistance = Math.ceil(getDistance(car, flag));

    car.style.setProperty("animation", `race ${time}s ease-in-out`);
    car.style.setProperty("animation-fill-mode", `forwards`);
    car.style.setProperty("--t", `${roadDistance}px`);

    const success = await drive(id).then((res) => {
        if (res.success === false) {
            car.style.setProperty("animation-play-state", `paused`);
            engineStatus.classList.add("active");
        }
        return res.success;
    });
    return { success, id, time, name };
};

export const stopCar = async (id: number) => {
    const startButton = <HTMLButtonElement>document.getElementById(`start_car-${id}`);
    const stopButton = <HTMLButtonElement>document.getElementById(`stop_car-${id}`);
    const car = <HTMLElement>document.getElementById(`car-${id}`);
    const engineStatus = <HTMLSpanElement>document.getElementById(`engine-status-${id}`);

    startButton.disabled = false;
    stopButton.disabled = true;

    await stopEngine(id);
    car.style.setProperty("animation-name", `none`);
    engineStatus.classList.remove("active");
};
