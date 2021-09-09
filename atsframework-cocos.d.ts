declare module "FrameworkComponent" {
    export default abstract class FrameworkComponent extends cc.Component {
        static getComponent<T extends FrameworkComponent>(type: { prototype: T }): T;
        static registerComponent<T extends FrameworkComponent>(comp: T): void;
        onLoad(): void;
    }
}

declare module "BaseComponent" {
    import FrameworkComponent from "FrameworkComponent";
    export default class BaseComponent extends FrameworkComponent {
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
    import FrameworkComponent from "FrameworkComponent";

    export type LoadConfigSuccessEventArgs = {
        configName: string,
        configAssetName: string,
        loadType: atsframework.LoadType,
        duration: number,
        userData: atsframework.UserData
    } // type LoadConfigSuccessEventArgs

    export type LoadConfigFailureEventArgs = {
        configName: string,
        configAssetName: string,
        loadType: atsframework.LoadType,
        errorMessage: string,
        userData: atsframework.UserData
    } // type LoadConfigFailureEventArgs

    export type LoadConfigUpdateEventArgs = {
        configName: string,
        configAssetName: string,
        loadType: atsframework.LoadType,
        progress: number,
        userData: atsframework.UserData
    } // type LoadConfigUpdateEventArgs

    export type LoadConfigDependecyAssetEventArgs = {
        configName: string,
        configAssetName: string,
        dependencyAssetName: string,
        loadedCount: number,
        totalCount: number,
        userData: atsframework.UserData
    } // type LoadConfigDependecyAssetEventArgs

    export const LoadConfigSuccessEventId: string;
    export const LoadConfigFailureEventId: string;
    export const LoadConfigUpdateEventId: string;
    export const LoadConfigDependecyAssetEventId: string;

    export default class ConfigComponent extends FrameworkComponent {
        readonly configCount: number;
        onLoad(): void;
        start(): void;

        loadConfig(configName: string, configAssetName: string, loadType: atsframework.LoadType): void;
        loadConfig(configName: string, configAssetName: string, loadType: atsframework.LoadType, priority: number): void;
        loadConfig(configName: string, configAssetName: string, loadType: atsframework.LoadType, userData: atsframework.UserData): void;
        loadConfig(configName: string, configAssetName: string, loadType: atsframework.LoadType, priority: number, userData: atsframework.UserData): void;

        parseConfig(text: string): boolean;
        parseConfig(text: string, userData: atsframework.UserData): boolean;
        parseConfig(buffer: ArrayBuffer): boolean;
        parseConfig(buffer: ArrayBuffer, userData: atsframework.UserData): boolean;

        hasConfig(configName: string): boolean;
        removeConfig(configName: string): void;
        removeAllConfigs(): void;

        getConfig<T extends atsframework.Value>(configName: string): T;
        getConfig<T extends atsframework.Value>(configName: string, defaultValue: any): T;
    } // class ConfigComponent
}

declare module "DataNodeComponent" {
    import FrameworkComponent from "FrameworkComponent";
    export default class DataNodeComponent extends FrameworkComponent {

        onLoad(): void;
        start(): void;

        root: atsframework.DataNode;

        getData<T>(path: string): T;
        getData<T>(path: string, node: atsframework.DataNode): T;

        setData<T>(path: string, data: T): void;
        setData<T>(path: string, data: T, node: atsframework.DataNode): void;

        getNode(path: string): atsframework.DataNode;
        getNode(path: string, node: atsframework.DataNode): atsframework.DataNode;

        getOrAddNode(path: string): atsframework.DataNode;
        getOrAddNode(path: string, node: atsframework.DataNode): atsframework.DataNode;

        removeNode(path: string): void;
        removeNode(path: string, node: atsframework.DataNode): void;

        clear(): void;

    } // class DataNodeComponent

} // module DataNodeComponent

declare module "DataRowBase" {

    export default class DataRowBase {

        id: number;
        abstract dataSplitSeperators: string;

        parseDataRow(dataRowSegments: atsframework.FrameworkSegment<atsframework.DataTableRawContentType>): boolean;

        abstract parseRowString(columns: string[]): boolean;

    } // class DataRowBase

} // module DataRowBase

declare module "DataTableComponent" {
    import FrameworkComponent from "FrameworkComponent";

    export type LoadDataTableInfo = {
        dataTableName: string,
        dataTableNameInType: string,
        userData: UserData
    } // type LoadDataTableInfo

