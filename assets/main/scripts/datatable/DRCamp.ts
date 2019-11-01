import DataRowBase from "DataRowBase";
import { CampType } from "../entity/entityData/CampType";
import { RelationType } from "../game/fight/AIUtility";

export default class DRCamp extends DataRowBase {

    dataSplitSeperators: string = ',';

    campType: CampType;

    private m_pRelationTypes: RelationType[] = [];

    get relationTypes(): RelationType[] {
        return this.m_pRelationTypes;
    }

    parseRowString(columns: string[]): boolean {
        if (!columns || columns.length == 0)
            return false;

        let i: number = 1;
        this.id = parseInt(columns[i++]);
        i++;
        this.campType = CampType[columns[i++]];

        this.m_pRelationTypes.push(RelationType[columns[i++]]);
        this.m_pRelationTypes.push(RelationType[columns[i++]]);
        this.m_pRelationTypes.push(RelationType[columns[i++]]);
        this.m_pRelationTypes.push(RelationType[columns[i++]]);
        this.m_pRelationTypes.push(RelationType[columns[i++]]);
        this.m_pRelationTypes.push(RelationType[columns[i++]]);

        return true;
    }

    getRelationTypeByCamp(campType: CampType): RelationType {
        switch (campType) {
            case CampType.Player:
                return this.m_pRelationTypes[0];
            case CampType.Enemy:
                return this.m_pRelationTypes[1];
            case CampType.Neutral:
                return this.m_pRelationTypes[2];
            case CampType.Player2:
                return this.m_pRelationTypes[3];
            case CampType.Enemy2:
                return this.m_pRelationTypes[4];
            case CampType.Neutral2:
                return this.m_pRelationTypes[5];
            default:
                return RelationType.Unknown;
        }
    }

} // class DRCamp