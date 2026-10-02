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
      description="Erstelle deinen Zugang mit deinem Google-Konto. Melde dich bitte künftig mit demselben Google-Konto an, mit dem der Account erstellt wurde."
    >
      <SignUp appearance={AUTH_APPEARANCE} />
    </AuthPageShell>
  );
}