    export const LoadDataTableSuccessEventId = "loadDataTableSuccess";
    export const LoadDataTableFailureEventId = "loadDataTableFailure";
    export const LoadDataTableUpdateEventId = "loadDataTableUpdate";
    export const LoadDataTableDependencyAssetEventId = "loadDataTableDependencyAsset";

    export type LoadDataTableSuccessEventArgs = {
        dataTableName: string,
        dataTableAssetName: string,
        loadType: LoadType,
        duration: number,
        userData: UserData
    } // LoadDataTableSuccessEventArgs

    export type LoadDataTableFailureEventArgs = {
        dataTableName: string,
        dataTableAssetName: string,
        loadType: LoadType,
        errorMessage: string,
        userData: UserData
    } // LoadDataTableFailureEventArgs

    export type LoadDataTableUpdateEventArgs = {
        dataTableName: string,
        dataTableAssetName: string,
        loadType: LoadType,
        progress: number,
        userData: UserData
    } // LoadDataTableUpdateEventArgs

    export type LoadDataTableDependencyAssetEventArgs = {
        dataTableName: string,
        dataTableAssetName: string,
        dependencyAssetName: string,
        loadedCount: number,
        totalCount: number,
        userData: UserData
    } // LoadDataTableDependencyAssetEventArgs

    const DefaultPriority: number = 0;

    type IDataRow = atsframework.IDataRow;
    type IDataTable = atsframework.IDataTable;
    type UserData = atsframework.UserData;
    type LoadType = atsframework.LoadType;
    type DataTableBase = atsframework.DataTableBase;
    type DataTableRawContentType = atsframework.DataTableRawContentType;

    export default class DataTableComponent extends FrameworkComponent {
        onLoad(): void;
        start(): void;
        count: number;

        loadDataTable<T extends IDataRow>(dataRowType: new () => T, dataTableName: string, dataTableNameInType: string, dataTableAssetName: string, loadType: LoadType): void;
        loadDataTable<T extends IDataRow>(dataRowType: new () => T, dataTableName: string, dataTableNameInType: string, dataTableAssetName: string, loadType: LoadType, priority: number): void;
        loadDataTable<T extends IDataRow>(dataRowType: new () => T, dataTableName: string, dataTableNameInType: string, dataTableAssetName: string, loadType: LoadType, userData: UserData): void;
        loadDataTable<T extends IDataRow>(dataRowType: new () => T, dataTableName: string, dataTableNameInType: string, dataTableAssetName: string, loadType: LoadType, priority: number, userData: UserData): void;

        hasDataTable<T extends IDataRow>(): boolean;
        hasDataTable<T extends IDataRow>(name: string): boolean;

        getDataTable<T extends IDataRow>(): IDataTable<T> | null;
        getDataTable<T extends IDataRow>(name: string): IDataTable<T> | null;

        getAllDataTables(): DataTableBase[];
        getAllDataTables(results: DataTableBase[]): DataTableBase[];

        createDataTable<T>(rowType: new () => T, name: string, content: DataTableRawContentType): IDataTable<T>;
        destroyDataTable<T>(name: string): boolean;

    } // class DataTableComponent

} // module DataTableComponent

declare module "EntityLogic" {
    import Entity from 'Entity';
    export default abstract class EntityLogic extends cc.Component {
        readonly entity: Entity;
        name: string;
        readonly available: boolean;
        visible: boolean;

        protected onInit(userData: atsframework.UserData): void;

        protected onShow(userData: atsframework.UserData): void;
        protected onHide(userData: atsframework.UserData): void;

        protected onAttached(childEntity: EntityLogic, userData: atsframework.UserData): void;
        protected onDetached(childEntity: EntityLogic, userData: atsframework.UserData): void;
        protected onAttachTo(parentEntity: EntityLogic, userData: atsframework.UserData): void;
        protected onDetachFrom(parentEntity: EntityLogic, userData: atsframework.UserData): void;

        protected onUpdate(elapsed: number, realElapsed: number): void;

        protected internalSetVisible(visible: boolean): void;

    } // class EntityLogic
} // module EntityLogic

declare module "Entity" {

    import EntityLogic from 'EntityLogic';
    export default class Entity extends cc.Component implements atsframework.IEntity {
        readonly id: number;
        readonly entityAssetName: string;
        readonly handle: object;
        readonly entityGroup: atsframework.IEntityGroup;
        readonly logic: EntityLogic;

