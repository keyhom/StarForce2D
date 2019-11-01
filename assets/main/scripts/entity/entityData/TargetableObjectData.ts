import EntityData from './EntityData';
import { CampType } from './CampType';

const { ccclass, property } = cc._decorator;

export default abstract class TargetableObjectData extends EntityData {

    private m_iHP: number = 0;
    private m_eCamp: CampType = CampType.Unknown;

    constructor(entityId: number, typeId: number, camp: CampType) {
        super(entityId, typeId);

        this.m_eCamp = camp;
        this.m_iHP = 0;
    }

    get camp(): CampType {
        return this.m_eCamp;
    }

    get hp(): number {
        return this.m_iHP;
    }

    set hp(value: number) {
        this.m_iHP = value;
    }

    abstract get maxHp(): number;

    get hpRatio(): number {
        return this.maxHp > 0 ? 1.0 * this.hp / this.maxHp : 0;
    }

} // class TargetableObjectData