#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { HelloCoopStack } from '../lib/hello-coop-stack';


const app = new cdk.App();
new HelloCoopStack(app, 'HelloCoopStack');
