import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4">
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
      <div className="fixed top-[56px]">
        <Outlet />
      </div>
    </div>
  );
}
