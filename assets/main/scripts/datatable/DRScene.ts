import DataRowBase from "DataRowBase";

export default class DRScene extends DataRowBase {

    dataSplitSeperators: string = ',';

    assetName!: string;
    backgroundMusicId!: number;

    parseRowString(columns: string[]): boolean {
        if (!columns || columns.length == 0)
            return false;
        let i: number = 1;
        this.id = parseInt(columns[i++]);
        i++;
        this.assetName = columns[i++];
        this.backgroundMusicId = parseInt(columns[i++]);

        return true;
    }

} // class DRScene