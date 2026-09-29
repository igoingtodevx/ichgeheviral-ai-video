import { SignUp } from "@clerk/nextjs";
import { AuthPageShell, AUTH_APPEARANCE } from "../../../components/AuthPageShell";

export default function SignUpPage() {
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
