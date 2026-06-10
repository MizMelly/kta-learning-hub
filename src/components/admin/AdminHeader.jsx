import { Search } from "lucide-react";

const AdminHeader = () => {
  return (
    <div className="bg-white border-b px-8 py-5 flex justify-between">

      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search the hub..."
          className="w-[450px] pl-12 pr-5 py-3 border rounded-2xl outline-none"
        />
      </div>

      <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full">
        Demo Mode
      </div>

    </div>
  );
};

export default AdminHeader;