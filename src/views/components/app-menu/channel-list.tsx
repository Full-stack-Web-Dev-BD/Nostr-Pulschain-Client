import React, { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import { useAtom } from 'jotai';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import useTranslation from 'hooks/use-translation';
import useLiveChannels from 'hooks/use-live-channels';
import useLivePublicMessages from 'hooks/use-live-public-messages';
import ChannelAddMenu from 'views/components/app-menu/channel-add-menu';
import ListItem from 'views/components/app-menu/list-item';
import { channelAtom, keysAtom, ravenAtom, readMarkMapAtom } from 'atoms';
import { CiFileOff } from 'react-icons/ci';
import { Channel } from 'types';
import { PROPOSAL_TYPES, proposalTypes, votingPeriod } from 'util/constant';
import { isTimeRemaining } from 'util/function';

import FilterProposalDropdown from './FilterProposalDropdown';


const ChannelListItem = (props: { c: Channel }) => {
  const { c } = props;

  const location = useLocation();
  const messages = useLivePublicMessages(c.id);
  const [readMarkMap] = useAtom(readMarkMapAtom);
  const [channel] = useAtom(channelAtom);
  const [keys] = useAtom(keysAtom);

  const lMessage = messages[messages.length - 1];
  const hasUnread =
    keys?.priv !== 'none' &&
    !!(readMarkMap[c.id] && lMessage && lMessage.created > readMarkMap[c.id]);

  const isSelected =
    c.id === channel?.id && location.pathname.startsWith('/channel/');

  return (
    <>
      {c.id ==
      'f412192fdc846952c75058e911d37a7392aa7fd2e727330f4344badc92fb8a22' ? (
        ''
      ) : (
        <ListItem
          key={c.id}
          label={c.name}
          href={`/channel/${c.id}`}
          selected={isSelected}
          hasUnread={hasUnread}
        />
      )}
    </>
  );
};

const AllProposalChannelListItem = (props: { c: any }) => {
  const { c } = props;

  const location = useLocation();
  const messages = useLivePublicMessages(c.id);
  const [readMarkMap] = useAtom(readMarkMapAtom);
  const [channel] = useAtom(channelAtom);
  const [keys] = useAtom(keysAtom);

  const lMessage = messages[messages.length - 1];
  const hasUnread =
    keys?.priv !== 'none' &&
    !!(readMarkMap[c.id] && lMessage && lMessage.created > readMarkMap[c.id]);

  const isSelected =
    c.id === channel?.id && location.pathname.startsWith('/channel/');

  return (
    <>
      {c.id ==
      'f412192fdc846952c75058e911d37a7392aa7fd2e727330f4344badc92fb8a22' ? (
        ''
      ) : (
        <div>
          <ListItem
            key={c.id}
            label={JSON.parse(c.content).name}
            href={`/channel/${
              JSON.parse(JSON.parse(c.content).about).proposalID
            }`}
            selected={isSelected}
            hasUnread={hasUnread}
          />
        </div>
      )}
    </>
  );
};

const ChannelList = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const channels = useLiveChannels();
  const [raven] = useAtom(ravenAtom);
  const [allProposal, setAllProposal] = useState<any>([]);
  const [fetchedAllProposal, setFetchedAllProposal] = useState<any>([]);
  const [filterType, setfilterType] = useState(PROPOSAL_TYPES.all);

  useEffect(() => {
    const init = async () => {
      const allProposal = await raven?.fetchAllProposal();
      console.log("allprops", allProposal)
      setFetchedAllProposal(allProposal)
      if (filterType == PROPOSAL_TYPES.all) {
        setAllProposal(allProposal);
      } else {
        filterProposalsByTime();
      }
    };
    init();
  }, []);

  useEffect(() => {
    console.log(filterType)
    const init = async () => { 
        filterProposalsByTime();
    };
    init();
  }, [filterType]);

  function filterProposalsByTime(  ) {
    let filteredProposals = [];
    if (filterType === PROPOSAL_TYPES.active) {
      filteredProposals = fetchedAllProposal.filter((proposal: any) => {
        console.log(proposal.created_at, votingPeriod)
        return isTimeRemaining(proposal.created_at , votingPeriod);
      });
    } else if (filterType === PROPOSAL_TYPES.expired) {
      filteredProposals = fetchedAllProposal.filter((proposal: any) => {
        return !isTimeRemaining(proposal.created_at, votingPeriod);
      });
    } else if (filterType === PROPOSAL_TYPES.all) {
      filteredProposals = fetchedAllProposal;
    }

    setAllProposal(filteredProposals);
  }
  return (
    <>
      <div>
        <Box
          sx={{
            mt: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              fontFamily: 'Faktum, sans-serif',
              fontWeight: 'bold',
              color: theme.palette.primary.dark,
            }}
          >
            <h3 onClick={async e => console.log('p...', channels)}>
              {t('Proposal History')}
            </h3>
          </Box>
          <ChannelAddMenu />
        </Box>
        <hr />
        {(() => {
          if (channels.length === 1) {
            return (
              <Box
                component="span"
                sx={{
                  color: theme.palette.primary.dark,
                  fontSize: '85%',
                  opacity: '0.6',
                }}
              >
                <h4 className="text-center">
                  {t('No Proposal Finded')} <CiFileOff />
                </h4>
              </Box>
            );
          } else {
            return channels.map(c => <ChannelListItem key={c.id} c={c} />);
          }
        })()}
      </div>

      <div>
        <Box
          sx={{
            mt: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              fontFamily: 'Faktum, sans-serif',
              fontWeight: 'bold',
              color: theme.palette.primary.dark,
            }}
          >
            <h3 onClick={e => console.log(allProposal)}>
              {t(`${filterType} Proposal `)}
            </h3>
          </Box>
          <FilterProposalDropdown proposalTypeSetter={setfilterType} />
        </Box>

        {(() => {
          if (allProposal.length === 0) {
            return (
              <Box
                component="span"
                sx={{
                  color: theme.palette.primary.dark,
                  fontSize: '85%',
                  opacity: '0.6',
                }}
              >
                <h4 className="text-center">
                  {t('No Proposal Finded')} <CiFileOff />
                </h4>
              </Box>
            );
          } else {
            return allProposal.map((c: any) => (
              <>
                {/* {console.log(JSON.parse(JSON.parse(c.content).about).proposalID)} */}
                <AllProposalChannelListItem key={c.id} c={c} />
              </>
            ));
          }
        })()}
      </div>
    </>
  );
};

export default ChannelList;
