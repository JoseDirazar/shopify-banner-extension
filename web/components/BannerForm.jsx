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

  const {
    submit: submitMessage,
    control: messageControl,
    formState: messageFormState,
    error: messageError,
    setValue: setMessageValue,
    watch: watchMessageValue,
  } = useActionForm(api.shopifyShop.saveBannerMessage, {
    findBy: shop.id,
    select: {
      id: true,
      bannerMessage: true,
    },
    send: ["id", "bannerMessageParam"],
  });

  const updateBannerTitle = watch("shopifyShop.bannerTitle");

  const updateBannerMessage = watchMessageValue("shopifyShop.bannerMessage");

  useEffect(() => {
    setValue("bannerTitleParam", updateBannerTitle);
    setMessageValue("bannerMessageParam", updateBannerMessage);
  }, [updateBannerTitle, updateBannerMessage]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await submit();
    await submitMessage();
  };
  return (
    <Form onSubmit={onSubmit}>
      <FormLayout>
        {(formState?.isSubmitSuccessful ||
          messageFormState?.isSubmitSuccessful) && (
          <Banner title="Banner data saved!" tone="success" />
        )}
        {(error || messageError) && (
          <Banner title="Error saving banner data" tone="critical">
            {error.message}
          </Banner>
        )}
        {formState?.isLoading || messageFormState?.isLoading ? (
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
            <Controller
              name="shopifyShop.bannerMessage"
              control={messageControl}
              render={({ field }) => {
                const { ref, ...fieldProps } = field;
                return (
                  <TextField
                    label="Banner Message"
                    disabled={messageFormState.isSubmitting}
                    placeholder="Enter banner message"
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
