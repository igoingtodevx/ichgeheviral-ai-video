# IchGeheViral — Legal Launch Checklist

Internal launch checklist. This file is not customer-facing and is not legal advice.

## Before enabling paid checkout

1. **Verify the operator address**
   - Current public operator address is inherited from the existing Enricha/AutoWunsch projects:
     - Enricha Einzelunternehmen
     - Timo Bieker
     - c/o Postflex #10093
     - Emsdettener Str. 10
     - 48268 Greven
   - Confirm that this is a legally usable service/establishment address for the imprint and contract notices.

2. **VAT/business identification**
   - Do not publish the domestic tax number.
   - If a VAT ID (USt-IdNr.) or business identification number is actually assigned and disclosure is legally required, add the exact assigned number to the imprint.

3. **Electronic withdrawal function**
   - Before online consumer contracts can be concluded, implement the electronic withdrawal function required for eligible distance contracts.
   - It must be clearly accessible as “Vertrag widerrufen” (or equivalent), collect the legally required identification details, and send an immediate confirmation on a durable medium.
   - Do not enable checkout while relying only on the static /widerrufsrecht page.

4. **Immediate performance during the withdrawal period**
   - If video production should start before the 14-day withdrawal period expires, capture the consumer's legally required explicit request/consent and acknowledgment before production starts.
   - Persist those declarations with the order so they can be evidenced later.

5. **Digital course add-on**
   - If the marketing course is sold as digital content and access should begin immediately, capture the separate statutory consent/acknowledgment needed for early performance and provide the required contract confirmation.

6. **Final commercial terms**
   - Insert approved gross prices in the central pricing config and Shopify.
   - Confirm the exact delivery/production expectation shown to customers.
   - Re-check AGB and FAQ after final package contents and delivery flow are frozen.

7. **Processors and privacy**
   - Confirm the final production configuration and contractual/privacy setup for Vercel, Railway, Shopify/payment providers, and Runware.
   - Re-check the privacy notice if any analytics, marketing pixels, email tools, customer accounts, or additional AI providers are added.

8. **Final legal review**
   - Have the published imprint, privacy notice, AGB, withdrawal notice, checkout declarations, and business classification reviewed by a qualified German legal professional/service before commercial launch.
