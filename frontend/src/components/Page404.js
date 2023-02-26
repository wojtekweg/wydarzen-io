import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-3xl">Page not found :(</h1>
        <h1>
          <button
            type="button"
            className="text-xl"
            style={{ width: "50%", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          >
            Go back ↩
          </button>
        </h1>
      </div>
    </section>
  );
};

export { Page404 };
