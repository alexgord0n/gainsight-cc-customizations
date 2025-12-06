# Gainsight CC – Schedule-X Calendar Event View

This folder contains **copy‑paste HTML widgets** for embedding a modern, theme‑aware, Schedule‑X powered calendar directly inside a **Gainsight Customer Community (CC)** HTML widget.

Two versions are included:

- **`calendar-brand-widget.html`** — Calendar colors follow your **brand color** (`--config--main-color-brand`)
- **`calendar-cta-widget.html`** — Calendar colors follow your **CTA button color** (`--config-button-cta-background-color`)

These widgets:

- Render **Month / Week / Day** using Schedule‑X  
- Load CC events securely via **Secure API Connectors**  
- Use **client‑credential OAuth** authentication  
- Convert CC timestamps into timed Schedule‑X events  
- Match your community’s CSS variables  
- Open CC event pages using `/events/{id}` in the same tab  

No external JS bundling needed — just copy/paste one widget file into CC.

---

# 🚀 How to Use

## 1. Pick Your Widget Flavor

Choose one of the HTML widget files:

| File | Description |
|------|-------------|
| `calendar-brand-widget.html` | Looks like your **brand color** |
| `calendar-cta-widget.html`   | Looks like your **primary CTA button** |

Click the file → **Raw** → copy everything → paste into a CC HTML widget.

---

# 🔧 Required Backend Setup

Before the calendar will show events, you **must** configure:

1. An **API Key**  
2. A **Secure API Connector**  
3. Two **Secrets** that store your client credentials  

Follow the steps below.

---

# ✅ Step 1 — Create an API Key (Client ID + Secret)

In Gainsight CC:

1. Navigate to **Control → Integrations → API Keys**  
2. Click **Create Key**  
3. Copy the:
   - **Client ID**
   - **Client Secret**

You’ll need these in Step 3.

---

# ✅ Step 2 — Add the Secure API Connector  
Instead of configuring by hand, simply **copy & paste this JSON** into the connector setup.

---

## 📌 **US Data Center**

```json
{
  "id": 152,
  "name": "Get Calendar Events",
  "url": "https://api2-us-west-2.insided.com/v2/events",
  "method": "GET",
  "headers": [
    { "key": "Accept", "value": "application/json", "overridable": false }
  ],
  "request_body": null,
  "permalink": "get-calendar-events",
  "authentication": {
    "type": "oauth_client_credentials",
    "config": {
      "token_url": "https://api2-us-west-2.insided.com/oauth2/token",
      "client_id": "{{ get_secret('calendar_id') }}",
      "client_secret": "{{ get_secret('calendar_secret') }}",
      "grant_type": "client_credentials",
      "scope": "write",
      "audience": "https://api2-us-west-2.insided.com",
      "client_authentication": "basic"
    }
  }
}
```

---

## 🌍 **EU Data Center**

If your community is on the **EU cluster**, change:

```json
"url": "https://api2-eu-west-1.insided.com/v2/events",
"token_url": "https://api2-eu-west-1.insided.com/oauth2/token",
"audience": "https://api2-eu-west-1.insided.com"
```

Everything else stays the same.

---

# ✅ Step 3 — Create Secrets

In **Control → Settings → Secrets**, add:

| Secret Name | Value |
|-------------|--------|
| `calendar_id` | (Your API Key’s Client ID) |
| `calendar_secret` | (Your API Key’s Client Secret) |

These are referenced inside your connector like:

```json
"client_id": "{{ get_secret('calendar_id') }}"
"client_secret": "{{ get_secret('calendar_secret') }}"
```

---

# 🧪 Step 4 — Test the Connector

Inside the connector, click **Test Request**.

A successful response looks like:

```json
{
  "result": [
    {
      "id": "6",
      "title": "Example Event",
      "startDate": "2025-11-06T01:00:00-07:00",
      "endDate": "2025-11-06T02:00:00-07:00",
      "url": "/events/6"
    }
  ],
  "_metadata": { "totalCount": 1 }
}
```

If this works → you’re ready to install the widget.

---

# 🧩 Step 5 — Install the Calendar Widget

1. Go to **Content → Pages**  
2. Open the page where the calendar should appear  
3. Add an **HTML widget**  
4. Paste in:
   - `calendar-brand-widget.html`  
     **OR**
   - `calendar-cta-widget.html`
5. Save & publish

The calendar will now:

- Render Schedule‑X
- Load all CC events
- Link to `/events/{id}` directly
- Theme itself correctly using CC variables

---

# 🎨 Theming Overview

Each widget includes a `<style>` block that overrides Schedule‑X CSS variables:

For *brand* version:

- `--sx-color-primary` → `--config--main-color-brand`
- `--sx-color-primary-container` → 15% brand tint
- Hover & ripple → 10% brand tint

For *CTA* version:

- Same structure but tied to:
  - `--config-button-cta-background-color`
  - `--config-button-cta-color`

Both adapt automatically if your CC theme changes.

---

# 🛠 Optional Tweaks

### Default view (Month vs Week vs Day)

To default to Month:

```js
var defaultViewName = 'month-grid';
```

### Calendar height

```css
#gs-calendar { height: 650px; }
```

### Month event density

```js
monthGridOptions: { nEventsPerDay: 4 }
```

---

# 🐞 Troubleshooting

### Calendar doesn’t render
Check browser console for:
- `window.SXCalendar not available`
- `WidgetServiceSDK not available`
- Connector authentication errors

### Events only in Month view
Connector timestamps must include **time**, example:

✔ `2025-11-06T01:00:00-07:00`  
✘ `2025-11-06`

### Clicking event does nothing
Ensure the event object includes an `id`.

---

# 📁 Files in This Folder

| File | Purpose |
|------|---------|
| `calendar-brand-widget.html` | Brand-color calendar widget |
| `calendar-cta-widget.html`   | CTA-based calendar widget |
| `README.md`                  | Setup & usage instructions |

---

# 🧭 Roadmap

- Sync CC Events filters with Schedule‑X  
- Support externally hosted JS bundles if CC loads scripts earlier  
- Add dark‑mode / high‑contrast variants  
- Multi-calendar support  

Need help adjusting or extending this widget? Just ask!
