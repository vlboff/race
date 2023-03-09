export interface ICar {
    name: string;
    color: string;
    id: number;
}

export interface IWinner {
    id: number;
    wins: number;
    time: number;
    car: ICar;
}

export interface IPageCars {
    carArray: ICar[];
    amounth: number;
}

export interface IState {
    cars: ICar[];
    amounth: number;
    page: number;
    idSelectCar: number;
    generateCarAmounth: number;
    winners: IWinner[];
    winnersAmounth: number;
    winnersPage: number;
    winnersSort: string;
    winnersSortOrder: string;
}

export interface INewCar {
    name: string;
    color: string;
}
export type INewWinner = Omit<IWinner, 'car'>

export interface IResult {
    success: boolean;
    id: number;
    time: number;
    name: string | null;
}

export interface IGetWinners {
    winArray: IWinner[];
    amounth: number;
}

export enum SortBy {
    wins = "wins",
    time = "time",
}

export enum SortOrder {
    ASC = "ASC",
    DESC = "DESC",
}
