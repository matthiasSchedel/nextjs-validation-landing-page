import { Resend } from "resend";

import { config } from "@/lib/config";

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  if (resendClient) {
    return resendClient;
  }

  resendClient = new Resend(config.integrations.resendApiKey);
  return resendClient;
}
