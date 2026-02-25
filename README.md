# FUEL MANIFEST (Calorie Tracker Frontend)

![OpenClaw](https://img.shields.io/badge/OpenClaw-Ecosystem-orange?style=flat-square)

A visual calorie tracking web application hosted on GitHub Pages, deeply integrated with the **OpenClaw Agent Framework** to provide a seamless end-to-end tracking experience via WhatsApp.

---

## 🤖 OpenClaw Integration Architecture

The frontend is not updated manually. Instead, it is driven autonomously by specialized AI subagents within the OpenClaw ecosystem.

### 1. Bri (Wellness Coach Subagent)
Bri is a specialized agent responsible for managing the user's diet and wellness. Her core directives ([BRI_SOUL.md](./BRI_SOUL.md)) instruct her to:
- Intercept user messages regarding food intake.
- **Visual & Textual Interpretation:** Automatically estimate the caloric value of meals by processing natural language descriptions or directly analyzing uploaded photos of the user's food.
- **Interactive Coaching:** Engage in a back-and-forth dialogue with the user to clarify portion sizes or ingredients, ensuring accurate calorie calculations before logging.
- Persist the data directly into a local CSV file.
- Trigger the deployment and delivery pipeline automatically upon confirmation.

### 2. The Data Store (`DIET_LOG.csv`)
All confirmed nutritional data is written locally by Bri into a simple comma-separated values file (`DIET_LOG.csv`) on the host machine. This acts as the single source of truth for the user's daily caloric intake.

### 3. The Sync Pipeline (`sync-tracker.sh`)
Once Bri adds an entry to the CSV, she executes a global bash script (`sync-tracker.sh`). This script handles the entire deployment and delivery flow:
1. **Data Compilation:** It executes `update-data.js` to parse today's entries from `DIET_LOG.csv` and compile them into the structured `docs/data.json` format expected by this "FUEL MANIFEST" frontend.
2. **Deployment:** It automatically commits and pushes the new `data.json` to this GitHub repository, triggering a live update on GitHub Pages.
3. **Capture:** To avoid deployment delays, it spins up a temporary local HTTP server, uses `shot-scraper` to take an instant, high-resolution screenshot of the updated frontend.
4. **Delivery:** It uses the `openclaw message send` CLI to securely push the fresh screenshot directly back to the user's WhatsApp group.

---

## 🔄 End-to-End Workflow Example

Here is how the automated workflow executes in real-time, completely hands-free from the user's perspective:

1. **Input:** The user sends a casual WhatsApp message: _"I ate a big slice of pizza for dinner."_
2. **Routing:** The system identifies this as a diet task and routes it to `Bri`.
3. **Estimation:** Bri processes the natural language, estimates the slice at roughly 300-400 calories, and confirms the addition with the user.
4. **Logging:** Bri executes a bash command to append `2026-02-25,Big slice of pizza,350` to `DIET_LOG.csv`.
5. **Syncing:** Bri instantly executes `/home/clawbot/workspaces/global/sync-tracker.sh`.
6. **Delivery:** The script pushes the JSON data to GitHub and instantly delivers a `🟩🟩🟩⬜⬜` stylized screenshot of the updated FUEL MANIFEST UI back to the WhatsApp chat.

### Recent Examples Processed:
- **User:** _[Sends a photo of a plated meal]_ "I ate these"
  - **Bri:** Interprets the photo as a full plate of chicken curry and rice. Engages the user to confirm portion size, estimates at 700 calories, and logs it. Script triggered. Output visual updated instantly with new progress blocks.
- **User:** _"I ate a small apple."_
  - **Bri:** Estimated at 95 calories, logged to CSV, script triggered. Output visual: 707 / 1880 KCAL.

---

## How it works (Local Dev)

1. **Update the data locally:**
    ```bash
    node update-data.js
    ```
2. **Serve the frontend locally (for screenshot testing):**
    ```bash
    python3 -m http.server 8080 -d docs
    ```
3. **GitHub Pages Setup:**
    - Branch: `master`
    - Source folder: `/docs`

---

**Tags:** #openclaw #agent-framework #automation #wellness
