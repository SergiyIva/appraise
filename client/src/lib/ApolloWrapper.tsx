"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  ApolloNextAppProvider,
} from "@apollo/experimental-nextjs-app-support";
import { cache } from "@/src/lib/cache";

const dockerUrl = process.env.NEXT_PUBLIC_DOMAIN_API_DOCKER;

function makeClient() {
  const uri =
    (typeof window === "undefined" && !!dockerUrl
      ? dockerUrl
      : process.env.NEXT_PUBLIC_DOMAIN_API) + "/graphql";
  const httpLink = new HttpLink({
    uri,
    fetchOptions: {
      cache: "no-cache",
    },
  });

  return new ApolloClient({
    cache,
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
