import convert from 'color-convert';
import { HSL, IColors, IColorsCollection } from '../interfaces';

const REGEX = /\d+/g;

export const GenerateSimilarColor = (color: HSL, range: number = 10): IColors => {
    let hsl: number[] = color.match(REGEX).map((c) => parseInt(c));
    // const hsl = convert.hex.hsl(color);

    if (hsl.length !== 3) return;

    const hue = hsl[0]; //this value is constant
    const sat = hsl[1];
    const lightness = hsl[2];

    //ensure the number is not out of the supported range: 0 to 100
    let sat_max = Math.abs(sat + range) % 100;
    let sat_min = Math.abs(sat - range) % 100;
    const newSat = Math.floor(Math.random() * (sat_max - sat_min) + sat_min);

    let lightness_max = Math.abs(lightness + range) % 100;
    let lightness_min = Math.abs(lightness - range) % 100;
    const newLightness = Math.floor(Math.random() * (lightness_max - lightness_min) + lightness_min);

    const newHSL: HSL = `hsl(${hue}, ${newSat}%, ${newLightness}%)`;

    return {
        hsl: newHSL
    };
};
export const GenerateColor = (): IColorsCollection => {
    const h = Math.floor(Math.random() * 360); //hue
    const s = Math.floor(Math.random() * 100); //saturation
    const l = Math.floor(Math.random() * 100); //lightness

    const rgb = convert.hsl.rgb([h, s, l]);
    const hex = convert.hsl.hex([h, s, l]);
    const hsl = convert.rgb.hsl(rgb);

    const formatted_hsl: HSL = `hsl(${h}, ${s}%, ${l}%)`;

    return {
        formated: {
            hsl: formatted_hsl,
            hex: `#${hex}`,
            rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
        },
        unformatted: {
            hsl,
            hex,
            rgb
        }
    };
};
export const isDarkerColor = (color1: HSL, color2: HSL): boolean => {
    let hsl_1: number[] = color1.match(REGEX).map((c) => parseInt(c));
    let hsl_2: number[] = color2.match(REGEX).map((c) => parseInt(c));

    if (hsl_1.length !== 3 || hsl_2.length !== 3) {
        throw new Error('Color code is not in valid format');
    }
    if (hsl_1[2] < hsl_2[2]) return true;
    return false;
};
