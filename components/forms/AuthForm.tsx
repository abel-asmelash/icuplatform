"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form"; // ✅ Added missing imports: Path, SubmitHandler
import { z, ZodType } from "zod";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: { message: string } }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      const result = await onSubmit(data);

      if (!result.success) {
        toast.error(result.error?.message ?? "An unexpected error occurred.");
      }
    } catch (error) {
      console.error(`${formType} submission error:`, error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
      >
        {/* ✅ Fixed: Object.keys (capital O), correct .map() syntax with parentheses */}
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>} // ✅ Fixed: Path<T> (capital P), not path<T>
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {/* ✅ Fixed: typo 'paragraph-meduim' → 'paragraph-medium' */}
                  {field.name === "email"
                    ? "Email Address" // ✅ Fixed: typo 'Adress' → 'Address'
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>

                <FormControl>
                  <Input
                    required
                    type={field.name === "password" ? "password" : "text"} // ✅ Fixed: typo 'pasword' → 'password'
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
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900!"
        >
          {/* ✅ Fixed: removed stray 'Submit' text, fixed ternary to compare against buttonText correctly */}
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing In..." // ✅ Fixed: was 'Sign In...' (grammatically odd)
              : "Signing Up..." // ✅ Fixed: was 'signing Up...' (lowercase s)
            : buttonText}
        </Button>

        {/* ✅ Fixed: broken ternary syntax — condition ? <JSX> : <JSX>, not condition <JSX> ? <JSX> : <JSX> */}
        {formType === "SIGN_IN" ? (
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href={ROUTES.SIGN_UP}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign Up{" "}
              {/* ✅ Fixed: was 'Sign in' (wrong label for SIGN_UP route) */}
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
