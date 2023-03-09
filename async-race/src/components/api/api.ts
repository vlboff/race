import { INewCar, IPageCars, INewWinner, IGetWinners } from "../../types/interfaces";

const URL = "http://127.0.0.1:3000";

enum Reqests {
    garage = "garage",
    winners = "winners",
    engine = "engine",
    page = "_page",
    limit = "_limit",
    sort = "_sort",
    order = "_order",
}

export const getCar = async (id: number): Promise<INewCar> => (await fetch(`${URL}/${Reqests.garage}/${id}`)).json();

export const getPageCar = async (page: number, limit = 7): Promise<IPageCars> => {
    const res = await fetch(`${URL}/${Reqests.garage}?${Reqests.page}=${page}&${Reqests.limit}=${limit}`);
    const onePageCar = {
        carArray: await res.json(),
        amounth: Number(res.headers.get("X-Total-Count")),
    };
    return onePageCar;
};

export const createCar = async (body: INewCar) =>
    (
        await fetch(`${URL}/${Reqests.garage}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
    ).json();

export const deleteCar = async (id: number) =>
    (
        await fetch(`${URL}/${Reqests.garage}/${id}`, {
            method: "DELETE",
        })
    ).json();

export const updateCar = async (body: INewCar, id: number) =>
    (
        await fetch(`${URL}/${Reqests.garage}/${id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
    ).json();

export const startEngine = async (id: number) =>
    (await fetch(`${URL}/${Reqests.engine}?id=${id}&status=started`, { method: "PATCH" })).json();

export const stopEngine = async (id: number) =>
    (await fetch(`${URL}/${Reqests.engine}?id=${id}&status=stopped`, { method: "PATCH" })).json();

export const drive = async (id: number) => {
    const res = await fetch(`${URL}/${Reqests.engine}?id=${id}&status=drive`, { method: "PATCH" }).catch();
    return res.status === 200 ? { ...(await res.json()) } : { success: false };
};

export const createWinner = async (body: INewWinner) =>
    (
        await fetch(`${URL}/${Reqests.winners}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
    ).json();

export const getWinners = async (page: number, sort: string, order: string, limit = 10): Promise<IGetWinners> => {
    const res = await fetch(
        `${URL}/${Reqests.winners}?${Reqests.page}=${page}&${Reqests.limit}=${limit}&${Reqests.sort}=${sort}&${Reqests.order}=${order}`
    );
    const winners = await res.json();

    return {
        winArray: await Promise.all(
            winners.map(async (winner: INewWinner) => ({ ...winner, car: await getCar(winner.id) }))
        ),
        amounth: Number(res.headers.get("X-Total-Count")),
    };
};

export const updateWinner = async (id: number, body: INewWinner) =>
    (
        await fetch(`${URL}/${Reqests.winners}/${id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
    ).json();

export const getWinnerStatus = async (id: number) => (await fetch(`${URL}/${Reqests.winners}/${id}`)).status;

export const getWinner = async (id: number): Promise<INewWinner> =>
    (await fetch(`${URL}/${Reqests.winners}/${id}`)).json();

export const setWinners = async (id: number, time: number) => {
    const winnerStatus = await getWinnerStatus(id);
    if (winnerStatus === 404) {
        await createWinner({
            id,
            wins: 1,
            time,
        });
    } else {
        const winner: INewWinner = await getWinner(id);
        await updateWinner(id, {
            id,
            wins: winner.wins + 1,
            time: time < winner.time ? time : winner.time,
        });
    }
};

export const deleteWinner = async (id: number) =>
    (await fetch(`${URL}/${Reqests.winners}/${id}`, { method: "DELETE" })).json();
