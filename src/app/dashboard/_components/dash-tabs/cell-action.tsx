"use client";

// Packages
import { useMutation } from "@tanstack/react-query";
import { BarChart2, EllipsisVertical, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

// Components

import { onDeleteAction } from "@/actions/delete_url";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  id: string;
}

export function CellAction({ id }: Props) {
  const router = useRouter();

  // mutation for deleting a url
  const { mutate, isPending } = useMutation({
    mutationFn: onDeleteAction,
    onSuccess: (res) => {
      if (res.success) {
        router.refresh();
        toast.success(res.success);
        return;
      }

      toast.error(res.error);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // callback function for deleting a url
  const onDelete = useCallback(() => {
    mutate(id);
  }, [id, mutate]);

  const onStaticsClick = () => {
    router.push(`/dashboard/statistics/${id}`);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline">
            <EllipsisVertical className="w-4 h-4 text-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="space-x-2" onClick={onStaticsClick}>
            <BarChart2 size={16} />
            <span>Statistics</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="!text-red-500 hover:bg-red-500/10 focus-visible:text-red-500 focus-visible:bg-red-500/10 focus-visible:border-red-500/10 space-x-2"
            onClick={onDelete}
          >
            {isPending ? (
              <div>
                <svg
                  width="15"
                  height="15"
                  fill="#EF4444"
                  className=" animate-spin text-red-500"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
              </div>
            ) : (
              <TrashIcon size={16} />
            )}
            <span>Delete</span>
          </DropdownMenuItem>
          {/* {items.map(({ icon, name, customStyle }) => (
            <DropdownMenuItem
              key={name}
              className={cn(customStyle, "space-x-2")}
              onClick={onDelete}
            >
              {isPending ? (
                <div>
                  <svg
                    width="15"
                    height="15"
                    fill="#EF4444"
                    className=" animate-spin text-red-500"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                  </svg>
                </div>
              ) : (
                icon
              )}
              <span>{name}</span>
            </DropdownMenuItem>
          ))} */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
