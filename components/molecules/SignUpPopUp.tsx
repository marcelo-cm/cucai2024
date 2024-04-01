"use client";

import React, { useState } from "react";
import { Nunito_Sans } from "next/font/google";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/router";

const NunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const SignUpPopUp = ({
  open,
  handleSubmit,
}: {
  open: boolean;
  handleSubmit: Function;
}) => {
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signUp(values);
    console.log("Signed up!");
    setLoading(false);
    handleSubmit();
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className={`${NunitoSans.className} text-blumine-50 flex flex-col gap-4 h-fit bg-blumine-800 p-8 text-blumine-50 border-0 !rounded-none`}
      >
        <DialogTitle className="text-blumine-50 text-2xl">Sign Up</DialogTitle>
        <DialogDescription className="text-blumine-50">
          You should really make an account before you apply. It makes your
          application tracking & updates THAT much easier.
        </DialogDescription>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="support@cucai.ca" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="CUCAIftw!1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              Sign Up
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpPopUp;
