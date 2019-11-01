import TargetableObjectData from "./TargetableObjectData";
import { CampType } from "./CampType";
import DRAsteroid from "../../datatable/DRAsteroid";
import GameEntry from "../../GameEntry";

export default class AsteroidData extends TargetableObjectData {

    private m_iMaxHp: number = 0;
    private m_iAttack: number = 0;
    private m_fSpeed: number = 0;
    private m_fAngularSpeed: number = 0;
    private m_iDeadEffectId: number = 0;
    private m_iDeadSoundId: number = 0;

    constructor(entityId: number, typeId: number) {
        super(entityId, typeId, CampType.Neutral);

        let v_pDtAsteroid: atsframework.IDataTable<DRAsteroid> = GameEntry.dataTable.getDataTable<DRAsteroid>('asteroid');
        let v_pDrAsteroid: DRAsteroid = v_pDtAsteroid.getDataRow(typeId);
        if (!v_pDrAsteroid) {
            cc.error(`Can not query DRAsteroid from data table with typeId '${typeId}'!`);
            return;
        }

        this.hp = this.m_iMaxHp = v_pDrAsteroid.maxHp;
        this.m_iAttack = v_pDrAsteroid.attack;
        this.m_fSpeed = v_pDrAsteroid.speed;
        this.m_fAngularSpeed = v_pDrAsteroid.angularSpeed;
        this.m_iDeadEffectId = v_pDrAsteroid.deadEffectId;
        this.m_iDeadSoundId = v_pDrAsteroid.deadSoundId;
    }

    get maxHp(): number { return this.m_iMaxHp; }
    get attack(): number { return this.m_iAttack; }
    get speed(): number { return this.m_fSpeed; }
    get angularSpeed(): number { return this.m_fAngularSpeed; }
    get deadEffectId(): number { return this.m_iDeadEffectId; }
    get deadSoundId(): number { return this.m_iDeadSoundId; }

} // class AsteroidData