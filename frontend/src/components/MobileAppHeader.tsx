import { Zap } from "lucide-react";

const MobileAppHeader = () => {
  return (
    <header className="bg-white border lg:hidden border-neutral-200/20 rounded-lg p-4 mb-6">
      <div className="flex  justify-between items-center">
        <h1 className="text-2xl font-bold flex mx-auto items-center text-primary">
          <Zap className="mr-3 " />
          Zappy
        </h1>
      </div>
    </header>
  );
};
export default MobileAppHeader;
