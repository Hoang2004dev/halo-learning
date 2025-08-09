import AuthLayout from "../../components/auth/AuthLayout";
import BrandPanel from "../../components/auth/BrandPanel";
import RegisterForm from "../../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <BrandPanel />
        <RegisterForm />
      </div>
    </AuthLayout>
  );
}
