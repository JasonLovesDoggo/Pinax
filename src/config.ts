enum Colors {    primary = "primary",    secondary = "secondary",    accent = "accent",    default = "default"}interface NavItem {    name: string    href: string    color: Colors}export const nav: NavItem[] =    [        {            name: "Home",            href: "/",            color: Colors.primary        },        {            name: "About",            href: "/about",            color: Colors.secondary        },        {            name: "Contact",            href: "Eee",            color: Colors.accent        }    ]export default navexport const drawerItems = {}