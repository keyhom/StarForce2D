import { procedure } from "ProcedureComponent";
import GameEntry from "../GameEntry";
import { OpenUIFormSuccessEventId, OpenUIFormFailureEventArgs, OpenUIFormFailureEventId, OpenUIFormSuccessEventArgs } from "UIComponent";
import { UIFormId, uiFormAssetName } from "../ui/UIFormId";
import { GameMode } from "../game/GameBase";
import ProcedureChangeScene from "./ProcedureChangeScene";
import UIFormLogicBase from "../ui/UIFormLogicBase";

const ProcedureBase = atsframework.ProcedureBase;

type ProcedureOwner = atsframework.Fsm<atsframework.ProcedureManager>;

@procedure('ProcedureMenu')
export default class ProcedureMenu extends ProcedureBase {

    private m_bStartGame: boolean = false;
    private m_pMenuForm!: UIFormLogicBase;

    startGame(): void {
        this.m_bStartGame = true;
    }

    protected onInit(owner: ProcedureOwner): void {
        super.onInit(owner);

        cc.log('Init ProcedureMenu');
    }

    protected onDestroy(owner: ProcedureOwner): void {
        super.onDestroy(owner);

        cc.log('Destroy ProcedureMenu');
    }

    protected onEnter(owner: ProcedureOwner): void {
        super.onEnter(owner);

        cc.log('Enter ProcedureMenu');

        GameEntry.event.on(OpenUIFormSuccessEventId, this.onOpenUIFormSuccess, this);
        GameEntry.event.on(OpenUIFormFailureEventId, this.onOpenUIFormFailure, this);

        this.m_bStartGame = false;
        GameEntry.ui.openUIForm(uiFormAssetName(UIFormId.MenuForm), 'Default', true, this);
    }

    protected onLeave(owner: ProcedureOwner, shutdown?: boolean): void {
        super.onLeave(owner, shutdown);

        cc.log('Leave ProcedureMenu');

        GameEntry.event.off(OpenUIFormSuccessEventId, this.onOpenUIFormSuccess);
        GameEntry.event.off(OpenUIFormFailureEventId, this.onOpenUIFormFailure);

        if (this.m_pMenuForm) {
            this.m_pMenuForm.close(shutdown);
            this.m_pMenuForm = null;
        }
    }

    protected onUpdate(owner: ProcedureOwner, elapsed: number, realElapsed: number): void {
        super.onUpdate(owner, elapsed, realElapsed);

        if (this.m_bStartGame) {
            owner.setData<number>('next_scene_id', parseInt(GameEntry.config.getConfig<string>('Scene.Main')));
            owner.setData<number>('game_mode', GameMode.Survival);
            this.changeState(owner, ProcedureChangeScene);
        }
    }

    private onOpenUIFormSuccess(e: OpenUIFormSuccessEventArgs): void {
        if (e.userData != this) {
            return;
        }

        this.m_pMenuForm = e.uiForm.logic;
    }

    private onOpenUIFormFailure(e: OpenUIFormFailureEventArgs): void {
        if (e.userData != this)
            return;

        cc.error(`Open UI form '${e.uiFormAssetName}' cause error '${e.errorMessage}'`);
    }

} // class ProcedureMenu