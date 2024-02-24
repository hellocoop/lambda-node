// HelloCoopStack

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as crypto from 'crypto';

export class HelloCoopStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function
    const helloLambda = new lambda.Function(this, 'HelloCoop', {
      functionName: 'HelloCoop',
      runtime: lambda.Runtime.NODEJS_20_X, 
      handler: 'index.handler',
      code: lambda.Code.fromAsset('../src/function.zip'), 
      environment: {
        HELLO_COOKIE_SECRET: crypto.randomBytes(32).toString('hex'),
        // HELLO_CLIENT_ID: 'YOUR_HELLO_CLIENT_ID',
      },
    });

    const helloLambdaUrl = helloLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE, // Publicly accessible
    });

    // Output the URL to the CloudFormation output
    new cdk.CfnOutput(this, 'LambdaFunctionUrl', {
      value: helloLambdaUrl.url,
    });
  }
}