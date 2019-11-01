import FrameworkComponent from "FrameworkComponent";

const { ccclass, property } = cc._decorator;

export class BuildInfo {
    gameVersion: string;
    internalGameVersion: string;
    checkVersionUrl: string;
} // class BuildInfo

@ccclass
export default class BuiltinDataComponent extends FrameworkComponent {

    @property({ type: cc.TextAsset, displayName: "Default Dictionary" })
    private m_pDefaultDictionaryTextAsset: cc.TextAsset = null;

    @property({ type: cc.TextAsset, displayName: "Build Info" })
    private m_pBuildInfoTextAsset: cc.TextAsset = null;

    private m_pBuildInfo: BuildInfo = null;

    get buildInfo(): BuildInfo { return this.m_pBuildInfo; }

    onLoad(): void {
        super.onLoad();
    }

    initBuildInfo(): void {
        if (null == this.m_pBuildInfoTextAsset || !this.m_pBuildInfoTextAsset || !this.m_pBuildInfoTextAsset.text) {
            cc.warn("Build info can not be found or empty!");
            return;
        }

        this.m_pBuildInfo = JSON.parse(this.m_pBuildInfoTextAsset.text);
        if (null == this.m_pBuildInfo) {
            cc.warn("Parse build info failure!");
            return;
        }
    }

    initDefaultDictionary(): void {
        cc.warn('Method (BuiltinDataComponent::initDefaultDictionary) not implemented.');
    }

} // class BuiltinDataComponent
