const {ccclass, property} = cc._decorator;

@ccclass
export default class AircraftTouchPad extends cc.Component {

    private m_bTouching: boolean = false;
    private m_pTouchPosition: cc.Vec2 | null = null;
    private m_fTouchDelta: cc.Vec2 | null = null;

    start(): void {

    }

    onEnable(): void {
        this.attachEventListeners();
    }

    onDisable(): void {
        this.detachEventListeners();
    }

    protected attachEventListeners(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    protected detachEventListeners(): void {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    get isTouching(): boolean {
        return this.m_bTouching;
    }

    get touchPosition(): cc.Vec2 | null {
        return this.m_pTouchPosition;
    }

    get touchDelta(): cc.Vec2 | null {
        return this.m_fTouchDelta;
    }

    private onTouchStart(event: cc.Event.EventTouch): void {
        // cc.log('[AircraftTouchPad] onTouchStart');
        this.m_bTouching = true;
        this.m_pTouchPosition = this.node.convertToNodeSpace(event.touch.getLocation());
        this.m_fTouchDelta = event.touch.getDelta();
    }

    private onTouchMove(event: cc.Event.EventTouch): void {
        // cc.log('[AircraftTouchPad] onTouchMove');
        this.m_bTouching = true;
        this.m_pTouchPosition = this.node.convertToNodeSpace(event.touch.getLocation());
        this.m_fTouchDelta = event.touch.getDelta();
    }

    private onTouchEnd(event: cc.Event.EventTouch): void {
        // cc.log('[AircraftTouchPad] onTouchEnd');
        this.m_bTouching = false;
        this.m_pTouchPosition = this.node.convertToNodeSpace(event.touch.getLocation());
        this.m_fTouchDelta = event.touch.getDelta();
    }

    private onTouchCancel(event: cc.Event.EventTouch): void {
        // cc.log('[AircraftTouchPad] onTouchCancel');
        this.m_bTouching = false;
        this.m_pTouchPosition = null;
    }

    update(delta: number): void {
        if (!this.m_bTouching && null != this.m_pTouchPosition) {
            this.m_pTouchPosition = null;
        }

        if (!this.m_bTouching && null != this.m_fTouchDelta) {
            this.m_fTouchDelta = null;
        }
    }

} // class AircraftTouchPad
