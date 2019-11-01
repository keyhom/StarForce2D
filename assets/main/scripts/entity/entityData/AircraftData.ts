import TargetableObjectData from "./TargetableObjectData";
import { CampType } from "./CampType";
import GameEntry from "../../GameEntry";
import DRAircraft from "../../datatable/DRAircraft";
import ThrusterData from "./ThrusterData";
import WeaponData from "./WeaponData";
import { EntityGenerateSerialId } from "../EntityUtil";
import ArmorData from "./ArmorData";

const {ccclass, property} = cc._decorator;

export default abstract class AircraftData extends TargetableObjectData {

    private m_iMaxHp: number = 0;
    private m_iDefense: number = 0;
    private m_iDeadEffectId: number = 0;
    private m_iDeadSoundId: number = 0;
    private m_pThrusterData: ThrusterData = null;
    private m_pWeaponDatas: WeaponData[] = [];
    private m_pArmorDatas: ArmorData[] = [];

    constructor(entityId: number, typeId: number, camp: CampType) {
        super(entityId, typeId, camp);

        let v_pDtAircraft: atsframework.IDataTable<DRAircraft> = GameEntry.dataTable.getDataTable<DRAircraft>('aircraft');
        let v_pDrAircraft: DRAircraft = v_pDtAircraft.getDataRow(typeId);
        if (!v_pDrAircraft) {
            cc.warn(`Can not query the DRAircraft data row in DataTable 'aircraft' with typeid '${typeId}'.`);
            return;
        }

        this.m_pThrusterData = new ThrusterData(EntityGenerateSerialId(), v_pDrAircraft.thrusterId, this.id, this.camp);

        for (let i: number = 0, weaponId: number = 0; (weaponId = v_pDrAircraft.getWeaponIdAt(i)) > 0; i++) {
            this.attachWeaponData(new WeaponData(EntityGenerateSerialId(), weaponId, this.id, this.camp));
        }

        for (let i: number = 0, armorId: number = 0; (armorId = v_pDrAircraft.getArmorIdAt(i)) > 0; i++) {
            this.attachArmorData(new ArmorData(EntityGenerateSerialId(), armorId, this.id, this.camp));
        }

        this.m_iDeadEffectId = v_pDrAircraft.deadEffectId;
        this.m_iDeadSoundId = v_pDrAircraft.deadSoundId;

        this.hp = this.m_iMaxHp;
    }

    get maxHp(): number {
        return this.m_iMaxHp;
    }

    get defense(): number {
        return this.m_iDefense;
    }

    get speed(): number {
        return this.m_pThrusterData.speed;
    }

    get deadEffectId(): number {
        return this.m_iDeadEffectId;
    }

    get deadSoundId(): number {
        return this.m_iDeadSoundId;
    }

    get thrusterData(): ThrusterData {
        return this.m_pThrusterData;
    }

    get allWeaponDatas(): WeaponData[] {
        return this.m_pWeaponDatas;
    }

    get allArmorDatas(): ArmorData[] {
        return this.m_pArmorDatas;
    }

    attachWeaponData(weaponData: WeaponData): void {
        if (!weaponData)
            return;

        if (this.m_pWeaponDatas.indexOf(weaponData) >= 0)
            return;

        this.m_pWeaponDatas.push(weaponData);
    }

    detachWeaponData(weaponData: WeaponData): void {
        if (!weaponData)
            return;

        let idx: number = this.m_pWeaponDatas.indexOf(weaponData);
        if (idx >= 0) {
            this.m_pWeaponDatas.splice(idx, 1);
        }
    }

    attachArmorData(armorData: ArmorData): void {
        if (!armorData)
            return;

        if (this.m_pArmorDatas.indexOf(armorData) >= 0)
            return;

        this.m_pArmorDatas.push(armorData);
        this.refreshData();
    }

    detachArmorData(armorData: ArmorData): void {
        if (!armorData)
            return;

        let idx: number = this.m_pArmorDatas.indexOf(armorData);
        if (idx >= 0)
            this.m_pArmorDatas.splice(idx, 1);

        this.refreshData();
    }

    private refreshData(): void {
        this.m_iMaxHp = 0;
        this.m_iDefense = 0;

        for (const armor of this.m_pArmorDatas) {
            this.m_iMaxHp += armor.maxHp;
            this.m_iDefense = armor.defense;
        }

        if (this.hp > this.m_iMaxHp) {
            this.hp = this.m_iMaxHp;
        }
    }

} // class AircraftData
