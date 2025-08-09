// hooks/useLoginForm.ts
import { useEffect, useMemo, useState } from "react";
import { login } from "../api/authApi";
import { LoginRequest } from "../models/auth";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getDeviceInfo } from "../utils/deviceInfo";

export default function useLoginForm() {
  const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("rememberEmail");
    if (saved) setForm((p) => ({ ...p, email: saved }));
  }, []);

  const canSubmit = useMemo(() => {
    const emailOk = /\S+@\S+\.\S+/.test(form.email.trim());
    const pwOk = form.password.trim().length >= 6;
    return emailOk && pwOk && !loading;
  }, [form, loading]);

  const handleChange =
    (name: keyof LoginRequest) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [name]: e.target.value }));
      setError(null);
    };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const res = await login({ ...form, deviceInfo: getDeviceInfo() });
      if (remember) localStorage.setItem("rememberEmail", form.email);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      setUser({ sub: "", name: res.username, email: res.email, role: res.role, exp: 0 });
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Enter") handleSubmit(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleSubmit]);

  return { form, showPw, setShowPw, remember, setRemember, error, loading, canSubmit, handleChange, handleSubmit };
}
