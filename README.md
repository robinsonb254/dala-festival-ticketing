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
