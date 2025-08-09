import { useNavigate } from "react-router-dom";
import { Field } from "./fields/Field";
import { PasswordField } from "./fields/PasswordField";
import { OAuthButton } from "./buttons/OAuthButton";
import useRegisterForm from "../../hooks/useRegisterForm";

export default function RegisterForm() {
  const {
    form, showPw, setShowPw, showPw2, setShowPw2,
    error, loading, canSubmit, handleChange, handleSubmit
  } = useRegisterForm();
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold">Đăng ký</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Tạo tài khoản để bắt đầu học.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-rose-300 bg-rose-50 text-rose-800 px-3 py-2 text-sm" role="alert">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <Field
          label="Tên người dùng"
          name="username"
          value={form.username}
          onChange={handleChange("username")}
          placeholder="Tên hiển thị"
        />
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
        <PasswordField
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
          show={showPw2}
          setShow={setShowPw2}
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition
          ${canSubmit ? "bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" : "bg-emerald-300 cursor-not-allowed"}`}
        >
          {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />}
          Đăng ký
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
          <OAuthButton text="Đăng ký với Google" onClick={() => alert("Sắp ra mắt")} />
          <OAuthButton text="Đăng ký với Microsoft" onClick={() => alert("Sắp ra mắt")} />
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
          Khi đăng ký, bạn đồng ý với Điều khoản và Chính sách bảo mật.
        </p>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400 mt-1"
        >
          Đã có tài khoản? Đăng nhập
        </button>
      </div>
    </div>
  );
}
