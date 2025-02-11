
import LoginForm from "@/components/LoginForm";
import { loginUser } from "@/server/actions";

export const metadata = {
  title: "Login - Access Your Account",
  description: "Securely log in to your account.",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto p-5 flex flex-col items-center">
      <h1 className="font-bold text-xl">Welcome Back! Log In</h1>
      <LoginForm loginUser={loginUser} />
    </div>
  );
}
