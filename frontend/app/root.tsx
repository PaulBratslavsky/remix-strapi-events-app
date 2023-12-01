
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import qs from "qs";

import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import styles from "./tailwind.css";

import { Toaster } from "react-hot-toast";
import Header from "~/components/Header";
import { userme } from "./api/auth/userme.server";



export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const query = qs.stringify({
  populate: {
    logo: { populate: "*" },
    mainNav: { populate: "*" },
    secondaryNav: { populate: "*" },
  },
});

export async function loader({ request }: LoaderFunctionArgs) {

  const userData = await userme(request) as LoaderFunctionArgs;
  const url = process.env.STRAPI_URL || "http://127.0.0.1:1337";

  try {
    const res = await fetch(url + "/api/global?" + query);
    const data = await res.json();
    return json({ data, url, userData });
  } catch (error) {
    console.log(error);
  }
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Toaster />
        <Header data={data.data} url={data.url} user={data.userData}/>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
