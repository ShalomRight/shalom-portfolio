// Flat nav — no dropdowns, no mega menus.
// Each item is a direct link. Used by HeaderMenus and MobileMenus.

export interface INavItem {
  id:    number;
  title: string;
  link:  string;
}

const menu_data: INavItem[] = [
  { id: 1, title: "Home",     link: "/"         },
  { id: 2, title: "Work",     link: "/work"      },
  { id: 3, title: "Services", link: "/service"   },
  { id: 4, title: "About",    link: "/about-me"  },
  { id: 5, title: "Contact",  link: "/contact"   },
];

export default menu_data;

export const mobile_menu_data: INavItem[] = [
  { id: 1, title: "Home",     link: "/"         },
  { id: 2, title: "Work",     link: "/work"      },
  { id: 3, title: "Services", link: "/service"   },
  { id: 4, title: "About",    link: "/about-me"  },
  { id: 5, title: "Contact",  link: "/contact"   },
];
