# 📄 Product Requirements Document (PRD)  
**Project:** AI-Enhanced Flashcard & Learning App (Cross-Platform)  
**Version:** v1.0  
**Date:** [Insert Date]  
**Owner:** [Your Name / Team]  

---

## 1. **Overview**
We are building a modern, AI-powered flashcard application inspired by Anki but designed with a more user-friendly, minimal, and modern interface.  

The product will:  
- Support **desktop first (Windows + Mac)**, later extended to **mobile (iOS + Android)**.  
- Allow users to **create, review, and sync flashcards across devices**.  
- Integrate with the **Perplexity API** to generate researched responses and AI-generated flashcards.  
- Include **subscriptions & payments** to limit API usage for free users and provide advanced AI features to pro users.  
- Provide **Google OAuth authentication**.  
- Ensure **secure, scalable data storage and sync**.  

---

## 2. **Goals & Objectives**
- Build a **cross-platform flashcard app** with offline + online sync.  
- Provide **AI-enhanced study tools** (generate flashcards from user queries).  
- Implement **subscription tiers** (Free vs Pro) with usage limits.  
- Deliver a **modern, simple UI** that improves user experience over Anki.  

---

## 3. **Key Features**

### Core Features
1. **Flashcard & Deck Management**  
   - Create, edit, delete flashcards.  
   - Organize into decks.  
   - Support spaced repetition with advanced scheduling.  

2. **AI Integration (Perplexity API)**  
   - Users can ask questions → app fetches researched answers.  
   - Save responses as flashcards.  
   - Quota-limited per subscription plan.  

3. **Sync & Offline Support**  
   - Store data locally (SQLite).  
   - Sync via cloud (Firestore/Postgres).  
   - Conflict resolution via timestamps.  

4. **User Authentication**  
   - Google OAuth login.  
   - Optional local-only mode (offline users).  

5. **Subscription & Payments**  
   - Free tier: limited daily API usage.  
   - Pro tier: higher quota, priority access.  
   - Stripe for billing (web/desktop).  
   - RevenueCat for mobile App Store/Play Store subscriptions.  
   - Webhooks keep subscription status synced.  

6. **Review System**  
   - Spaced repetition algorithm (based on SM-2, improved adaptively).  
   - Track review history per flashcard.  
   - Provide insights (accuracy, progress tracking).  

---

## 4. **System Architecture**

**Frontend:**  
- Desktop: **Tauri + React**  
- Mobile: **React Native**  
- Shared design system  

**Backend:**  
- Option A: Firebase (Auth, Firestore, Functions).  
- Option B: Custom Node.js backend (Express/NestJS + PostgreSQL).  
- Backend handles authentication, subscription checks, API proxying, sync.  

**Database Schema (Core Tables):**  
- `users` (Google OAuth ID, profile info)  
- `subscriptions` (plan, status, provider)  
- `api_usage` (daily quota tracking)  
- `decks` (deck metadata)  
- `flashcards` (front/back content, AI source link)  
- `reviews` (review history, spaced repetition data)  
- `ai_responses` (logs of Perplexity queries and results)  

---

## 5. **System Diagram**
```
Frontend (Desktop + Mobile) 
   ↓
Backend API (Auth, Subscriptions, Sync, AI Proxy)
   ↓
Database (Users, Subscriptions, Flashcards, Decks, Reviews, API Usage, AI Responses)
   ↔ External Services:
      - Google OAuth
      - Stripe / RevenueCat
      - Perplexity API
```

---

## 6. **Security**
- OAuth handled via Firebase Auth or OAuth 2.0.  
- All communication encrypted (TLS 1.3).  
- Sensitive data (tokens, API keys) never stored on client.  
- Flashcard data encrypted at rest.  
- Rate limiting and usage tracking to prevent abuse.  

---

## 7. **Design Requirements**
- **Modern, minimal UI** (Material 3 / Fluent design influence).  
- **Dark mode support**.  
- **Accessibility** (keyboard shortcuts, screen reader support).  
- **Smooth animations and micro-interactions**.  

---

## 8. **Subscription Tiers**

| Tier    | Features | API Quota | Notes |
|---------|----------|-----------|-------|
| Free    | Basic flashcards, sync, limited AI queries | 10/day | Entry-level |
| Pro     | Unlimited decks, higher AI usage, priority support | 100/day | Subscription fee |
| Enterprise (future) | Team features, shared decks, bulk AI | Custom | Larger orgs |

---

## 9. **Roadmap**
**Phase 1: Desktop MVP**  
- Flashcards, decks, local storage.  
- Google OAuth login.  
- Basic sync.  

**Phase 2: Backend & AI**  
- Firebase/Node backend.  
- Perplexity API integration.  
- AI response → flashcard creation.  

**Phase 3: Subscriptions**  
- Stripe integration.  
- Usage quota enforcement.  

**Phase 4: Mobile Apps**  
- React Native frontend.  
- RevenueCat integration.  

**Phase 5: Enhancements**  
- Collaboration, deck sharing.  
- Advanced spaced repetition with AI.  

---

## 10. **Success Metrics**
- % of users converting from free → pro.  
- Average daily AI queries per user.  
- Deck/flashcard creation rate.  
- Sync reliability across devices.  
- User satisfaction (measured by NPS or feedback).  
