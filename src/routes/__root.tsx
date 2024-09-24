import * as React from 'react'
import { FC } from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { MenuNav } from '../navigation/menu'
import { HomeOutlined, CoffeeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  icon?: any;
}

export const Route = createRootRoute({
  component: RootComponent,
})
const NavLink: FC<NavLinkProps> = ({ to, children, icon: Icon }) => {
  return (
    <Link
      to={to}
      className="p-2 hover:bg-blue-400/20 rounded-full transition-all duration-500"
      activeProps={{
        className: 'bg-blue-700/20',
      }}
      activeOptions={{ exact: to === '/' }} // Adjust for exact match if needed
    >
      {Icon && <Icon className="px-2"/>}
      {children}
    </Link>
  );
};
function RootComponent() {
  return (
    <> 
      <div className="p-4 flex gap-4 text-lg shadow-md">
        <NavLink to="/" icon={HomeOutlined}>
          Home
        </NavLink>
        <NavLink to="/cafes" icon={CoffeeOutlined}>
          Cafes
        </NavLink>
        <NavLink to="/employees" icon={UsergroupAddOutlined}>
          Employees
        </NavLink>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
