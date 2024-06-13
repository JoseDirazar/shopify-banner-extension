import {
    applyParams,
    preventCrossShopDataAccess,
    ActionOptions,
    SaveBannerMessageShopifyShopActionContext
  } from "gadget-server";
  
  /**
   * @param { SaveBannerMessageShopifyShopActionContext } context
   */
  export async function run({ params, record, logger, connections }) {
    applyParams(params, record);
    await preventCrossShopDataAccess(params, record);
  
    // get the product id passed in as a custom param
    const { bannerMessageParam } = params;
  
    // save the selected pre-purchase product in a SHOP-owned metafield
    // https://www.npmjs.com/package/shopify-api-node#metafields


    const messageResponse = await connections.shopify.current?.metafield.create({
      key: "banner-message",
      namespace: "banner-message",
      owner_id: record.id,
      type: "single_line_text_field",
      value: bannerMessageParam,
    });
  
    // print to the Gadget Logs
    logger.info({ messageResponse }, "add metafields response");
  }
  
  // define a productId custom param for this action
  export const params = {
    bannerMessageParam: { type: "string" }
  };
  
  /** @type { ActionOptions } */
  export const options = {
    actionType: "custom",
    triggers: { api: true },
  };