# Tactical Terminal Interface System (Project: UI母版)

This document is the absolute authority for the design and implementation of the "Tactical Terminal" UI system, inspired by *The Division* and *Arknights*. It merges the **Fundamental Constitution (设定总纲)** with **Aesthetic Patches (美学补丁)**.

## 1. The Design Constitution (不可动摇的原则)

1.  **"Interfaces are Systems"**: We don't build pages; we build terminals. Every screen has state (Online/Busy/Error/Syncing), history, and context.
2.  **"Accent is Functional"**: Accent color (`#FF6A00`) is a tool, not a decoration. Use it ONLY for current focal actions, selected states, critical alerts, or keys. Never use it as a large background fill.
3.  **"Stable Infrastructure"**: Layouts must not jump. Empty/Loading/Error states must share the exact same skeleton as the "Data" state. Only the content layer changes.
4.  **"Diegetic Depth"**: UI exists in a physical space. It should feel projected (Ghost layers) and attached (Content anchors).

## 2. Visual Hierarchy & Physics (视觉语义)

### Information Layers
-   **Level 0 (Metadata)**: Small text (`9-11px`), low opacity (`0.15-0.3`), technical terminology (HEX codes, coordinates).
-   **Level 1 (Content)**: Standard borders (`0.5px border.weak`), Inter font, regular readouts.
-   **Level 2 (Focus)**: Strong borders (`2px border.strong` + `0.5px inner border.weak`), increased brightness.
-   **Level 3 (Critical/Active)**: Accent borders (`2px accent`), glow effects, 4x4px corner anchors, and pulse animations.

### The Ghost Layer System
HUD elements (Values/Titles) must simulate holographic refraction:
-   **Main Layer**: The text (z-index 0).
-   **Shadow Layer**: `::before`, opacity 0.3, blur 3px, offset Y+2px (Black).
-   **Ghost Layer**: `::after`, opacity 0.1, blur 5px, offset Y-2px, X+1px (Accent color).

## 3. Component Standards (组件契约)

### Panels & Layout
-   **L2/L3 Signature**: "Outer-thick, Inner-thin". A 2px outer frame with a 0.5px inner frame.
-   **Header**: Every panel title must be preceded by a vertical 4px accent bar.
-   **List Rows**: Fixed structure: `[Icon] | [Title + Meta] | [Value/Status]`. Empty fields must hide but keep alignment.

### Buttons & Inputs
-   **Button Variants**: `primary` (Accent fill), `secondary` (Border), `ghost` (Text), `danger` (Red).
-   **Dangerous Actions**: Use `HoldButton` (1500ms hold with progress fill). NO popups.
-   **Focus Ring**: Use `.focus-ring` (2px accent ring + 2px offset).

### Motion & Feedback
-   **Quantized Motion**: Numerical changes and progress bars use `steps(10/20)` easing. No smooth arcs.
-   **Scanlines/Particles**: Active on `GridBackground`; MUST pause when `body[data-overlay-open="true"]` is set.
-   **Transitions**: Use `MOTION.duration` constants. instant (80ms) for feedback, base (220ms) for transitions.

## 4. Technical Implementation & Performance

-   **Tailwind + Tokens**: Use `tokens.json` mapped to CSS variables. Never hardcode HEX values.
-   **Degradation**: AI must implement `usePerformanceMode()`:
    -   `full`: Noise, blur, 12 particles, full animations.
    -   `reduced`: No noise, static blur, 6 particles.
    -   `minimal`: No blur, solid background, instant transitions.
-   **Typography**:
    -   `font-hud`: Large numbers (`tabular-nums`), uppercase headers.
    -   `font-mono`: Data logs, timestamps, hex codes.
    -   `font-sans`: Primary UI text.

## 5. Clinical Content Strategy
-   **Tone**: Impersonal, technical, and urgent.
-   **Replacements**:
    -   "Loading..." -> `ESTABLISHING UPLINK...`
    -   "Error" -> `FATAL EXCEPTION: DATA_STREAM_CORRUPTED`
    -   "Login" -> `INTITIALIZE SESSION`
    -   "Empty" -> `NO_RECORDS_FOUND (NULL_PTR)`

## Reference Docs
-   **Constitution**: `doc/设定总纲1.md`, `doc/设定总纲2.md`
-   **Aesthetics**: `doc/美学补丁包 v1.1.md`
-   **Interaction/Perf**: `doc/补丁包2.txt`, `doc/补丁包3.txt`

