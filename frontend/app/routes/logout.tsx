import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { logout } from "~/lib/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  return logout(request);
};

export const loader = async () => {
  return redirect("/");
};

export function Logout({ children }: { readonly children: React.ReactNode }) {
  return (
    <Form method="post" action="/logout" className="w-full">
      {children}
    </Form>
  );
}
