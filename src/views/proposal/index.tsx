import { Link, RouteComponentProps } from '@reach/router';
import { Helmet } from 'react-helmet';
import AppWrapper from 'views/components/app-wrapper';
import AppMenu from 'views/components/app-menu';
import { useEffect, useState } from 'react';
import DashboardContent from 'views/components/app-content/DashboardContent';
import { Card, CardContent } from '@mui/material';
const proposalTypes = [
  [
    'Strategic Proposal',
    'Outlining strategic objectives and goals for an organization or initiative',
    'Analyzing current environment, identifying challenges and opportunities, proposing solutions aligned with objectives',
    'A strategic roadmap with clear action steps for implementation',
  ],
  [
    'Resource Proposal',
    'Requesting resources (financial, human, or material) to achieve a specific objective',
    'Justifying the need for resources, outlining allocation and utilization, demonstrating return on investment',
    'An allocation plan detailing resource use and a strategy for maximizing impact',
  ],
  [
    'Innovation Proposal',
    'Introducing new ideas, technologies, or methodologies to address a challenge',
    'Presenting innovative concepts with clear explanation of potential impact and feasibility',
    'A well-defined implementation plan for the innovative solution, outlining steps to realize it',
  ],
  [
    'Impact Proposal',
    'Addressing specific societal, environmental, or economic impact',
    'Assessing current situation, identifying root causes, presenting evidence-based interventions',
    'Measurable impact metrics tracking progress and a framework for evaluating effectiveness',
  ],
  [
    'Collaboration Proposal',
    'Seeking partnerships or collaborations with other organizations',
    'Identifying organizations with complementary strengths and interests, outlining potential benefits for each collaborator',
    'A well-defined collaboration framework with roles, responsibilities, and communication channels',
  ],
  [
    'Development Proposal',
    'Proposing a new development project or initiative for positive change',
    'Defining project scope, objectives, deliverables, outlining project management plan, identifying stakeholders',
    'A comprehensive development plan with clear milestones and a timeline for completion',
  ],
  [
    'Policy Proposal',
    'Advocating for policy changes or reforms to address an issue',
    'Analyzing policy issue, impact on stakeholders, proposing specific legislative solutions with supporting evidence',
    'Clearly defined policy recommendations and a comprehensive advocacy strategy',
  ],
  [
    'Capacity Building Proposal',
    'Strengthening capacity of an organization, community, or individual',
    'Assessing capabilities and resources, identifying areas for improvement, proposing capacity-building activities',
    'A capacity-building plan addressing weaknesses and a long-term sustainability strategy',
  ],
  [
    'Quality Improvement Proposal',
    'Enhancing quality of a product, service, or process',
    'Identifying areas needing improvement, analyzing root causes, proposing solutions and improvement measures',
    'A quality improvement plan with metrics for tracking progress and ongoing evaluation',
  ],
  [
    'Communication Proposal',
    "Improving an organization's or initiative's stakeholder communication",
    'Assessing communication needs and methods, identifying target audiences and channels, proposing effective solutions',
    'A comprehensive communication plan outlining strategies to enhance engagement',
  ],
  [
    'Evaluation Proposal',
    'Conducting a rigorous evaluation of a program, project, or initiative',
    'Designing evaluation methodology with data collection techniques, KPIs, and timeline',
    'A thorough evaluation report with findings, recommendations, and an action plan',
  ],
  [
    'Training and Development Proposal',
    'Providing training and professional development to improve skills and knowledge',
    'Identifying training needs, designing curriculum, outlining delivery plan',
    'A well-defined training program with clear learning objectives, delivery plan, and evaluation',
  ],
];

const Proposal = (props: RouteComponentProps) => {
  const [proposalType, setProposalType] = useState('');
  const [formData, setFormData] = useState  ({
    problem: '',
    solution: '',
    targetAudience: '',
    qualifications: '',
    approach: '',
    timeline: '',
    budget: '',
    callToAction: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProposalTypeChange = (e:any) => {
    const selectedType = e.target.value;
    setProposalType(selectedType);
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
                  <form>
                    <h3>Submit a Proposal</h3>
                    <div>
                      <label>Proposal Type:</label>
                      <select
                        onChange={handleProposalTypeChange}
                        className="form-control in_bg_tr"
                        value={proposalType}
                      >
                        <option value="">Select a proposal type</option>
                        {proposalTypes.map(type => (
                          <option key={type[0]} value={type[0]}>
                            {type[0]}
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
                            className="form-control in_bg_tr"
                          />
                        </div>
                        <div>
                          <label>Approach:</label>
                          <textarea
                            className="form-control in_bg_tr"
                            name="approach"
                            readOnly
                          />
                        </div>
                        <div>
                          <label>Outcome:</label>
                          <textarea
                            className="form-control in_bg_tr"
                            name="outcome"
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
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <h3>Proposal</h3>
          </div>
        </DashboardContent>
      </AppWrapper>
    </>
  );
};

export default Proposal;
