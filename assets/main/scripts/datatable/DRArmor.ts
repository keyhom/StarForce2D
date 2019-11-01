import DataRowBase from "DataRowBase";

export default class DRArmor extends DataRowBase {

    dataSplitSeperators: string = ',';

    maxHP!: number;
    defense!: number;

    parseRowString(columns: string[]): boolean {
        if (!columns || columns.length == 0)
            return false;

        let i: number = 1;
        this.id = parseInt(columns[i++]);
        i++;
        this.maxHP = parseInt(columns[i++]);
        this.defense = parseInt(columns[i++]);

        return true;
    }

} // class DRArmor