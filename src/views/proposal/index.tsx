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
  const [proposalType, setProposalType] = useState('');
  const [formData, setFormData] = useState<{
    problem: string;
    solution: string;
    targetAudience: string;
    qualifications: string;
    purpose: string;
    approach: string;
    outcome: string;
    timeline: string;
    budget: string;
    callToAction: string;
  }>({
    problem: '',
    solution: '',
    targetAudience: '',
    qualifications: '',
    purpose: '',
    approach: '',
    outcome: '',
    timeline: '',
    budget: '',
    callToAction: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProposalTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedProposalType = e.target.value;
    setProposalType(selectedProposalType);

    // Find the selected proposal type from the proposalTypes array
    const selectedProposal = proposalTypes.find(
      type => type.name === selectedProposalType
    );

    if (selectedProposal) {
      // Update formData with purpose, approach, and outcome from selected proposal
      setFormData({
        ...formData,
        purpose: selectedProposal.purpose,
        approach: selectedProposal.approach,
        outcome: selectedProposal.outcome,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
                  <div>
                    <h3>Submit a Proposal</h3>
                    <div>
                      <label>Proposal Type:</label>
                      <select
                        className="form-control in_bg_tr"
                        value={proposalType}
                        onChange={handleProposalTypeChange}
                      >
                        <option value="">Select a proposal type</option>
                        {proposalTypes.map((type, i) => (
                          <option key={i} value={type.name}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {proposalType && (
                      <>
                        <div>
                          <label>Purpose:</label>
                          <textarea
                            name="purpose"
                            placeholder="Purpose"
                            className="no_border form-control in_bg_tr"
                            value={formData.purpose}
                            readOnly
                          />
                        </div>
                        <div>
                          <label>Approach:</label>
                          <textarea
                            className="no_border form-control in_bg_tr"
                            name="approach"
                            value={formData.approach}
                            readOnly
                          />
                        </div>
                        <div>
                          <label>Outcome:</label>
                          <textarea
                            className="no_border form-control in_bg_tr"
                            name="outcome"
                            value={formData.outcome}
                            readOnly
                          />
                        </div>
                      </>
                    )}
                    <div>
                      <label>Problem:</label>
                      <textarea
                        className="form-control in_bg_tr"
                        name="problem"
                        value={formData.problem}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn_success mt-3"
                      disabled={isSubmitting}
                      onClick={e => console.log(formData)}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

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
