import { procedure } from "ProcedureComponent";

type ProcedureBase = atsframework.ProcedureBase;
const ProcedureBase = atsframework.ProcedureBase;

type ProcedureOwner = atsframework.Fsm<atsframework.ProcedureManager>;

@procedure
export default class ProcedureLanuch extends ProcedureBase {

    protected onInit(owner: ProcedureOwner): void {
        super.onInit(owner);

        cc.log("Initialize ProcedureLanch");
    }

} // class ProcedureLanuch
