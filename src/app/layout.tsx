import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="h-screen w-screen">
      <div className=" flex justify-between items-center px-6 py-4">
        <Link to={'/'}>
          <div className="italic font-bold font-serif">Apotek Online</div>
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex items-center justify-between gap-6">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Product</Link>
            </li>
            <li>
              <Link to="/setting">Setting</Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col border gap-[2px] lg:hidden">
          <div className="bg-black h-[2px] w-4" />
          <div className="bg-black h-[2px] w-4" />
          <div className="bg-black h-[2px] w-4" />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
