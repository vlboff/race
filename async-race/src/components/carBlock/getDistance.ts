function getStartPosition(el: HTMLElement) {
    const { left } = el.getBoundingClientRect();
    return left;
}

function getFinishPosition(el: HTMLElement) {
    const { left, width } = el.getBoundingClientRect();
    return left + width;
}

export function getDistance(start: HTMLElement, finish: HTMLElement) {
    const startPosition = getStartPosition(start);
    const finishPosition = getFinishPosition(finish);
    return finishPosition - startPosition;
}
