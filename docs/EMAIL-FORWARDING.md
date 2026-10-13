# Free email forwarding for veenasolar.com

The owner selected this setup on 13 October 2026:

**info@veenasolar.com → Cloudflare Email Routing → shubhamsharma173@gmail.com**

This is incoming-only forwarding, with no separate info mailbox password or paid Google Workspace subscription. Read messages in the existing Gmail inbox. Replies sent there use the Gmail address; forwarding alone does not enable sending as info@veenasolar.com.

## Setup and verification

1. Open Cloudflare → Email Service → Email Routing → veenasolar.com.
2. Enable routing with the MX, SPF and DKIM records shown by Cloudflare. Keep a single root SPF record and do not install competing Google MX records.
3. Add and verify the destination Gmail address. The current account already recognises this destination as verified.
4. Create an enabled custom-address rule for **info** that sends to the verified destination. Leave catch-all disabled.
5. Send a labelled test from another email address and confirm arrival in Gmail, including the spam folder. A test sent from the destination Gmail to itself through forwarding may not appear as a normal new message, so use a different sender.

## Change the destination later

Add the new destination in Cloudflare and complete its verification. Then edit the info@veenasolar.com routing rule to select the new destination and save. Test delivery before removing the old destination.

The website continues to use info@veenasolar.com; its public email address and D1 lead records do not need to change when the forwarding destination changes.

## Website inquiries

The form stores each accepted inquiry in D1 and sends a notification through the free Resend sending account, from **leads@notify.veenasolar.com** to **info@veenasolar.com**. Cloudflare then forwards it to Gmail. Resend's sender DNS stays on its dedicated subdomain and does not replace Cloudflare's root MX records.

For a future business Gmail mailbox that also sends as info@veenasolar.com, use [the optional Workspace guide](GOOGLE-WORKSPACE.md) and perform a deliberate mail-provider migration.

[Cloudflare routing rules and destination addresses](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/).
