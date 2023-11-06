import path from "path";
import { google } from "googleapis";
import { GoogleAuth, JWT } from "google-auth-library";
import { FORM_ID } from "../constants";

export async function getFormResponseNumber(): Promise<number> {
  const auth = new GoogleAuth({
    keyFile: path.join(__dirname, "..", "..", "google-credentials.json"),
    scopes: ["https://www.googleapis.com/auth/forms.responses.readonly"],
  });

  const authClient = (await auth.getClient()) as JWT;
  const forms = google.forms({ version: "v1", auth: authClient });
  const res = await forms.forms.responses.list({ formId: FORM_ID });

  if (Array.isArray(res.data.responses)) {
    return res.data.responses.length;
  } else {
    return 0;
  }
}
