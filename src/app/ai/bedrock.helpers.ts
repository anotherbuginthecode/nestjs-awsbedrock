import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { BedrockResponse } from "./interfaces/bedrock-response.interface";

interface IAWSBedrock{
    readonly region: string;
    readonly runtime: "aws" | "local";
    readonly profile?: string;
    invoke(modelId:string, prompt:string): Promise<BedrockResponse>; 
}

export class AWSBedrockWrapper implements IAWSBedrock {
    region: string;
    profile?: string | undefined;
    runtime: "aws" | "local";

    private client: BedrockRuntimeClient;

    constructor(region:string, runtime: string, profile?:string) {
        this.region = region;
        this.profile = profile;
        this.runtime = runtime as "aws" | "local";
        if(this.runtime === "local") {
            this.client = new BedrockRuntimeClient({region: this.region, profile: this.profile});
        } else {
            this.client = new BedrockRuntimeClient({region: this.region});
        }

    }

    async invoke(modelId: string, prompt:string): Promise<BedrockResponse> {
        const command = new InvokeModelCommand({
            modelId:modelId,
            contentType:"application/json",
            accept:"application/json",
            body: JSON.stringify({
                inputText:prompt,
                textGenerationConfig: {
                    maxTokenCount: 512,
                    temperature: 0.7
                }
            })
        });

        const response = await this.client.send(command);
        const decodedResponseBody = JSON.parse(new TextDecoder().decode(response.body));

        return {
            answer: decodedResponseBody.results[0].outputText,
            model: modelId
        };
    }
}