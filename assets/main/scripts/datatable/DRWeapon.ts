import DataRowBase from "DataRowBase";

export default class DRWeapon extends DataRowBase {

    dataSplitSeperators: string = ',';

    attack!: number;
    attackInterval!: number;
    bulletId!: number;
    bulletSpeed!: number;
    bulletSoundId!: number;

    parseRowString(columns: string[]): boolean {
        if (!columns || columns.length == 0)
            return false;

        let i: number = 1;
        this.id = parseInt(columns[i++]);
        i++;
        this.attack = parseInt(columns[i++]);
        this.attackInterval = parseFloat(columns[i++]);
        this.bulletId = parseInt(columns[i++]);
        this.bulletSpeed = parseFloat(columns[i++]);
        this.bulletSoundId = parseInt(columns[i++]);

        return true;
    }

} // DRWeapon