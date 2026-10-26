export function getRandomInteger(min: number, max: number): number {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export function getRandomItem<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error('Нельзя выбрать элемент из пустого массива.');
  }
  const index = getRandomInteger(0, items.length - 1);

  return items[index];
}

export function getRandomItems<T>(
  items: readonly T[],
  count: number,
): T[] {
  if (count < 0 || count > items.length) {
    throw new Error('Некорректное количество элементов.');
  }
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index--) {
    const randomIndex = getRandomInteger(0, index);

    [shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems.slice(0, count);
}

export function getRandomFloat(min: number, max: number, digits = 1): number {
  const multiplier = 10 ** digits;
  const value = Math.random() * (max - min) + min;

  return Math.round(value * multiplier) / multiplier;
}
