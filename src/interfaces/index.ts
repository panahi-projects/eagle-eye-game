import { hex, hsl, rgb } from 'color-convert/route';

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;
export type HSL = `hsl(${number}, ${number}%, ${number}%)`;

export type TShapeType = 'circle' | 'square';
export type TColor = RGB | RGBA | HEX | HSL;
export type TId = string;
export type TStatus = 'lighter' | 'darker';

export interface IColors {
    hsl: HSL;
    rgb?: RGB;
    rgba?: RGBA;
    hex?: HEX;
}
export interface IElement {
    id?: string;
    tag?: string;
    name?: string;
    innerHTML?: string | HTMLElement;
    attributes?: Array<{ key: string; value: string }> | NamedNodeMap[];
    datasets?: string[];
    childNodes?: HTMLElement[];
    className?: string;
    [key: string]: any;
}
export interface IStat {
    lighter: TId[]; //id of items are in lighter box
    darker: TId[]; //id of items are in darker box
}
export interface IColorsCollection {
    formated: {
        hsl: HSL;
        rgb: RGB;
        hex: HEX;
    };
    unformatted: {
        hsl: any;
        rgb: any;
        hex: any;
    };
}