        onInit(entityId: number, entityAssetName: string, entityGroup: atsframework.IEntityGroup, isNewInstance: boolean, userData: atsframework.UserData): void;
        onRecycle(): void;
        onShow(userData: atsframework.UserData): void;
        onHide(userData: atsframework.UserData): void;
        onAttached(childEntity: atsframework.IEntity, userData: atsframework.UserData): void;
        onDetached(childEntity: atsframework.IEntity, userData: atsframework.UserData): void;
        onAttachTo(parentEntity: atsframework.IEntity, userData: atsframework.UserData): void;
        onDetachFrom(parentEntity: atsframework.IEntity, userData: atsframework.UserData): void;
        onUpdate(elapsed: number, realElapsed: number): void;

    } // class Entity 

} // module Entity

declare module "EntityHelperBase" {
    export default abstract class EntityHelperBase extends cc.Component implements atsframework.IEntityHelper {
        abstract instantiateEntity(entityAsset: object): object;
        abstract createEntity(entityInstance: object, entityGroup: atsframework.IEntityGroup, userData: atsframework.UserData): atsframework.IEntity;
        abstract releaseEntity(entityAsset: object, entityInstance: object | null): void;
    } // class EntityHelperBase
} // module EntityHelperBase

declare module "EntityGroupHelperBase" {
    export default abstract class EntityGroupHelperBase extends cc.Component implements atsframework.IEntityGroupHelper {

    } // class EntityGroupHelperBase
} // module EntityGroupHelperBase

declare module "EntityComponent" {

    import FrameworkComponent from "FrameworkComponent";
    import Entity from "Entity";

    type UserData = atsframework.UserData;
    type IEntity = atsframework.IEntity;
    type IEntityHelper = atsframework.IEntityHelper;
    type IEntityGroup = atsframework.IEntityGroup;
    type IEntityGroupHelper = atsframework.IEntityGroupHelper;

    export let ShowEntitySuccessEventId = 'showEntitySuccess';
    export let ShowEntityFailureEventId = 'showEntityFailure';
    export let ShowEntityUpdateEventId = 'showEntityUpdate';
    export let ShowEntityDependencyAssetEventId = 'showEntityDependencyAsset';
    export let HideEntityCompleteEventId = 'hideEntityComplete';

    export type ShowEntitySuccessEventArgs = {
        entity: Entity,
        duration: number,
        userData: UserData
    } // type ShowEntitySuccessEventArgs

    export type ShowEntityFailureEventArgs = {
        entityId: number,
        entityAssetName: string,
        entityGroupName: string,
        errorMessage: string,
        userData: UserData
    } // type ShowEntityFailureEventArgs

    export type ShowEntityUpdateEventArgs = {
        entityId: number,
        entityAssetName: string,
        entityGroupName: string,
        progress: number,
        userData: UserData
    } // type ShowEntityUpdateEventArgs

    export type ShowEntityDependencyAssetEventArgs = {
        entityId: number,
        entityAssetName: string,
        entityGroupName: string,
        dependencyAssetName: string,
        loadedCount: number,
        totalCount: number,
        userData: UserData
    } // type ShowEntityDependencyAssetEventArgs

    export type HideEntityCompleteEventArgs = {
        entityId: number,
        entityAssetName: string,
        entityGroup: IEntityGroup,
        userData: UserData
    } // type HideEntityCompleteEventArgs

    export default class EntityComponent extends FrameworkComponent {
        readonly entityCount: number;
        readonly entityGroupCount: number;

        onLoad(): void;
        start(): void;

        hasEntityGroup(entityGroupName: string): boolean;
        getEntityGroup(entityGroupName: string): IEntityGroup;

        getAllEntityGroups(): IEntityGroup[];
        getAllEntityGroups(results: IEntityGroup[]): IEntityGroup[];

        addEntityGroup(entityGroupName: string, instanceAutoReleaseInterval: number, instanceCapacity: number, instanceExpireTime: number, instancePriority: number): boolean;

        hasEntity(entityId: number): boolean;
        hasEntity(entityAssetName: string): boolean;

        getEntity(entityId: number): Entity;
        getEntity(entityAssetName: string): Entity;

        getEntities(entityAssetName: string): Entity[];
        getEntities(entityAssetName: string, results: Entity[]): Entity[];

        getAllLoadedEntities(): Entity[];
        getAllLoadedEntities(results: Entity[]): Entity[];

        getAllLoadingEntityIds(): number[];
        getAllLoadingEntityIds(results: number[]): number[];

