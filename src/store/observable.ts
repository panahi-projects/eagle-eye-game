export interface IObserver {
    name: string; //unique
    func: any;
}

const observers: IObserver[] = [];

class Observable {
    notify(name: string) {
        observers.forEach((obs) => {
            if (obs.name === name) {
                obs.func(name);
            }
        });
    }
    subscribe(name: string, func: any) {
        let observer: IObserver = {
            name,
            func
        };
        observers.push(observer);
    }
    unsubscribe(name: string) {
        [...observers].forEach((observer, index) => {
            if (observer.name === name) {
                observers.splice(index, 1);
            }
        });
    }
}
const ObservableInstance = Object.freeze(new Observable());
export default ObservableInstance;
