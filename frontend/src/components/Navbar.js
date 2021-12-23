import { MenuButtons } from "./MenuButtons";

const Navbar = (props) => {
  return (
    <div className="px-auto">
      <div width="100%" height="5%">
        <h1 className="text-3xl font-bold underline">
          <a href="/">wydarzen.io</a>
        </h1>
      </div>
      <MenuButtons />
    </div>
  );
};

export { Navbar };
