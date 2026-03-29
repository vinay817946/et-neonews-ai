
# ET NeoNews AI

Real-world hackathon prototype for Topic 8: AI-Native News Experience.

## Included
- Firebase Authentication (email/password + Google)
- Firestore-backed real-time watchlist
- Protected dashboard/pages
- OpenAI-powered briefing, story arc, translation, chat, and video-script routes
- Premium UI across landing page, dashboard, briefing, tracker, language engine, video studio, and watchlist

## Setup
1. Create `.env.local`
2. Add your OpenAI key
3. Add your Firebase public config
4. Enable **Email/Password** and **Google** in Firebase Auth
5. Create Firestore database in production or test mode
6. Run:
   ```bash
   npm install
   npm run dev
   ```

## Firestore Rules for Demo
```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
