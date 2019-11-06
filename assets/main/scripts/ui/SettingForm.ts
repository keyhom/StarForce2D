import UIFormLogicBase from "./UIFormLogicBase";
import * as i18n from "LanguageData"; 
import GameEntry from "../GameEntry";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SettingForm extends UIFormLogicBase {

    @property(cc.ToggleContainer)
    private m_pLanguageToggle: cc.ToggleContainer = null;

    protected onOpen(userData?: atsframework.UserData): void {
        super.onOpen(userData);

        if (this.m_pLanguageToggle) {
            let v_sCurrentLang: string = GameEntry.setting.getString('language', 'en_US');

            this.m_pLanguageToggle.toggleItems.forEach((value: cc.Toggle) => {
                if (value.node.name.slice(7).trim() == v_sCurrentLang.trim()) {
                    value.check();
                } else {
                    value.uncheck();
                }
            });
        }
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
            if (v_sName.slice(0, 6) == 'toggle') {
                let v_sLang: string = v_sName.slice(7);
                i18n.init(v_sLang);
                i18n.updateSceneRenderers();
                GameEntry.setting.setString('language', v_sLang);
            }
        }
    }

} // class SettingForm