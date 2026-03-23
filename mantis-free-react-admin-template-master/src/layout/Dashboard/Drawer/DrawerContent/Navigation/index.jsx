import menuItem from 'menu-items';
import SidebarMenu from './SidebarMenu';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  return <SidebarMenu items={menuItem.items} footerItems={menuItem.footerItems} brand={menuItem.brand} />;
}
