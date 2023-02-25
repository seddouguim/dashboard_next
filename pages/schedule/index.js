import { signIn, signOut, useSession } from "next-auth/react";

const Schedule = () => {
  return (
    <div>
      <h1>Schedule</h1>
      <p>
        Schedule different functions remotely to all your connected devices.
      </p>

      <div>
        <button onClick={() => signIn("cognito")}>Sign in</button>

        <button onClick={() => signOut()}>Sign out</button>

        <button onClick={() => signIn("cognito", { callbackUrl: "/" })}>
          Sign in with callback
        </button>
      </div>
    </div>
  );
};

export default Schedule;
