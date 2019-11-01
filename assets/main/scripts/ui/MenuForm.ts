import UIFormLogicBase from "./UIFormLogicBase";
import ProcedureMenu from "../procedure/ProcedureMenu";
import GameEntry from "../GameEntry";
import { UIFormId, uiFormAssetName } from "./UIFormId";

const { ccclass, property } = cc._decorator;

@ccclass 
export default class MenuForm extends UIFormLogicBase {

    @property(cc.Button)
    private m_pQuitButton: cc.Button = null;

    private m_pProcedureMenu!: ProcedureMenu;

    protected onOpen(userData?: atsframework.UserData): void {
        super.onOpen(userData);

        this.m_pProcedureMenu = userData as ProcedureMenu;
        if (!this.m_pProcedureMenu) {
            cc.warn(`ProcedureMenu is invalid when open MenuForm.`);
            return;
        }

        this.m_pQuitButton.node.active = true;
    }

    protected onClose(shutdown: boolean, userData?: atsframework.UserData): void {
        super.onClose(shutdown, userData);

        this.m_pProcedureMenu = null;
    }

    onStartButtonClick(): void {
        this.m_pProcedureMenu.startGame();
    }

    onSettingButtonClick(): void {
        GameEntry.ui.openUIForm(uiFormAssetName(UIFormId.SettingForm), 'Default', 0, true);
    }

    onAboutButtonClick(): void {
        GameEntry.ui.openUIForm(uiFormAssetName(UIFormId.AboutForm), 'Default', 0, true);
    }

    onQuitButtonClick(): void {
        // TODO: A extension to open a dialg in UIComponent.
    }

} // class MenuForm