import UIFormLogic from "UIFormLogic";
import GameEntry from "../GameEntry";

const fadeTime: number = 0.3;

export default abstract class UIFormLogicBase extends UIFormLogic {

    close(): void;
    close(event: cc.Event): void;
    close(ignoreTransition: boolean): void;
    close(ignoreTransition?: boolean | cc.Event): void {
        if (typeof ignoreTransition === 'boolean') {
            ignoreTransition = ignoreTransition || false;
        } else if (undefined != ignoreTransition) {
            ignoreTransition = false;
        }

        if (ignoreTransition) {
            this.onFadedToClose();
        } else {
            this.node.runAction(cc.sequence([cc.fadeTo(fadeTime, 0), cc.callFunc(this.onFadedToClose, this)]));
        }
    }

    private onFadedToClose(): void {
        GameEntry.ui.closeUIForm(this.uiForm);
    }

    playUISound(event: cc.Event, uiSoundIdStr: string): number {
        let uiSoundId: number = -1;
        if (undefined != uiSoundIdStr)
            uiSoundId= parseInt(uiSoundIdStr);

        if (uiSoundId >= 0)
            return GameEntry.soundExt.playUISound(uiSoundId);
        return -1;
    }

    protected onOpen(userData?: atsframework.UserData): void {
        super.onOpen(userData);

        this.node.opacity = 0;
        this.node.runAction(cc.fadeTo(fadeTime, 255));
    }

    protected onPause(): void {
        super.onPause();
    }

    protected onResume(): void {
        super.onResume();

        this.node.opacity = 0;
        this.node.runAction(cc.fadeTo(fadeTime, 255));
    }

} // class UIFormLogicBase