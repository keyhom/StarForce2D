import { procedure } from "ProcedureComponent";
import GameEntry from "../GameEntry";
import ProcedureSplash from "./ProcedureSplash";
import * as i18n from "LanguageData";

type ProcedureBase = atsframework.ProcedureBase;
const ProcedureBase = atsframework.ProcedureBase;

type ProcedureOwner = atsframework.Fsm<atsframework.ProcedureManager>;

@procedure
export default class ProcedureLanuch extends ProcedureBase {

    protected onInit(owner: ProcedureOwner): void {
        super.onInit(owner);

        cc.log("Initialize ProcedureLanch");
    }

    protected onEnter(owner: ProcedureOwner): void {
        super.onEnter(owner);

        // Build info: any data wrote by build chain for game reading.
        GameEntry.builtinData.initBuildInfo();

        this.initLanguageSettings();
        this.initCurrentVariant();
        this.initQualitySettings();
        this.initSoundSettings();

        GameEntry.builtinData.initDefaultDictionary();
    }

    protected onUpdate(owner: ProcedureOwner, elpased: number, realElapsed: number): void {
        super.onUpdate(owner, elpased, realElapsed);

        this.changeState(owner, ProcedureSplash);
    }

    private initLanguageSettings(): void {
        let v_sLanguage: string = GameEntry.setting.getString('language', 'en_US');
        i18n.init(v_sLanguage);
        i18n.updateSceneRenderers();
    }

    private initCurrentVariant(): void {
        cc.warn('// TODO: initCurrentVariant');
    }

    private initQualitySettings(): void {
        cc.warn('// TODO: initQualitySettings');
    }

    private initSoundSettings(): void {
        cc.warn('// TODO: initSoundSettings');
    }

} // class ProcedureLanuch
