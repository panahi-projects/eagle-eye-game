import { HSL, TStatus } from '../interfaces';
import StatsInstance from '../store/stats';
import { GenerateColor, GenerateSimilarColor } from '../utils/color';

export const GameHandler = (draggablesArray: HTMLElement[]) => {
    let colorBaseHSLCode = '';
    const dropZones = document.querySelectorAll('.drop-zone');
    const init = () => {
        const newColor = GenerateColor();
        colorBaseHSLCode = newColor.formated.hsl;
        const question = document.querySelector('#question') as HTMLDivElement;
        question.style.backgroundColor = colorBaseHSLCode;

        StatsInstance.resetStats();
    };

    const setDefaults = () => {
        draggablesArray.forEach((item) => {
            let color = GenerateSimilarColor(colorBaseHSLCode as HSL, 20);
            item.style.backgroundColor = color.hsl;
        });

        const Options = document.querySelector('#Options') as HTMLDivElement;
        Options.innerHTML = '';
        draggablesArray.forEach((d) => {
            Options.appendChild(d);
        });
    };
    const dragHandle = () => {
        const dragStart = (e: DragEvent) => {
            e.dataTransfer.setData('text/plain', (e.target as HTMLElement).id);
        };

        setDefaults();

        draggablesArray.forEach((item) => {
            // let color = GenerateSimilarColor(colorBaseHSLCode as HSL, 20);
            // item.style.backgroundColor = color.hsl;
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', dragStart);
        });

        const dragEnter = (e) => {
            e.preventDefault();
            e.target.classList.add('drag-over');
        };

        const dragOver = (e) => {
            e.preventDefault();
            e.target.classList.add('drag-over');
        };

        const dragLeave = (e) => {
            e.target.classList.remove('drag-over');
        };

        const drop = (e) => {
            const target = e.target as HTMLElement;
            const status = target.dataset.status;

            target.classList.remove('drag-over');

            // get the draggable element
            const id = e.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(id);

            if (status) {
                StatsInstance.removeStat(id); //removes the existing stat
                StatsInstance.addStat(id, status as TStatus); //adds new stat

                // add it to the drop target
                target.appendChild(draggable);

                // display the draggable element
                draggable.classList.remove('hide');
                const stats = StatsInstance.getStats();
                console.log({ stats });
            }
        };

        dropZones.forEach((dz: HTMLElement) => {
            dz.addEventListener('dragenter', dragEnter);
            dz.addEventListener('dragover', dragOver);
            dz.addEventListener('dragleave', dragLeave);
            dz.addEventListener('drop', drop);
        });
    };

    const reset = () => {
        const resetButton = document.querySelector('#reset') as HTMLButtonElement;
        resetButton.addEventListener('click', () => {
            init();
            setDefaults();
        });
    };

    init();
    return {
        init,
        dragHandle,
        reset
    };
};
