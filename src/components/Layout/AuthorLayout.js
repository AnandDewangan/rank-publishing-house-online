import Header from "./Header";
import Footer from "./Footer";
import "../../App.css";

const AuthorLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default AuthorLayout;
