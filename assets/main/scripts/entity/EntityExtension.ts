import FrameworkComponent from "FrameworkComponent";
import ThrusterData from "./entityData/ThrusterData";
import WeaponData from "./entityData/WeaponData";
import ArmorData from "./entityData/ArmorData";
import AircraftData from "./entityData/AircraftData";
import MyAircraftData from "./entityData/MyAircraftData";
import EntityData from "./entityData/EntityData";
import GameEntry from "../GameEntry";
import DREntity from "../datatable/DREntity";
import AsteroidData from "./entityData/AsteroidData";
import GameEntity from "./entityLogic/GameEntity";
import Thruster from "./entityLogic/Thruster";
import Aircraft from "./entityLogic/Aircraft";
import MyAircraft from "./entityLogic/MyAircraft";
import Asteroid from "./entityLogic/Asteroid";
import Weapon from "./entityLogic/Weapon";
import Armor from "./entityLogic/Armor";
import Entity from "Entity";
import BulletData from "./entityData/BulletData";
import Bullet from "./entityLogic/Bullet";
import EffectData from "./entityData/EffectData";
import Effect from "./entityLogic/Effect";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EntityExtension extends FrameworkComponent {

    onLoad(): void {
        super.onLoad();
    }

    showEntity(logicType: new () => GameEntity, entityGroup: string, priority: number, data: EntityData): void {
        if (!data) {
            cc.warn('Data is invalid.');
            return;
        }

        let v_pDtEntity: atsframework.IDataTable<DREntity> = GameEntry.dataTable.getDataTable<DREntity>('entity');
        let v_pDrEntity: DREntity = v_pDtEntity.getDataRow(data.typeId);
        if (!v_pDrEntity) {
            cc.warn(`Can not load entity id '${data.typeId}' from data table.`);
            return;
        }

        GameEntry.entity.showEntity(data.id, logicType, `main/entities/${v_pDrEntity.assetName}`, entityGroup, priority, data);
    }

    showThruster(data: ThrusterData): void {
        return this.showEntity(Thruster, "Thruster", 30, data);
    }

    showWeapon(data: WeaponData): void {
        return this.showEntity(Weapon, "Weapon", 30, data);
    }

    showArmor(data: ArmorData): void {
        return this.showEntity(Armor, "Armor", 30, data);
    }

    showAircraft(data: AircraftData): void {
        return this.showEntity(Aircraft, "Aircraft", 80, data);
    }

    showMyAircraft(data: MyAircraftData): void {
        return this.showEntity(MyAircraft, 'Aircraft', 90, data);
    }

    showAsteroid(data: AsteroidData): void {
        return this.showEntity(Asteroid, 'Asteroid', 80, data);
    }

    showEffect(data: EffectData): void {
        return this.showEntity(Effect, 'Effect', 80, data);
    }

    showBullet(data: BulletData): void {
        return this.showEntity(Bullet, 'Bullet', 80, data);
    }

    hasEntity(entity: GameEntity): boolean {
        return GameEntry.entity.hasEntity(entity.entity.id);
    }

    hideEntity(entity: GameEntity): void {
        if (GameEntry.entity.hasEntity(entity.entity.id))
            GameEntry.entity.hideEntity(entity.entity);
    }

    attachEntity(entity: GameEntity, ownerId: number): void {
        GameEntry.entity.attachEntity(entity.entity, ownerId);
    }

    getGameEntity(entityId: number): GameEntity {
        let v_pEntity: Entity = GameEntry.entity.getEntity(entityId);
        if (!v_pEntity)
            return null;
        return v_pEntity.logic as GameEntity;
    }

} // class EntityExtension