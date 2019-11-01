import DataRowBase from "DataRowBase";

export default class DRAsteroid extends DataRowBase {

    dataSplitSeperators: string = ',';

    maxHp!: number;
    attack!: number;
    speed!: number;
    angularSpeed!: number;
    deadEffectId!: number;
    deadSoundId!: number;

    parseRowString(columns: string[]): boolean {
        if (!columns || !columns.length)
            return;

        let i: number = 1;
        this.id = parseInt(columns[i++]);
        i++;
        this.maxHp = parseInt(columns[i++]);
        this.attack = parseInt(columns[i++]);
        this.speed = parseFloat(columns[i++]);
        this.angularSpeed = parseFloat(columns[i++]);
        this.deadEffectId = parseInt(columns[i++]);
        this.deadSoundId = parseInt(columns[i++]);

        return true;
    }


} // class DRAsteroid