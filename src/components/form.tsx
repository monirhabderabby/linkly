"use client";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonAnimation } from "./snippet/button-animation";
import { Input } from "./ui/input";

const UrlCreationSchema = z.object({
  userId: z.string(),
  original_link: z.string(),
  short_link: z.string(),
  qr_code: z.string(),
  name: z.string(),
});

export type UrlCreationSchemaType = z.infer<typeof UrlCreationSchema>;

const URLCreationForm = () => {
  const form = useForm<UrlCreationSchemaType>({
    resolver: zodResolver(UrlCreationSchema),
    defaultValues: {
      userId: "1",
    },
  });

  function onSubmit(data: UrlCreationSchemaType) {
    console.log(data);
  }
  return (
    <Form {...form}>
      <form>
        <div className="flex w-full justify-center  max-w-sm items-center space-x-2">
          <FormField
            control={form.control}
            name="original_link"
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  className="w-full lg:min-w-[400px]"
                  placeholder="Enter the link here"
                />
              </FormItem>
            )}
          />
          <ButtonAnimation
            variant="expandIcon"
            Icon={ArrowRight}
            iconPlacement="right"
          >
            Shorten Now!
          </ButtonAnimation>
        </div>
      </form>
    </Form>
  );
};

export default URLCreationForm;
