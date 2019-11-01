import DataRowBase from "DataRowBase";

export default class DRMusic extends DataRowBase {

    dataSplitSeperators: string = ',';

    assetName!: string;

    parseRowString(columns: string[]): boolean {
        if (!columns || columns.length == 0)
            return false;

        let i: number = 1;
        this.id = parseInt(columns[i++]);
        i++;
        this.assetName = columns[i++];

        return true;
    }

} // class DRMusic