import {expect} from "chai";
import fs from "fs";
import fsExtra from "fs-extra";
import dashify from "dashify";

import cli from "index";

import {
    SERVICES,
    SERVICES_PATH,
    SRC_PATH,
    TEST_PATH,
    WORKING_PATH
} from "config";

import {initCommand} from "commands/init";

describe("Cli tool", () => {

    it("Init-lambda command", async () => {
        const initCommand = cli.find("init");
        expect(!!initCommand).to.be.equal(true);
    });

    describe("Init-lambda command steps", () => {

        before(() => {
            fsExtra.emptyDirSync(WORKING_PATH);
        });

        after(() => {
            fsExtra.removeSync(WORKING_PATH);
        });

        const lambdaName = "lambda-test";
        const organizationName = "test-org";
        const selectedServices = [];

        it("Download and setup Github lambda boilerplate", async () => {
            await initCommand(lambdaName, organizationName, selectedServices);
        }).timeout(10000);

        describe("Contains project needed directories", () => {

            const neededDirs = [
                `${SRC_PATH}`,
                `${TEST_PATH}`
            ];

            neededDirs.forEach(dir => {
                it(`${dir} folder`, () => {
                    const dirStat = fs.statSync(`${WORKING_PATH}${dir}`);
                    expect(dirStat.isDirectory()).to.be.equal(true);
                });
            });
        });

        describe("Contains project needed files", () => {

            const neededFiles = [
                `${SRC_PATH}/config.js`,
                `${SRC_PATH}/index.js`,
                `${SRC_PATH}/pipeline.js`,
                `${TEST_PATH}/index.js`,
                ".babelrc",
                ".eslintrc",
                ".gitignore",
                ".travis.yml",
                "Lambdafile",
                "LICENSE",
                "package.json",
                "README.md",
                "yarn.lock"
            ];

            neededFiles.forEach(file => {
                it(file, () => {
                    const fileStat = fs.statSync(`${WORKING_PATH}/${file}`);
                    expect(fileStat.isFile()).to.be.equal(true);
                });
            });
        });

        describe("Rename needed components", () => {
            it("package.json", () => {
                const updatedPackage = fsExtra.readJsonSync(`${WORKING_PATH}/package.json`);
                expect(updatedPackage.name).to.be.equal(lambdaName);
                expect(updatedPackage.repository.url).to.be.equal(`https://github.com/${organizationName}/${lambdaName}`);
            });

            it("README.md", () => {
                const updatedReadme = fs.readFileSync(`${WORKING_PATH}/README.md`, "utf-8");

                const occurrences = {
                    removedPlaceholder: !updatedReadme.includes("${placeholder}"),
                    replacedPlaceholder: updatedReadme.includes(`${organizationName}/${lambdaName}`)
                };

                expect(occurrences).to.be.deep.equal({
                    removedPlaceholder: true,
                    replacedPlaceholder: true
                });
            });
        });

        describe("Remove unneeded services", () => {
            const allServices = [...SERVICES];

            allServices.forEach(service => {
                it(`${service} service`, () => {
                    const serviceFile = fs.existsSync(`${WORKING_PATH}${SRC_PATH}${SERVICES_PATH}/${dashify(service)}.js`);
                    expect(serviceFile).to.be.equal(false);
                });
            });
        });

    });
});
