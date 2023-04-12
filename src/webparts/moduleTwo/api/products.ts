import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface IProduct {
  Id: string;
  Title: string;
  ReleaseDate: string;
  PhotoSubmission: string;
  CustomerRating: number;
}

async function deleteProduct(
  context: WebPartContext,
  id: string
): Promise<void> {
  const sp = spfi().using(SPFx(context));
  await sp.web.lists.getByTitle("Products").items.getById(Number(id)).delete();
}

async function updateProduct(
  context: WebPartContext,
  product: {
    Id: string;
    Title: string;
    CustomerRating: number;
  }
): Promise<void> {
  const sp = spfi().using(SPFx(context));

  await sp.web.lists
    .getByTitle("Products")
    .items.getById(Number(product.Id))
    .update({
      Title: product.Title,
      CustomerRating: product.CustomerRating,
    });
}

async function getProductById(context: WebPartContext, id: string) {
  const sp = spfi().using(SPFx(context));

  const item = await sp.web.lists
    .getByTitle("Products")
    .items.getById(Number(id));
  return item;
}

async function getProducts(context: WebPartContext): Promise<IProduct[]> {
  const sp = spfi().using(SPFx(context));

  const response = await sp.web.lists
    .getByTitle("Products")
    .items.select(
      "Id",
      "Title",
      "ReleaseDate",
      "PhotoSubmission",
      "CustomerRating"
    )
    .orderBy("ReleaseDate", false)();

  return response;
}

async function createProduct(
  context: WebPartContext,
  product: {
    Title: string;
    CallVolume: number;
  }
) {
  const sp = spfi().using(SPFx(context));

  const response = await sp.web.lists.getByTitle("Products").items.add({
    Title: product.Title,
    CustomerRating: product.CallVolume,
    RetailCategory: "Enterprise",
  });
  console.log(response.data);
}

async function getProductsOld(context: WebPartContext): Promise<IProduct[]> {
  const response = await context.spHttpClient.get(
    context.pageContext.web.absoluteUrl +
      "/_api/web/lists/getbytitle('Products')/items" +
      "?$orderby=ReleaseDate asc" +
      "&$select=Id,Title,ReleaseDate,PhotoSubmission",
    SPHttpClient.configurations.v1
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  const products = await response.json();

  return products.value;
}

export {
  getProducts,
  getProductsOld,
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
};
