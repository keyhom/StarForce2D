import GameEntry from "../GameEntry";
import MyAircraft from "../entity/entityLogic/MyAircraft";
import { ShowEntitySuccessEventId, ShowEntityFailureEventId, ShowEntityFailureEventArgs, ShowEntitySuccessEventArgs } from "EntityComponent";
import DREntity from "../datatable/DREntity";
import { EntityGenerateSerialId } from "../entity/EntityUtil";
import MyAircraftData from "../entity/entityData/MyAircraftData";

export enum GameMode {
    Survival = 0
} // enum GameMode

export default abstract class GameBase {

    abstract gameMode: GameMode;
    gameOver!: boolean;

    private m_pMyAircraft: MyAircraft = null;

    private m_bCollisionEnableCache!: boolean;

    initialize(): void {
        this.m_bCollisionEnableCache = cc.director.getCollisionManager().enabled;
        cc.director.getCollisionManager().enabled = true;

        GameEntry.event.on(ShowEntitySuccessEventId, this.onShowEntitySuccess, this);
        GameEntry.event.on(ShowEntityFailureEventId, this.onShowEntityFailure, this);

        let v_pData: MyAircraftData = new MyAircraftData(EntityGenerateSerialId(), 10000);
        v_pData.name = "My Aircraft";
        v_pData.position = new cc.Vec3(cc.view.getVisibleSize().width * .5, cc.view.getVisibleSize().height * .5, 0);

        this.gameOver = false;
        this.m_pMyAircraft = null;

        GameEntry.entityExt.showMyAircraft(v_pData);
    }

    shutdown(): void {
        GameEntry.event.off(ShowEntitySuccessEventId, this.onShowEntitySuccess, this);
        GameEntry.event.off(ShowEntityFailureEventId, this.onShowEntityFailure, this);

        // Revert back collision manager
        cc.director.getCollisionManager().enabled = this.m_bCollisionEnableCache;
    }

    update(elapsed: number, realElapsed: number): void {
        if (this.m_pMyAircraft && this.m_pMyAircraft.isDead) {
            this.gameOver = true;
            return;
        }
    }

    private onShowEntitySuccess(e: ShowEntitySuccessEventArgs): void {
        if (e.entity.logic instanceof MyAircraft) {
            this.m_pMyAircraft = e.entity.logic as MyAircraft;
        }
    }

    private onShowEntityFailure(e: ShowEntityFailureEventArgs): void {
        cc.log(`Show entity failure with error message '${e.errorMessage}'`);
    }

} // class GameBase