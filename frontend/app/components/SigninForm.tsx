import { Form, Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function FormInput({
  name,
  label,
  placeholder,
  defaultValue = "",
  errors,
}: Readonly<{
  name: string;
  label?: string;
  placeholder?: string;
  errors: any;
  defaultValue?: string;
}>) {
  return (
    <div className="w-full">
      <div>
        <label
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor={name}
        >
          {label}
        </label>
        <div className="relative">
          <Input
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        </div>
      </div>
      {errors && errors[name]
        ? errors[name].map((error: string) => (
            <p key={error} className="mt-2 p-2 bg-red-500 text-white">
              {error}
            </p>
          ))
        : null}
    </div>
  );
}

export default function SigninForm({ data }: any) {
  console.log(data, "what is this");
  return (
    <Form method="POST" className="space-y-8 p-8">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign in to your account
        </h1>
        <p className="text-sm text-muted-foreground">
          And start creating events
        </p>
      </div>

      <FormInput
        name="identifier"
        label="Username or Email"
        placeholder="Username or Email"
        errors={data?.errors}
      />

      <FormInput
        name="password"
        label="Password"
        placeholder="Password"
        errors={data?.errors}
      />

      {data?.message && (
        <p className="mt-2 p-2 bg-red-500 text-white">{data?.message}</p>
      )}

      <Button className="bg-primary hover:bg-accent" type="submit">
        Submit
      </Button>
      <div>
        <Link to="/register" className="hover:text-accent">
          Don't have an account? Register here.
        </Link>
      </div>
    </Form>
  );
}
