import { CampType } from "../../entity/entityData/CampType";

export default class ImpactData {

    private readonly m_eCamp: CampType;
    private readonly m_iHp: number;
    private readonly m_iAttack: number;
    private readonly m_iDefense: number;

    constructor(camp: CampType, hp: number, attack: number, defense) {
        this.m_eCamp = camp;
        this.m_iHp = hp;
        this.m_iAttack = attack;
        this.m_iDefense = defense;
    }

    get camp(): CampType { return this.m_eCamp; }

    get hp(): number { return this.m_iHp; }

    get attack(): number { return this.m_iAttack; }

    get defense(): number { return this.m_iDefense; }

} // class ImpactData