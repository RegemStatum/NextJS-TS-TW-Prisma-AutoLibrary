import { Session } from "next-auth";

const getUserIdClient: (session: Session | null) => Promise<string> = async (
  session
) => {
  if (!session) {
    throw new Error("No session");
  }

  if (!session.user) {
    throw new Error("No user in session");
  }

  const email = session.user.email;
  if (!email) {
    throw new Error("No user email in session");
  }

  const res = await fetch(`/api/profile/${email}/getUserId`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Something went wrong while trying to receive user id");
  }

  const data = await res.json();
  return data.id;
};

export default getUserIdClient;
