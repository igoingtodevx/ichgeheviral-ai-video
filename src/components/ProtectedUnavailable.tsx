import Link from "next/link";

export function ProtectedUnavailable({ admin = false }: { admin?: boolean }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f7fb] px-5 py-16 text-[#101114]">
      <section className="w-full max-w-lg rounded-[28px] border border-[#e4e1ec] bg-white p-8 text-center shadow-[0_18px_60px_rgba(37,31,68,.08)] sm:p-10">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#f0edff] text-xl font-black text-[#5d4de1]">!</div>
        <h1 className="mt-5 text-2xl font-black tracking-[-0.04em]">
          {admin ? "Adminzugang noch nicht verfügbar" : "Kundenbereich noch nicht verfügbar"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#686c73]">
          Die sichere Anmeldung ist für diese Umgebung noch nicht konfiguriert. Es wurden keine geschützten Daten geladen.
        </p>
        <Link href="/" className="mt-7 inline-flex rounded-xl bg-[#6d5dfc] px-5 py-3.5 text-sm font-black text-white">
          Zur Website
        </Link>
      </section>
    </main>
  );
}
