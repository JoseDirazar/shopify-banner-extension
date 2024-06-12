import {
    applyParams,
    preventCrossShopDataAccess,
    ActionOptions,
    SaveBannerMetaObjectShopifyShopActionContext
  } from "gadget-server";
  
  /**
   * @param { SaveBannerMetaObjectShopifyShopActionContext } context
   */
  export async function run({ params, record, logger, connections }) {
    applyParams(params, record);
    await preventCrossShopDataAccess(params, record);
  
    // get the product id passed in as a custom param
    const { bannerTitle } = params;
  
    // save the selected pre-purchase product in a SHOP-owned metafield
    // https://www.npmjs.com/package/shopify-api-node#metafields
    const response = await connections.shopify.current?.metafield.create({
      key: "banner-title",
      namespace: "banner-title",
      owner_id: record.id,
      type: "single_line_text_field",
      value: bannerTitle,
    });
  
    // print to the Gadget Logs
    logger.info({ response }, "add metafields response");
  }
  
  // define a productId custom param for this action
  export const params = {
    bannerTitle: { type: "string" },
  };
  
  /** @type { ActionOptions } */
  export const options = {
    actionType: "custom",
    triggers: { api: true },
  };