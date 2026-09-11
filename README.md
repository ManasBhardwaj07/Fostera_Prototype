# Fostera — Digital Well-Being & Productivity Prototype (V3)
**Conversion-Oriented Engineering Assessment**

> "Don't just track screen time — help users change it."

---

## 1. Executive Summary & Product Thesis
Fostera is a digital well-being product that shifts mobile habits from passive observation to proactive behavioral intervention.

This prototype represents a high-fidelity, interactive **vertical slice** of the product concept defined in the Fostera 45-Day Plan:
- **Product Loop**: Measure → Understand → Intervene → Reward
- **Technical Runtime Loop**: Collect → Aggregate → Classify → Decide → Act → Learn → Reward

---

## 2. Core Architecture & Local-First Principles

```
[ Platform Telemetry / Mock Data ]
              │
              ▼ (Collect)
[ UsageDataProvider Abstraction ]
              │
              ▼ (Aggregate)
[ Domain: Total Screen Time & Top Apps ]
              │
              ▼ (Classify)
[ UsageZoneCalculator (Green → Blue → Yellow → Orange → Red) ]
              │
              ▼ (Decide)
[ LimitEvaluator & Scheduled Blocking Evaluator ]
              │
              ▼ (Act)
[ Active Focus Mode / Nudges / App Restrictions ]
              │
              ▼ (Learn)
[ Deterministic Insight Engine (AI Coach) ]
              │
              ▼ (Reward)
[ Gamification & Progress (Streaks, Badges, Milestones) ]
```

### Telemetry Boundary: Mock vs. Production
- **Current Prototype (`MockUsageDataProvider`)**: Supplies deterministic baseline telemetry (4h 32m total: YouTube 1h42m, Instagram 1h08m, Chrome 46m, WhatsApp 31m, Spotify 25m).
- **Production Implementation (`AndroidUsageDataProvider`)**: Replaces the mock provider with native `android.app.usage.UsageStatsManager` queries. Because the domain logic is decoupled from telemetry collection via the `UsageDataProvider` interface, swapping this out requires zero rewrites to the UI or business logic.

---

## 3. The 5 Screen-Time Zones

| Zone | Usage Threshold | Label | Implication |
| :--- | :--- | :--- | :--- |
| **GREEN** | Under 2 hrs (< 120m) | **Ideal** | Optimal digital balance |
| **BLUE** | 2–3 hrs (120m–179m) | **Good** | Mindful and controlled |
| **YELLOW** | 3–5 hrs (180m–299m) | **Awareness** | Attention required on distractions |
| **ORANGE** | 5–7 hrs (300m–419m) | **Warning** | High risk of fatigue and distraction |
| **RED** | Above 7 hrs (≥ 420m) | **Action Required** | Immediate intervention recommended |

---

## 4. Key Functional Areas

1. **Screen-Time Monitoring (Today Tab)**
   - Total screen time calculation (4h 32m)
   - Personalized target comparison (4h goal → 32m over goal)
   - Real-time Zone badge (**Awareness**)
   - Weekly usage trend chart with 4h goal line and highlighted Friday (Today)

2. **Custom Limits**
   - Per-app daily limits (30m, 1h, 2h, Custom)
   - Dynamic recalculation into **UNDER**, **AT_LIMIT**, or **EXCEEDED**
   - Immediate feedback in app lists and detail sheets

3. **Intervention: Focus Mode (Focus Tab)**
   - Multi-app distraction restriction (YouTube, Instagram, Chrome)
   - Preset durations (15m, 25m, 45m, 60m)
   - Active countdown timer with live state persistence
   - Fast-forward/completion trigger for rapid assessment demo
   - Celebratory completion view updating streaks and today's focused total

4. **Scheduled Blocking**
   - Time-windowed automatic routines (e.g., Study Hours: Mon–Fri 09:00–12:00)
   - Persistent enabled/disabled toggles and rule creation

5. **Gradual Reduction**
   - Multi-day habit step-down plan for high-friction apps (YouTube 120m → 60m over 5 days)

6. **Behavioral Rewards (Progress Tab)**
   - Daily focus streak tracking (4 → 5 days)
   - Achievement badges (First Focus, 3-Day Streak, Goal Achieved, Mindful Monk)
   - Next milestone tracker

7. **Deterministic AI Coach & Nudges**
   - Contextual insight calculations (e.g. YouTube + Instagram 63% dominance)
   - Actionable banners with one-click Focus or Limit adjustments

---

## 5. 21-Step Deterministic Demo Walkthrough

1. Open Fostera at `http://localhost:5173/`.
2. Observe personalized goal = **4 hours**.
3. Observe today's usage = **4h 32m** (32m over goal).
4. Verify current zone = **Awareness (YELLOW)**.
5. Review AI Coach Insight: *"YouTube + Instagram account for 63% of today's usage."*
6. Click on **YouTube** in the Top Consuming Apps list.
7. Click **Set Limit**, select **1 hour**, and click **Save Limit**.
8. Notice status updates immediately to **42m over limit (EXCEEDED)**.
9. Click **Start Focus** from YouTube detail or switch to the **Focus** tab.
10. Ensure **YouTube** and **Instagram** are selected with **25 min** duration.
11. Click **Start 25-Minute Focus**.
12. Observe **FOCUS MODE ACTIVE** screen with live countdown timer and restricted apps.
13. Click **Complete Session (Fast-Forward)** to simulate session end.
14. Review celebratory **Focus Session Complete** modal (+25m focused, streak updated).
15. Click **View Progress & Rewards** to transition to the **Progress** tab.
16. Verify updated streak (**5 Days**), today's focus (**25m**), and unlocked badges.
17. Return to **Today** and click **Scheduled Blocking** card to view the active **Study Hours** rule (09:00–12:00).
18. Click **Gradual Reduction** card to inspect the 5-day step-down detox plan (120m → 60m).
19. Click **Key Insight** card to open the complete Actionable Insights panel.
20. Tap the top-right settings cog (⚙️) to open Assessment Controls.
21. (Optional) Replay Onboarding or Reset Demo data back to initial defaults.

---

## 6. How to Run Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Production build verification
npm run build
```
