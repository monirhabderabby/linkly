import CreateUrlDialog from "@/components/ui/create-url-dialog";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { LucideIcon } from "lucide-react";
import History from "./_components/dash-tabs/history/history";

export type tabsProps = {
  id: number;
  icon: LucideIcon;
  text: string;
};

const Dashboard = async () => {
  const user = await currentUser();

  const urls = await prisma.urls.findMany({
    where: {
      userId: user?.id,
    },
  });

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
      <History urls={urls} />
    </div>
  );
};

export default Dashboard;
