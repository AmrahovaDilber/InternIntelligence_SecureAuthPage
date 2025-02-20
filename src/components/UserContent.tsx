import TaskManagement from "./TaskManagement";
import UserProfile from "./UserProfile";

const UserContent: React.FC<{ selectedTab: string }> = ({ selectedTab }) => {
  return (
    <div>
      {selectedTab === "View Profile" ? (
        <UserProfile></UserProfile>
      ) : (
        <TaskManagement></TaskManagement>
      )}
    </div>
  );
};

export default UserContent;
