import fsExtra from "fs-extra";
import dashify from "dashify";

import {
    SERVICES,
    SERVICES_PATH,
    SRC_PATH,
    WORKING_PATH
} from "../../../config";

export function removeServices(selectedServices) {

    const allServices = [...SERVICES];

    allServices.forEach(service => {

        const isSelected = selectedServices.find(x => x === service);
        if (!isSelected) {
            const servicesFilename = `${WORKING_PATH}${SRC_PATH}${SERVICES_PATH}/${dashify(service)}.js`;
            fsExtra.removeSync(servicesFilename);
        }
    });
}
