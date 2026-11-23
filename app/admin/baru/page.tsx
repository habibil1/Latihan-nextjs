import type { Metadata } from "next";
import FormEvent from "@/components/FormEvent";

export const metadata: Metadata = {
  title: "EventKu - Admin Baru Event",
};

export default function HalamanAdminBaru() {
  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold">Buat Event Baru</h1>
      <FormEvent />
    </div>
  );
}
