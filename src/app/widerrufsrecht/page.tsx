import type { Metadata } from "next";
import { ConfiguredLegal } from "../../components/ConfiguredLegal";
export const metadata: Metadata = { title: "Widerrufsrecht und Vertragsinformationen | IchGeheViral" };
export default function Page() {
  return <ConfiguredLegal title="Widerrufsrecht und Vertragsinformationen" field="terms_text" />;
}
