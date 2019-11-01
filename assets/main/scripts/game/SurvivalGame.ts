import GameBase, { GameMode } from "./GameBase";
import GameEntry from "../GameEntry";
import DRAsteroid from "../datatable/DRAsteroid";
import AsteroidData from "../entity/entityData/AsteroidData";
import { EntityGenerateSerialId } from "../entity/EntityUtil";

export default class SurvivalGame extends GameBase {

    private m_fElapsedSeconds: number = 0;

    get gameMode(): GameMode {
        return GameMode.Survival;
    }

    update(elapsed: number, realElapsed: number): void {
        super.update(elapsed, realElapsed);

        this.m_fElapsedSeconds += elapsed;

        if (this.gameOver)
            return;

        if (this.m_fElapsedSeconds >= 1) {
            this.m_fElapsedSeconds = 0;

            let v_pDtAsteroid: atsframework.IDataTable<DRAsteroid> = GameEntry.dataTable.getDataTable<DRAsteroid>('asteroid');

            let v_fRandomPx: number = Math.random() * cc.view.getVisibleSize().width + cc.view.getVisibleOrigin().x;
            let v_fRandomPy: number = Math.random() * (cc.view.getVisibleSize().height * .5) + cc.view.getVisibleSize().height + cc.view.getVisibleOrigin().y;

            let v_pAsteroidData: AsteroidData = new AsteroidData(EntityGenerateSerialId(), 60000 + Math.floor(Math.random() * v_pDtAsteroid.count));
            v_pAsteroidData.position = new cc.Vec3(v_fRandomPx, v_fRandomPy, 0);

            GameEntry.entityExt.showAsteroid(v_pAsteroidData);
        }
    }

} // class SurvivalGame