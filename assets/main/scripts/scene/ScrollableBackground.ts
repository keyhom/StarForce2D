const { ccclass, property } = cc._decorator;

@ccclass
export default class ScrollableBackground extends cc.Component {

    @property
    private m_fScrollSpeed: number = -0.25;

    @property
    private m_fTileSize: number = 2048;

    private m_pStartPosition!: cc.Vec2;
    private m_fTime: number = 0;

    start(): void {
        this.m_pStartPosition = this.node.position;
    }

    update(dt: number): void {
        this.m_fTime += dt;
        let v_fScrollDelta: number = this.m_fTime * this.m_fScrollSpeed;
        v_fScrollDelta %= this.m_fTileSize;
        let v_pNewPos: cc.Vec2 = cc.v2(this.m_pStartPosition.x, v_fScrollDelta);
        this.node.setPosition(v_pNewPos);
    }

} // class ScrollableBackground