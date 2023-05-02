import { Session } from "next-auth";

const getUserId: (session: Session | null) => Promise<string> = async (
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

  const res = await fetch(`/api/profile/getIdByEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });

  if (!res.ok) {
    throw new Error("Something went wrong while trying to receive user id");
  }

  const data = await res.json();
  const id = data.id;
  return id;
};

export default getUserId;
