import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const CSGO_BANALYTICS_API_URL =
    publicRuntimeConfig.CSGO_BANALYTICS_API_URL || "http://127.0.0.1:4000/";
