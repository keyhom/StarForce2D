import { procedure } from "ProcedureComponent";
import GameBase, { GameMode } from "../game/GameBase";
import GameEntry from "../GameEntry";
import ProcedureChangeScene from "./ProcedureChangeScene";
import SurvivalGame from "../game/SurvivalGame";
import { uiFormAssetName, UIFormId } from "../ui/UIFormId";

const ProcedureBase = atsframework.ProcedureBase;

type ProcedureOwner = atsframework.Fsm<atsframework.ProcedureManager>;

const GameOverDelayed: number = 2;

@procedure
export default class ProcedureMain extends ProcedureBase {

    private m_bGoToMenu: boolean = false;
    private m_fGoToMenuDelaySeconds: number = 0;

    private m_pGames: { [key: number/*:GameMode*/]: GameBase } = {};
    // private readonly m_pGames: Map<GameMode, GameBase> = new Map();
    private m_pCurrentGame!: GameBase;

    private m_iMainFormId: number;

    gotoMenu(immediate: boolean = true): void {
        this.m_bGoToMenu = true;
        this.m_fGoToMenuDelaySeconds = immediate ? GameOverDelayed : 0;
    }

    protected onInit(owner: ProcedureOwner): void {
        super.onInit(owner);

        // init game.
        // this.m_pGames.set(GameMode.Survival, new SurvivalGame());
        this.m_pGames[GameMode.Survival] = new SurvivalGame();
    }

    protected onDestroy(owner: ProcedureOwner): void {
        super.onDestroy(owner);

        // clear game.
        // this.m_pGames.clear();
        this.m_pGames = {};
    }

    protected onEnter(owner: ProcedureOwner): void {
        super.onEnter(owner);

        cc.log('Enter ProcedureMain.');

        this.m_bGoToMenu = false;
        let v_rGameMode: GameMode = owner.getData<GameMode>('game_mode');

        // this.m_pCurrentGame = this.m_pGames.get(v_rGameMode);
        this.m_pCurrentGame = this.m_pGames[v_rGameMode];
        if (this.m_pCurrentGame)
            this.m_pCurrentGame.initialize();
        else
            cc.error(`The game with mode '${v_rGameMode}' was not exist!`);

        this.m_iMainFormId = GameEntry.ui.openUIForm(uiFormAssetName(UIFormId.MainForm), 'Default');
    }

    protected onLeave(owner: ProcedureOwner, shutdown?: boolean): void {
        cc.log("Leave ProcedureMain.");
        if (this.m_pCurrentGame) {
            this.m_pCurrentGame.shutdown();
            this.m_pCurrentGame = null;
        }

        super.onLeave(owner, shutdown);

        if (this.m_iMainFormId) {
            GameEntry.ui.closeUIForm(this.m_iMainFormId);
        }
    }

    protected onUpdate(owner: ProcedureOwner, elapsed: number, realElapsed: number): void {
        super.onUpdate(owner, elapsed, realElapsed);

        if (this.m_bGoToMenu) {
            this.m_pCurrentGame && (this.m_pCurrentGame.gameOver = true);
        }

        if (this.m_pCurrentGame && !this.m_pCurrentGame.gameOver) {
            this.m_pCurrentGame.update(elapsed, realElapsed);
            return;
        }

        if (!this.m_bGoToMenu) {
            this.m_bGoToMenu = true;
            this.m_fGoToMenuDelaySeconds = 0;
        }

        this.m_fGoToMenuDelaySeconds += elapsed;
        if (this.m_fGoToMenuDelaySeconds >= GameOverDelayed) {
            owner.setData<number>('next_scene_id', parseInt(GameEntry.config.getConfig<string>('Scene.Menu')));
            this.changeState(owner, ProcedureChangeScene);
        }
    }

} // class ProcedureMain