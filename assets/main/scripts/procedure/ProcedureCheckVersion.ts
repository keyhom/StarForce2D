import { procedure } from "ProcedureComponent";
import ProcedurePreload from "./ProcedurePreload";

const ProcedureBase = atsframework.ProcedureBase;
type ProcedureOwner = atsframework.Fsm<atsframework.ProcedureManager>;

@procedure('ProcedureCheckVersion')
export default class ProcedureCheckVersion extends ProcedureBase {

    
    protected onInit(owner: ProcedureOwner): void {
        super.onInit(owner);

        cc.log('Initialize ProcedureCheckVersion');
    }

    protected onEnter(owner: ProcedureOwner): void {
        super.onEnter(owner);

        cc.log("Enter ProcedureCheckVersion.");
    }

    protected onUpdate(owner: ProcedureOwner, elapsed: number, realElapsed: number): void {
        super.onUpdate(owner, elapsed, realElapsed);

        // XXX: Check the version validation result.
        this.changeState(owner, ProcedurePreload);
    }

} // class ProcedureCheckVersion