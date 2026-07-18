import useAuth  from "../../hooks/useAuth";

import DonorSidebar from "../donor/DonorSidebar";
import RecipientSidebar from "../recipient/RecipientSidebar";

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === "donor"
    ? <DonorSidebar />
    : <RecipientSidebar />;
};

export default Sidebar;