import { IStat, TId, TStatus } from '../interfaces';
import ObservableInstance from './observable';

let instance: any;
let stats: IStat = {
    lighter: [],
    darker: []
};

class Stats {
    constructor() {
        if (instance) {
            throw new Error('The instance has already been created');
        }
        instance = this;
    }
    statLog() {
        ObservableInstance.notify('onStatBeforeUpdate');
    }
    resetStats() {
        this.statLog();
        stats = {
            lighter: [],
            darker: []
        };
    }
    getStats(): IStat {
        return stats;
    }
    addStat(id: TId, status: TStatus): string[] {
        this.statLog();
        const foundIndex = stats[status].findIndex((s) => s === id);
        if (foundIndex < 0) {
            stats[status].push(id);
            return stats[status];
        } else {
            throw new Error(`The ID: ${id} does exist`);
        }
    }
    removeStat(id: TId): void {
        this.statLog();
        const foundIndexInLighterBox = stats.lighter.findIndex((s) => s === id);
        const foundIndexInLDarkerBox = stats.darker.findIndex((s) => s === id);

        if (foundIndexInLighterBox >= 0) {
            stats.lighter.splice(foundIndexInLighterBox, 1);
        }
        if (foundIndexInLDarkerBox >= 0) {
            stats.darker.splice(foundIndexInLDarkerBox, 1);
        }
    }
}
const StatsInstance = Object.freeze(new Stats());
export default StatsInstance;
