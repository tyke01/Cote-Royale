import Image from "next/image";

export const Navbar = () => {
  return (
    <header>
      <div className="navbar fixed top-0 left-0 z-50 bg-black text-white w-full">
        <div className="flex items-center justify-between p-2 md:p-4">
          <button className="p-2">menu</button>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <Image
              src="/logo.svg"
              alt="Côte Royale Paris"
              width={180}
              height={30}
              className="w-32 md:w-44"
            />
          </div>

          <div className="flex">
            icons
          </div>
        </div>
      </div>
    </header>
  );
};
