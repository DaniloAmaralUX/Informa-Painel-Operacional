import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MainCard from 'components/MainCard';

export default function DashboardDefault() {
  return (
    <MainCard
      border={false}
      sx={{
        minHeight: 'calc(100vh - 180px)',
        bgcolor: 'background.default',
        boxShadow: 'none'
      }}
    >
      <Stack
        spacing={1}
        sx={{
          minHeight: '100%',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        }}
      >
        <Typography variant="h4">Area de conteudo</Typography>
        <Typography variant="body2" color="text.secondary">
          Estrutura limpa para handoff e evolucao do produto.
        </Typography>
        <Box
          sx={{
            mt: 2,
            width: '100%',
            minHeight: 320,
            borderRadius: 3,
            border: '1px dashed',
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        />
      </Stack>
    </MainCard>
  );
}
