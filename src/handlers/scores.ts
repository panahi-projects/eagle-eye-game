import { IStat } from '../interfaces';
import { isDarkerColor } from '../utils/color';

export const Score = (stats: IStat) => {
    const lighters = stats.lighter;
    const darkers = stats.darker;

    const findItemsById = (ids: string[]): HTMLElement[] => {
        let collection: HTMLElement[] = [];
        ids.forEach((i) => {
            let item = document.querySelector(`#${i}`) as HTMLElement;
            if (item) {
                collection.push(item);
            }
        });
        return collection;
    };

    const lighterItems: HTMLElement[] = findItemsById(lighters);
    const darkerItems: HTMLElement[] = findItemsById(darkers);

    const calculate = () => {
        let colors = {
            lighter: [],
            darker: []
        };
        lighterItems.forEach((x) => {
            colors.lighter.push(x.style.backgroundColor);
        });
        darkerItems.forEach((x) => {
            colors.darker.push(x.style.backgroundColor);
        });
    };
};
