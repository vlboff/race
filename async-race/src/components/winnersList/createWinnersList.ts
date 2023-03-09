import { state } from "../state/state";
import { car } from "../../assets/car";
import { SortBy, SortOrder } from "../../types/interfaces";

export const createWinnersList = () => `
<h1>Winners: ${state.winnersAmounth}</h1>
<h2>Page #${state.winnersPage}</h2>
  <table class="table">
    <thead>
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th class="sort-by-wins">Wins${setArrowWins()}</th>
      <th class="sort-by-time">Best time (seconds)${setArrowTime()}</th>
    </thead>
    <tbody>
    ${state.winners
        .map(
            (winner, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${car(winner.car.color)}</td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        </tr>
        `
        )
        .join(" ")}
    </tbody>
  </table>`;

const setArrowWins = () => {
    if (state.winnersSort === SortBy.wins) {
        if (state.winnersSortOrder === SortOrder.ASC) {
            return `<span class="arrow-up">&#9650;</span>`;
        } else {
            return `<span class="arrow-down">
&#9660;</span>`;
        }
    } else {
        return "";
    }
};

const setArrowTime = () => {
    if (state.winnersSort === SortBy.time) {
        if (state.winnersSortOrder === SortOrder.ASC) {
            return `<span class="arrow-up">&#9650;</span>`;
        } else {
            return `<span class="arrow-down">
  &#9660;</span>`;
        }
    } else {
        return "";
    }
};
