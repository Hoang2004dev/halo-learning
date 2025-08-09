// pages/auth/LoginPage.tsx
import AuthLayout from "../../components/auth/AuthLayout";
import BrandPanel from "../../components/auth/BrandPanel";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <BrandPanel />
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
