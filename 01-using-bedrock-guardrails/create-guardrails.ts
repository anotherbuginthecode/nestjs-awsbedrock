import { BedrockClient, CreateGuardrailCommand, CreateGuardrailRequest } from "@aws-sdk/client-bedrock";
import { configDotenv } from "dotenv";
configDotenv();

const { AWS_REGION, AWS_PROFILE } = process.env;


const guardrailConfig: CreateGuardrailRequest = {
  name: "social-media-guardrail",
  description: "Guardrails to moderate comments on social media",
  blockedInputMessaging: "This input contains confidential information or inappropriate language",
  blockedOutputsMessaging: "This output contains confidential information or inappropriate language",
  sensitiveInformationPolicyConfig: {
    piiEntitiesConfig: [
      {type: "EMAIL", action: "BLOCK"},
      {type: "PHONE", action: "BLOCK"},
      {type: "ADDRESS", action: "BLOCK"},
      {type: "NAME", action: "BLOCK"}
    ]
  },
  topicPolicyConfig: { 
    topicsConfig: [
      {
        name: "Inappropriate Language",
        definition: "This topic is used to detect rude, offensive or inappropriate language in posts content or comments", 
        examples: [
          "This is the stupidest thing I've read all day. Do you even think?",
          "You're a waste of space, honestly.",
          "This is the stupidest thing I've read all day. Do you even think?"
        ],
        type: "DENY",
      },
      {
        name: "Profanity Language",
        definition: "This topic is used to detect profanity language in posts content or comments", 
        examples: [
          "What the hell are you even talking about?",
          "This post is a load of crap.",
          "F*** off with your garbage opinions."
        ],
        type: "DENY",
      },
      {
        name: "Harassment Language",
        definition: "This topic is used to detect harassment language in posts content or comments", 
        examples: [
          "No one cares about your life, just stop posting.",
          "I saw your profile picture—no wonder you're single.",
          "Go cry somewhere else, loser."
        ],
        type: "DENY",
      },
      {
        name: "Body Shaming Language",
        definition: "This topic is used to detect body shaming language in posts content or comments", 
        examples: [
          "Nice post, but maybe work on losing a few pounds first.",
          "Your appearance is distracting from whatever you're trying to say.",
          "Who let someone looking like that have an opinion?"
        ],
        type: "DENY",
      },
    ],
  },
  contentPolicyConfig: {
    filtersConfig: [
      {
        type: "SEXUAL",
        inputStrength: "HIGH",
        outputStrength: "HIGH",
        inputModalities: ["TEXT"],
        outputModalities: ["TEXT"],
      },
      {
        type: "HATE",
        inputStrength: "HIGH",
        outputStrength: "HIGH",
        inputModalities: ["TEXT"],
        outputModalities: ["TEXT"],
      },
      {
        type: "INSULTS",
        inputStrength: "HIGH",
        outputStrength: "HIGH",
        inputModalities: ["TEXT"],
        outputModalities: ["TEXT"],
      },
      {
        type: "VIOLENCE",
        inputStrength: "HIGH",
        outputStrength: "HIGH",
        inputModalities: ["TEXT"],
        outputModalities: ["TEXT"],
      },
      {
        type: "PROMPT_ATTACK",
        inputStrength: "HIGH",
        outputStrength: "NONE",
        inputModalities: ["TEXT"],
        outputModalities: ["TEXT"],
      },
    ]
  }
}

const client = new BedrockClient({ region: AWS_REGION, profile: AWS_PROFILE });
const command = new CreateGuardrailCommand(guardrailConfig);

async function createGuardrail() {
  const response = await client.send(command);
  console.log(response);
}

createGuardrail();


/*
npx tsx create-guardrails.ts  // Run the script

{
  '$metadata': {
    httpStatusCode: 202,
    requestId: 'b2748932-d34f-4915-ba87-db9096af03df',
    extendedRequestId: undefined,
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  },
  createdAt: 2025-01-19T18:38:57.817Z,
  guardrailArn: 'arn:aws:bedrock:{AWS_REGION}:{AWS_ACCOUNT}:guardrail/{GUARDRAIL_IDENTIFIER}',
  guardrailId: '{GUARDRAIL_IDENTIFIER}',
  version: 'DRAFT'
}
  
*/