import EntityLogic from "EntityLogic";
import EntityData from "../entityData/EntityData";

export default abstract class GameEntity extends EntityLogic {

    private m_pEntityData!: EntityData;

    get id(): number {
        return this.entity.id;
    }

    protected onInit(userData: atsframework.UserData): void {
        super.onInit(userData);
    }

    protected onShow(userData: atsframework.UserData): void {
        super.onShow(userData);

        this.m_pEntityData = userData as EntityData;
        if (!this.m_pEntityData) {
            cc.error('Entity data is invalid.');
            return;
        }

        this.name = `[GameEntity ${this.id}]`;
        this.node.setPosition(this.m_pEntityData.position);
        this.node.setScale(cc.Vec3.ONE);
    }

} // class GameEntity