import AccessoryObjectData from "./AccessoryObjectData";
import { CampType } from "./CampType";
import DRArmor from "../../datatable/DRArmor";
import GameEntry from "../../GameEntry";

const {ccclass, property} = cc._decorator;

export default class ArmorData extends AccessoryObjectData {

    private m_iMaxHp: number = 0;
    private m_iDefense: number = 0;

    constructor(entityId: number, typeId: number, ownerId: number, ownerCamp: CampType) {
        super(entityId, typeId, ownerId, ownerCamp);

        let v_pDtArmor: atsframework.IDataTable<DRArmor> = GameEntry.dataTable.getDataTable<DRArmor>('armor');
        let v_pDrArmor: DRArmor = v_pDtArmor.getDataRow(typeId);

        if (!v_pDrArmor) {
            cc.error(`Can not query DRArmor from data table with typeId '${typeId}'!`);
            return;
        }

        this.m_iMaxHp = v_pDrArmor.maxHP;
        this.m_iDefense = v_pDrArmor.defense;
    }

    get maxHp(): number {
        return this.m_iMaxHp;
    }

    get defense(): number {
        return this.m_iDefense;
    }

} // class ArmorData