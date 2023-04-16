"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicsAPIBuilder = void 0;
const dynamics_web_api_1 = __importDefault(require("dynamics-web-api"));
const MSAL = __importStar(require("@azure/msal-node"));
const dynamicsAPIBuilder = (url, tenantId, clientId, clientSecret) => {
    const authorityUrl = 'https://login.microsoftonline.com/' + tenantId;
    const msalConfig = {
        auth: {
            authority: authorityUrl,
            clientId: clientId,
            clientSecret: clientSecret,
            knownAuthorities: ['login.microsoftonline.com']
        }
    };
    const cca = new MSAL.ConfidentialClientApplication(msalConfig);
    const serverUrl = 'https://<YOUR ORG HERE>.api.crm.dynamics.com';
    const acquireToken = (dynamicsWebApiCallback) => {
        cca.acquireTokenByClientCredential({
            scopes: [`${url}/.default`],
        }).then(response => {
            dynamicsWebApiCallback(response === null || response === void 0 ? void 0 : response.accessToken);
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
    };
    return new dynamics_web_api_1.default({
        serverUrl: serverUrl,
        dataApi: {
            version: '9.2'
        },
        onTokenRefresh: acquireToken
    });
};
exports.dynamicsAPIBuilder = dynamicsAPIBuilder;
