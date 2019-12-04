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
import { GameMode } from "../game/GameBase";

const ProcedureBase = atsframework.ProcedureBase;
type ProcedureOwner = atsframework.Fsm<atsframework.ProcedureManager>;

type DataRowGenerator = new () => atsframework.IDataRow;

@procedure
export default class ProcedurePreload extends ProcedureBase {

    private m_pDataTableNames: { [key: string]: DataRowGenerator } = {
        'aircraft': DRAircraft,
        'armor': DRArmor,
        'asteroid': DRAsteroid,
        'camp': DRCamp,
        'entity': DREntity,
        'music': DRMusic,
        'scene': DRScene,
        'sound': DRSound,
        'thruster': DRThruster,
        'uiform': DRUIForm,
        'uisound': DRUISound,
        'weapon': DRWeapon,
    };

    private m_pLoadedFlag: { [key: string]: boolean } = {};

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

        this.m_pLoadedFlag = {};

        this.preloadResources();
    }

    protected onLeave(owner: ProcedureOwner, shutdown?: boolean): void {
        super.onLeave(owner, shutdown);

        this.m_pLoadedFlag = {};

        GameEntry.event.off(LoadConfigSuccessEventId, this.onLoadConfigSuccess);
        GameEntry.event.off(LoadConfigFailureEventId, this.onLoadConfigFailure);
        GameEntry.event.off(LoadDataTableSuccessEventId, this.onLoadDataTableSuccess);
        GameEntry.event.off(LoadDataTableFailureEventId, this.onLoadDataTableFailure);
    }

    protected onUpdate(owner: ProcedureOwner, elapsed: number, realElapsed: number): void {
        super.onUpdate(owner, elapsed, realElapsed);

        for (const k in this.m_pLoadedFlag) {
            if (!this.m_pLoadedFlag[k])
                return;
        }

        owner.setData("next_scene_id", parseInt(GameEntry.config.getConfig<string>("Scene.Menu")));

        this.changeState(owner, ProcedureChangeScene);
    }

    protected preloadResources(): void {
        // Preload configs
        this.loadConfig("default_config");

        // Preload data tables.
        for (const k in this.m_pDataTableNames) {
            this.loadDataTable(k, this.m_pDataTableNames[k]);
        }

        // Preload dictionaries.
        this.loadDictionaries("Default");

        // Preload fonts.
        this.loadFont("MainFont");
    }

    private loadConfig(configName: string): void {
        this.m_pLoadedFlag[`Config.${configName}`] = false;

        GameEntry.config.loadConfig(configName, `main/configs/${configName}`, atsframework.LoadType.Text, this);
    }

    private loadDataTable(dataTableName: string, rowType: new () => atsframework.IDataRow): void {
        this.m_pLoadedFlag[`DataTable.${dataTableName}`] = false;
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

        this.m_pLoadedFlag[`Config.${e.configName}`] = true;
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

        this.m_pLoadedFlag[`DataTable.${e.dataTableName}`] = true;
        cc.log(`Load DataTable '${e.dataTableName}' from '${e.dataTableAssetName}' OK.`);
    }

    private onLoadDataTableFailure(e: LoadDataTableFailureEventArgs): void {
        if (e.userData != this)
            return;

        cc.error(`Can not load datatable '${e.dataTableName}' from '${e.dataTableAssetName}' with error message '${e.errorMessage}'`);
    }

} // class ProcedurePreload
