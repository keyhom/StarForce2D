declare module "FrameworkComponent" {
    export default abstract class FrameworkComponent {
        static getComponent<T extends FrameworkComponent>(type: { prototype: T }): T;
        static registerComponent<T extends FrameworkComponent>(comp: T): void;
    }
}

declare module "BaseComponent" {
    export default class BaseComponent {
        frameRate: number;
        speedMultiplier: number;
        neverSleep: boolean;
        isPaused: boolean;
        enableDynamicAltasPacked: boolean;
        pause(): void;
        resume(): void;
    }
}

declare module "ConfigComponent" {
    export default class ConfigComponent {}
}

declare module "DataNodeComponent" {
    export default class DataNodeComponent {}
}

declare module "DataTableComponent" {
    export default class DataTableComponent {}
}

declare module "EventComponent" {
    export default class EventComponent {
        count(eventId: atsframework.EventID): number;
        check<T extends Function>(eventId: atsframework.EventID): boolean;
        check<T extends Function>(eventId: atsframework.EventID, handler: T): boolean;

        on<T extends Function>(type: atsframework.EventID, callback: T): void;
        off<T extends Function>(type: atsframework.EventID): void;
        off<T extends Function>(type: atsframework.EventID, callback: T): void;
        emit(type: atsframework.EventID, ... args: any[]): void;
    }
}

declare module "ResourceComponent" {
    export default class ResourceComponent {

    }
}

declare module "UIForm" {
    export default class UIForm {
        readonly serialId: number;
        readonly uiFormAssetName: string;
        readonly handle: any;
        readonly uiGroup: atsframework.IUIGroup;
        readonly depthInUIGroup: number;
        readonly pauseCoveredUIForm: boolean;
        readonly logic: UIFormLogic;

        onInit(serialId: number, uiFormAssetName: string, uiGroup: atsframework.IUIGroup, pauseCoveredUIForm: boolean, isNewInstance: boolean, userData: atsframework.UserData): void;
        onRecycle(): void;
        onOpen(userData?: atsframework.UserData): void;
        onClose(shutdown: boolean, userData?: atsframework.UserData): void;
        onPause(): void;
        onResume(): void;
        onCover(): void;
        onReval(): void;
        onRefocus(userData?: atsframework.UserData): void;
        onUpdate(elapsed: number, realElapsed: number): void;
        onDepthChanged(uiGroupDepth: number, depthInUIGroup: number): void;
    }
}

declare module "UIFormLogic" {
    export default class UIFormLogic extends cc.Component {
        uiForm: UIForm;
        name: string;
        readonly available: boolean;
        visible: boolean;
        protected onInit(userData?: atsframework.UserData): void;
        protected onOpen(userData?: atsframework.UserData): void;
        protected onClose(shutdown: boolean, userData?: atsframework.UserData): void;
        protected onPause(): void;
        protected onResume(): void;
        protected onCover(): void;
        protected onReval(): void;
        protected onRefocus(): void;
        protected onUpdate(elapsed: number, realElapsed: number): void;
        protected onDepthChanged(uiGroupDepth: number, depthInUIGroup: number): void;
        protected onSetVisible(value: boolean): void;
    }
}

declare module "UIComponent" {
    export class UIGroupInfo {
        groupName: string;
        depth: number;
    }
    export default class UIComponent {
        uiGroup: UIGroupInfo;
        uiGroupCount: number;
        getUIForm(serialId: number): UIForm;
        getUIForm(uiFormAssetName: string): UIForm;
        getUIForms(uiFormAssetName: string): UIForm[];
        openUIForm(uiFormAssetName: string, uiGroupName: string): number;
        openUIForm(uiFormAssetName: string, uiGroupName: string, priority: number): number;
        openUIForm(uiFormAssetName: string, uiGroupName: string, pauseCoveredUIForm: boolean): number;
        openUIForm(uiFormAssetName: string, uiGroupName: string, userData: atsframework.UserData): number;
        openUIForm(uiFormAssetName: string, uiGroupName: string, priority: number, pauseCoveredUIForm: boolean): number;
        openUIForm(uiFormAssetName: string, uiGroupName: string, priority: number, userData: atsframework.UserData): number;
        openUIForm(uiFormAssetName: string, uiGroupName: string, pauseCoveredUIForm: boolean, userData: atsframework.UserData): number;
        openUIForm(uiFormAssetName: string, uiGroupName: string, priority: number, pauseCoveredUIForm: boolean, userData: atsframework.UserData): number;

        closeUIForm(serialId: number): void;
        closeUIForm(uiForm: UIForm): void;
        closeUIForm(serialId: number, userData: atsframework.UserData): void;
        closeUIForm(uiForm: UIForm, userData: atsframework.UserData): void;

        closeAllLoadedUIForms(): void;
        closeAllLoadedUIForms(userData: atsframework.UserData): void;

        closeAllLoadingUIForms(): void;

        refocusUIForm(uiForm: UIForm): void;
        refocusUIForm(uiForm: UIForm, userData: atsframework.UserData): void;

        addUIGroup(uiGroupName: string): boolean;
        addUIGroup(uiGroupName: string, depth: number): boolean;

    }
}

declare module "FsmComponent" {
    export default class FsmComponent {
        count: number;
        hasFsm<T>(name: string): boolean;
        hasFsm<T>(type: new() => T): boolean;
        getFsm<T>(name: string): atsframework.FsmBase;
        getFsm<T>(type: new() => T): atsframework.FsmBase;
        getAllFsm(): atsframework.FsmBase[];
        createFsm<T extends atsframework.FsmBase>(name: string, owner: T, ... states: atsframework.FsmState<T>[]): atsframework.Fsm<T>;

        destroyFsm<T extends atsframework.FsmBase>(name: string): boolean;
        destroyFsm<T extends atsframework.FsmBase>(type: new () => T): boolean;
        destroyFsm<T extends atsframework.FsmBase>(t: T): boolean;
        destroyFsm<T extends atsframework.FsmBase>(obj: atsframework.FsmBase): boolean;
    }
}

declare module "ProcedureComponent" {
    export function procedure(constructor: Function);
    export default class ProcedureComponent {
        availableProcedureNames: string[];
        entranceProcedureName: string;
        currentProcedure: atsframework.ProcedureBase;
        hasProcedure<T extends atsframework.ProcedureBase>(type: new() => T): boolean;
        getProcedure<T extends atsframework.ProcedureBase>(type: new() => T): boolean;
    }
}
