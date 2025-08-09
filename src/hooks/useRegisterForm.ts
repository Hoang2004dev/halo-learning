import { useMemo, useState } from "react";
import { register } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Form = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function useRegisterForm() {
  const [form, setForm] = useState<Form>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const canSubmit = useMemo(() => {
    const usernameOk = form.username.trim().length >= 2;
    const emailOk = /\S+@\S+\.\S+/.test(form.email.trim());
    const pwOk = form.password.length >= 6;
    const matchOk = form.password === form.confirmPassword && form.confirmPassword.length > 0;
    return usernameOk && emailOk && pwOk && matchOk && !loading;
  }, [form, loading]);

  const handleChange =
    (name: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((p) => ({ ...p, [name]: e.target.value }));
      setError(null);
    };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const res = await register({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      setUser({ sub: "", name: res.username, email: res.email, role: res.role, exp: 0 });
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    showPw,
    setShowPw,
    showPw2,
    setShowPw2,
    error,
    loading,
    canSubmit,
    handleChange,
    handleSubmit,
  };
}
