import { useFindFirst, useQuery } from "@gadgetinc/react";
import {
  Card,
  Banner,
  FooterHelp,
  InlineStack,
  Icon,
  Layout,
  Link,
  Page,
  Spinner,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { StoreIcon } from "@shopify/polaris-icons";
import { api } from "../api";
import { BannerForm } from "../components/BannerForm";

const gadgetMetaQuery = `
  query {
    gadgetMeta {
      slug
      editURL
    }
  }
`;

export default function () {
  const [{ data: metaData, fetching: fetchingGadgetMeta }] = useQuery({
    query: gadgetMetaQuery,
  });

  const [{ data: shopData, fetching: shopFetching, error: shopFetchError }] =
  useFindFirst(api.shopifyShop, {
    select: {
      id: true,
    },
  });

  if (shopFetching || fetchingGadgetMeta) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Spinner accessibilityLabel="Spinner example" size="large" />
      </div>
    );
  }
  console.log({shopData})
  return (
    <Page title="App">
      <Layout>
        <Layout.Section>
        <BannerForm shop={shopData} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
