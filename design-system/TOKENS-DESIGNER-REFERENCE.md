# 🎨 Design Tokens Reference
**Single Source of Truth for Reset Primal Brand**

For: Designer 1 (Instagram), Designer 2 (Email), Designer 3 (Video/Stories)

---

## 📋 Quick Reference

**Copy these values directly into your designs:**

### Colors (Copy-Paste Hex Values)
```
Primary Green:    #16a34a  ← Use for all CTAs, highlights, checkmarks
Primary Dark:     #15803d  ← Use for hover states, darker elements
Primary Light:    #f0fdf4  ← Use for backgrounds, tints
Alert Red:        #dc2626  ← Use for urgency, limited-time offers
Text Primary:     #1f2937  ← Use for body text, main content
Text Secondary:   #4b5563  ← Use for descriptions, supporting text
Text Tertiary:    #999999  ← Use for meta info, timestamps
Background:       #ffffff  ← Use for cards, sections
Border:           #e5e7eb  ← Use for dividing lines
```

### Typography Sizes
```
Headlines (H1):      2.5rem (40px)    → Main titles
Headlines (H2):      1.8rem (28.8px)  → Section headings
Headlines (H3):      1.3rem (20.8px)  → Subsection headings
Body Large:          1.1rem (17.6px)  → Large descriptions
Body Standard:       1rem (16px)      → Main body text
Body Small:          0.95rem (15.2px) → Small descriptions
Body Tiny:           0.9rem (14.4px)  → Captions, meta
Label:               0.85rem (13.6px) → Form labels
```

### Typography Weights
```
Regular:           400 weight  → Body text
Semibold:          600 weight  → Form labels, emphasis
Bold:              700 weight  → Subheadings
Heavy/Black:       900 weight  → Main titles
```

### Spacing (Margins & Padding)
```
Extra Small:       0.5rem (8px)   → Tight spacing
Small:             1rem (16px)    → Small gaps between elements
Medium:            1.5rem (24px)  → Standard gaps
Large:             2rem (32px)    → Large spacing, section separation
Extra Large:       3rem (48px)    → Very large gaps
2X Large:          4rem (64px)    → Hero section spacing
```

### Border Radius (Rounded Corners)
```
Small:             6px   → Input fields, small elements
Medium:            8px   → Cards, buttons
Large:             12px  → Large containers
```

### Shadows
```
Subtle:            0 1px 3px rgba(0,0,0,0.1)        → Cards
Standard:          0 4px 12px rgba(0,0,0,0.1)       → Containers
Elevated:          0 10px 20px rgba(0,0,0,0.1)      → Modals
```

---

## 🎨 COLOR USAGE BY DESIGNER

### Designer 1: Instagram Posts (30 files)

**Main Color:** #16a34a (Primary Green)
- Use for post borders
- Use for CTA buttons (e.g., "Learn More")
- Use for emphasis text
- Use for highlight bars

**Secondary Color:** #f0fdf4 (Light Green)
- Use for background tints
- Use for section separations
- Use for badge backgrounds

**Text Color:** #1f2937 (Primary Dark)
- Use for all main text
- Headlines and body

**Accent Color:** #999999 (Tertiary Gray)
- Use for metadata (dates, captions)
- Use for supporting information

**Example Post Structure:**
```
[Lobo Prime 60-140px]
[Headline in #1f2937, font-size: 28-36px, weight: 700]
[Body text in #1f2937, font-size: 16px, weight: 400]
[CTA Button: bg #16a34a, text white, border-radius 8px]
[Meta text in #999999, font-size: 14px]
```

---

### Designer 2: Email Templates (25 HTML files)

**Header Section (600x200px):**
- Background: #16a34a (Primary Green)
- Text: #ffffff (White)
- Lobo: 100x100px centered or left-aligned

**Body Text:**
- Main text: #1f2937, font-size: 16px
- Secondary text: #4b5563, font-size: 14px
- Links: #16a34a (underlined)

