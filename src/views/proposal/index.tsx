import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from '@reach/router';
import { Card, CardContent } from '@mui/material';
import AppWrapper from 'views/components/app-wrapper';
import AppMenu from 'views/components/app-menu';
import DashboardContent from 'views/components/app-content/DashboardContent';
import ChannelList from 'views/components/app-menu/channel-list';



import { proposalTypes } from 'util/constant';

const Proposal = (props: RouteComponentProps) => {
  return (
    <>
      <Helmet>
        <title>Proposal</title>
      </Helmet>
      <AppWrapper>
        <AppMenu />
        <DashboardContent>
          <div className="row"> 
            <div className="mt-5 col-12 col-md-8 offset-md-2">
              <Card>
                <CardContent> 
                  <div className='proposal_history'>
                  <ChannelList/>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DashboardContent>
      </AppWrapper>
    </>
  );
};

export default Proposal;
