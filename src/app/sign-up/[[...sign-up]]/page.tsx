import { SignUp } from "@clerk/nextjs";
import { AuthPageShell, AUTH_APPEARANCE } from "../../../components/AuthPageShell";
import { ProtectedUnavailable } from "../../../components/ProtectedUnavailable";
import { isClerkConfigured } from "../../../lib/auth";

export default function SignUpPage() {
  if (!isClerkConfigured) return <ProtectedUnavailable />;
  return (
    <AuthPageShell
      eyebrow="Neues Konto"
      title="Account erstellen"
      description="Lege deinen Zugang an und behalte alle Bestellungen und Reels an einem Ort."
    >
      <SignUp appearance={AUTH_APPEARANCE} />
    </AuthPageShell>
  );
}
