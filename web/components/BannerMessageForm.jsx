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

export const BannerMessageForm = ({ shop }) => {
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

  const updateBannerMessage = watchMessageValue("shopifyShop.bannerMessage");

  useEffect(() => {
    setMessageValue("bannerMessageParam", updateBannerMessage);
  }, [updateBannerMessage]);
  console.log(updateBannerMessage);
  return (
    <>
      <Form onSubmit={submitMessage}>
        <FormLayout>
          {messageFormState?.isSubmitSuccessful && (
            <Banner title="Banner data saved!" tone="success" />
          )}
          {messageError && (
            <Banner title="Error saving banner data" tone="critical">
              {messageError.message}
            </Banner>
          )}
          {messageFormState?.isLoading ? (
            <SkeletonDisplayText size="large" />
          ) : (
            <>
              <Controller
                name="shopifyShop.bannerMessage"
                control={messageControl}
                render={({ field }) => {
                  const { ref, ...fieldProps } = field;
                  return (
                    <TextField
                      label="Banner Title"
                      disabled={messageFormState.isSubmitting}
                      placeholder="Enter banner title"
                      {...fieldProps}
                    />
                  );
                }}
              />
            </>
          )}
          <Button
            submit
            disabled={messageFormState.isSubmitting}
            variant="primary"
          >
            Save
          </Button>
        </FormLayout>
      </Form>
    </>
  );
};
