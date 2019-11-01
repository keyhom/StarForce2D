import TargetableObject from "./TargetableObject";
import AircraftData from "../entityData/AircraftData";
import EntityLogic from "EntityLogic";
import GameEntity from "./GameEntity";
import GameEntry from "../../GameEntry";
import Thruster from "./Thruster";
import Weapon from "./Weapon";
import Armor from "./Armor";
import ImpactData from "../../game/fight/ImpactData";
import EffectData from "../entityData/EffectData";
import { EntityGenerateSerialId } from "../EntityUtil";

export default class Aircraft extends TargetableObject {

    private m_pAircraftData!: AircraftData;
    protected m_pThruster!: Thruster;
    protected m_pWeapons: Weapon[] = [];
    protected m_pArmors: Armor[] = [];

    protected onShow(userData: atsframework.UserData): void {
        super.onShow(userData);

        this.m_pAircraftData = userData as AircraftData;
        if (!this.m_pAircraftData) {
            cc.error('Aircraft data is invalid.');
            return;
        }

        this.name = `Aircraft (${this.id})`;

        GameEntry.entityExt.showThruster(this.m_pAircraftData.thrusterData);

        for (const weaponData of this.m_pAircraftData.allWeaponDatas) {
            GameEntry.entityExt.showWeapon(weaponData);
        }

        for (const armorData of this.m_pAircraftData.allArmorDatas) {
            GameEntry.entityExt.showArmor(armorData);
        }
    }

    protected onAttached(childEntity: EntityLogic, userData: atsframework.UserData): void {
        super.onAttached(childEntity, userData);

        if (childEntity instanceof Thruster) {
            this.m_pThruster = childEntity as Thruster;
            return;
        }

        if (childEntity instanceof Weapon) {
            this.m_pWeapons.push(childEntity as Weapon);
            return;
        }

        if (childEntity instanceof Armor) {
            this.m_pArmors.push(childEntity as Armor);
            return;
        }
    }

    protected onDetached(childEntity: EntityLogic, userData: atsframework.UserData): void {
        super.onDetached(childEntity, userData);

        if (childEntity instanceof Thruster) {
            this.m_pThruster = null;
            return;
        }

        if (childEntity instanceof Weapon) {
            let idx: number = this.m_pWeapons.indexOf(childEntity as Weapon);
            if (idx != -1)
                this.m_pWeapons.splice(idx, 1);
            return;
        }

        if (childEntity instanceof Armor) {
            let idx: number = this.m_pArmors.indexOf(childEntity as Armor);
            if (idx != -1)
                this.m_pArmors.splice(idx, 1);
            return;
        }
    }

    onDead(attacker: GameEntity): void {
        super.onDead(attacker);


        let v_pEffectData: EffectData = new EffectData(EntityGenerateSerialId(), this.m_pAircraftData.deadEffectId);
        v_pEffectData.position = new cc.Vec3(this.node.position.x, this.node.position.y, 0);
        GameEntry.entityExt.showEffect(v_pEffectData);

        // GameEntry.soundExt.playSound(this.m_pAircraftData.deadSoundId);
    }

    private m_pImpactData!: ImpactData;
    get impactData(): ImpactData {
        return this.m_pImpactData || (this.m_pImpactData = new ImpactData(this.m_pAircraftData.camp, this.m_pAircraftData.hp, 0, this.m_pAircraftData.defense));
    }

} // class Aircraft