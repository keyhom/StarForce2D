import DataRowBase from "DataRowBase";

export default class DRUISound extends DataRowBase {

    dataSplitSeperators: string = ',';

    assetName: string;
    priority: number = 0;
    volume: number = 0;

    parseRowString(columns: string[]): boolean {
        if (!columns || columns.length == 0)
            return false;

        let i: number = 1;
        this.id = parseInt(columns[i++]);
        i++;
        this.assetName = columns[i++];
        this.priority = parseInt(columns[i++]);
        this.volume = parseFloat(columns[i++]);

        return true;
    }


} // class DRUISound