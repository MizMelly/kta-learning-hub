import { Search, Menu } from "lucide-react";

interface AdminHeaderProps {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminHeader = ({ setIsOpen }: AdminHeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen?.(true)}
            className="lg:hidden"
          >
            <Menu size={24} />
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search the hub..."
              className="
                w-full
                h-11
                rounded-2xl
                border
                border-border
                bg-background
                pl-11
                pr-4
                outline-none
                focus:ring-2
                focus:ring-ring
              "
            />
          </div>
        </div>

        {/* Demo Mode */}
        <div className="shrink-0 rounded-full bg-green-100 px-3 py-2 text-sm font-medium text-green-700">
          Demo Mode
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;