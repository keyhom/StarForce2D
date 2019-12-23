export enum UIFormId {
    Undefined = 0,
    DialogForm,
    MenuForm,
    SettingForm,
    AboutForm,
    MainForm
} // enum UIFormId

export function uiFormAssetName(uiFormId: UIFormId): string {
    let v_sName: string = 'main/ui/forms';
    if (uiFormId == UIFormId.Undefined)
        throw new Error(`Illegel UIFormId '${uiFormId}'!`);

    v_sName = `${v_sName}/${UIFormId[uiFormId]}`;
    return v_sName;
}
