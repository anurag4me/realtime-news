function NavBar() {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between">
      <h1 className="text-2xl font-bold">Real-Time News Feed</h1>
      <div className="flex space-x-4">
        <a
          href="index.html"
          className="px-4 py-2 hover:bg-blue-200 rounded text-white"
        >
          Home
        </a>
        <a
          href="categories.html"
          className="px-4 py-2 hover:bg-blue-200 rounded text-white"
        >
          Categories
        </a>
        <a
          href="about.html"
          className="px-4 py-2 hover:bg-blue-200 rounded text-white"
        >
          About
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
