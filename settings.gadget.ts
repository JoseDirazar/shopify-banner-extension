import type { GadgetSettings } from "gadget-server";

export const settings: GadgetSettings = {
  type: "gadget/settings/v1",
  frameworkVersion: "v1.0.0",
  plugins: {
    connections: {
      shopify: {
        apiVersion: "2024-04",
        enabledModels: [
          "shopifyCart",
          "shopifyCartLineItem",
          "shopifyCheckout",
          "shopifyCheckoutAppliedGiftCard",
          "shopifyCheckoutLineItem",
          "shopifyCheckoutShippingRate",
          "shopifyCollection",
          "shopifyOrder",
          "shopifyOrderLineItem",
          "shopifyProduct",
          "shopifyProductImage",
          "shopifyProductVariant",
          "shopifyShippingAddress",
        ],
        type: "partner",
        scopes: [
          "read_orders",
          "write_orders",
          "read_products",
          "write_products",
          "read_checkouts",
        ],
      },
    },
  },
};
