"use client";

import { createShortlink } from "@/actions/create_url";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isShortLinksExists } from "@/helper/isShortLinkExists";
import { createUrlSchema, createUrlSchemaType } from "@/schema/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { BadgeCheckIcon, CircleXIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { QRCode } from "react-qrcode-logo";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
import { Card } from "./card";
import { Form, FormDescription, FormField, FormItem } from "./form";
import { Input } from "./input";

const CreateUrlDialog = () => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, startShortLinkChecking] = useTransition();
  const [open, setOpen] = useState<true | false>(false);

  const router = useRouter();

  const form = useForm<createUrlSchemaType>({
    resolver: zodResolver(createUrlSchema),
    defaultValues: {
      name: "",
      original_url: "",
      short_url: "",
    },
  });

  // Use useCallback to ensure debounce function is stable
  const debouncedOnShortLinkCheck = useCallback(
    debounce((value: string) => {
      form.clearErrors("short_url");
      onShortLinkCheck(value);
    }, 500), // Adjust the delay (in milliseconds) as needed
    []
  );

  const onShortLinkCheck = async (text: string) => {
    startShortLinkChecking(() => {
      isShortLinksExists(text).then((res) => {
        if (res) {
          form.setError("short_url", {
            message: "Shortlink already exists",
          });
        } else {
          form.clearErrors("short_url");
        }
      });
    });
  };

  const onSubmit = (values: createUrlSchemaType) => {
    startTransition(() => {
      createShortlink(values)
        .then((res) => {
          if (res.error) {
            toast.error(res.error);
            return;
          } else {
            toast.success(res.success);
            router.refresh();
            form.reset();
            setOpen((prev) => !prev);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            Create New{" "}
            <span className="gradient font-extrabold">Short links :)</span>
          </DialogTitle>
          <DialogDescription>
            Create a new short link by entering your desired URL below. Click
            'Save' to generate your shortened link.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Input {...field} placeholder="Title" />
                  <FormDescription>
                    This is your short link's title (required).
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="original_url"
              render={({ field }) => (
                <FormItem>
                  <Input {...field} placeholder="Original Url" />

                  <FormDescription>
                    This is your original url (required).
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="short_url"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-x-2">
                    <Card className="h-10 text-xs px-2 flex items-center">
                      linkly.vercel.app
                    </Card>
                    /
                    <div className="relative w-full">
                      <Input
                        onChange={(e) => {
                          form.setValue("short_url", e.target.value);
                          debouncedOnShortLinkCheck(e.target.value as string);
                        }}
                        placeholder="Short Url (optional)"
                      />
                      {form.formState.errors.short_url ? (
                        <div
                          id="closeIcon"
                          className="absolute   right-0 top-0 p-2"
                        >
                          <CircleXIcon className="text-red-400 " />
                        </div>
                      ) : isLoading ? (
                        <div className="absolute right-0 top-0 p-2">
                          <svg
                            width="20"
                            height="20"
                            fill="#144ee3"
                            className="mr-2 animate-spin"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                          </svg>
                        </div>
                      ) : form.watch("short_url") ? (
                        <div
                          id="checkIcon"
                          className="absolute anim right-0 top-0 p-2"
                        >
                          <BadgeCheckIcon className="text-green-500" />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <FormDescription>
                    This is your short url (optional).
                  </FormDescription>
                </FormItem>
              )}
            />
            <div>
              {form.watch("original_url") && (
                <QRCode
                  size={100}
                  value={form.watch("original_url")}
                  style={{
                    padding: "0px",
                  }}
                />
              )}
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            {isPending ? (
              <BeatLoader size={10} color="white" />
            ) : (
              <span className="text-white font-medium">Create</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUrlDialog;
