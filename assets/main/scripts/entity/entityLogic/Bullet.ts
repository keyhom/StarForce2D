import GameEntity from "./GameEntity";
import BulletData from "../entityData/BulletData";
import ImpactData from "../../game/fight/ImpactData";

export default class Bullet extends GameEntity {

    private m_pBulletData!: BulletData;

    private m_pImpactData!: ImpactData;
    get impactData(): ImpactData {
        return this.m_pImpactData || (this.m_pImpactData = new ImpactData(this.m_pBulletData.ownerCamp, 0, this.m_pBulletData.attack, 0));
    }

    protected onShow(userData: atsframework.UserData): void {
        super.onShow(userData);

        this.m_pBulletData = userData as BulletData;
        if (!this.m_pBulletData) {
            cc.error('Bullet data is invalid.');
            return;
        }

        // this.node.setPosition(this.node.convertToNodeSpace(cc.v2(this.m_pBulletData.position.x, this.m_pBulletData.position.y)));
        this.node.position = cc.v2(this.m_pBulletData.position.x, this.m_pBulletData.position.y);

        this.name = `Bullet (${this.id})`;
    }

    protected onUpdate(elapsed: number, realElapsed: number): void {
        super.onUpdate(elapsed, realElapsed);

        let v_pTranslateDelta: cc.Vec2 = cc.Vec2.UP.mul(this.m_pBulletData.speed).mul(elapsed);
        this.node.setPosition(this.node.position.add(v_pTranslateDelta));
    }

} // class Bullet