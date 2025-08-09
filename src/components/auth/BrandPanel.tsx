// components/auth/BrandPanel.tsx
import FeatureItem from "./FeatureItem";

export default function BrandPanel() {
  return (
    <div className="hidden md:flex flex-col justify-between rounded-2xl ring-1 ring-white/20 bg-white/10 backdrop-blur-xl p-8 text-white">
      <div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/20 grid place-items-center font-bold">H</div>
          <h1 className="text-2xl font-extrabold tracking-tight">Halo Learning</h1>
        </div>
        <p className="mt-4 text-white/80 text-sm leading-6">
          Tập trung vào từ vựng và ngữ pháp. Gọn, nhanh, hiệu quả. Theo dõi tiến độ học từng ngày.
        </p>
      </div>

      <div className="mt-8 space-y-3 text-sm">
        <FeatureItem text="Đổi trạng thái vocab trực tiếp trong danh sách" />
        <FeatureItem text="Trình soạn thảo mô tả giàu định dạng (TipTap)" />
        <FeatureItem text="Giao diện tối ưu cho dark mode" />
      </div>

      <div className="mt-8">
        <div className="rounded-xl bg-white/10 ring-1 ring-white/20 p-4">
          <p className="text-white/80 text-xs">
            Mẹo: Nhấn <kbd className="px-1 bg-black/30 rounded">Enter</kbd> để đăng nhập nhanh.
          </p>
        </div>
      </div>
    </div>
  );
}
