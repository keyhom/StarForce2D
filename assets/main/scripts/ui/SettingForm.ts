import UIFormLogicBase from "./UIFormLogicBase";
import * as i18n from "LanguageData"; 

const { ccclass, property } = cc._decorator;

@ccclass
export default class SettingForm extends UIFormLogicBase {

    protected onOpen(userData?: atsframework.UserData): void {
        super.onOpen(userData);
    }

    onConfirm(e: cc.Event): void {
        this.close();
    }

    onCancel(e: cc.Event): void {
        this.close();
    }

    onLanguageSwitch(toggle: cc.Toggle): void {
        if (toggle.isChecked) {
            let v_sName: string = toggle.node.name;
            if (v_sName.startsWith('toggle ')) {
                let v_sLang: string = v_sName.slice(7);
                i18n.init(v_sLang);
                i18n.updateSceneRenderers();
            }
        }
    }

} // class SettingForm