import {get} from "axios";

import {WORKING_PATH} from "../../../config";
import execSync from "../../../services/exec-sync";

export async function copyFiles() {

    const result = await get(
        "https://api.github.com/repos/lk-architecture/lambda-boilerplate/git/refs/heads/master"
    );
    const commit = result.data.object.sha;

    const archiveUrl = `https://github.com/lk-architecture/lambda-boilerplate/archive/${commit}.tar.gz`;

    execSync(`curl ${archiveUrl} -L | tar xz --strip-components 1 -C ${WORKING_PATH}/`);
}
