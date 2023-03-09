import { car } from "../../assets/car";
import { flag } from "../../assets/flag";
import { ICar } from "../../types/interfaces";

export const createCarBlock = ({ id, name, color }: ICar) => `
  <div class="main_buttons">
    <button class="select_button" id="select_car-${id}">Select</button>
    <button class="remove_button" id="remove_car-${id}">Remove</button>
    <span class="car_name" id="car_name-${id}">${name}</span>
    <span class="engine-status" id="engine-status-${id}">- engine broken</span>
  </div>
  <div class="distance">
    <div class="start-position">
      <div class="control_button">
        <button class="start_button" id="start_car-${id}">Start</button>
        <button class="stop_button" id="stop_car-${id}" disabled>Stop</button>
      </div>
      <div class="car" id="car-${id}" >
        ${car(color)}
      </div>
    </div>
    <div class="flag" id="flag-${id}">${flag()}</div>
  </div>
`;
