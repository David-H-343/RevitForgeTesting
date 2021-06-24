import { viewer } from "./Viewer-helpers";

export function viewerResize() {
    if (viewer) {
        viewer.resize();
    }
}

export function viewerExplode(num: number) {
    if (viewer) {
        viewer.explode(num);
    }
}

export function modelRestoreState() {
    // TODO: Not finished
    if (viewer) {
        var originalState = "";
        viewer.restoreState(originalState, false, false);
    }
}
