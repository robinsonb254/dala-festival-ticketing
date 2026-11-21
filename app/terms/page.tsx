import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Dala Festival Ticketing",
  description: "Terms governing use of the Dala Festival Ticketing website and ticket orders."
};

export default function TermsPage() {
  return (
    <main className="terms-page">
      <a className="terms-back" href="/">← BACK TO DALA FESTIVAL</a>
      <h1>Terms &amp; Conditions</h1>
      <p className="terms-updated">Last updated: 21 November 2026</p>
      <div className="terms-notice">Dala Festival Ticketing is an independent event-promotion and ticketing platform. It is not the event organiser’s official website.</div>

      <h2>1. Acceptance of these terms</h2>
      <p>By accessing this website, placing an order or using any ticketing service provided through it, you agree to these Terms &amp; Conditions. If you do not agree, do not use the checkout service. These terms apply alongside any mandatory rights you have under applicable Kenyan law.</p>

      <h2>2. Event information</h2>
      <p>Dala Festival takes place on 12 December 2026 at ASK Arena, Nairobi Showground.</p>
      <p>The featured lineup is published on the festival website. Event programme information is presented on the festival page.</p>

      <h2>3. Ticket categories, prices and orders</h2>
      <p>Ticket categories and prices are displayed in Kenyan shillings (KES) on the checkout page. Categories include Regular, VIP, VVIP, Table of 4 and Table of 8. The price displayed at checkout applies to the order.</p>
      <p>An order is a request to purchase the selected ticket allocation. An order is not confirmed merely because you submit the checkout form or receive a pending order reference. An order is confirmed only after the relevant payment provider verifies successful payment and the platform records the confirmed status.</p>
      <p>You are responsible for entering accurate contact and payment details, selecting the correct ticket category and quantity, and keeping your order reference safe. Do not create duplicate orders while a payment is pending. Contact support with your order reference if a payment appears to have been deducted but confirmation has not arrived.</p>

      <h2>4. Payments</h2>
      <p>Payments are accepted through M-Pesa and PayPal. Payments are processed through the selected payment provider. PayPal may display a converted amount in United States dollars; the amount and conversion quote shown during checkout are the amounts applicable to that order. Any fees imposed separately by your bank, mobile operator or payment provider are governed by that provider’s terms.</p>
      <p>Never share your M-Pesa PIN, PayPal password or one-time verification codes with anyone claiming to provide ticket support. The platform will not ask you to send these credentials by email or message.</p>

      <h2>5. Ticket delivery and entry</h2>
      <p>The platform provides an order reference and payment confirmation. QR-code tickets, PDF ticket downloads and on-site ticket scanning are not provided. Keep your order reference and proof of payment. The organiser is responsible for communicating the final event-entry procedure and any identification or admission requirements.</p>

      <h2>6. Cancellations, postponements and refunds</h2>
      <p>Refunds, cancellations, postponements and changes to the event are subject to applicable law and the organiser’s confirmed event policy. The platform does not promise that every ticket is refundable. If the event is cancelled, postponed or materially changed, contact the support email below for information about the process communicated by the organiser and payment provider.</p>
      <p>A payment reversal, refund or cancellation is complete only after confirmation from the relevant payment provider or the platform. Any non-waivable consumer rights under Kenyan law remain unaffected by this section.</p>

      <h2>7. Acceptable use</h2>
      <p>You must use the website lawfully and must not attempt to interfere with its operation, bypass payment checks, submit false information, exploit checkout errors, use another person’s payment account without authority, or engage in fraudulent, abusive or unlawful activity. Orders suspected to involve fraud or unauthorised payment may be held for verification or cancelled where permitted by law.</p>

      <h2>8. Privacy and personal information</h2>
      <p>To process an order, the platform collects the customer name, phone number, optional email address, ticket selection, quantity, order reference and payment transaction identifiers or status. This information is used to create and administer orders, verify payments, provide customer support, prevent fraud and meet legal obligations. Payment credentials such as your M-Pesa PIN and PayPal password should be entered only in the payment provider’s secure interface and are not requested by this website.</p>
      <p>Information may be shared with the payment provider, hosting and database service providers, and the event organiser where necessary to fulfil the ticket order or administer the event. Personal information should be handled in accordance with applicable data-protection law. Contact the email below for privacy-related questions or requests.</p>

      <h2>9. Website availability and liability</h2>
      <p>We aim to keep the website accurate and available, but do not guarantee uninterrupted access or that every item of information will always be error-free. To the extent permitted by law, the platform is not responsible for losses caused by outages or failures of third-party networks, payment providers or services outside its reasonable control. Nothing in these terms excludes liability that cannot lawfully be excluded or limits your mandatory statutory rights.</p>

      <h2>10. Changes to these terms</h2>
      <p>These terms may be updated to reflect changes to the service, event arrangements or legal requirements. The latest version will be published on this page with its revision date. Continued use of the website after an update means the updated terms apply to subsequent use and orders, subject to applicable law.</p>

      <h2>11. Governing law</h2>
      <p>These terms are governed by the laws of Kenya. Any dispute will be handled by the competent courts or dispute-resolution bodies in Kenya, subject to mandatory consumer protections and applicable law.</p>

      <h2>12. Contact</h2>
      <p>For ticket-order, payment, event-information or privacy enquiries, contact us by email: <a className="terms-contact" href="mailto:dalafestive@gmail.com">dalafestive@gmail.com</a>.</p>
      <p><a className="terms-back" href="/">← RETURN TO THE FESTIVAL WEBSITE</a></p>
    </main>
  );
}
