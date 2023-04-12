import { WebPartContext } from "@microsoft/sp-webpart-base";

export async function getPersonalData(context: WebPartContext) {
  const client = await context.msGraphClientFactory.getClient("3");

  const response = await client
    .api("/me/messages?$select=from,categories")
    .get();
  console.log(response);
}
