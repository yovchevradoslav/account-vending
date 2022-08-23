import { Construct } from "constructs";
import { TerraformStack, S3Backend } from "cdktf";
import * as aws from "@cdktf/provider-aws";

type apiConfig = {
    apiConfig: aws.apigatewayv2.Apigatewayv2ApiConfig,
    resources: apiRoute[]
}

type apiRoute = {
    routeConfig: aws.apigatewayv2.Apigatewayv2RouteConfig
    integration?: aws.apigatewayv2.Apigatewayv2IntegrationConfig
}

type S3ProviderConfiguration = {
    bucket: string,
    key: string,
    region: string,
    profile: string,
}

class AWSAPIDeployer extends TerraformStack {

    constructor (scope: Construct, id: string, config: apiConfig) {
        super(scope, id);

        const api = new aws.apigatewayv2.Apigatewayv2Api(this, "api-gw", config.apiConfig)

        config.resources.map(resource => {
            new aws.apigatewayv2.Apigatewayv2Route(scope, "someid", resource.routeConfig)
        })

        if(config.resources) new aws.apigatewayv2.Apigatewayv2Deployment(this, "something", {apiId: "something"})
        
    }

    setS3Provider(config: S3ProviderConfiguration) {
        new S3Backend(this, config)
    }
}

let providerConfig = {
    bucket: 'projectx-terraform-state-bucket',
    key: 'terraform/eu-west-1/projectx',
    region: 'eu-west-1',
    profile: 'projectx'
}




const app1 = new App();

app1.synth();

