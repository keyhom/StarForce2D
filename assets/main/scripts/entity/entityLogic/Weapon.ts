import GameEntity from "./GameEntity";
import WeaponData from "../entityData/WeaponData";
import GameEntry from "../../GameEntry";
import EntityLogic from "EntityLogic";
import BulletData from "../entityData/BulletData";
import { EntityGenerateSerialId } from "../EntityUtil";

const AttachPoint: string = 'Weapon Point';

export default class Weapon extends GameEntity {

    private m_pWeaponData!: WeaponData;
    private m_fNextAttackTime: number = 0;
    private m_fElapsedTime: number = 0;

    protected onShow(userData: atsframework.UserData): void {
        super.onShow(userData);

        this.m_pWeaponData = userData as WeaponData;
        if (!this.m_pWeaponData) {
            cc.error('Weapon data is invalid.');
            return;
        }

        this.m_fElapsedTime = 0;
        this.m_fNextAttackTime = 0;

        GameEntry.entityExt.attachEntity(this, this.m_pWeaponData.ownerId);
    }

    protected onAttachTo(parentEntity: EntityLogic, userData: atsframework.UserData): void {
        super.onAttachTo(parentEntity, userData);

        let v_pAttachPoint: cc.Node = parentEntity.node.getChildByName(AttachPoint);
        if (v_pAttachPoint) {
            this.node.setParent(v_pAttachPoint);
        }

        this.name = `Weapon of ${parentEntity.name}`;
        this.node.setPosition(cc.Vec3.ZERO);
    }

    protected onUpdate(elapsed: number, realElapsed: number): void {
        super.onUpdate(elapsed, realElapsed);

        this.m_fElapsedTime += realElapsed;
    }

    tryAttack(): void {
        if (this.m_fElapsedTime < this.m_fNextAttackTime)
            return;

        this.m_fNextAttackTime = this.m_fElapsedTime + this.m_pWeaponData.attackInterval;

        let v_pWorldSpacePos: cc.Vec2 = this.node.convertToWorldSpace(this.node.position);
        let v_pBulletData!: BulletData;
        // if (this.m_pWeaponData.typeId == 30001) {
        //     // Quad.
        //     let v_pBulletOffsets: number[] = [-20, -5, 5, 20];
        //     for (let i: number = 0; i < 4; i++) {
        //         v_pBulletData = this.generateBulletData(new cc.Vec3(v_pWorldSpacePos.x + v_pBulletOffsets[i], v_pWorldSpacePos.y, 0));
        //         GameEntry.entityExt.showBullet(v_pBulletData);
        //     }
        // } else {
            v_pBulletData = this.generateBulletData(new cc.Vec3(v_pWorldSpacePos.x, v_pWorldSpacePos.y, 0));
            GameEntry.entityExt.showBullet(v_pBulletData);
        // }

        GameEntry.soundExt.playSound(this.m_pWeaponData.bulletSoundId);
    }

    protected generateBulletData(pos: cc.Vec3): BulletData {
        let v_pBulletData: BulletData = new BulletData(EntityGenerateSerialId(), this.m_pWeaponData.bulletId, this.m_pWeaponData.ownerId, this.m_pWeaponData.ownerCamp, this.m_pWeaponData.attack, this.m_pWeaponData.bulletSpeed);
        v_pBulletData.position = pos;
        return v_pBulletData;
    }

} // class Weapon