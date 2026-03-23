// project imports
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  return (
    <SimpleBar
      sx={{
        maxHeight: 'calc(100vh - 76px)',
        '& .simplebar-content': {
          minHeight: 'calc(100vh - 76px)',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
        <Navigation />
    </SimpleBar>
  );
}
