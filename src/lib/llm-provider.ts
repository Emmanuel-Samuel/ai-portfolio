export type LLMProvider = "anthropic" | "openrouter" | "gemini";

export interface ProviderChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface BuildRequestArgs {
  model: string;
  system: string;
  messages: ProviderChatMessage[];
  maxTokens: number;
  temperature: number;
  topP: number;
}

interface ProviderRequest {
  url: string;
  headers: Record<string, string>;
  body: object;
}

const ANTHROPIC_VERSION = "2023-06-01";

export function getLLMProvider(): LLMProvider {
  const raw = process.env.LLM_PROVIDER?.trim().toLowerCase();
  if (raw === "openrouter" || raw === "gemini") return raw;
  return "anthropic";
}

export function getProviderApiKey(provider: LLMProvider): string | undefined {
  if (provider === "openrouter") return process.env.OPENROUTER_API_KEY?.trim();
  if (provider === "gemini") return process.env.GEMINI_API_KEY?.trim();
  return process.env.ANTHROPIC_API_KEY?.trim();
}

export function getDefaultModelForProvider(provider: LLMProvider): string {
  if (provider === "openrouter") return "minimax/minimax-m3:free";
  if (provider === "gemini") return "gemini-2.5-flash";
  return "claude-sonnet-5";
}

function getDefaultBaseUrl(provider: LLMProvider): string {
  if (provider === "openrouter") return "https://openrouter.ai/api/v1/chat/completions";
  if (provider === "gemini") return "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
  return "https://api.anthropic.com/v1/messages";
}

export function buildProviderRequest(
  provider: LLMProvider,
  apiKey: string,
  args: BuildRequestArgs
): ProviderRequest {
  const url = process.env.LLM_BASE_URL?.trim() || getDefaultBaseUrl(provider);

  if (provider === "anthropic") {
    return {
      url,
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: {
        model: args.model,
        system: args.system,
        messages: args.messages,
        max_tokens: args.maxTokens,
        top_p: args.topP,
        temperature: args.temperature,
      },
    };
  }

  // openrouter and gemini both speak the OpenAI-compatible Chat Completions format.
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${apiKey}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  if (provider === "openrouter") {
    headers["HTTP-Referer"] = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://emmanuelmayowasamuel.vercel.app";
    headers["X-Title"] = "Emmanuel Samuel AI Twin";
  }

  return {
    url,
    headers,
    body: {
      model: args.model,
      messages: [{ role: "system", content: args.system }, ...args.messages],
      max_tokens: args.maxTokens,
      top_p: args.topP,
      temperature: args.temperature,
    },
  };
}

interface AnthropicResponseShape {
  content?: Array<{ type: string; text?: string }>;
}

interface OpenAICompatibleResponseShape {
  choices?: Array<{ message?: { content?: string } }>;
}

export function extractProviderTextContent(provider: LLMProvider, responseData: unknown): string {
  if (provider === "anthropic") {
    const data = responseData as AnthropicResponseShape;
    return (
      data.content
        ?.filter((block) => block.type === "text" && typeof block.text === "string")
        .map((block) => block.text)
        .join("") || ""
    );
  }

  const data = responseData as OpenAICompatibleResponseShape;
  return data.choices?.[0]?.message?.content || "";
}
