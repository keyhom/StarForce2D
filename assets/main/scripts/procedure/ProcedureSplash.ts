import { procedure } from "ProcedureComponent";
import ProcedurePreload from "./ProcedurePreload";
import ProcedureCheckVersion from "./ProcedureCheckVersion";

const ProcedureBase = atsframework.ProcedureBase;

type ProcedureOwner = atsframework.Fsm<atsframework.ProcedureManager>;

@procedure('ProcedureSplash')
export default class ProcedureSplash extends ProcedureBase{

    protected onInit(owner: ProcedureOwner): void {
        super.onInit(owner);

        cc.log("Initialize ProcedureSplash");
    }

    protected onUpdate(owner: ProcedureOwner, elapsed: number, realElapsed: number): void {
        super.onUpdate(owner, elapsed, realElapsed);

        // TODO: A fixed splash here.
        this.changeState(owner, CC_DEBUG ? ProcedurePreload : ProcedureCheckVersion);
    }

} // class ProcedureSplash
