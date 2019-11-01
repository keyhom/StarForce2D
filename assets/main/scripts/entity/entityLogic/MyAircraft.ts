import Aircraft from "./Aircraft";
import MyAircraftData from "../entityData/MyAircraftData";
import AircraftTouchPad from "../../input/AircraftTouchPad";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MyAircraft extends Aircraft {

    private m_pMyAircraftData: MyAircraftData = null;

    private m_pPlayerMoveBoundary: cc.Rect = new cc.Rect();
    private m_pTargetPosition: cc.Vec3 = cc.Vec3.ZERO;

    @property({ displayName: 'Touch Pad', type: AircraftTouchPad })
    private m_pTouchPad: AircraftTouchPad = null;

    @property({ displayName: 'Touch Offset' })
    private m_pTouchOffset: cc.Vec2 = cc.Vec2.ZERO;

    get touchPad(): AircraftTouchPad {
        return this.m_pTouchPad;
    }

    set touchPad(value) {
        this.m_pTouchPad = value;
    }

    protected onInit(userData: atsframework.UserData): void {
        super.onInit(userData);
    }

    protected onEnable(): void {
        if (!this.m_pTouchPad) {
            let v_pTouchPadNode: cc.Node = cc.find('Canvas/TouchPad');
            if (v_pTouchPadNode) {
                this.m_pTouchPad = v_pTouchPadNode.getComponent(AircraftTouchPad);
            }
        }
    }

    protected onDisable(): void {
        this.m_pTouchPad = null;
    }

    protected onShow(userData: atsframework.UserData): void {
        super.onShow(userData);

        this.m_pMyAircraftData = userData as MyAircraftData;
        if (!this.m_pMyAircraftData) {
            cc.error('My aircraft data is invalid.');
            return;
        }

        this.m_pPlayerMoveBoundary.size = cc.view.getVisibleSize();
        this.m_pPlayerMoveBoundary.origin = cc.Vec2.ZERO;

        if (!this.m_pTouchPad) {
            cc.warn('No touch pad specified!');
            return;
        }
    }

    protected onUpdate(elapsed: number, realElapsed: number): void {
        super.onUpdate(elapsed, realElapsed);

        if (this.m_pTouchPad && this.m_pTouchPad.enabledInHierarchy && this.m_pTouchPad.isTouching) {

            // try attack.
            if (this.m_pWeapons && this.m_pWeapons.length) {
                for (const weapon of this.m_pWeapons) {
                    weapon.tryAttack();
                }
            }

            let v_pDirection: cc.Vec2 = this.m_pTouchPad.touchPosition.sub(this.node.position).add(this.m_pTouchOffset);
            if (v_pDirection.magSqr() <= 1e-6) {
                return;
            }

            let v_pSpeed: cc.Vec2 = v_pDirection.normalize().mul(this.m_pMyAircraftData.speed * elapsed);

            if (v_pSpeed.magSqr() > v_pDirection.mag() * v_pDirection.mag()) {
                v_pSpeed.normalizeSelf().mulSelf(v_pDirection.mag());
            }

            let v_pPosition: cc.Vec2 = this.node.position;
            v_pPosition = v_pPosition.add(v_pSpeed).clampf(cc.v2(this.m_pPlayerMoveBoundary.xMin, this.m_pPlayerMoveBoundary.yMin), cc.v2(this.m_pPlayerMoveBoundary.xMax, this.m_pPlayerMoveBoundary.yMax));
            this.node.setPosition(v_pPosition);
        }
    }

} // class MyAircraft