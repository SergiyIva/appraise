import { InMemoryCache } from "@apollo/experimental-nextjs-app-support";
import { makeVar } from "@apollo/client";

export const cache = new InMemoryCache();

export const ChangeManagerVar = makeVar<number | null>(null);
