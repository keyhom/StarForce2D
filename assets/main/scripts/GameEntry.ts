import FrameworkComponent from "FrameworkComponent";
import BaseComponent from "BaseComponent";
import ConfigComponent from "ConfigComponent";
import DataNodeComponent from "DataNodeComponent";
import EventComponent from "EventComponent";
import FsmComponent from "FsmComponent";
import ProcedureComponent from "ProcedureComponent";
import UIComponent from "UIComponent";
import ResourceComponent from "ResourceComponent";
import BuiltinDataComponent from "./builtinData/BuiltinDataComponent";
import SceneComponent from "SceneComponent";
import SoundComponent from "SoundComponent";
import SettingComponent from "SettingComponent";
import DataTableComponent from "DataTableComponent";
import EntityComponent from "EntityComponent";
import NetworkComponent from "NetworkComponent";
import SoundExtension from "./sound/SoundExtension";
import ObjectPoolComponent from "ObjectPoolComponent";
import EntityExtension from "./entity/EntityExtension";
import NetworkExtension from "./network/NetworkExtension";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameEntry extends cc.Component {

    private static m_pCacheArr: FrameworkComponent[] = [];

    static get base(): BaseComponent {
        return this.m_pCacheArr[0] as BaseComponent;
    }

    static get config(): ConfigComponent {
        return this.m_pCacheArr[1] as ConfigComponent;
    }

    static get dataNode(): DataNodeComponent {
        return this.m_pCacheArr[2] as DataNodeComponent;
    }

    static get dataTable(): DataTableComponent {
        return this.m_pCacheArr[3] as DataTableComponent;
    }

    static get entity(): EntityComponent {
        return this.m_pCacheArr[6] as EntityComponent;
    }

    static get event(): EventComponent {
        return this.m_pCacheArr[7] as EventComponent;
    }

    static get fsm(): FsmComponent {
        return this.m_pCacheArr[8] as FsmComponent;
    }

    static get network(): NetworkComponent {
        return this.m_pCacheArr[10] as NetworkComponent;
    }

    static get objectPool(): ObjectPoolComponent {
        return this.m_pCacheArr[11] as ObjectPoolComponent;
    }

    static get procedure(): ProcedureComponent {
        return this.m_pCacheArr[12] as ProcedureComponent;
    }

    static get resource(): ResourceComponent {
        return this.m_pCacheArr[14] as ResourceComponent;
    }

    static get scene(): SceneComponent {
        return this.m_pCacheArr[15] as SceneComponent;
    }

    static get ui(): UIComponent {
        return this.m_pCacheArr[18] as UIComponent;
    }

    static get sound(): SoundComponent {
        return this.m_pCacheArr[17] as SoundComponent;
    }

    static get builtinData(): BuiltinDataComponent {
        return this.m_pCacheArr[20] as BuiltinDataComponent;
    }

    static get soundExt(): SoundExtension {
        return this.m_pCacheArr[21] as SoundExtension;
    }

    static get entityExt(): EntityExtension {
        return this.m_pCacheArr[22] as EntityExtension;
    }

    static get setting(): SettingComponent {
        return this.m_pCacheArr[16] as SettingComponent;
    }

    static get networkExt(): NetworkExtension {
        return this.m_pCacheArr[23] as NetworkExtension;
    }

    onLoad(): void {
        cc.game.addPersistRootNode(this.node);
    }

    start(): void {
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(BaseComponent)); // 0.BaseComponent
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(ConfigComponent)); // 1.ConfigComponent
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(DataNodeComponent)); // 2.DataNodeComponent
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(DataTableComponent)); // 3.DataTable
        GameEntry.m_pCacheArr.push(null); // 4.Debugger
        GameEntry.m_pCacheArr.push(null); // 5.Download
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(EntityComponent)); // 6.Entity
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(EventComponent)); // 7.Event
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(FsmComponent)); // 8.FSM
        GameEntry.m_pCacheArr.push(null); // 9.Localization
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(NetworkComponent)); // 10.Network
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(ObjectPoolComponent)); // 11.ObjectPool
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(ProcedureComponent)); // 12.ProcedureComponent
        GameEntry.m_pCacheArr.push(null); // 13.ReferencePool
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(ResourceComponent)); // 14.ResourceComponent
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(SceneComponent)); // 15.SceneComponent
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(SettingComponent)); // 16.SettingComponent
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(SoundComponent)); // 17.SoundComponent
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(UIComponent)); // 18.UIComponent
        GameEntry.m_pCacheArr.push(null); // 19.WebRequestComponent

        // Custom
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(BuiltinDataComponent)); // 20.BuiltinDataComponent
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(SoundExtension)); // 21.SoundExtension
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(EntityExtension)); // 22.EntityExtension
        GameEntry.m_pCacheArr.push(FrameworkComponent.getComponent(NetworkExtension)); // 22.NetworkExtension
    }

    onDestroy(): void {
        GameEntry.m_pCacheArr.splice(0, GameEntry.m_pCacheArr.length);
        GameEntry.m_pCacheArr.length = 0;

        cc.game.removePersistRootNode(this.node);
    }

} // class GameEntry
