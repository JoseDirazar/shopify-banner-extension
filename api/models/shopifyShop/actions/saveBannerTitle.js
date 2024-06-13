import {
    applyParams,
    preventCrossShopDataAccess,
    ActionOptions,
    SaveBannerTitleShopifyShopActionContext
  } from "gadget-server";
  
  /**
   * @param { SaveBannerTitleShopifyShopActionContext } context
   */
  export async function run({ params, record, logger, connections }) {
    applyParams(params, record);
    await preventCrossShopDataAccess(params, record);
  
    // get the product id passed in as a custom param
    const { bannerTitleParam } = params;
  
    // save the selected pre-purchase product in a SHOP-owned metafield
    // https://www.npmjs.com/package/shopify-api-node#metafields
    const titleResponse = await connections.shopify.current?.metafield.create({
      key: "banner-title",
      namespace: "banner-title",
      owner_id: record.id,
      type: "single_line_text_field",
      value: bannerTitleParam,
    });

    // print to the Gadget Logs
    logger.info({ titleResponse }, "add metafields response");
  }
  
  // define a productId custom param for this action
  export const params = {
    bannerTitleParam: { type: "string" },
  };
  
  /** @type { ActionOptions } */
  export const options = {
    actionType: "custom",
    triggers: { api: true },
  };