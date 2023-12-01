import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import z from "zod";

import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

import { signin } from "~/api/auth/signin.server";
import { getUserData } from "~/lib/session.server";

import SigninForm from "~/components/SigninForm";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserData(request);
  if (user) return redirect("/dashboard");
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const data = {
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  };

  console.log(data);

  const formSchema = z.object({
    identifier: z.string().min(1).max(255),
    password: z.string().min(1).max(255),
  });

  const validatedFields = formSchema.safeParse({
    identifier: data.identifier,
    password: data.password,
  });

  if (!validatedFields.success) {
    return json({
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fill out all missing fields.",
    });
  }

  const response = (await signin(data)) as any;

  if (response.error)
    return json({
      errors: response.error,
      message: response.error.message,
    });

  return response;
}

export default function SigninRoute() {
  const actionData = useActionData<typeof action>();
  return <SigninForm data={actionData} />;
}
