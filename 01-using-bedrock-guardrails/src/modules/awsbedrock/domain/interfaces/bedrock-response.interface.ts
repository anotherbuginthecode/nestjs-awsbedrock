export interface IBedrockResponse {
    inputTextTokenCount: number,
    results: {
        tokenCount: number,
        outputText: string,
        completionReason: string
    }[]
    "amazon-bedrock-guardrailAction"?: "NONE" | "INTERVENED"  
}