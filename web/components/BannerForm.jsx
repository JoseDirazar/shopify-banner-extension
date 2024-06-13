import { Controller, useActionForm } from "@gadgetinc/react";
import {
  Banner,
  Button,
  Form,
  FormLayout,
  TextField,
  SkeletonDisplayText,
} from "@shopify/polaris";
import { api } from "../api";
import { useEffect } from "react";

export const BannerTitleForm = ({ shop }) => {
  const { submit, control, formState, error, setValue, watch } = useActionForm(
    api.shopifyShop.saveBannerTitle,
    {
      findBy: shop.id,
      select: {
        id: true,
        bannerTitle: true,
      },
      send: ["id", "bannerTitleParam"],
    }
  );

  const updateBannerTitle = watch("shopifyShop.bannerTitle");

  useEffect(() => {
    setValue("bannerTitleParam", updateBannerTitle);
  }, [updateBannerTitle]);

  return (
    <>
      <Form onSubmit={submit}>
        <FormLayout>
          {formState?.isSubmitSuccessful && (
            <Banner title="Banner data saved!" tone="success" />
          )}
          {error && (
            <Banner title="Error saving banner data" tone="critical">
              {error.message}
            </Banner>
          )}
          {formState?.isLoading ? (
            <SkeletonDisplayText size="large" />
          ) : (
            <>
              <Controller
                name="shopifyShop.bannerTitle"
                control={control}
                render={({ field }) => {
                  const { ref, ...fieldProps } = field;
                  return (
                    <TextField
                      label="Banner Title"
                      disabled={formState.isSubmitting}
                      placeholder="Enter banner title"
                      {...fieldProps}
                    />
                  );
                }}
              />
            </>
          )}
          <Button submit disabled={formState.isSubmitting} variant="primary">
            Save
          </Button>
        </FormLayout>
      </Form>
    </>
  );
};