        isLoadingEntity(entityId: number): boolean;
        isValidEntity(entity: Entity): boolean;

        showEntity<T>(entityId: number, entityLogicType: new () => T, entityAssetName: string, entityGroupName: string): void;
        showEntity<T>(entityId: number, entityLogicType: new () => T, entityAssetName: string, entityGroupName: string, priority: number): void;
        showEntity<T>(entityId: number, entityLogicType: new () => T, entityAssetName: string, entityGroupName: string, userData: UserData): void;
        showEntity<T>(entityId: number, entityLogicType: new () => T, entityAssetName: string, entityGroupName: string, priority: number, userData: UserData): void;

        hideEntity(entityId: number): void;
        hideEntity(entityId: number, userData: UserData): void;
        hideEntity(entity: Entity): void;
        hideEntity(entity: Entity, userData: UserData): void;

        hideAllLoadedEntities(): void;
        hideAllLoadedEntities(userData: UserData): void;

        hideAllLoadingEntities(): void;

        getParentEntity(childEntityId: number): Entity;
        getParentEntity(childEntity: Entity): Entity;

        getChildEntities(parentEntityId: number): Entity[];
        getChildEntities(parentEntityId: number, results: Entity[]): Entity[];
        getChildEntities(parentEntity: Entity): Entity[];
        getChildEntities(parentEntity: Entity, results: Entity[]): Entity[];

        attachEntity(childEntityId: number, parentEntityId: number): void;
        attachEntity(childEntityId: number, parentEntity: Entity): void;
        attachEntity(childEntity: Entity, parentEntityId: number): void;
        attachEntity(childEntity: Entity, parentEntity: Entity): void;

        detachEntity(childEntityId: number): void;
        detachEntity(childEntityId, userData: UserData): void;
        detachEntity(childEntity: Entity): void;
        detachEntity(childEntity: Entity, userData: UserData): void;

        detachChildEntities(parentEntityId: number): void;
        detachChildEntities(parentEntityId: number, userData: UserData): void;
        detachChildEntities(parentEntity: Entity): void;
        detachChildEntities(parentEntity: Entity, userData: UserData): void;

    } // class EntityComponent

} // module EntityComponent

declare module "EventComponent" {
    import FrameworkComponent from "FrameworkComponent";
    export default class EventComponent extends FrameworkComponent {
        count(eventId: atsframework.EventID): number;

        check<T extends Function>(eventId: atsframework.EventID): boolean;
        check<T extends Function>(eventId: atsframework.EventID, handler: T): boolean;
        check<T extends Function>(eventId: atsframework.EventID, handler: T, target: any): boolean;

        on<T extends Function>(type: atsframework.EventID, callback: T): void;
        on<T extends Function>(type: atsframework.EventID, callback: T, target: any): void;

        off<T extends Function>(type: atsframework.EventID): void;
        off<T extends Function>(type: atsframework.EventID, callback: T): void;
        off<T extends Function>(type: atsframework.EventID, callback: T, target: any): void;

        emit(type: atsframework.EventID, ... args: any[]): void;
    }
}

declare module "NetworkChannelHelperBase" {
    export default abstract class NetworkChannelHelperBase extends cc.Component implements atsframework.INetworkChannelHelper {

        channelOpened: atsframework.NetworkConnectedEventHandler;
        channelClosed: atsframework.NetworkClosedEventHandler;
        channelError: atsframework.NetworkErrorEventHandler;

        abstract get id(): number;
        abstract get isOpen(): boolean;
        abstract get isActive(): boolean;
        abstract get isWritable(): boolean;
        abstract get isReadable(): boolean;

        abstract connect(host: string, port: number): void;
        abstract connect(host: string, port: number, timeout: number): void;

        abstract disconnect(): void;
        abstract close(): void;
        abstract read(): void;
        abstract write(msg: any): void;
        abstract flush(): void;
        abstract writeAndFlush(msg: any): void;

        abstract get packetHeaderLength(): number;
        abstract initialize(networkChannel: atsframework.NetworkChannel): void;
        abstract shutdown(): void;
        abstract sendHeartBeat(): boolean;
        abstract serialize<T>(packet: T): boolean;

    } // class NetworkChannelHelperBase
} // module "NetworkChannelHelperBase

declare module "NetworkComponent" {
    import FrameworkComponent from "FrameworkComponent";

