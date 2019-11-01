import EntityData from "./EntityData";
import { CampType } from "./CampType";

export default class BulletData extends EntityData {

    private m_iOwnerId: number = 0;
    private m_iAttack: number = 0;
    private m_fSpeed: number = 0;
    private m_eOwnerCamp: CampType = CampType.Unknown;

    constructor(entityId: number, typeId: number, ownerId: number, ownerCamp: CampType, attack: number, speed: number) {
        super(entityId, typeId);

        this.m_iOwnerId = ownerId;
        this.m_eOwnerCamp = ownerCamp;
        this.m_iAttack = attack;
        this.m_fSpeed = speed;
    }

    get ownerId(): number { return this.m_iOwnerId; }

    get ownerCamp(): CampType { return this.m_eOwnerCamp; }

    get attack(): number { return this.m_iAttack; }

    get speed(): number { return this.m_fSpeed; }

} // class BulletData