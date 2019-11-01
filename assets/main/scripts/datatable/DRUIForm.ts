import DataRowBase from "DataRowBase";

export default class DRUIForm extends DataRowBase {

    dataSplitSeperators: string = ',';

    assetName!: string;
    uiGroupName!: string;
    allowMultiInstance!: boolean;
    pauseCoveredUIForm!: boolean;

    parseRowString(columns: string[]): boolean {
        if (!columns || columns.length == 0)
            return false;

        let i:number = 1;
        this.id = parseInt(columns[i++]);
        i++;
        this.assetName = columns[i++];
        this.uiGroupName = columns[i++];
        this.allowMultiInstance = columns[i++] === 'TRUE' ? true : false;
        this.pauseCoveredUIForm = columns[i++] === 'TRUE' ? true : false;

        return true;
    }

} // class DRUIForm