    export let NetworkConnectedEventId = 'NetworkConnected';
    export let NetworkClosedEventId = 'NetworkClosed';
    export let NetworkMissHeartBeatEventId = 'NetworkMissHeartBeat';
    export let NetworkErrorEventId = 'NetworkError';
    export let NetworkCustomErrorEventId = 'NetworkCustomError';

    export type NetworkConnectedEventArgs = {
        channel: atsframework.NetworkChannel,
        userData?: atsframework.UserData
    };

    export type NetworkClosedEventArgs = {
        channel: atsframework.NetworkChannel
    };

    export type NetworkMissHeartBeatEventArgs = {
        channel: atsframework.NetworkChannel,
        missCount: number
    };

    export type NetworkCustomErrorEventArgs = {
        channel: atsframework.NetworkChannel,
        customErrorData?: any
    };

    export default class NetworkComponent extends FrameworkComponent {

        onLoad(): void;
        onDestroy(): void;
        start(): void;

        hasNetworkChannel(name: string): boolean;
        getNetworkChannel(name: string): atsframework.NetworkChannel;

        getAllNetworkChannels(): atsframework.NetworkChannel[];
        getAllNetworkChannels(resutls: atsframework.NetworkChannel[]): atsframework.NetworkChannel[];

        createNetworkChannel(name: string): atsframework.NetworkChannel;
        createNetworkChannel(name: string, networkChannelHelper: atsframework.INetworkChannelHelper): atsframework.NetworkChannel;

        destroyNetworkChannel(name: string): boolean;

    } // class NetworkComponent
} // module NetworkComponent

declare module "ObjectPoolComponent" {
    import FrameworkComponent from "FrameworkComponent";

    export default class ObjectPoolComponent extends FrameworkComponent {

        onLoad(): void;
        start(): void;

        count: number;

        hasObjectPool<T extends ObjectBase>(): boolean;
        hasObjectPool<T extends ObjectBase>(name: string): boolean;

        getObjectPool<T extends ObjectBase>(): IObjectPool<T>;
        getObjectPool<T extends ObjectBase>(name: string): IObjectPool<T>;

        getObjectPoolBase(name: string): ObjectPoolBase;
        getObjectPoolBase(predicate: (objectPool: ObjectPoolBase) => boolean): ObjectPoolBase;

        getObjectPools(predicate: (objectPool: ObjectPoolBase) => boolean): ObjectPoolBase[];
        getObjectPools(predicate: (objectPool: ObjectPoolBase) => boolean, results: ObjectPoolBase[]): ObjectPoolBase[];

        getAllObjectPools(): ObjectPoolBase[];
        getAllObjectPools(results: ObjectPoolBase[]): ObjectPoolBase[];
        getAllObjectPools(sort: boolean): ObjectPoolBase[];
        getAllObjectPools(sort: boolean, results: ObjectPoolBase[]): ObjectPoolBase[];

        createSingleSpawnObjectPool<T extends ObjectBase>(options?: atsframework.CreateSingleSpawnObjectPoolOption): IObjectPool<T>;
        createMultiSpawnObjectPool<T extends ObjectBase>(options?: atsframework.CreateMultiSpawnObjectPoolOption): IObjectPool<T>;

        destroyObjectPool<T extends ObjectBase>(): boolean;
        destroyObjectPool<T extends ObjectBase>(name: string): boolean;
        destroyObjectPool<T extends ObjectBase>(objectPool: IObjectPool<T>): boolean;

        release(): void;
        releaseAllUnused(): void;

    } // class ObjectPoolComponent
} // module ObjectPoolComponent

declare module "ResourceComponent" {
    import FrameworkComponent from "FrameworkComponent";
    export default class ResourceComponent extends FrameworkComponent {
        onLoad(): void;
        start(): void;
        unloadAsset(asset: object): void;
    }
}

declare module "SceneComponent" {
    import FrameworkComponent from "FrameworkComponent";

    export type LoadSceneSuccessEventArgs = {
        sceneAssetName: string,
        duration: number,
        userData: UserData
    };

    export type LoadSceneFailureEventArgs = {
        sceneAssetName: string,
        errorMessage: string,
        userData: UserData
    };

    export type LoadSceneUpdateEventArgs = {
        sceneAssetName: string,
        progress: number,
        userData: UserData
    };

    export type LoadSceneDependencyAssetEventArgs = {
        sceneAssetName: string,
        dependencyAssetName: string,
        loadedCount: number,
        totalCount: number,
        userData: UserData
    };

    export type UnloadSceneSuccessEventArgs = {
        sceneAssetName: string,
        userData: UserData
    };

