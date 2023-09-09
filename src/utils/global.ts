import { IElement } from '../interfaces';

export const CreateElement = (elementObj: IElement): HTMLElement => {
    // if (!elementObj || !elementObj.tag) return {} as HTMLElement;
    var element: HTMLElement = document.createElement(elementObj.tag);
    for (var prop in elementObj) {
        if (prop === 'childNodes') {
            elementObj.childNodes.forEach(function (node) {
                element.appendChild(node);
            });
        } else if (prop === 'attributes') {
            elementObj.attributes.forEach(function (attr) {
                element.setAttribute(attr.key, attr.value);
            });
        } else if (prop === 'datasets') {
            elementObj.datasets.forEach(function (dataset: string) {
                element.dataset[dataset] = elementObj[dataset];
            });
        } else element[prop] = elementObj[prop];
    }
    return element;
};
export const GenerateID = (length: number): string => {
    const chars: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result: string = '';
    const charsLength: number = chars.length;
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charsLength));
    }

    return result;
};
