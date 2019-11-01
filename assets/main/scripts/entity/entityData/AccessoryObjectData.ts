import EntityData from "./EntityData";
import { CampType } from "./CampType";

const {ccclass, property} = cc._decorator;

export default abstract class AccessoryObjectData extends EntityData {

    private m_iOwnerId: number = 0;
    private m_eOwnerCamp: CampType = CampType.Unknown;

    constructor(entityId: number, typeId: number, ownerId: number, ownerCamp: CampType) {
        super(entityId, typeId);

        this.m_iOwnerId = ownerId;
        this.m_eOwnerCamp = ownerCamp;
    }

    get ownerId(): number {
        return this.m_iOwnerId;
    }

    get ownerCamp(): CampType {
        return this.m_eOwnerCamp;
    }

} // class AccessoryObjectData