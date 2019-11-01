import GameEntity from "./GameEntity";
import ThrusterData from "../entityData/ThrusterData";
import GameEntry from "../../GameEntry";
import EntityLogic from "EntityLogic";

const AttachPoint: string = "Thruster Point";

export default class Thruster extends GameEntity {

    private m_pThrusterData!: ThrusterData;

    protected onInit(userData: atsframework.UserData): void {
        super.onInit(userData);
    }

    protected onShow(userData: atsframework.UserData): void {
        super.onShow(userData);

        this.m_pThrusterData = userData as ThrusterData;
        if (!this.m_pThrusterData) {
            cc.error('Thruster data is invalid.');
            return;
        }

        GameEntry.entityExt.attachEntity(this, this.m_pThrusterData.ownerId);
    }

    protected onAttachTo(parentEntity: EntityLogic, userData: atsframework.UserData): void {
        super.onAttachTo(parentEntity, userData);

        let v_pAttachPoint: cc.Node = parentEntity.node.getChildByName(AttachPoint);
        if (v_pAttachPoint) {
            this.node.setParent(v_pAttachPoint);
        }

        this.name = `Thruster of ${parentEntity.name}`;
        this.node.setPosition(cc.Vec2.ZERO);
    }

} // class Thruster