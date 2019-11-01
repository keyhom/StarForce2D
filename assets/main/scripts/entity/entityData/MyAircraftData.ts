import AircraftData from "./AircraftData";
import { CampType } from "./CampType";

const { ccclass, property } = cc._decorator;

export default class MyAircraftData extends AircraftData {

    private m_sName: string = null;

    constructor(entityId: number, typeId: number) {
        super(entityId, typeId, CampType.Player);
    }

    get name(): string {
        return this.name;
    }

    set name(value) {
        this.m_sName = value;
    }

} // class MyAircraftData