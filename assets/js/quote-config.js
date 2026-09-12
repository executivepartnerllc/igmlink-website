/**
 * IGM storefront — quote / contact webhook
 * ========================================
 * Juan / Admin: paste the Power Automate (or other HTTP) trigger URL into
 * QUOTE_WEBHOOK_URL. The public forms POST JSON there. No redesign.
 *
 * Hub behavior the flow must implement (not this static site):
 *   1. Create Cuevas Hub IGM Sales Leads item with Stage = Suspect
 *   2. Email jcuevas@igmlink.com and CC nislas@igmlink.com
 *   3. Do NOT auto-advance Stage to Prospect — a person confirms first
 *
 * JSON body the site sends:
 *   name, phone, email, company, property, message,
 *   leadSource ("Website Quote"),
 *   stage ("Suspect"),
 *   notifyTo, notifyCc,
 *   submittedAt (ISO-8601), page (form URL)
 *
 * company and property are the same “Company / property” field so Hub
 * can map either name.
 *
 * CORS: a browser POST from GitHub Pages needs the flow to answer OPTIONS
 * and return Access-Control-Allow-Origin (at least this Pages origin) plus
 * Access-Control-Allow-Headers: content-type.
 *
 * Leave QUOTE_WEBHOOK_URL as "" until Admin supplies the trigger. Mailto
 * is only a backup link on the form, not the submit path.
 */
(function () {
  window.IGM_QUOTE = {
    QUOTE_WEBHOOK_URL: "",
    LEAD_SOURCE: "Website Quote",
    STAGE: "Suspect",
    NOTIFY_TO: "jcuevas@igmlink.com",
    NOTIFY_CC: "nislas@igmlink.com"
  };
})();
