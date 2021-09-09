import FrameworkComponent from "FrameworkComponent";
import GameEntry from "../GameEntry";
import Packet from "../../../../packages/atsframework-cocos/src/Network/Default/Packet";

const { ccclass } = cc._decorator;

@ccclass
export default class NetworkExtension extends FrameworkComponent {

    private m_pVerChannel: atsframework.NetworkChannel = null;

    onLoad(): void {
        super.onLoad();
    }

    start(): void {
        cc.warn('Testing Network ...');
        let v_pChannel: atsframework.NetworkChannel = GameEntry.network.getNetworkChannel('test') || GameEntry.network.createNetworkChannel('test');

        v_pChannel.networkChannelOpened.add((ch: atsframework.NetworkChannel, userData: atsframework.UserData)  => {
            cc.warn(`Network channel ${v_pChannel.name} opened.`);
        });

        v_pChannel.networkChannelClosed.add((ch: atsframework.NetworkChannel) => {
            cc.warn(`Network channel ${v_pChannel.name} closed.`);
        });

        v_pChannel.networkChannelError.add((ch: atsframework.NetworkChannel, code: atsframework.NetworkErrorCode, message: string) => {
            cc.error(`Network channel ${v_pChannel.name} caught error '${atsframework.NetworkErrorCode[code]}' - '${message}'`);
        });

        // v_pChannel.connect('192.168.0.184', 8000);
        v_pChannel.connect('192.168.44.1', 3333);
        this.m_pVerChannel = v_pChannel;
    }

    versionChecked(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            await null != this.m_pVerChannel;

            let v_pHelper: atsframework.INetworkChannelHelper = this.m_pVerChannel['m_pNetworkChannelHelper'] as atsframework.INetworkChannelHelper;
            if (v_pHelper) {
                v_pHelper['registerPacketHandler'](new TestPacketHandler());
            }
        });
    }

} // class NetworkExtension

class TestPacketHandler {

    id: number = 1;

    handle(packet: Packet): void {
        cc.log(`[HANDLE] Packet - ${packet}`);
    }

}