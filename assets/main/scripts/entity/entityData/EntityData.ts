const { property } = cc._decorator;

export default abstract class EntityData extends cc.Object {

    private m_Id: number = 0;
    private m_iTypeId: number = 0;
    private m_rPosition: cc.Vec3 = cc.Vec3.ZERO;
    private m_pRotation: cc.Quat = new cc.Quat();

    constructor(entityId: number, typeId: number) {
        super();
        this.m_Id = entityId;
        this.m_iTypeId = typeId;
    }

    get id(): number {
        return this.m_Id;
    }

    get typeId(): number {
        return this.m_iTypeId;
    }

    get position(): cc.Vec3 {
        return this.m_rPosition;
    }

    set position(value) {
        this.m_rPosition = value;
    }

    get rotation(): cc.Quat {
        return this.m_pRotation;
    }

    set rotation(value) {
        this.m_pRotation = value;
    }

} // class EntityData