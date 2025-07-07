import PersonalInfo from "components/Content/Blocks/Profile/Settings/PersonalInfo";
import TabPanel from "./TabPanel";
import ChangePassword from "components/Content/Blocks/Profile/Settings/ChangePassword";
import DeleteAccount from "components/Content/Blocks/Profile/Settings/DeleteAccount";

type TabContentProps = {
  value: number;
};

const TabContent: React.FC<TabContentProps> = ({ value }) => {
  return (
    <>
      <TabPanel value={value} index={0}>
        <PersonalInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChangePassword />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DeleteAccount />
      </TabPanel>
    </>
  );
};

export default TabContent;
