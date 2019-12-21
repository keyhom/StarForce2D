import UIFormLogic from "UIFormLogic";
import GameEntry from "../GameEntry";
import ProcedureMain from "../procedure/ProcedureMain";

const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu('UI Forms/Main')
export default class MainForm extends UIFormLogic {

    private m_iScore: number = 0;

    @property(cc.Label)
    private m_pScoreLabel: cc.Label = null;

    protected onInit(userData: atsframework.UserData): void {
        super.onInit(userData);
    }

    protected onUpdate(elapsed: number, realElapsed: number): void {
        super.onUpdate(elapsed, realElapsed);

        let v_sTotalScoreNodePath: string = 'SurvivalGame/TotalScore';
        let v_pTotalScoreNode: atsframework.DataNode = GameEntry.dataNode.getOrAddNode(v_sTotalScoreNodePath);
        let v_iScore: number = v_pTotalScoreNode.getData<number>();

        if (v_iScore && this.m_iScore != v_iScore) {
            this.updateScore(v_iScore);
        }
    }

    protected updateScore(score: number): void {
        if (this.m_pScoreLabel) {
            this.m_pScoreLabel.string = score.toString();
        }
    }

    exitGame(): void {
        let v_pProcedureMain: ProcedureMain = GameEntry.procedure.currentProcedure as ProcedureMain;
        if (v_pProcedureMain) {
            v_pProcedureMain.gotoMenu();
        }
    }

} // class MainForm
