import { SeedableRandom } from './seedable-random.js';

export const RANDOM = new SeedableRandom(1);

export const WIDTH = 100;
export const HEIGHT = 100;

export const RADIUS = 20;

export const resources = ['grass', 'stone', 'wood', 'iron_ore'];
export const resourceCount = {
    grass: 100,
    stone: 4,
    wood: 4,
    iron_ore: 2
};
export const resourceColor = {
    grass: 'green',
    stone: 'darkgrey',
    wood: 'brown',
    iron_ore: 'lightgrey',
    desert: 'yellow',
    water: 'blue'
};
export const resourceToImage = {
    grass: 'grass.png',
    stone: 'stone.png',
    wood: 'wood.png',
    iron_ore: 'iron_ore.png',
    desert: 'desert.png',
    water: 'water.png'
};



export const flags = {
    showHexagonCoordinates: false,
    showHexagonBorder: false
}

export const data = {
    hauptquartier: {
        row: 50,
        column: 50
    }
}