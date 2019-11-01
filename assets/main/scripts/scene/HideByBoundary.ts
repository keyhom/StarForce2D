import GameEntity from "../entity/entityLogic/GameEntity";
import GameEntry from "../GameEntry";
import TargetableObject from "../entity/entityLogic/TargetableObject";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HideByBoundary extends cc.Component {

    onCollisionExit(other: cc.Collider, self: cc.Collider): void {
        let v_pNode: cc.Node = other.node;
        let v_pEntity: GameEntity = other.getComponent(GameEntity);
        if (!v_pEntity) {
            cc.warn(`Unknown cc.Node '${v_pNode.name}', you must use entity only.`);
            v_pNode.destroy();
            return;
        }

        // if (v_pEntity instanceof TargetableObject) {
        //     let v_pTarget: TargetableObject = v_pEntity as TargetableObject;
        //     if (v_pTarget.isDead)
        //         return;
        // }

        if (GameEntry.entityExt.hasEntity(v_pEntity)) {
            GameEntry.entityExt.hideEntity(v_pEntity);
            // cc.log(`Collision triggered exit, hide entity: '${v_pNode.name}'`);
        }
    }

} // class HideByBoundary
