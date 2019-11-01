
let g_iSerialId: number = 0;
export let EntityGenerateSerialId: () => number = function() {
    return ++g_iSerialId;
}
