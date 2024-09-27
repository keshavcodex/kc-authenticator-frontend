import { Box, Typography } from '@mui/material';

export const MessageList = ({ messages, icon: Icon, color }: { messages: string[]; icon: any; color: string }) => (
  <>
    {messages.map((text, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          color,
          justifyContent: 'start',
          mb: 1,
        }}
      >
        <Icon fontSize="small" />
        <Typography sx={{ pl: 0.5 }}>{text}</Typography>
      </Box>
    ))}
  </>
);
