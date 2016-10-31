import {copyFiles} from "./steps/copy-files";
import {modifyFiles} from "./steps/modify-files";
import {removeServices} from "./steps/remove-services";

import {
    SERVICES
} from "../../config";

export async function initCommand(lambdaName, organizationName, selectedServices) {
    await copyFiles();
    await modifyFiles(lambdaName, organizationName);
    await removeServices(selectedServices);
}

export default async function wrappedInitCommand() {

    const lambda = await this.prompt({
        type: "input",
        name: "name",
        message: "Enter your lambda name: ",
    });

    console.log(lambda);

    const organization = await this.prompt({
        type: "input",
        name: "name",
        message: "Enter your organization name: ",
    });

    console.log(organization);

    const services = await this.prompt({
        type: "checkbox",
        "message": "Select services: ",
        "name": "selected",
        choices: SERVICES
    });

    console.log(services);

    await initCommand(lambda.name, organization.name, services.selected);
}
