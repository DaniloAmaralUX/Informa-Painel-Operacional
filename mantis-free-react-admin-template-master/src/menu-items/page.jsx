// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'pages',
  title: 'Access',
  type: 'group',
  children: [
    {
      id: 'auth-flow',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.LoginOutlined,
      children: [
        {
          id: 'login1',
          title: 'Login',
          type: 'item',
          url: '/login',
          icon: icons.LoginOutlined,
          target: true
        },
        {
          id: 'register1',
          title: 'Register',
          type: 'item',
          url: '/register',
          icon: icons.ProfileOutlined,
          target: true
        }
      ]
    }
  ]
};

export default pages;
