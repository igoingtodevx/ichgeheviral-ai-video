import { SignIn } from "@clerk/nextjs";
import { AuthPageShell, AUTH_APPEARANCE } from "../../../components/AuthPageShell";
import { ProtectedUnavailable } from "../../../components/ProtectedUnavailable";
import { isClerkConfigured } from "../../../lib/auth";

export default function SignInPage() {
  if (!isClerkConfigured) return <ProtectedUnavailable />;
  return (
    <AuthPageShell
      eyebrow="Kundenbereich"
      title="Willkommen zurück"
      description="Melde dich an, um deine Reels und laufenden Aufträge zu sehen."
    >
      <SignIn appearance={AUTH_APPEARANCE} />
    </AuthPageShell>
  );
}
