import GameEntry from "../GameEntry";
import DRMusic from "../datatable/DRMusic";
import FrameworkComponent from "FrameworkComponent";
import DRUISound from "../datatable/DRUISound";
import { IDataTable } from "DataTableComponent";
import DRSound from "../datatable/DRSound";

const { ccclass, property } = cc._decorator;

const FadeVolumeDuration: number = 1;

@ccclass
export default class SoundExtension extends FrameworkComponent {

    private static s_iMusicSerialId?: number;

    onLoad(): void {
        super.onLoad();
    }

    playMusic(musicId: number): number | null;
    playMusic(musicId: number, userData: atsframework.UserData): number | null;
    playMusic(musicId: number, userData?: atsframework.UserData): number | null {
        this.stopMusic();

        let v_pDtMusic: atsframework.IDataTable<DRMusic> = GameEntry.dataTable.getDataTable<DRMusic>('music');
        let v_pDrMusic: DRMusic = v_pDtMusic.getDataRow(musicId);
        if (!v_pDrMusic) {
            cc.warn(`Can not load music '${musicId}' from data table.`);
            return null;
        }

        let v_rPlaySoundParams: atsframework.PlaySoundParams = Object.create(atsframework.DefaultPlaySoundParams);
        v_rPlaySoundParams.priority = 64;
        v_rPlaySoundParams.loop = true;
        v_rPlaySoundParams.volumeInSoundGroup = 1;
        v_rPlaySoundParams.fadeInSeconds = FadeVolumeDuration;
        v_rPlaySoundParams.spatialBlend = 0;

        SoundExtension.s_iMusicSerialId = GameEntry.sound.playSound(`main/music/${v_pDrMusic.assetName}`, 'Music', 20, v_rPlaySoundParams, null, userData);
        return SoundExtension.s_iMusicSerialId;
    }

    stopMusic(): void {
        if (undefined == SoundExtension.s_iMusicSerialId) {
            return;
        }

        GameEntry.sound.stopSound(SoundExtension.s_iMusicSerialId, FadeVolumeDuration);
        SoundExtension.s_iMusicSerialId = undefined;
    }

    playSound(soundId: number, userData?: atsframework.UserData): number | null {
        userData = userData || null;
        let v_pDtSound: atsframework.IDataTable<DRSound> = GameEntry.dataTable.getDataTable<DRSound>('sound');
        let v_pDrSound: DRSound = v_pDtSound.getDataRow(soundId);
        if (!v_pDrSound) {
            cc.warn(`Can not load sound '${soundId}' from data table.`);
            return null;
        }

        let v_rPlaySoundParams: atsframework.PlaySoundParams = Object.create(atsframework.DefaultPlaySoundParams);
        v_rPlaySoundParams.priority = v_pDrSound.priority;
        v_rPlaySoundParams.loop = v_pDrSound.loop;
        v_rPlaySoundParams.volumeInSoundGroup = v_pDrSound.volume;
        v_rPlaySoundParams.spatialBlend = v_pDrSound.spatialBlend;

        return GameEntry.sound.playSound(`main/sound/${v_pDrSound.assetName}`, "Sound", 30, v_rPlaySoundParams, userData);
    }

    playUISound(uiSoundId: number, userData?: atsframework.UserData): number | null {
        userData = userData || null;
        let v_pDtUISound: atsframework.IDataTable<DRUISound> = GameEntry.dataTable.getDataTable<DRUISound>('uisound');
        let v_pDrUISound: DRUISound = v_pDtUISound.getDataRow(uiSoundId);
        if (!v_pDrUISound) {
            cc.warn(`Can not load UI sound '${uiSoundId}' from data table.`);
            return null;
        }

        let v_rPlaySoundParams: atsframework.PlaySoundParams = Object.create(atsframework.DefaultPlaySoundParams);
        v_rPlaySoundParams.priority = v_pDrUISound.priority;
        v_rPlaySoundParams.loop = false;
        v_rPlaySoundParams.volumeInSoundGroup = v_pDrUISound.volume;
        v_rPlaySoundParams.spatialBlend = 0;

        return GameEntry.sound.playSound(`main/ui/uisound/${v_pDrUISound.assetName}`, 'UISound', 30, v_rPlaySoundParams, userData);
    }

} // class SoundExtension
