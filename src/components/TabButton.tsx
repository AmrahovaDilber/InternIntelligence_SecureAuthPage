interface TabsProps {
  setSelectedTab: (tab: string) => void;
  children: string;
  isActive: boolean
}

const TabButton: React.FC<TabsProps> = ({setSelectedTab,children,isActive}) => {
  return (
    <button
      onClick={() => setSelectedTab(children)}
      className={`px-4 py-2 rounded-lg ${
        isActive ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-700"
      }`}
    >
      {children}
    </button>
  );
};

export default TabButton;
