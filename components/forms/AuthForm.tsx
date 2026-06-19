"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ZodType} from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ActionResponse } from "@/app/types/global";
import { toast } from "sonner";
interface AuthFormProps<T extends FieldValues = FieldValues> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: ZodType<T, any, any>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}
const AuthForm = <T extends FieldValues = FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const handleSubmit: SubmitHandler<T> = async (data) => {
      
    const result = (await onSubmit(data)) as ActionResponse;
    
    if (result?.success) {
      toast("Success", {
        description:
          formType === "SIGN_IN"
            ? "Signed in successfully"
            : "Signed up successfully",
      });
      router.push(ROUTES.HOME);
    } else {
  toast.error("Error", {
    description: result?.error?.message || "Something went wrong.",
  });
    }
  };
  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
      >
        {(Object.keys(defaultValues) as Array<keyof T>).map((key) => (
          <FormField
            key={String(key)}
            control={form.control}
            name={key as Path<T>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>

                <FormControl>
                  <Input
                    required
                    type={field.name === "password" ? "password" : "text"}
                    {...field}
                    className="paragraph-regular background-light-900_dark300 light-border-2 text-dark300_light700 not-focus min-h-12 rounded-1.5 border"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
        >
          {form.formState.isSubmitting
            ? formType === "SIGN_IN"
              ? "Signing In..."
              : "Signing Up..."
            : buttonText}
        </Button>

        {formType === "SIGN_IN" ? (
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href={ROUTES.SIGN_UP}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              href={ROUTES.SIGN_IN}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign In
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
