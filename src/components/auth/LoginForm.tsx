// components/auth/LoginForm.tsx
import { useNavigate } from "react-router-dom";
import { Field } from "./fields/Field";
import { PasswordField } from "./fields/PasswordField";
import { OAuthButton } from "./buttons/OAuthButton";
import useLoginForm from "../../hooks/useLoginForm";

export default function LoginForm() {
  const {
    form, setRemember, remember, showPw, setShowPw,
    error, loading, canSubmit, handleChange, handleSubmit
  } = useLoginForm();
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold">Đăng nhập</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Sử dụng email và mật khẩu của bạn để tiếp tục.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-rose-300 bg-rose-50 text-rose-800 px-3 py-2 text-sm" role="alert" aria-live="assertive">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <Field
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange("email")}
          autoComplete="email"
          placeholder="you@example.com"
        />

        <PasswordField
          label="Mật khẩu"
          name="password"
          value={form.password}
          onChange={handleChange("password")}
          show={showPw}
          setShow={setShowPw}
        />

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Ghi nhớ email
          </label>

          <button
            type="button"
            className="text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400"
            onClick={() => navigate("/auth/forgot-password")}
          >
            Quên mật khẩu?
          </button>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition
          ${canSubmit ? "bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500" : "bg-sky-300 cursor-not-allowed"}`}
        >
          {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />}
          Đăng nhập
        </button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-slate-900 px-2 text-xs text-slate-400">hoặc</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <OAuthButton text="Đăng nhập với Google" onClick={() => alert("Sắp ra mắt")} />
          <OAuthButton text="Đăng nhập với Microsoft" onClick={() => alert("Sắp ra mắt")} />
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
          Bằng việc tiếp tục, bạn đồng ý với Điều khoản và Chính sách bảo mật.
        </p>

        {/* Thêm liên kết sang trang đăng ký */}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400 mt-1"
        >
          Chưa có tài khoản? Đăng ký
        </button>
      </div>
    </div>
  );
}
