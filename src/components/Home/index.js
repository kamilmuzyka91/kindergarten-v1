import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import { withAuthorization } from "../Session";

import Navigation from "../Navigation";
import zabawy from "../../Assets/zabawy.jpg";
import piosenki from "../../Assets/piosenki.jpg";
import zadania from "../../Assets/zadania.jpg";
import czytanki from "../../Assets/czytanki.jpg";

const HomePage = () => (
  <>
    <Navigation />
    <div className="home ">
      <section className="lerning ">
        <article className="lerning_tiles">
          <h1 className="tiles_title">Zabawy</h1>
          <Link to={ROUTES.ACCOUNT}>
            <img className="tiles_logo" src={zabawy} alt="Akacjowe zabawy" />
          </Link>
        </article>
        <article className="lerning_tiles">
          <h1 className="tiles_title">Piosenki</h1>
          <Link to={ROUTES.ACCOUNT}>
            <img className="tiles_logo" src={piosenki} alt="Akacjowe piosenki" />
          </Link>
        </article>
        <article className="lerning_tiles">
          <h1 className="tiles_title">Zadania</h1>
          <Link to={ROUTES.ACCOUNT}>
            <img className="tiles_logo" src={zadania} alt="Akacjowe zadania" />
          </Link>
        </article>
        <article className="lerning_tiles">
          <h1 className="tiles_title">Czytanki</h1>
          <Link to={ROUTES.ACCOUNT}>
            <img className="tiles_logo" src={czytanki} alt="Akacjowe czytanki" />
          </Link>
        </article>
      </section>
    </div>
  </>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
