import EntityData from "./EntityData";

export default class EffectData extends EntityData {

    private m_fKeepTime: number = 0;

    constructor(entityId: number, typeId: number) {
        super(entityId, typeId);

        this.m_fKeepTime = 3;
    }

    get keepTime(): number {
        return this.m_fKeepTime;
    }

} // class EffectData