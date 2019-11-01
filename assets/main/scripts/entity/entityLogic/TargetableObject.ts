import GameEntry from "../../GameEntry";
import GameEntity from "./GameEntity";
import TargetableObjectData from "../entityData/TargetableObjectData";
import ImpactData from "../../game/fight/ImpactData";
import AIUtility from "../../game/fight/AIUtility";

export default abstract class TargetableObject extends GameEntity {

    private m_pData!: TargetableObjectData;

    get isDead(): boolean {
        return this.m_pData.hp <= 0;
    }

    protected onShow(userData: atsframework.UserData): void {
        super.onShow(userData);

        this.m_pData = userData as TargetableObjectData;
        if (!this.m_pData) {
            cc.error('Targetable object data is invalid.');
            return;
        }
    }

    onDead(attacker: GameEntity): void {
        GameEntry.entityExt.hideEntity(this);
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
        let v_pEntity: GameEntity = other.getComponent(GameEntity);
        if (!v_pEntity)
            return;

        if (v_pEntity instanceof TargetableObject && v_pEntity.id <= this.id) {
            // handle the collision by the entity which id is smaller.
            return;
        }

        // cc.log(`Triggerred collision enter '${other.name}' - '${self.name}'`);

        // let v_pTarget: TargetableObject = v_pEntity as TargetableObject;
        // if (v_pTarget.isDead)
        //     return;

        AIUtility.performCollision(this, v_pEntity);
    }

    applyDamage(attacker: GameEntity, damageHp: number): void {
        let v_fHpRatioFrom: number = this.m_pData.hpRatio;
        this.m_pData.hp -= damageHp;
        let v_fHpRatioTo: number = this.m_pData.hpRatio;
        if (v_fHpRatioFrom > v_fHpRatioTo) {
            // XXX: showHpBar ?
        }

        if (this.m_pData.hp <= 0)
            this.onDead(attacker);
    }

    abstract get impactData(): ImpactData;

} // class TargetableObject
