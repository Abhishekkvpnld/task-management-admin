import CreateUser from "@/components/CreateUser";
import { addUser } from "@/server/actions";

export const metadata = {
  title: "Signup - Create an Account",
  description: "Register for a new account securely.",
};

export default function SignupPage() {
  return (
    <div className="container mx-auto p-5 flex flex-col items-center">
      <h1 className="font-bold text-xl m-3">Register a New User!</h1>
      <CreateUser addUser={addUser} />
    </div>
  );
}
