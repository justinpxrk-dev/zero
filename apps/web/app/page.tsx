import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "../auth";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  async function signIn() {
    "use server";
    const { url } = await auth.api.signInSocial({
      body: { provider: "google", callbackURL: "/" },
    });
    if (url) redirect(url);
  }

  async function signOut() {
    "use server";
    await auth.api.signOut({ headers: await headers() });
    redirect("/");
  }

  if (!session) {
    return (
      <main>
        <h1>zero</h1>
        <form action={signIn}>
          <button type="submit">Sign in with Google</button>
        </form>
      </main>
    );
  }

  return (
    <main>
      <h1>zero</h1>
      <p>Signed in as {session.user.email}</p>
      <form action={signOut}>
        <button type="submit">Sign out</button>
      </form>
    </main>
  );
}
