import Link from "next/link";

const Navbar = () => {

  return (
    <nav className="bg-gray-50 p-8 fixed bottom-0 w-full flex justify-between rounded-lg">
      <div>
        <Link href="/home">Home</Link>
      </div>
      <div>
        <Link href='/history'>EcoDex</Link>
      </div>
      <div>
        <Link href='/camera'>Camera</Link>
      </div>
      <div>
        <Link href='/profile'>Profile</Link>
      </div>
      <div>
        <Link href='/redeem'>Redeem</Link>
      </div>
    </nav>
  );
};

export default Navbar;