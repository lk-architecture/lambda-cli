import {execSync} from "child_process";

import {LOG_LEVEL} from "../config";

export default function wrappedExecSync(command, options) {
    if (LOG_LEVEL === "debug") {
        console.log();
        console.log(`Executing command: ${command}`);
        console.log();
        execSync(command, {
            ...options,
            stdio: "inherit"
        });
        console.log();
    } else {
        execSync(command, options);
    }
}
