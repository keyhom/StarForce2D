import UIFormLogicBase from "./UIFormLogicBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AboutForm extends UIFormLogicBase {

    @property
    private m_fScrollSpeed: number = 1;
    private m_fInitPosition: number = 0;

    protected onInit(userData?: atsframework.UserData): void {
        super.onInit(userData);

        this.m_fInitPosition = -0.5 * this.node.height;
    }

    protected onUpdate(elapsed: number, realElapsed: number): void {
        super.onUpdate(elapsed, realElapsed);

        let v_rPos: cc.Vec2 = cc.v2();
        this.node.getPosition(v_rPos);

        v_rPos.add(cc.v2(0, this.m_fScrollSpeed * elapsed));
        this.node.setPosition(v_rPos);

        if (this.node.position.y > this.node.height - this.m_fInitPosition) {
            this.node.position.y = this.m_fInitPosition;
        }
    }

} // class AboutForm