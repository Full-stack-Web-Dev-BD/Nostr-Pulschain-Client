import { Link, RouteComponentProps } from "@reach/router";
import { Helmet } from "react-helmet";
import AppWrapper from "views/components/app-wrapper";
import AppMenu from "views/components/app-menu";
import { useEffect, useState } from "react"; 
import DashboardContent from "views/components/app-content/DashboardContent";
 
const Proposal = (props: RouteComponentProps) => { 
 
  return (
    <>
      <Helmet>
        <title>Proposal</title>
      </Helmet>
      <AppWrapper>
        <AppMenu />
        <DashboardContent>
          <div className="">
            <h3>Proposal</h3>
          </div>
        </DashboardContent>
      </AppWrapper>
    </>
  );
};

export default Proposal;
