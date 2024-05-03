import { useAtom } from 'jotai';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import ChannelMenu from 'views/channel/components/channel-header/channel-menu';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

import AppContentHeaderBase from 'views/components/app-content-header-base';
import useStyle from 'hooks/use-styles';
import { channelAtom, keysAtom } from 'atoms';
import CountdownButton from './CountDownButton';

const ChannelHeader = () => {
  const [keys] = useAtom(keysAtom);
  const [channel] = useAtom(channelAtom);
  const theme = useTheme();
  const styles = useStyle();

  if (!channel || !keys) {
    return null;
  }

  const hasPicture = channel.picture.startsWith('https://');

  return (
    <div style={{ padding: '40px 0' }}>
      <AppContentHeaderBase>
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
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <div className='flex_2s'>
            <div>
              <Box
                sx={{
                  fontFamily: 'Faktum, sans-serif',
                  ...styles.ellipsis,
                }}
              >
                {channel.name}
              </Box>
              {channel.about && (
                <Box
                  sx={{
                    color: theme.palette.primary.dark,
                    fontSize: '96%',
                    ...styles.ellipsis,
                  }}
                >
                  <span> Purpose: </span> {JSON.parse(channel.about).purpose}
                </Box>
              )}
            </div>
            <button className="btn btn_success" style={{height:'40px'}}>Proposal  Details</button>
          </div>
          <div className="flex_2s mt-3">
            <Box
              sx={{
                color: theme.palette.primary.dark,
                fontSize: '96%',
                ...styles.ellipsis,
              }}
            >
              <span  className="text_success bold_m"> Voting On Progress </span>
            </Box>
            <Box
              sx={{
                color: theme.palette.primary.dark,
                fontSize: '96%',
                ...styles.ellipsis,
              }}
            >
              <span>
              <CountdownButton additionalDays={3} createdAt={channel.created} />
              </span>
            </Box>
          </div>

          <div className="flex_2s mt-3">
            <Box
              sx={{
                color: theme.palette.primary.dark,
                fontSize: '96%',
                ...styles.ellipsis,
              }}
            >
              <span className="text_success bold_m"> Received Vote </span>
            </Box>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <Box
                sx={{
                  color: theme.palette.primary.dark,
                  fontSize: '96%',
                  ...styles.ellipsis,
                }}
              >
                <span>
                  <button className="btn btn_success">
                    234
                    <span className='ml-2'>
                      <FaHeart />
                    </span>
                  </button>
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
                  <button className="btn btn_primary">
                    234
                    <span className='ml-2'>
                      <FaHeartBroken />
                    </span>
                  </button>
                </span>
              </Box>
            </div>
          </div>
        </Box>
      </AppContentHeaderBase>
    </div>
  );
};

export default ChannelHeader;
