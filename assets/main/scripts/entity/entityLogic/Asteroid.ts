import TargetableObject from "./TargetableObject";
import AsteroidData from "../entityData/AsteroidData";
import GameEntity from "./GameEntity";
import GameEntry from "../../GameEntry";
import ImpactData from "../../game/fight/ImpactData";
import EffectData from "../entityData/EffectData";
import { EntityGenerateSerialId } from "../EntityUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Asteroid extends TargetableObject {

    private m_pAsteroidData!: AsteroidData;
    private m_fRotationDir!: number;

    protected onInit(userData: atsframework.UserData): void {
        super.onInit(userData);
    }

    protected onShow(userData: atsframework.UserData): void {
        super.onShow(userData);

        this.m_pAsteroidData = userData as AsteroidData;
        if (null == this.m_pAsteroidData) {
            cc.error('Asteroid data is invalid.');
            return;
        }

        this.name = `Asteroid (${this.id})`;

        this.m_fRotationDir = (Math.random() - 0.5) * 2;
    }

    protected onUpdate(elapsed: number, realElapsed: number): void {
        super.onUpdate(elapsed, realElapsed);

        this.node.setPosition(this.node.position.add(cc.v2(0, -1 * this.m_pAsteroidData.speed * elapsed)));
        let v_fDegree: number = this.m_fRotationDir * this.m_pAsteroidData.angularSpeed * elapsed;
        this.node.angle += v_fDegree;
    }

    onDead(attacker: GameEntity): void {
        super.onDead(attacker);

        let v_pEffectData: EffectData = new EffectData(EntityGenerateSerialId(), this.m_pAsteroidData.deadEffectId);
        v_pEffectData.position = cc.v2(this.node.position.x, this.node.position.y);
        GameEntry.entityExt.showEffect(v_pEffectData);

        GameEntry.soundExt.playSound(this.m_pAsteroidData.deadSoundId);

        let v_iScoreGen: number = this.m_pAsteroidData.score;
        let v_sNodePath: string = 'SurvivalGame/TotalScore';
        let v_pScoreNode: atsframework.DataNode = GameEntry.dataNode.getOrAddNode(v_sNodePath);
        let v_iScoreTotal: number = v_pScoreNode.getData();
        if (undefined == v_iScoreTotal || null == v_iScoreTotal)
            v_iScoreTotal = 0;

        GameEntry.dataNode.setData<number>(v_sNodePath, v_iScoreTotal + v_iScoreGen);
    }

    private m_pImpactData!: ImpactData;
    get impactData(): ImpactData {
        return this.m_pImpactData || (this.m_pImpactData = new ImpactData(
            this.m_pAsteroidData.camp,
            this.m_pAsteroidData.hp,
            this.m_pAsteroidData.attack,
            0
        ));
    }

} // class Asteroid