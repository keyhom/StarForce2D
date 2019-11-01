import EffectData from "../entityData/EffectData";
import GameEntity from "./GameEntity";
import GameEntry from "../../GameEntry";

export default class Effect extends GameEntity {

    private m_pEffectData!: EffectData;
    private m_fElapsed: number = 0;

    protected onShow(userData: atsframework.UserData): void {
        super.onShow(userData);

        this.m_pEffectData = userData as EffectData;
        if (!this.m_pEffectData) {
            cc.error('Effect data is invalid.');
            return;
        }

        this.m_fElapsed = 0;
        this.name = `Effect (${this.id})`;

        let v_pParticals: cc.ParticleSystem[] = this.getComponentsInChildren(cc.ParticleSystem);
        if (v_pParticals && v_pParticals.length) {
            for (const partical of v_pParticals) {
                partical.resetSystem();
            }
        }
    }

    protected onHide(userData: atsframework.UserData): void {
        super.onHide(userData);

        let v_pParticals: cc.ParticleSystem[] = this.getComponentsInChildren(cc.ParticleSystem);
        if (v_pParticals && v_pParticals.length) {
            for (const partical of v_pParticals) {
                partical.stopSystem();
            }
        }
    }

    protected onUpdate(elapsed: number, realElapsed: number): void {
        super.onUpdate(elapsed, realElapsed);

        this.m_fElapsed += elapsed;
        if (this.m_fElapsed >= this.m_pEffectData.keepTime) {
            GameEntry.entityExt.hideEntity(this);
        }
    }

} // class Effect
