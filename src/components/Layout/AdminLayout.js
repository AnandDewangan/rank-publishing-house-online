import AdminHeader from "./AdminHeader";
import Footer from "./Footer";

const AdminLayout = ({ children }) => (
  <>
    <AdminHeader />
    <main>{children}</main>
    <Footer />
  </>
);

export default AdminLayout;
