# Brands

**Source:** `brand-primitives.css`

Apply `data-brand="<key>"` to the root element to activate the correct primary and accent color scales for that product.

```html
<div data-brand="fluentforms"> ... </div>
```

All semantic tokens in `tokens.css` cascade automatically once `data-brand` is set.

---

## All Brands

| Brand | Key | Primary (500) | Accent (500) |
|---|---|---|---|
| WPManageNinja | `wpmanagenia` | #0D5FFF | #4C5C73 |
| FluentForms | `fluentforms` | #2B6CFF | #089DFF |
| FluentCRM | `fluentcrm` | #BA4CDE | #7742E6 |
| NinjaTables | `ninjatables` | #046EC0 | #00AC9E |
| FluentSupport | `fluentsupport` | #00B36D | #FFCA6D |
| FluentAffiliate | `fluentaffiliate` | #2C6AE2 | #2CC5E2 |
| FluentBoards | `fluentboards` | #F1EB62 | #6268F1 |
| FluentCart | `fluentcart` | #0000D9 | #00009F |
| FluentPlayer | `fluentplayer` | #0163DD | #DD1E13 |
| WPSocialNinja | `wpsocialninja` | #5B2DD4 | #FF0C79 |
| FluentMembers | `fluentmembers` | #D5014A | #FFBB10 |
| FluentBooking | `fluentbooking` | #2653C5 | — |
| FluentCommunity | `fluentcommunity` | #485CE0 | — |
| FluentSMTP | `fluentsmtp` | #C516C0 | — |
| AzonPress | `azonpress` | #FFC800 | — |
| Paymattic | `paymattic` | #FF6A00 | — |

---

## FluentMembers — Full Scale

### Primary (Pink)

| Step | Value |
|---|---|
| 50 | #FBE5EC |
| 100 | #F6CCDA |
| 200 | #EE99B6 |
| 300 | #E66693 |
| 400 | #DE326E |
| 500 | #D5014A |
| 600 | #AA013B |
| 700 | #7F002C |
| 800 | #55001D |
| 900 | #2A000E |
| 950 | #150007 |

### Accent (Golden Yellow)

| Step | Value |
|---|---|
| 50 | #FFF8E7 |
| 100 | #FFF2CF |
| 200 | #FFE3A0 |
| 300 | #FFD66F |
| 400 | #FFC83F |
| 500 | #FFBB10 |
| 600 | #CC950D |
| 700 | #997008 |
| 800 | #664A05 |
| 900 | #332503 |
| 950 | #191201 |

---

## How Theming Works

1. `primitives.css` defines the default WPManageNinja brand values for `--primitive-primary-*` and `--primitive-accent-*`
2. `brand-primitives.css` overrides those values per brand via `[data-brand="x"]`
3. `tokens.css` maps semantic tokens (like `--btn-bg-enable`) to the primitive variables
4. Result: changing `data-brand` updates the entire color system automatically
