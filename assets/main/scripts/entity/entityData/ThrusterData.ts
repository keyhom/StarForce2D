import AccessoryObjectData from "./AccessoryObjectData";
import { CampType } from "./CampType";
import DRThruster from "../../datatable/DRThruster";
import GameEntry from "../../GameEntry";

const {ccclass, property} = cc._decorator;

export default class ThrusterData extends AccessoryObjectData {

    private m_fSpeed: number = 0;

    constructor(entityId: number, typeId: number, ownerId: number, ownerCamp: CampType) {
        super(entityId, typeId, ownerId, ownerCamp);

        let v_pDtThruster: atsframework.IDataTable<DRThruster> = GameEntry.dataTable.getDataTable<DRThruster>('thruster');
        let v_pDrThruster: DRThruster = v_pDtThruster.getDataRow(typeId);
        if (!v_pDrThruster) {
            cc.warn(`Can not query DRThruster from data table with typeid '${typeId}'.`);
            return;
        }

        this.m_fSpeed = v_pDrThruster.speed;
    }

    get speed(): number {
        return this.m_fSpeed;
    }

} // class ThrusterData