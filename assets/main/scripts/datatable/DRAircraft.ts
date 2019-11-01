import DataRowBase from "DataRowBase";

export default class DRAircraft extends DataRowBase {

    dataSplitSeperators: string = ',';

    thrusterId!: number;

    weaponId0!: number;
    weaponId1!: number;
    weaponId2!: number;

    armorId0!: number;
    armorId1!: number;
    armorId2!: number;

    deadEffectId!: number;
    deadSoundId!: number;

    parseRowString(columns: string[]): boolean {
        if (!columns || columns.length == 0)
            return false;

        let i: number = 1;
        this.id = parseInt(columns[i++]);
        i++;
        this.thrusterId = parseInt(columns[i++]);
        this.weaponId0 = parseInt(columns[i++]);
        this.weaponId1 = parseInt(columns[i++]);
        this.weaponId2 = parseInt(columns[i++]);
        this.armorId0 = parseInt(columns[i++]);
        this.armorId1 = parseInt(columns[i++]);
        this.armorId2 = parseInt(columns[i++]);
        this.deadEffectId = parseInt(columns[i++]);
        this.deadSoundId = parseInt(columns[i++]);

        this.generatePropertyArray();
        return true;
    }

    private m_pWeaponIds: [number, number][] = [];

    getWeaponId(id: number): number {
        for (const tuple of this.m_pWeaponIds) {
            if (tuple[0] == id)
                return tuple[1];
        }

        throw new Error(`getWeaponId with invalid id '${id}'!`);
    }

    getWeaponIdAt(index: number): number {
        if (index < 0 || index >= this.m_pWeaponIds.length) {
            throw new Error(`getWeaponIdAt with invalid index '${index}'.`);
        }

        return this.m_pWeaponIds[index][1];
    }

    private m_pArmorIds: [number, number][] = [];

    get armorIdCount(): number {
        return this.m_pArmorIds.length;
    }

    getArmorId(id: number) {
        for (const tuple of this.m_pArmorIds) {
            if (tuple[0] == id)
                return tuple[1];
        }

        throw new Error(`getArmorId with invalid id '${id}'!`);
    }

    getArmorIdAt(index: number): number {
        if (index < 0 || index >= this.m_pArmorIds.length) {
            throw new Error(`getArmorIdAt with invalid index '${index}'!`);
        }

        return this.m_pArmorIds[index][1];
    }

    private generatePropertyArray(): void {
        this.m_pWeaponIds = [
            [0, this.weaponId0],
            [1, this.weaponId1],
            [2, this.weaponId2]
        ];

        this.m_pArmorIds = [
            [0, this.armorId0],
            [1, this.armorId1],
            [2, this.armorId2]
        ];
    }

} // class DRAircraft