    export type UnloadSceneFailureEventArgs = {
        sceneAssetName: string,
        userData: UserData
    };

    export const LoadSceneSuccessEventId: string;
    export const LoadSceneFailureEventId: string;
    export const LoadSceneUpdateEventArgs: string;
    export const LoadSceneDependencyAssetEventArgs: string;
    export const UnloadSceneSuccessEventId: string;
    export const UnloadSceneFailureEventId: string;

    export default class SceneComponent extends FrameworkComponent {

        static getSceneName(sceneAssetName: string): string;

        mainCamera: cc.Camera;
        onLoad(): void;

        start(): void;

        sceneIsLoading(sceneAssetName: string): boolean;

        getLoadingSceneAssetNames(): string[];
        getLoadingSceneAssetNames(results: string[]): string[];

        sceneIsLoaded(sceneAssetName: string): boolean;

        getLoadedSceneAssetNames(): string[];
        getLoadedSceneAssetNames(results: string[]): string[];

        sceneIsUnloading(sceneAssetName: string): boolean;

        getUnloadingSceneAssetNames(): string[];
        getUnloadingSceneAssetNames(results: string[]): string[];

        loadScene(sceneAssetName: string): void;
        loadScene(sceneAssetName: string, priority: number): void;
        loadScene(sceneAssetName: string, userData: atsframework.UserData): void;
        loadScene(sceneAssetName: string, priority: number, userData: atsframework.UserData): void;

        unloadScene(sceneAssetName: string): void;
        unloadScene(sceneAssetName: string, userData: atsframework.UserData): void;

    } // class SceneComponent
}

declare module "SoundComponent" {
    import FrameworkComponent from "FrameworkComponent";

    export abstract class SoundHelperBase extends cc.Component implements atsframework.ISoundHelper {
        abstract releaseSoundAsset(soundAsset: object): void;
    } // class SoundHelplerBase

    export abstract class SoundGroupHelperBase extends cc.Component implements atsframework.ISoundGroupHelper {

    } // class SoundGroupHelperBase

    export abstract class SoundAgentHelperBase extends cc.Component implements atsframework.ISoundAgentHelper {

        abstract readonly isPlaying: boolean;
        abstract readonly length: number;
        abstract time: number;
        abstract mute: boolean;
        abstract loop: boolean;
        abstract priority: number;
        abstract volume: number;
        abstract pitch: number;
        abstract panStereo: number;
        abstract spatialBlend: number;
        abstract maxDistance: number;
        abstract dopplerLevel: number;
        abstract resetSoundAgent: atsframework.EventHandler<atsframework.ResetSoundAgentEventHandler>;

        abstract play(fadeInSeconds: number): void;
        abstract stop(fadeOutSeconds: number): void;
        abstract pause(fadeOutSeconds: number): void;
        abstract resume(fadeInSeconds: number): void;
        abstract reset(): void;
        abstract setSoundAsset(soundAsset: object): boolean;

        // TODO: abstract setBindingEntity(bindingEntity: Entity): void;
        abstract setWorldPosition(worldPosition: cc.Vec3): void;

    } // class SoundAgentHelperBase

    export class DefaultSoundHelper extends SoundHelperBase {
        start(): void;
        releaseSoundAsset(soundAsset: object): void;
    } // class DefaultSoundHelper

    export class DefaultSoundGroupHelper extends SoundGroupHelperBase {

    } // class DefaultSoundGroupHelper

    export class DefaultSoundAgentHelper extends SoundAgentHelperBase {

        get isPlaying(): boolean;

        get length(): number;

        get time(): number;
        set time(value);

        get mute(): boolean;
        set mute(value);

        get loop(): boolean;
        set loop(value);

        // TODO: priority
        get priority(): number;
        set priority(value);

        get volume(): number;
        set volume(value);

        // TODO: pitch
        get pitch(): number;
        set pitch(value);

        // TODO: panStereo
        get panStereo(): number;
        set panStereo(value);

        // TODO: spatialBlend
        get spatialBlend(): number;
        set spatialBlend(value);

        // TODO: maxDistance
        get maxDistance(): number;
        set maxDistance(value);

        // TODO: dopplerLevel
        get dopplerLevel(): number;
        set dopplerLevel(value);

        get resetSoundAgent(): atsframework.EventHandler<atsframework.ResetSoundAgentEventHandler>;

        play(fadeInSeconds: number): void;

        stop(fadeOutSeconds: number): void;

