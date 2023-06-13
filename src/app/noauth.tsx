import { Link } from 'react-router-dom';

export default function NoAuth() {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center p-6 gap-2">
      <span className="italic">This page is private, login first</span>
      <Link to={'/'}>
        <button className="bg-blue-700 p-2 rounded text-white">Login</button>
      </Link>
    </div>
  );
}
