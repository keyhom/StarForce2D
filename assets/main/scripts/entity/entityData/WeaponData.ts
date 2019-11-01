import AccessoryObjectData from "./AccessoryObjectData";
import { CampType } from "./CampType";
import DRWeapon from "../../datatable/DRWeapon";
import GameEntry from "../../GameEntry";

const { ccclass, property } = cc._decorator;

export default class WeaponData extends AccessoryObjectData {

    private m_iAttack: number = 0;
    private m_fAttackInterval: number = 0;
    private m_iBulletId: number = 0;
    private m_fBulletSpeed: number = 0;
    private m_iBulletSoundId: number = 0;

    constructor(entityId: number, typeId: number, ownerId: number, ownerCamp: CampType) {
        super(entityId, typeId, ownerId, ownerCamp);

        let v_pDtWeapon: atsframework.IDataTable<DRWeapon> = GameEntry.dataTable.getDataTable<DRWeapon>('weapon');
        let v_pDrWeapon: DRWeapon = v_pDtWeapon.getDataRow(typeId);
        if (!v_pDrWeapon) {
            cc.error(`Can not query the DRWeapon from data table with typeId '${typeId}'.`);
            return;
        }

        this.m_iAttack = v_pDrWeapon.attack;
        this.m_fAttackInterval = v_pDrWeapon.attackInterval;
        this.m_iBulletId = v_pDrWeapon.bulletId;
        this.m_fBulletSpeed = v_pDrWeapon.bulletSpeed;
        this.m_iBulletSoundId = v_pDrWeapon.bulletSoundId;
    }

    get attack(): number {
        return this.m_iAttack;
    }

    get attackInterval(): number {
        return this.m_fAttackInterval;
    }

    get bulletId(): number {
        return this.m_iBulletId;
    }

    get bulletSpeed(): number {
        return this.m_fBulletSpeed;
    }

    get bulletSoundId(): number {
        return this.m_iBulletSoundId;
    }

} // class WeaponData
