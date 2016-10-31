import fs from "fs";
import fsExtra from "fs-extra";

import {WORKING_PATH} from "../../../config";

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

    let updatedReadme;

    const templateReadme = fs.readFileSync(readmePath, "utf-8");

    updatedReadme = templateReadme.replace(new RegExp("org/lk-architecture/lk-lambda-boilerplate", "gi"), `org/${organizationName}/${lambdaName}`);
    updatedReadme = updatedReadme.replace("# lk-lambda-boilerplate", `# ${lambdaName}`);

    fs.writeFileSync(readmePath, updatedReadme, "utf-8");
}
