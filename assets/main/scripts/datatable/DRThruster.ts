import DataRowBase from "DataRowBase";

export default class DRThruster extends DataRowBase {

    dataSplitSeperators: string = ',';

    speed!: number;

    parseRowString(columns: string[]): boolean {
        if (!columns || columns.length == 0)
            return false;

        let i: number = 1;
        this.id = parseInt(columns[i++]);
        i++;
        this.speed = parseFloat(columns[i++]);

        return true;
    }

} // class DRThruster