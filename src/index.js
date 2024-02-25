"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const router_1 = require("@hellocoop/router");
const convertToHelloRequest = (req) => {
    console.log(router_1.isConfigured);
    return {
        headers: () => req.headers,
        query: req.query,
        path: req.routeOptions.url,
        getAuth: () => req.auth,
        setAuth: (auth) => { req.auth = auth; },
    };
};
const handler = async (event, context) => {
    const { CLIENT_ID, HELLO_COOKIE_SECRET } = process.env;
    console.log('CLIENT_ID', CLIENT_ID);
    console.log('HELLO_COOKIE_SECRET', HELLO_COOKIE_SECRET);
    console.log('event', event);
    const { headers, queryStringParameters, body, isBase64Encoded } = event;
    const method = event.httpMethod;
    const path = event.path;
    console.log('method', method);
    console.log('path', path);
    console.log('headers', headers);
    console.log('queryStringParameters', queryStringParameters);
    console.log('body', body);
    console.log('isBase64Encoded', isBase64Encoded);
    console.log('-----------------');
    console.log('context', context);
    const { functionName, functionVersion, memoryLimitInMB, logGroupName, logStreamName } = context;
    console.log('functionName', functionName);
    console.log('functionVersion', functionVersion);
    console.log('memoryLimitInMB', memoryLimitInMB);
    console.log('logGroupName', logGroupName);
    console.log('logStreamName', logStreamName);
    const content = JSON.stringify({
        HELLO_COOKIE_SECRET,
        CLIENT_ID,
        method,
        path,
        headers,
        queryStringParameters,
        body,
        isBase64Encoded,
    }, null, 2);
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/plain"
        },
        body: content,
    };
};
exports.handler = handler;
