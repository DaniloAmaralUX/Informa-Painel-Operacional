// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project imports
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import Profile from './Profile';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {!downLG && (
        <Box sx={{ flex: 1, minWidth: 0, ml: 1.5, mr: 2 }}>
          <Breadcrumbs
            title={false}
            divider={false}
            icon={false}
            icons={false}
            maxItems={4}
            sx={{
              mb: 0,
              bgcolor: 'transparent',
              '& .MuiCard-root': {
                bgcolor: 'transparent'
              }
            }}
          />
        </Box>
      )}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
