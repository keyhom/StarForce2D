import DataRowBase from "DataRowBase";

export default class DRSound extends DataRowBase {

    assetName: string;
    priority: number = 0;
    loop: boolean = false;
    volume: number = 0;
    spatialBlend: number = 0;
    maxDistance: number = 0;

    get dataSplitSeperators(): string {
        return ',';
    }

    parseRowString(columns: string[]): boolean {
        if (!columns || columns.length == 0)
            return;

        let i: number = 1;
        this.id = parseInt(columns[i++]);
        i++;
        this.assetName = columns[i++];
        this.priority = parseInt(columns[i++]);
        this.loop = 'TRUE' == columns[i++].trim();
        this.volume = parseFloat(columns[i++]);
        this.spatialBlend = parseFloat(columns[i++]);
        this.maxDistance = parseFloat(columns[i++]);

        return true;
    }


} // class DRSound