import type { Metadata } from "next";
import { ConfiguredLegal } from "../../components/ConfiguredLegal";
export const metadata: Metadata = { title: "Impressum | IchGeheViral" };
export default function Page() {
  return <ConfiguredLegal title="Impressum" field="imprint_text" />;
}
