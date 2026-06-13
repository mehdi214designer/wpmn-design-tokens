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
| FluentMembers | `fluentmembers` | #824EEB | #611CEB |
| FluentBooking | `fluentbooking` | #2653C5 | — |
| FluentCommunity | `fluentcommunity` | #485CE0 | — |
| FluentSMTP | `fluentsmtp` | #C516C0 | — |
| AzonPress | `azonpress` | #FFC800 | — |
| Paymattic | `paymattic` | #FF6A00 | — |

---

## FluentMembers — Full Scale

### Primary (Vivid Fandango)

| Step | Value |
|---|---|
| 50 | #F3EDFD |
| 100 | #E6DCFB |
| 200 | #CDB8F7 |
| 300 | #B495F3 |
| 400 | #9B71EF |
| 500 | #824EEB |
| 600 | #683EBC |
| 700 | #4E2F8D |
| 800 | #341F5E |
| 900 | #1A102F |
| 950 | #0D0817 |

### Accent (Vivid Lavender)

| Step | Value |
|---|---|
| 50 | #EFE8FD |
| 100 | #DFD2FB |
| 200 | #C0A4F7 |
| 300 | #A077F3 |
| 400 | #8149EF |
| 500 | #611CEB |
| 600 | #4E16BC |
| 700 | #3A118D |
| 800 | #270B5E |
| 900 | #13062F |
| 950 | #0A0317 |

---

## How Theming Works

1. `primitives.css` defines the default WPManageNinja brand values for `--primitive-primary-*` and `--primitive-accent-*`
2. `brand-primitives.css` overrides those values per brand via `[data-brand="x"]`
3. `tokens.css` maps semantic tokens (like `--btn-bg-enable`) to the primitive variables
4. Result: changing `data-brand` updates the entire color system automatically
