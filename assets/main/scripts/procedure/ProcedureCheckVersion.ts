import { procedure } from "ProcedureComponent";
import ProcedurePreload from "./ProcedurePreload";
import GameEntry from "../GameEntry";

const ProcedureBase = atsframework.ProcedureBase;
type ProcedureOwner = atsframework.Fsm<atsframework.ProcedureManager>;

@procedure('ProcedureCheckVersion')
export default class ProcedureCheckVersion extends ProcedureBase {

    private m_bValid: boolean = false;

    protected onInit(owner: ProcedureOwner): void {
        super.onInit(owner);

        cc.log('Initialize ProcedureCheckVersion');
    }

    protected onEnter(owner: ProcedureOwner): void {
        super.onEnter(owner);

        cc.log("Enter ProcedureCheckVersion.");

        GameEntry.networkExt.versionChecked().then((value: boolean) => {
            this.m_bValid = value;
        }).catch((reason: any) => {
            cc.error(`[ProcedureCheckVersion] ${reason}`);
        });
    }

    protected onUpdate(owner: ProcedureOwner, elapsed: number, realElapsed: number): void {
        super.onUpdate(owner, elapsed, realElapsed);

        // XXX: Check the version validation result.
        if (this.m_bValid)
            this.changeState(owner, ProcedurePreload);
    }

} // class ProcedureCheckVersion
