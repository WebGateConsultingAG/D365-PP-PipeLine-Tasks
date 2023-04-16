import DynamicsWebApi, { OnTokenAcquiredCallback } from 'dynamics-web-api';
import * as MSAL from '@azure/msal-node';

export const dynamicsAPIBuilder = (url: string, tenantId: string, clientId: string, clientSecret: string): DynamicsWebApi => {

    //OAuth Token Endpoint (from your Azure App Registration)
    const authorityUrl = 'https://login.microsoftonline.com/' + tenantId;

    const msalConfig = {
        auth: {
            authority: authorityUrl,
            clientId: clientId,
            clientSecret: clientSecret,
            knownAuthorities: ['login.microsoftonline.com']
        }
    }

    const cca = new MSAL.ConfidentialClientApplication(msalConfig);
    const serverUrl = 'https://<YOUR ORG HERE>.api.crm.dynamics.com';

    //function that acquires a token and passes it to DynamicsWebApi
    const acquireToken = (dynamicsWebApiCallback: OnTokenAcquiredCallback) => {
        cca.acquireTokenByClientCredential({
            scopes: [`${url}/.default`],
        }).then(response => {
            //call DynamicsWebApi callback only when a token has been retrieved successfully
            dynamicsWebApiCallback(response?.accessToken);
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
    }

    //create DynamicsWebApi
    return new DynamicsWebApi({
        serverUrl: serverUrl,
        dataApi: {
            version: '9.2'
        },
        onTokenRefresh: acquireToken
    });
}