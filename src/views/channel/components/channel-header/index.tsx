import { useAtom } from 'jotai';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import ChannelMenu from 'views/channel/components/channel-header/channel-menu';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AppContentHeaderBase from 'views/components/app-content-header-base';
import useStyle from 'hooks/use-styles';
import { channelAtom, keysAtom, ravenAtom } from 'atoms';
import { votingPeriod } from 'util/constant';
import {
  isTimeRemaining,
  registerDataOnChain,
  separateByAgreement,
} from 'util/function';

import CountdownButton from './CountDownButton';

const ChannelHeader = () => {
  const [keys] = useAtom(keysAtom);
  const [channel] = useAtom(channelAtom);
  const [raven] = useAtom(ravenAtom);
  const theme = useTheme();
  const styles = useStyle();

  if (!channel || !keys) {
    return null;
  }

  const hasPicture = channel.picture.startsWith('https://');

  const doVote = (agree: any) => {
    // Parse the channel's about information
    console.log(channel.about);
    const about = JSON.parse(channel.about);

    // Find the existing vote entry for the current user (keys.pub)
    const existingVoteIndex = about.voting.findIndex(
      (vote: { voter: string }) => vote.voter === keys.pub
    );

    if (existingVoteIndex !== -1) {
      // User has already voted, so replace the existing entry
      about.voting[existingVoteIndex] = { voter: keys.pub, agree };
    } else {
      // User has not voted yet, so push a new entry
      about.voting.push({ voter: keys.pub, agree });
    }
    var metadata = {
      name: channel.name,
      about: JSON.stringify(about),
      picture: channel.picture,
    };
    raven?.voteOnProposal(channel, metadata);
    toast.success('Your vote has been submitted for this Proposal');
  };
  const uploadOnchain = async () => {
    toast.info('Proposal Data syncing with OnChain');
    await registerDataOnChain(keys.priv, JSON.stringify({...channel, about:''}), '');
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <AppContentHeaderBase>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <div className="">
            <div>
              {channel.about && (
                <div className="flex_2s">
                  <div>
                    <div style={{display:'flex',gap:'10px', alignItems:'center'}}>
                      {hasPicture && (
                        <Box
                          sx={{
                            display: 'flex',
                            mr: '10px',
                            flexShrink: 0,
                          }}
                        >
                          <Box
                            component="img"
                            sx={{
                              width: '50px',
                              height: '50px',
                              borderRadius: theme.shape.borderRadius,
                            }}
                            src={channel.picture}
                            alt={channel.name}
                          />
                        </Box>
                      )}
                      <Box
                        sx={{
                          fontFamily: 'Faktum, sans-serif',
                          ...styles.ellipsis,
                        }}
                      >
                        {channel.name}
                      </Box>
                    </div>
                    <Box
                      sx={{
                        color: theme.palette.primary.dark,
                        fontSize: '96%',
                        ...styles.ellipsis,
                      }}
                    >
                      <p style={{ margin: '0' }}>
                        <span> Purpose: </span>{' '}
                        {JSON.parse(channel.about).purpose}
                      </p>
                      <p style={{ margin: '0' }}>
                        <span> Approach: </span>{' '}
                        {JSON.parse(channel.about).approach}
                      </p>
                      <p style={{ margin: '0' }}>
                        <span> Outcome: </span>{' '}
                        {JSON.parse(channel.about).outcome}
                      </p>
                      <p style={{ margin: '0' }}>
                        <span> Problem: </span>{' '}
                        {JSON.parse(channel.about).problem}
                      </p>
                    </Box>
                  </div>
                  <Box
                    sx={{
                      width: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ChannelMenu />
                  </Box>
                </div>
              )}
            </div>
            {/* <ProposalDetails proposal={channel} /> */}
          </div>
          {!isTimeRemaining(channel.created, votingPeriod) ? (
            <div className="flex_2s mt-3">
              <Box
                sx={{
                  color: theme.palette.primary.dark,
                  fontSize: '96%',
                  ...styles.ellipsis,
                }}
              >
                <span
                  className="text_success bold_m"
                  onClick={e => console.log(JSON.parse(channel.about))}
                >
                  Voting On Progress
                </span>
              </Box>
              <Box
                sx={{
                  color: theme.palette.primary.dark,
                  fontSize: '96%',
                  ...styles.ellipsis,
                }}
              >
                <span>
                  <CountdownButton
                    additionalDays={votingPeriod}
                    createdAt={channel.created}
                  />
                </span>
              </Box>
            </div>
          ) : (
            <div className="flex_2s mt-3">
              <Box
                sx={{
                  color: theme.palette.primary.dark,
                  fontSize: '96%',
                  ...styles.ellipsis,
                }}
              >
                <span
                  className="text_success bold_m"
                  onClick={e => console.log(JSON.parse(channel.about))}
                >
                  Result initialized
                </span>
              </Box>
              <div
                style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}
              >
                {/* Vote Result */}
                <Box
                  sx={{
                    color: theme.palette.primary.dark,
                    fontSize: '96%',
                    ...styles.ellipsis,
                  }}
                >
                  <span>
                    {separateByAgreement(JSON.parse(channel.about).voting)
                      .agreed.length >
                    separateByAgreement(JSON.parse(channel.about).voting)
                      .nonAgreed.length ? (
                      <button className="btn btn_success">
                        Success
                        <span className="ml-2">
                          <FaHeart />
                        </span>
                      </button>
                    ) : (
                      <button className="btn btn_success">
                        Proposal Failed
                        <span className="ml-2">
                          <FaHeartBroken />
                        </span>
                      </button>
                    )}
                  </span>
                </Box>
                {/* Vote Down */}
                {channel.creator == keys.pub ? (
                  <Box
                    sx={{
                      color: theme.palette.primary.dark,
                      fontSize: '96%',
                      ...styles.ellipsis,
                    }}
                  >
                    <span>
                      <button
                        className="btn btn_primary"
                        onClick={e => uploadOnchain()}
                      >
                        Sync Proposal With OnChain
                      </button>
                    </span>
                  </Box>
                ) : (
                  ''
                )}
              </div>
            </div>
          )}

          {!isTimeRemaining(channel.created, votingPeriod) ? (
            <div className="flex_2s mt-2 ">
              <Box
                sx={{
                  color: theme.palette.primary.dark,
                  fontSize: '96%',
                  ...styles.ellipsis,
                }}
              >
                <span className="text_success bold_m"> Received Vote </span>
              </Box>
              <div
                style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}
              >
                {/* Vote Up */}
                <Box
                  sx={{
                    color: theme.palette.primary.dark,
                    fontSize: '96%',
                    ...styles.ellipsis,
                  }}
                >
                  <span>
                    {/* {`${hasAgreed(JSON.parse(channel.about).voting , keys.pub) }`} */}
                    <button
                      className="btn btn_success"
                      onClick={e => doVote(true)}
                    >
                      {
                        separateByAgreement(JSON.parse(channel.about).voting)
                          .agreed.length
                      }
                      <span className="ml-2">
                        <FaHeart />
                      </span>
                    </button>
                  </span>
                </Box>
                {/* Vote Down */}
                <Box
                  sx={{
                    color: theme.palette.primary.dark,
                    fontSize: '96%',
                    ...styles.ellipsis,
                  }}
                >
                  <span>
                    <button
                      className="btn btn_primary"
                      onClick={e => doVote(false)}
                    >
                      {
                        separateByAgreement(JSON.parse(channel.about).voting)
                          .nonAgreed.length
                      }

                      <span className="ml-2">
                        <FaHeartBroken />
                      </span>
                    </button>
                  </span>
                </Box>
              </div>
            </div>
          ) : (
            <div className="flex_2s mt-2 ">
              <Box
                sx={{
                  color: theme.palette.primary.dark,
                  fontSize: '96%',
                  ...styles.ellipsis,
                }}
              >
                <span className="text_success bold_m">
                  Received Vote [Done]
                </span>
              </Box>
              <div
                style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}
              >
                {/* Vote Up */}
                <Box
                  sx={{
                    color: theme.palette.primary.dark,
                    fontSize: '96%',
                    ...styles.ellipsis,
                  }}
                >
                  <span>
                    {/* {`${hasAgreed(JSON.parse(channel.about).voting , keys.pub) }`} */}
                    <button
                      className="btn btn_success"
                      // onClick={e => doVote(true)}
                    >
                      {
                        separateByAgreement(JSON.parse(channel.about).voting)
                          .agreed.length
                      }
                      <span className="ml-2">
                        <FaHeart />
                      </span>
                    </button>
                  </span>
                </Box>
                {/* Vote Down */}
                <Box
                  sx={{
                    color: theme.palette.primary.dark,
                    fontSize: '96%',
                    ...styles.ellipsis,
                  }}
                >
                  <span>
                    <button
                      className="btn btn_primary"
                      // onClick={e => doVote(false)}
                    >
                      {
                        separateByAgreement(JSON.parse(channel.about).voting)
                          .nonAgreed.length
                      }

                      <span className="ml-2">
                        <FaHeartBroken />
                      </span>
                    </button>
                  </span>
                </Box>
              </div>
            </div>
          )}
        </Box>
      </AppContentHeaderBase>
    </div>
  );
};

export default ChannelHeader;
