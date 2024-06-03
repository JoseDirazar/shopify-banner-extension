import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "session" model, go to https://checkout-banner-extension.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "oUuiMFGV_Yy7",
  fields: {
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "zZGastDIf0cY",
    },
  },
  shopify: { fields: ["shop", "shopifySID"] },
};
