# Dala Festival Ticketing

Independent event promotion and ticket sales platform.

## Launch scope
- Payment methods: M-Pesa and PayPal only.
- Ticket delivery: order reference and payment confirmation only.
- QR codes, PDF tickets, scanning, Visa/Mastercard direct checkout and bank transfers are intentionally deferred.
- Payment success must only be recorded after a verified provider callback/capture on the server.

## Stack
Next.js App Router, TypeScript, Supabase/Postgres, Vercel.

## Local development
1. Install Node.js 20.9+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and fill credentials through your local environment / Vercel project settings.
4. Run `npm run dev`.

Never commit secrets. Do not put PayPal secrets, M-Pesa credentials, or Supabase service-role keys in browser code or chat.

## Event content requiring organiser confirmation
The current draft uses 12 December 2026, ASK Arena / Nairobi Showground and the lineup/prices documented in the app. Confirm event start time, ticket prices, capacity and approved artist/brand assets with the organiser before taking live payments.

## Deployment
Connect this repository to Vercel and add environment variables only after the payment and database integrations are configured and tested.


## Payment configuration (server-side only)

Set these variables in Vercel Project Settings → Environment Variables. Never expose secrets with a \`NEXT_PUBLIC_\` prefix.

- \`SUPABASE_SECRET_KEY\`: create a Supabase secret API key for this Dala project.
- \`MPESA_CONSUMER_KEY\`, \`MPESA_CONSUMER_SECRET\`, \`MPESA_PASSKEY\`: Daraja credentials for the selected environment.
- \`MPESA_SHORTCODE\`: the registered PayBill/Till shortcode for the Daraja product and transaction type.
- \`MPESA_CALLBACK_URL\`: \`https://dalafestivaltickets.com/api/payments/mpesa/callback\` after the production domain is active.
- \`PAYPAL_CLIENT_SECRET\`: secret paired with the PayPal client ID.
- \`PAYPAL_KES_TO_USD_RATE\`: number of Kenyan shillings per one US dollar. PayPal checkout requires an explicit, approved conversion rate; each order stores its quoted USD amount before the customer approves payment.
- \`PAYPAL_ENVIRONMENT\`: use \`sandbox\` for testing, then \`live\` only after credentials and end-to-end verification.

Do not accept live payments until the environment variables are complete and the payment flows have been tested. The M-Pesa callback independently queries Daraja before marking an order paid; callback metadata is cross-checked against the stored order. Keep the callback URL on the canonical apex domain. PayPal capture is checked against the stored order reference and USD quote.
