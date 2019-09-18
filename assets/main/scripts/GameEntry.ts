import FrameworkComponent from "FrameworkComponent";
import BaseComponent from "BaseComponent";
import ConfigComponent from "ConfigComponent";
import DataNodeComponent from "DataNodeComponent";
import EventComponent from "EventComponent";
import FsmComponent from "FsmComponent";
import ProcedureComponent from "ProcedureComponent";
import UIComponent from "UIComponent";
import ResourceComponent from "ResourceComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameEtnry extends cc.Component {

    private m_pCacheArr: FrameworkComponent[] = [];

    get base(): BaseComponent {
        return this.m_pCacheArr[0] as BaseComponent;
    }

    get config(): ConfigComponent {
        return this.m_pCacheArr[1] as ConfigComponent;
    }

    get dataNode(): DataNodeComponent {
        return this.m_pCacheArr[2] as DataNodeComponent;
    }

    get event(): EventComponent {
        return this.m_pCacheArr[7] as EventComponent;
    }

    get fsm(): FsmComponent {
        return this.m_pCacheArr[8] as FsmComponent;
    }

    get procedure(): ProcedureComponent {
        return this.m_pCacheArr[12] as ProcedureComponent;
    }

    get resource(): ResourceComponent {
        return this.m_pCacheArr[14] as ResourceComponent;
    }

    get ui(): UIComponent {
        return this.m_pCacheArr[18] as UIComponent;
    }

    onLoad(): void {
        this.m_pCacheArr.push(FrameworkComponent.getComponent(BaseComponent)); // 0.BaseComponent
        this.m_pCacheArr.push(FrameworkComponent.getComponent(ConfigComponent)); // 1.ConfigComponent
        this.m_pCacheArr.push(FrameworkComponent.getComponent(DataNodeComponent)); // 2.DataNodeComponent
        this.m_pCacheArr.push(null); // 3.DataTable
        this.m_pCacheArr.push(null); // 4.Debugger
        this.m_pCacheArr.push(null); // 5.Download
        this.m_pCacheArr.push(null); // 6.Entity
        this.m_pCacheArr.push(FrameworkComponent.getComponent(EventComponent)); // 7.Event
        this.m_pCacheArr.push(FrameworkComponent.getComponent(FsmComponent)); // 8.FSM
        this.m_pCacheArr.push(null); // 9.Localization
        this.m_pCacheArr.push(null); // 10.Network
        this.m_pCacheArr.push(null); // 11.ObjectPool
        this.m_pCacheArr.push(FrameworkComponent.getComponent(ProcedureComponent)); // 12.ProcedureComponent
        this.m_pCacheArr.push(null); // 13.ReferencePool
        this.m_pCacheArr.push(FrameworkComponent.getComponent(ResourceComponent)); // 14.ResourceComponent
        this.m_pCacheArr.push(null); // 15.SceneComponent
        this.m_pCacheArr.push(null); // 16.SettingComponent
        this.m_pCacheArr.push(null); // 17.SoundComponent
        this.m_pCacheArr.push(FrameworkComponent.getComponent(UIComponent)); // 18.UIComponent
        this.m_pCacheArr.push(null); // 19.WebRequestComponent

        cc.game.addPersistRootNode(this.node);
    }

    onDestroy(): void {
        this.m_pCacheArr.splice(0, this.m_pCacheArr.length);
        this.m_pCacheArr.length = 0;

        cc.game.removePersistRootNode(this.node);
    }

} // class GameEntry
