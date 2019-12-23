import { procedure } from "ProcedureComponent";
import GameEntry from "../GameEntry";
import ProcedureMain from "./ProcedureMain";
import ProcedureMenu from "./ProcedureMenu";
import { LoadSceneSuccessEventArgs, LoadSceneFailureEventArgs, LoadSceneUpdateEventArgs, LoadSceneSuccessEventId, LoadSceneFailureEventId } from "SceneComponent";
import DRScene from "../datatable/DRScene";

const ProcedureBase = atsframework.ProcedureBase;
type ProcedureOwner = atsframework.Fsm<atsframework.ProcedureManager>;

const MenuSceneId: number = 1;

@procedure('ProcedureChangeScene')
export default class ProcedureChangeScene extends ProcedureBase {

    private m_bChangeToMenu: boolean = false;
    private m_bIsChangeSceneComplete: boolean = false;
    private m_iBackgroundMusicId: number = 0;

    protected onEnter(owner: ProcedureOwner): void {
        super.onEnter(owner);

        this.m_bIsChangeSceneComplete = false;

        GameEntry.event.on(LoadSceneSuccessEventId, this.onLoadSceneSuccess, this);
        GameEntry.event.on(LoadSceneFailureEventId, this.onLoadSceneFailure, this);
        GameEntry.event.on(LoadSceneUpdateEventArgs, this.onLoadSceneUpdate, this);

        cc.log('Enter ProcedureChangeScene');

        GameEntry.sound.stopAllLoadedSounds();
        GameEntry.sound.stopAllLoadingSounds();

        GameEntry.entity.hideAllLoadedEntities();
        GameEntry.entity.hideAllLoadingEntities();

        let v_pLoadedSceneAssetNames: string[] = GameEntry.scene.getLoadedSceneAssetNames();
        for (const sceneAssetName of v_pLoadedSceneAssetNames) {
            GameEntry.scene.unloadScene(sceneAssetName);
        }

        GameEntry.base.speedMultiplier = 1; // FIXME: reset game speed.

        let v_iSceneId: number = owner.getData<number>('next_scene_id');
        this.m_bChangeToMenu = (v_iSceneId == MenuSceneId);

        let v_sSceneName!: string;

        let v_pDtScene: atsframework.IDataTable<DRScene> = GameEntry.dataTable.getDataTable<DRScene>('scene');
        if (v_pDtScene) {
            let v_pDrScene: DRScene = v_pDtScene.getDataRow(v_iSceneId);
            if (v_pDrScene) {
                v_sSceneName = v_pDrScene.assetName;
                this.m_iBackgroundMusicId = v_pDrScene.backgroundMusicId;
            } else {
                cc.warn(`Can not load scene '${v_iSceneId}' from data table.`);
                return;
            }
        }

        if (v_sSceneName)
            GameEntry.scene.loadScene(`main/scenes/${v_sSceneName}`, 0, this);
        else
            cc.error('No valid configured scene data found!!');
    }

    protected onUpdate(owner: ProcedureOwner, elapsed: number, realElapsed: number): void {
        super.onUpdate(owner, elapsed, realElapsed);

        if (!this.m_bIsChangeSceneComplete)
            return;

        if (this.m_bChangeToMenu) {
            this.changeState(owner, ProcedureMenu);
        } else {
            this.changeState(owner, ProcedureMain);
        }
    }

    protected onLeave(owner: ProcedureOwner, shutdown?: boolean) {
        super.onLeave(owner, shutdown);

        GameEntry.event.off(LoadSceneSuccessEventId, this.onLoadSceneSuccess, this);
        GameEntry.event.off(LoadSceneFailureEventId, this.onLoadSceneFailure, this);
        GameEntry.event.off(LoadSceneUpdateEventArgs, this.onLoadSceneUpdate, this);
    }

    private onLoadSceneSuccess(e: LoadSceneSuccessEventArgs): void {
        if (e.userData != this)
            return;

        cc.log(`Load scene '${e.sceneAssetName}' OK.`);

        if (this.m_iBackgroundMusicId > 0) {
            GameEntry.soundExt.playMusic(this.m_iBackgroundMusicId);
        }

        this.m_bIsChangeSceneComplete = true;
    }

    private onLoadSceneFailure(e: LoadSceneFailureEventArgs): void {
        if (e.userData != this)
            return;
        cc.error(`Load scene '${e.sceneAssetName}' failure, error message '${e.errorMessage}'.`);
    }

    private onLoadSceneUpdate(e: LoadSceneUpdateEventArgs): void {
        if (e.userData != this)
            return;
        
        cc.log(`Load scene '${e.sceneAssetName}' update, progress '${e.progress.toPrecision(2)}'.`);
    }

} // class ProcedureChangeScene