**Buttons:**
- Background: #16a34a
- Text: #ffffff
- Padding: 1rem 2.5rem
- Border-radius: 8px
- Font-weight: 700

**Signature Section (bottom):**
- Lobo: 60x60px left-aligned
- Company name: #1f2937, weight: 600
- Email: #4b5563, weight: 400, font-size: 14px

**Background:**
- White (#ffffff) for main content
- Light green (#f0fdf4) for alternating sections

**Example Email Structure:**
```
[Header: #16a34a background, white text, Lobo 100x100]
[Title: #1f2937, 28px, weight: 700]
[Body: #1f2937, 16px, line-height: 1.6]
[CTA Button: #16a34a bg, white text, 8px radius]
[Divider: #e5e7eb border]
[Signature: #1f2937 name + #4b5563 email, Lobo 60x60]
```

---

### Designer 3: Video Thumbnails & Stories

**YouTube Thumbnails (1280x720px):**
- Background: #16a34a or #1f2937 (solid or gradient)
- Text: #ffffff (white for visibility)
- Lobo: 200x200px (must be recognizable at 150x150px preview)
- Highlight accents: #f0fdf4 (light green for text backgrounds)
- Text shadows: 0 2px 8px rgba(0,0,0,0.4) for readability

**Instagram Stories (1080x1920px):**
- Background: Photo or gradient using #16a34a → #f0fdf4
- Lobo: 120-150px (varies per story for composition)
- Text: #ffffff with text shadows for readability
- Glow around Lobo: #f0fdf4 (light green halo, 10-20px blur)
- Safe area: 20px from edges for text placement
- CTA buttons: #16a34a with white text

**Example Thumbnail:**
```
[Background: #16a34a or dark image]
[Lobo 200x200px top-center]
[Headline: white text, 36-44px, weight: 900, centered]
[Subheadline: white text, 24px, weight: 600]
[Safe text area: 40px from center play button]
```

**Example Story:**
```
[Background photo or #16a34a → #f0fdf4 gradient]
[Lobo 120-150px with #f0fdf4 glow (20px blur)]
[Headline: white text, 32px, weight: 700, safe area]
[Interactive element: tap note or CTA]
[Bottom safe area: 20px padding]
```

---

## 🔲 SPACING BY COMPONENT

### Instagram Posts (1080x1080px)
```
Content padding:   spacing-lg (32px) from edges
Section gap:       spacing-md (24px) between sections
Lobo margin:       spacing-md (24px) below/above
CTA margin-top:    spacing-lg (32px)
```

### Email Templates
```
Header padding:    spacing-lg (32px) horizontal, spacing-md (24px) vertical
Body padding:      spacing-lg (32px) horizontal, spacing-md (24px) vertical
Section gap:       spacing-md (24px) between sections
Button margin:     spacing-md (24px) top/bottom
```

### Video Thumbnails
```
Lobo margin from edges:  40px
Text safe area:          40px from center play button
Padding overall:         0px (full bleed)
```

### Stories
```
Safe area edges:    20px padding from all edges
Lobo margin:        spacing-md (24px) from edges
Interactive area:   40px tall at bottom (for taps)
```

---

## 📊 COMPONENT USAGE

### Buttons (Use These Specs Exactly)
```
Background:      #16a34a
Text:            #ffffff
Padding:         1rem 2.5rem (16px top/bottom, 40px left/right)
Font-size:       1rem (16px)
Font-weight:     700
Border-radius:   8px
Shadow:          0 4px 12px rgba(0,0,0,0.1)
On hover:        Background → #15803d, Shadow increases
```

### Form Inputs (Email Capture)
```
Background:      #ffffff
Border:          2px solid #e5e7eb
Border-radius:   6px
Padding:         0.85rem (13.6px)
Font-size:       1rem (16px)
On focus:        Border → 2px solid #16a34a
```

### Cards/Boxes
```
Background:      #ffffff
Border-radius:   12px
Padding:         2rem (32px)
Shadow:          0 1px 3px rgba(0,0,0,0.1)
Margin-bottom:   2rem (32px)
```

### Alerts/Banners
```
Background:      #dc2626 (if alert) or #16a34a (if info)
Text:            #ffffff
Padding:         0.75rem 1rem
Font-size:       0.95rem (15.2px)
Font-weight:     600
Border-radius:   4px (or 0 for full-width banners)
```

---

## 🧩 LINE HEIGHTS (Use These)

```
Headlines:       1.2   (tight, compact)
Body text:       1.6   (standard, readable)
Long passages:   1.8   (relaxed, very readable)
Form labels:     1.6
Captions:        1.4
```

---

## 🚀 LOBO PRIME PLACEMENT SPECS

### Instagram Posts
- **Sizes:** 60px, 80px, 100px, 120px, 140px (depends on post)
- **Position:** Top-right, center, bottom-left (varies per post)
- **Glow:** #f0fdf4 halo, 10-15px blur
- **Drop shadow:** 0 4px 12px rgba(0,0,0,0.15)

### Email Templates
- **Header Lobo:** 100x100px, centered or left-aligned
- **Signature Lobo:** 60x60px, left-aligned above text
- **Spacing from header edge:** 16px padding

### Video Thumbnails
- **Size:** 200x200px
- **Position:** Top-center, must be recognizable at 150x150px
- **Background:** Dark background (#1f2937 or image) so Lobo is visible
- **Glow:** Optional, use dark shadow instead

### Stories
- **Sizes:** 120px, 130px, 140px, 150px (varies per story)
- **Position:** Top-center, center, bottom-right (composition dependent)
- **Glow:** #f0fdf4 halo, 15-20px blur around Lobo
- **Drop shadow:** 0 4px 12px rgba(0,0,0,0.2)

---

## ✅ VALIDATION CHECKLIST

Before submitting your files, verify:

- [ ] **Colors accurate:** Using exact hex values from this guide
- [ ] **Typography sizes:** Match specifications (no arbitrary sizes)
- [ ] **Font weights:** 400, 600, 700, or 900 only
- [ ] **Lobo visible:** Correct size for each component type
- [ ] **Spacing consistent:** Using spacing scale (xs, sm, md, lg, xl, 2xl)
- [ ] **Border radius:** Using 6px, 8px, or 12px only
- [ ] **Shadows match:** Using shadow scale (small, medium, large)
- [ ] **Text readable:** Sufficient contrast at small sizes (thumbnail view)
- [ ] **Mobile safe:** Content doesn't extend beyond safe areas
- [ ] **Naming correct:** Following file naming convention (post-01-*.png, etc.)

---

## 📖 FILES REFERENCE

**Design Token Files:**
- `tokens.yaml` — W3C format (complete specification)
- `tokens.json` — JSON format (for developers)
- `tokens.css` — CSS variables (ready to use)

**Landing Page References:**
- `landing-pages/v1/index.html` — See live implementation
- `LOBO-INTEGRATION-VISUAL-EXAMPLES.md` — Visual examples of Lobo usage

**Brand Asset:**
- `design-system/mascote-lobo-prime/lobo-prime-neutro.png` — Lobo asset (500x500px, scalable)

---

## 🎯 MOST IMPORTANT RULES

1. **Colors:** Use EXACT hex values (copy-paste from this guide)
2. **Lobo:** Always use lobo-prime-neutro.png, scale to specified sizes
3. **Typography:** Only use sizes and weights listed above
4. **Spacing:** Only use spacing values listed (xs, sm, md, lg, xl, 2xl)
5. **Consistency:** Every asset should feel like part of same brand

---

## 💬 Questions?

If you need clarification:
1. Check this reference guide (you're reading it!)
2. Look at LOBO-INTEGRATION-VISUAL-EXAMPLES.md for visual examples
3. Check landing-pages/v1/index.html to see tokens in action
4. Ask immediately - don't guess!

---

**These tokens = your entire brand system. Use them precisely. 🎨⚡**

— Uma, guardiana do design system 💚
