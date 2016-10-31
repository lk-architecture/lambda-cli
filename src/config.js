export const NODE_ENV = process.env.NODE_ENV || "development";
export const LOG_LEVEL = process.env.LOG_LEVEL || "info";
export const WORKING_PATH = process.env.NODE_ENV == "test" ? `${process.cwd()}/tmp1` : `${process.cwd()}/tmp2`;
export const SRC_PATH = "/src";
export const TEST_PATH = "/test";
export const SERVICES_PATH = "/services";

export const SERVICES = [
    "MongoDB",
    "PostgreSQL"
];
