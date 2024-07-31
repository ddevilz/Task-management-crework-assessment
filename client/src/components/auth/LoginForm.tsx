"use client";
import React, { useState } from "react";
import AuthCardWrapper from "@/components/auth/AuthCardWrapper";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { LoginSchema, LoginSchemaType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/api";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginSchemaType) => {
    setLoading(true);
    setError(null);
    try {
      const response: Response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const user = response.json();
      console.log("Login successful", user);
      router.push("/");
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthCardWrapper
        backButtonLabel={"Doesn't have an account? Create a new account."}
        backButtonHref={"/register"}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Your email" type="email" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Password"
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing up..." : "Sign up"}
              </Button>
            </div>
          </form>
        </Form>
      </AuthCardWrapper>
    </div>
  );
};

export default LoginForm;
