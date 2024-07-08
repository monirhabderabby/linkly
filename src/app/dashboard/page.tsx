import CreateUrlDialog from "@/components/ui/create-url-dialog";
import { currentUser } from "@clerk/nextjs/server";

const Dashboard = async () => {
  const user = await currentUser();
  return (
    <div className=" ">
      <div className="border-b border-t bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold">Hello, {user?.firstName}! 🤚</p>
          <div className="flex items-center gap-3">
            <CreateUrlDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
