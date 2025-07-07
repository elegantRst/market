import { Route, Routes } from "react-router-dom";
import styles from "./Profile.module.scss";
import { ProfileRoutesType } from "pages/ProfilePage";
import TopPrice from "components/Content/Elements/Tables/TopPrice/TopPrice";

interface WorkspaceProps {
  profileRoutes: ProfileRoutesType[];
}

const Workspace: React.FC<WorkspaceProps> = ({ profileRoutes }) => {
  return (
    <div className={styles.workspace}>
      <Routes>
        <Route path="/" element={<TopPrice />}></Route>
        {profileRoutes.map((item, index) => (
          <Route path={item.path} element={item.element} key={index}></Route>
        ))}
      </Routes>
    </div>
  );
};

export default Workspace;
