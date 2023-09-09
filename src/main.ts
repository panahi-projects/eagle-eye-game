import { IElement } from './interfaces';
import { CreateElement } from './utils/global';
import { GameHandler } from './handlers/game-handler';

import './styles/app.css';
import ObservableInstance from './store/observable';

const createCssClass = () => {
    const styleSchema: IElement = {
        tag: 'style',
        type: 'text/css',
        innerHTML: '.hide { display: none }'
    };
    const style = CreateElement(styleSchema);
    document.getElementsByTagName('head')[0].appendChild(style);
};
createCssClass();

const draggables = document.querySelectorAll('.draggable');
const draggablesArray: HTMLElement[] = Array.from(draggables) as HTMLElement[];

const gameHandler = GameHandler(draggablesArray);
gameHandler.dragHandle();
gameHandler.reset();

ObservableInstance.subscribe('onStatBeforeUpdate', () => {
    console.log('Stat before update');
});
