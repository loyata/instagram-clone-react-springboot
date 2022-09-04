import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId:"us-east-1_YSzjHMSUl",
    ClientId:"7thiuladqqq5afr2el3dj1ii79"
}

export default new CognitoUserPool(poolData);