"use client";

import { Provider } from "react-redux";
import store from "@/store";
import { SWRConfig } from "swr";

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SWRConfig
      value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}
    >
      <Provider store={store}>{children}</Provider>
    </SWRConfig>
  );
};

export default ClientProvider;
