import { useEffect, useMemo, useState } from "react";
import { RouteComponentProps, useLocation, useNavigate } from "@reach/router";
import { Helmet } from "react-helmet";
import AppWrapper from "views/components/app-wrapper";
import AppMenu from "views/components/app-menu";
const HomePage = (props: RouteComponentProps) => {
  return (
    <>
      <Helmet>
        <title>Nostr Pulachain Home Page</title>
      </Helmet>
      <AppWrapper>
        <AppMenu />
        <p>Home page</p>
      </AppWrapper>
    </>
  );
};

export default HomePage;
