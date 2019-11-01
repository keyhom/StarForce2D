import { CampType } from "../../entity/entityData/CampType"
import DRCamp from "../../datatable/DRCamp"
import GameEntry from "../../GameEntry"
import TargetableObject from "../../entity/entityLogic/TargetableObject";
import GameEntity from "../../entity/entityLogic/GameEntity";
import ImpactData from "./ImpactData";
import Bullet from "../../entity/entityLogic/Bullet";

type CampPair = {
    first: CampType,
    second: CampType
}

export enum RelationType {
    Unknown,
    Friendly,
    Neutral,
    Hostile
}

export default class AIUtility {

    static getRelation(first: CampType, second: CampType): RelationType {
        let v_pDtCamp: atsframework.IDataTable<DRCamp> = GameEntry.dataTable.getDataTable<DRCamp>('camp');
        let v_pDrCamp: DRCamp = v_pDtCamp.getDataRow((row: DRCamp) => {
            return row.campType == first;
        });

        if (!v_pDrCamp) {
            cc.error(`Can not query camp relations with '${first}'`);
            return RelationType.Unknown;
        }

        return v_pDrCamp.getRelationTypeByCamp(second);
    }

    static performCollision(entity: TargetableObject, other: GameEntity): void {
        if (!entity || !other)
            return;


        if (other instanceof TargetableObject) {
            let v_pTarget: TargetableObject = other as TargetableObject;
            let v_pEntityImpactData: ImpactData = entity.impactData;
            let v_pTargetImpactData: ImpactData = v_pTarget.impactData;

            if (AIUtility.getRelation(v_pEntityImpactData.camp, v_pTargetImpactData.camp) == RelationType.Friendly) {
                return;
            }

            let v_iEntityDamageHp: number = AIUtility.calcDamageHp(v_pTargetImpactData.attack, v_pEntityImpactData.defense);
            let v_iTargetDamageHp: number = AIUtility.calcDamageHp(v_pEntityImpactData.attack, v_pTargetImpactData.defense);

            let v_iDelta: number = Math.min(v_pEntityImpactData.hp - v_iEntityDamageHp, v_pTargetImpactData.hp - v_iTargetDamageHp);
            if (v_iDelta > 0) {
                v_iEntityDamageHp += v_iDelta;
                v_iTargetDamageHp += v_iDelta;
            }

            entity.applyDamage(v_pTarget, v_iEntityDamageHp);
            v_pTarget.applyDamage(entity, v_iTargetDamageHp);
            return;
        } else if (other instanceof Bullet) {
            let v_pBullet: Bullet = other as Bullet;
            if (v_pBullet) {
                let v_pEntityImpactData: ImpactData = entity.impactData;
                let v_pBulletImpactData: ImpactData = v_pBullet.impactData;

                if (AIUtility.getRelation(v_pEntityImpactData.camp, v_pBulletImpactData.camp) == RelationType.Friendly)
                    return;

                let v_iEntityDamageHp: number = AIUtility.calcDamageHp(v_pBulletImpactData.attack, v_pEntityImpactData.defense);

                entity.applyDamage(v_pBullet, v_iEntityDamageHp);
                GameEntry.entityExt.hideEntity(v_pBullet);
                return;
            }
        }
    }

    private static calcDamageHp(attack: number, defense: number): number {
        if (attack <= 0)
            return 0;
        if (defense < 0)
            defense = 0;
        
        return attack * attack / (attack + defense);
    }

} // class AIUtility