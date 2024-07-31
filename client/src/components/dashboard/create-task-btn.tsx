"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { openSheet, closeSheet } from "@/features/sheet/sheetSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskStatus, TaskPriority } from "@/types";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { cn } from "@/lib/utils";
import { BASE_URL } from "@/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema, TaskSchemaType } from "@/schema";

import { Form, FormControl, FormField, FormItem } from "../ui/form";
import getCookie from "@/actions/getCookie";

interface CreateTaskBtnProps {
  children: React.ReactNode;
  className?: string;
  status?: TaskStatus;
}

const CreateTaskBtn: React.FC<CreateTaskBtnProps> = ({
  children,
  className,
  status,
}) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.sheet.formData);
  const form = useForm<TaskSchemaType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: formData.title || "",
      description: formData.description || "",
      status: formData.status || "",
      priority: formData.priority || "",
      deadline: formData.deadline ? formData.deadline.toString() : "",
      user: formData.user || "",
    },
  });

  const handleClick = () => {
    dispatch(openSheet({ status }));
  };

  const onSubmit = async (data: TaskSchemaType) => {
    try {
      console.log("Preparing to save task with data:", data);

      await saveTask(data);

      dispatch(closeSheet());
      console.log("Sheet closed successfully");
    } catch (error) {
      console.error("Error during save operation:", error);
    }
  };

  const saveTask = async (task: TaskSchemaType): Promise<void> => {
    try {
      const token = await getCookie();

      if (!token) {
        throw new Error("Authentication token not found");
      }

      console.log("Saving task:", task);

      const response = await fetch(`${BASE_URL}/task/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Failed to save task:", errorMessage);
        throw new Error("Failed to save task");
      }

      console.log("Task saved successfully");
    } catch (error) {
      console.error("Error saving task:", error);
      throw error;
    }
  };

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "flex items-center rounded-lg w-full space-x-2",
          className
        )}
        onClick={handleClick}
      >
        {children}
      </SheetTrigger>
      <SheetContent style={{ maxWidth: "40vw" }}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Title" type="text" />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.formState.errors.title && (
              <p className="text-red-500">
                {form.formState.errors.title.message}
              </p>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Description" type="text" />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.formState.errors.description && (
              <p className="text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value || status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value={TaskStatus.TO_DO}>To Do</SelectItem>
                        <SelectItem value={TaskStatus.IN_PROGRESS}>
                          In Progress
                        </SelectItem>
                        <SelectItem value={TaskStatus.UNDER_REVIEW}>
                          Under Review
                        </SelectItem>
                        <SelectItem value={TaskStatus.FINISHED}>
                          Finished
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {form.formState.errors.status && (
              <p className="text-red-500">
                {form.formState.errors.status.message}
              </p>
            )}

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem value={TaskPriority.LOW}>Low</SelectItem>
                        <SelectItem value={TaskPriority.MEDIUM}>
                          Medium
                        </SelectItem>
                        <SelectItem value={TaskPriority.URGENT}>
                          Urgent
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {form.formState.errors.priority && (
              <p className="text-red-500">
                {form.formState.errors.priority.message}
              </p>
            )}

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="date" className="mb-2" />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.formState.errors.deadline && (
              <p className="text-red-500">
                {form.formState.errors.deadline.message}
              </p>
            )}

            <Button
              type="submit"
              className="mt-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTaskBtn;
