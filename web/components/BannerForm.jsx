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

export const BannerForm = ({ shop }) => {
  const { submit, control, formState, error, setValue, watch } = useActionForm(
    api.shopifyShop.saveBannerMetaobject,
    {
      findBy: shop.id,
      select: {
        id: true,
        bannerData: true,
      },
      send: ["id", "bannerTitle"],
    }
  );

  const updateBannerTitle = watch("shopifyShop.bannerData");

  useEffect(() => {
    setValue("bannerTitle", updateBannerTitle);
  }, [updateBannerTitle]);


  return (
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
              name="shopifyShop.bannerData"
              control={control}
              render={({ field }) => {
                const { ref, ...fieldProps } = field;
                console.log({ fieldProps });
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
  );
};
