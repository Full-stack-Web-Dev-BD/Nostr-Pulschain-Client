import React from 'react';
import { useLocation } from '@reach/router';
import { useAtom } from 'jotai';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import useTranslation from 'hooks/use-translation';
import useLiveChannels from 'hooks/use-live-channels';
import useLivePublicMessages from 'hooks/use-live-public-messages';
import ChannelAddMenu from 'views/components/app-menu/channel-add-menu';
import ListItem from 'views/components/app-menu/list-item';
import { channelAtom, keysAtom, readMarkMapAtom } from 'atoms';
import { CiFileOff } from 'react-icons/ci';
import { Channel } from 'types';

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
        ""
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

const ChannelList = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const channels = useLiveChannels();

  return (
    <>
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
          <h3>{t('Proposal History')}</h3>
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
          console.log('all channel ', channels);
          return channels.map(c => <ChannelListItem key={c.id} c={c} />);
        }
      })()}
    </>
  );
};

export default ChannelList;