import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  useAppMetafields,
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useState } from "react";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const [titleMetafield, messageMetafield] = useAppMetafields();
  const [bannerMessage, setBannerMessage] = useState();
  const [bannerTitle, setBannerTitle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (titleMetafield) {
          const title = titleMetafield.metafield.value;
          //const message = messageMetafield.metafield.value;
          console.log("TITLE", title);
          setBannerTitle(title);
          //setBannerMessage(message);
        }
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchData();
  }, [titleMetafield, messageMetafield]);

  console.log({ bannerTitle, messageMetafield });
  return (
    <>
      <Banner title="new-banner">SDFS</Banner>
    </>
  );
}
