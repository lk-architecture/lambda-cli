import fs from "fs";
import fsExtra from "fs-extra";

import {WORKING_PATH} from "config";

export function modifyFiles(lambdaName, organizationName) {

    const packagePath = `${WORKING_PATH}/package.json`;

    const templatePackage = fsExtra.readJSONSync(packagePath);

    const updatedPackage = {
        ...templatePackage,
        name: lambdaName,
        repository: {
            type: "git",
            url: `https://github.com/${organizationName}/${lambdaName}`
        }
    };

    fsExtra.outputJsonSync(packagePath, updatedPackage);

    const readmePath = `${WORKING_PATH}/README.md`;

    const templateReadme = fs.readFileSync(readmePath, "utf-8");
    const updatedReadme = templateReadme.replace(new RegExp("${placeholder}", "gi"), `${organizationName}/${lambdaName}`);

    fs.writeFileSync(readmePath, updatedReadme, "utf-8");
}
