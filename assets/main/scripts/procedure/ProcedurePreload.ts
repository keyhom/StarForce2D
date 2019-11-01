import { procedure } from "ProcedureComponent";
import GameEntry from "../GameEntry";
import ProcedureChangeScene from "./ProcedureChangeScene";
import { LoadConfigSuccessEventArgs, LoadConfigFailureEventArgs, LoadConfigSuccessEventId, LoadConfigFailureEventId } from "ConfigComponent";
import { LoadDataTableSuccessEventId, LoadDataTableFailureEventId, LoadDataTableSuccessEventArgs, LoadDataTableFailureEventArgs } from "DataTableComponent";
import DRSound from "../datatable/DRSound";
import DRUISound from "../datatable/DRUISound";
import DRAircraft from "../datatable/DRAircraft";
import DRArmor from "../datatable/DRArmor";
import DRMusic from "../datatable/DRMusic";
import DREntity from "../datatable/DREntity";
import DRScene from "../datatable/DRScene";
import DRThruster from "../datatable/DRThruster";
import DRUIForm from "../datatable/DRUIForm";
import DRWeapon from "../datatable/DRWeapon";
import DRAsteroid from "../datatable/DRAsteroid";
import DRCamp from "../datatable/DRCamp";

const ProcedureBase = atsframework.ProcedureBase;
type ProcedureOwner = atsframework.Fsm<atsframework.ProcedureManager>;

@procedure
export default class ProcedurePreload extends ProcedureBase {

    private m_pDataTableNames: Map<string, new () => atsframework.IDataRow> = new Map<string, new () => atsframework.IDataRow>([
        ['aircraft', DRAircraft],
        ['armor', DRArmor],
        ['asteroid', DRAsteroid],
        ['camp', DRCamp],
        ['entity', DREntity],
        ['music', DRMusic],
        ['scene', DRScene],
        ['sound', DRSound],
        ['thruster', DRThruster],
        ['uiform', DRUIForm],
        ['uisound', DRUISound],
        ['weapon', DRWeapon],
    ]);

    private m_pLoadedFlag: Map<string, boolean> = new Map();

    protected onInit(owner: ProcedureOwner): void {
        super.onInit(owner);

        cc.log('Initialize ProcedurePreload');
    }

    protected onEnter(owner: ProcedureOwner): void {
        super.onEnter(owner);

        cc.log("Enter ProcedurePreload.");

        GameEntry.event.on(LoadConfigSuccessEventId, this.onLoadConfigSuccess, this);
        GameEntry.event.on(LoadConfigFailureEventId, this.onLoadConfigFailure, this);
        GameEntry.event.on(LoadDataTableSuccessEventId, this.onLoadDataTableSuccess, this);
        GameEntry.event.on(LoadDataTableFailureEventId, this.onLoadDataTableFailure, this);

        this.m_pLoadedFlag.clear();

        this.preloadResources();
    }

    protected onLeave(owner: ProcedureOwner, shutdown?: boolean): void {
        super.onLeave(owner, shutdown);

        this.m_pLoadedFlag.clear();

        GameEntry.event.off(LoadConfigSuccessEventId, this.onLoadConfigSuccess);
        GameEntry.event.off(LoadConfigFailureEventId, this.onLoadConfigFailure);
        GameEntry.event.off(LoadDataTableSuccessEventId, this.onLoadDataTableSuccess);
        GameEntry.event.off(LoadDataTableFailureEventId, this.onLoadDataTableFailure);
    }

    protected onUpdate(owner: ProcedureOwner, elapsed: number, realElapsed: number): void {
        super.onUpdate(owner, elapsed, realElapsed);

        for (const value of this.m_pLoadedFlag.values()) {
            if (!value)
                return;
        }

        owner.setData("next_scene_id", parseInt(GameEntry.config.getConfig<string>("Scene.Menu")));
        this.changeState(owner, ProcedureChangeScene);
    }

    protected preloadResources(): void {
        // Preload configs
        this.loadConfig("default_config");

        // Preload data tables.
        for (const entry of this.m_pDataTableNames.entries()) {
            this.loadDataTable(entry[0], entry[1]);
        }

        // Preload dictionaries.
        this.loadDictionaries("Default");

        // Preload fonts.
        this.loadFont("MainFont");
    }

    private loadConfig(configName: string): void {
        // this.m_pLoadedFlag[`Config.${configName}`] = false;
        this.m_pLoadedFlag.set(`Config.${configName}`, false);

        GameEntry.config.loadConfig(configName, `main/configs/${configName}`, atsframework.LoadType.Text, this);
    }

    private loadDataTable(dataTableName: string, rowType: new () => atsframework.IDataRow): void {
        this.m_pLoadedFlag.set(`DataTable.${dataTableName}`, false);
        GameEntry.dataTable.loadDataTable(rowType, dataTableName, null, `main/data/${dataTableName}`, atsframework.LoadType.Text, 0, this);
    }

    private loadDictionaries(dicName: string): void {
        cc.warn("Method (ProcedureBase::loadDictionaries) not implemeneted.");
    }

    private loadFont(fontName: string): void {
        cc.warn("Method (ProcedureBase::loadFont) not implemeneted.");
    }

    private onLoadConfigSuccess(e: LoadConfigSuccessEventArgs): void {
        if (e.userData != this) {
            return;
        }

        this.m_pLoadedFlag.set(`Config.${e.configName}`, true);
        cc.log(`Load config '${e.configName}' OK.`);
    }

    private onLoadConfigFailure(e: LoadConfigFailureEventArgs): void {
        if (e.userData != this) {
            return;
        }

        cc.error(`Can not load config '${e.configName}' from '${e.configAssetName}' with error message '${e.errorMessage}'`);
    }

    private onLoadDataTableSuccess(e: LoadDataTableSuccessEventArgs): void {
        if (e.userData != this)
            return;

        this.m_pLoadedFlag.set(`DataTable.${e.dataTableName}`, true);
        cc.log(`Load DataTable '${e.dataTableName}' from '${e.dataTableAssetName}' OK.`);
    }

    private onLoadDataTableFailure(e: LoadDataTableFailureEventArgs): void {
        if (e.userData != this)
            return;

        cc.error(`Can not load datatable '${e.dataTableName}' from '${e.dataTableAssetName}' with error message '${e.errorMessage}'`);
    }

} // class ProcedurePreload