        pause(fadeOutSeconds: number): void;

        resume(fadeInSeconds: number): void;

        reset(): void;

        setSoundAsset(soundAsset: object): boolean;

        setWorldPosition(worldPosition: cc.Vec3): void;

        onLoad(): void;

        update(dt: number): void;

    } // class DefaultSoundAgentHelperBase

    export type PlaySoundSuccessEventArgs = {
        serialId: number,
        soundAssetName: string,
        soundAgent: atsframework.ISoundAgent,
        duration: number,
        bindingEntity: null,
        userData: atsframework.UserData
    } // type PlaySoundSuccessEventArgs

    export type PlaySoundFailureEventArgs = {
        serialId: number,
        soundAssetName: string,
        soundGroupName: string,
        playSoundParams: atsframework.PlaySoundParams,
        bindingEntity: null,
        errorCode: atsframework.PlaySoundErrorCode,
        errorMessage: string,
        userData: atsframework.UserData
    } // type PlaySoundFailureEventArgs

    export type PlaySoundUpdateEventArgs = {
        serialId: number,
        soundAssetName: string,
        soundGroupName: string,
        playSoundParams: atsframework.PlaySoundParams,
        progress: number,
        bindingEntity: null,
        userData: atsframework.UserData
    } // type PlaySoundUpdateEventArgs

    export type PlaySoundDependencyAssetEventArgs = {
        serialId: number,
        soundAssetName: string,
        soundGroupName: string,
        playSoundParams: atsframework.PlaySoundParams,
        dependencyAssetName: string,
        loadedCount: number,
        totalCount: number,
        bindingEntity: null,
        userData: atsframework.UserData
    } // type PlaySoundDependencyAssetEventArgs

    export type PlaySoundInfo = {
        bindingEntity: null,
        worldPosition: cc.Vec3,
        userData: atsframework.UserData
    } // type PlaySoundInfo

    export default class SoundComponent extends FrameworkComponent {

        get soundGroupCount(): number;

        onload(): void;
        start(): void;
        onDestroy(): void;

        hasSoundGrou(soundGroupName: string): boolean;

        getSoundGroup(soundGroupName: string): atsframework.SoundGroup;

        getAllSoundGroups(): atsframework.SoundGroup[];
        getAllSoundGroups(results: atsframework.SoundGroup[]): atsframework.SoundGroup[];

        addSoundGroup(soundGroupName: string, soundAgentHelperCount: number): boolean;
        addSoundGroup(soundGroupName: string, soundGroupAvoidBeingReplacedBySamePriority: boolean, soundGroupMute: boolean, soundGroupVolume: number, soundAgentHelperCount: number): boolean;

        getAllLoadingSoundSerialIds(): number[];
        getAllLoadingSoundSerialIds(results: number[]): number[];

        isLoadingSound(serialId: number): boolean;

        playSound(soundAssetName: string, soundGroupName: string): number;
        playSound(soundAssetName: string, soundGroupName: string, priority: number): number;
        playSound(soundAssetName: string, soundGroupName: string, playSoundParams: atsframework.PlaySoundParams): number;
        // playSound(soundAssetName: string, soundGroupName: string, bindingEntity: Entity): number;
        playSound(soundAssetName: string, soundGroupName: string, worldPosition: cc.Vec3): number;
        playSound(soundAssetName: string, soundGroupName: string, userData: atsframework.UserData): number;
        playSound(soundAssetName: string, soundGroupName: string, priority: number, playSoundParams: atsframework.PlaySoundParams): number;
        playSound(soundAssetName: string, soundGroupName: string, priority: number, playSoundParams: atsframework.PlaySoundParams, userData: atsframework.UserData): number;
        // playSound(soundAssetName: string, soundGroupName: string, priority: number, playSoundParams: PlaySoundParams, bindingEntity: Entity): number;
        // playSound(soundAssetName: string, soundGroupName: string, priority: number, playSoundParams: PlaySoundParams, bindingEntity: Entity, userData: UserData): number;
        playSound(soundAssetName: string, soundGroupName: string, priority: number, playSoundParams: atsframework.PlaySoundParams, worldPosition: cc.Vec3): number;
        playSound(soundAssetName: string, soundGroupName: string, priority: number, playSoundParams: atsframework.PlaySoundParams, worldPosition: cc.Vec3, userData: atsframework.UserData): number;

        stopSound(serialId: number): boolean;
        stopSound(serialId: number, fadeOutSeconds: number): boolean;

