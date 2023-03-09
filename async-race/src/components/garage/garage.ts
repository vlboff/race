import { createCarBlock } from "../carBlock/carBlock";
import { state } from "../state/state";
import { createWinnersList } from "../winnersList/createWinnersList";

export const createGarage = () => {
    const garageHtml = `
<div class="select-page">
  <button class="to-garage_button" disabled>To garage</button>
  <button class="to-winners_button">To winners</button>
</div>
<div class="garage">
  <form class="create-car">
    <input class="create-car_name" type="text" name="name" />
    <input class="create-car_color" type="color" name="color" />
    <button class="create-car_button" type="submit">Create</button>
  </form>
  <form class="update-car">
    <input class="update-car_name" type="text" name="name" disabled/>
    <input class="update-car_color" type="color" name="color" disabled/>
    <button class="update-car_button" type="submit" disabled>Update</button>
  </form>
  <div class="control-race">
    <button class="race_button">Race</button>
    <button class="reset_button" disabled>Reset</button>
    <button class="generate-cars_button">Generate cars</button>
  </div>
  <div class="win-massage"></div>
  <div class="cars-list">
    ${createCarsList()}
  </div>
  <div class="pages">
    <button class="prev-page" >PREV</button>
    <button class="next-page" >NEXT</button>
  </div>
</div>
<div class="winners hide">
    <div class="winners-list">
      ${createWinnersList()}
    </div>
    <div class="win-pages">
      <button class="win-prev-page" >PREV</button>
      <button class="win-next-page" >NEXT</button>
  </div>
</div>
`;

    const root = document.createElement("div");
    root.innerHTML = garageHtml;

    document.body.append(root);
};

export const createCarsList = () => `
<h1>Garage (${state.amounth})</h1>
<h2>Page #${state.page}</h2>
<ul class="cars">
  ${state.cars.map((car) => `<li id ="car-block-${car.id}">${createCarBlock(car)}</li>`).join("")}
</ul>
`;
