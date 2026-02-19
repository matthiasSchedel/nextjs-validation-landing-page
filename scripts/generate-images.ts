import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { fal } from "@fal-ai/serverless-client";

interface CliOptions {
  prompt: string;
  output: string;
  model: string;
}

function parseArgs(argv: string[]): CliOptions {
  const args = new Map<string, string>();

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }

    args.set(key, value);
    index += 1;
  }

  const prompt = args.get("prompt");
  if (!prompt) {
    throw new Error("Usage: npm run generate:images -- --prompt \"your prompt\" [--output public/images/generated.webp] [--model fal-ai/flux/schnell]");
  }

  return {
    prompt,
    output: args.get("output") ?? "public/images/generated.webp",
    model: args.get("model") ?? "fal-ai/flux/schnell"
  };
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function firstImageUrl(data: unknown): string | null {
  if (!isObjectRecord(data)) {
    return null;
  }

  const maybeImages = data.images;
  if (Array.isArray(maybeImages) && maybeImages.length > 0) {
    const maybeFirst = maybeImages[0];
    if (isObjectRecord(maybeFirst) && typeof maybeFirst.url === "string") {
      return maybeFirst.url;
    }
  }

  const maybeImage = data.image;
  if (isObjectRecord(maybeImage) && typeof maybeImage.url === "string") {
    return maybeImage.url;
  }

  return null;
}

async function run(): Promise<void> {
  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    throw new Error("FAL_KEY not set.");
  }

  const options = parseArgs(process.argv.slice(2));

  fal.config({ credentials: falKey });

  const rawResult: unknown = await fal.subscribe(options.model, {
    input: {
      prompt: options.prompt
    }
  });

  const payload = isObjectRecord(rawResult) ? rawResult.data : null;
  const imageUrl = firstImageUrl(payload);
  if (!imageUrl) {
    throw new Error("Image generation succeeded but no image URL was returned.");
  }

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to download generated image: ${response.status}`);
  }

  const outputPath = resolve(process.cwd(), options.output);
  await mkdir(dirname(outputPath), { recursive: true });
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, buffer);

  process.stdout.write(`Saved image to ${outputPath}\n`);
}

run().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