        stopAllLoadedSounds(): void;
        stopAllLoadedSounds(fadeOutSeconds: number): void;

        stopAllLoadingSounds(): void;

        pauseSound(serialId: number): void;
        pauseSound(serialId: number, fadeOutSeconds: number): void;

        resumeSound(serialId: number): void;
        resumeSound(serialId: number, fadeInSeconds: number): void;

    } // class SoundComponent

} // module SoundComponent

declare module "SettingComponent" {
    import FrameworkComponent from "FrameworkComponent";

    export abstract class SettingHelperBase extends cc.Component implements atsframework.ISettingHelper {

        abstract load(): boolean;

        abstract save(): boolean;

        abstract hasSetting(name: string): boolean;

        abstract removeSetting(name: string): void;

        abstract removeAllSettings(): void;

        abstract getBoolean(name: string): boolean;
        abstract getBoolean(name: string, defaultValue: boolean): boolean;

        abstract setBoolean(name: string, value: boolean): void;

        abstract getInteger(name: string): number;
        abstract getInteger(name: string, defaultValue: number): number;

        abstract setInteger(name: string, value: number): void;

        abstract getFloat(name: string): number;
        abstract getFloat(name: string, defaultValue: number): number;

        abstract setFloat(name: string, value: number): void;

        abstract getString(name: string): string;
        abstract getString(name: string, defaultValue: string): string;

        abstract setString(name: string, value: string): void;

        abstract getObject<T>(type: new () => T, name: string): any;
        abstract getObject<T>(type: new () => T, name: string, defaultValue: any): any;

        abstract setObject(name: string, obj: any): void;

    } // class SettingHelperBase

    export default class SettingComponent extends FrameworkComponent {

        onLoad(): void;

        start(): void;

        save(): void;

        hasSetting(name: string): boolean;

        removeSetting(name: string): void;

        getBoolean(name: string): boolean;
        getBoolean(name: string, defaultValue: boolean): boolean;

        setBoolean(name: string, value: boolean): void;

        getInteger(name: string): number;
        getInteger(name: string, defaultValue: number): number;

        setInteger(name: string, value: number): void;

        getFloat(name: string): number;
        getFloat(name: string, defaultValue: number): number;

        setFloat(name: string, value: number): void;

        getString(name: string): string;
        getString(name: string, defaultValue: string): string;

        setString(name: string, value: string): void;

        getObject<T>(type: new() => T, name: string): T;
        getObject<T>(type: new() => T, name: string, defaultValue: T): T;

        setObject<T>(name: string, value: T): void;
    } // class SettingComponent

} // module SettingComponent

declare module "UIForm" {
    import UIFormLogic from "UIFormLogic";

    export default class UIForm extends cc.Component {
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
    import UIForm from "UIForm";

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
    import FrameworkComponent from "FrameworkComponent";
    import UIForm from "UIForm";

    export class UIGroupInfo {
        groupName: string;
        depth: number;
    }

    export type OpenUIFormSuccessEventArgs = {
        uiForm: UIForm,
        duration: number,
        userData: atsframework.UserData
    };

    export type OpenUIFormFailureEventArgs = atsframework.OpenUIFormFailureEventArgs;
    export type OpenUIFormUpdateEventArgs =  atsframework.OpenUIFormUpdateEventArgs;
    export type OpenUIFormDependencyAssetEventArgs = atsframework.OpenUIFormDependencyAssetEventArgs;
    export type CloseUIFormCompleteEventArgs = atsframework.CloseUIFormCompleteEventArgs;

    export const OpenUIFormSuccessEventId: string;
    export const OpenUIFormFailureEventId: string;
    export const OpenUIFormUpdateEventId: string;
    // export const OpenUIFormDependencyAssetEventId: string;
    export const CloseUIFormCompleteEventId: string;

    export default class UIComponent extends FrameworkComponent {
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
    import FrameworkComponent from "FrameworkComponent";
    export default class FsmComponent extends FrameworkComponent {
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
    import FrameworkComponent from "FrameworkComponent";
    export function procedure(name: string): Function;
    export default class ProcedureComponent extends FrameworkComponent {
        availableProcedureNames: string[];
        entranceProcedureName: string;
        currentProcedure: atsframework.ProcedureBase;
        hasProcedure<T extends atsframework.ProcedureBase>(type: new() => T): boolean;
        getProcedure<T extends atsframework.ProcedureBase>(type: new() => T): boolean;
    }
}
