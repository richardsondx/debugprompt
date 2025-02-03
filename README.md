# DebugPrompt

**DebugPrompt** is an open-source directory where developers share and discover AI debugging prompts. Whether you're tracing data flows, diagnosing errors, or comparing approaches, DebugPrompt helps you debug smarter.

[![Image from Gyazo](https://i.gyazo.com/de3cf14b56b7d5e19d5a9bcba66874e2.png)](https://gyazo.com/de3cf14b56b7d5e19d5a9bcba66874e2)

---

## Features
- 🛠️ Curated debugging prompts for AI-powered coding
- 📂 Organized by categories: Error Diagnosis, Data Flow Tracing, Pseudocode Analysis, and more
- 🌐 Open-source and community-driven
- 🎥 Learn section with developer tutorials
- 🖥️ Futuristic, minimalistic UI with dark theme

---

## Contribute

### Submit a New Prompt
1. Fork this repository.
2. Add your prompt to `data/prompts.json` following the template below.
3. Use the template below:
   ```json
   {
     "id": "last id + 1",
     "category": "Category",
     "tags": ["tag1", "tag2"],
     "prompt": "Your debugging prompt here...",
     "model": ["claude-3.5-sonnet"],
     "author": {
       "github": "https://github.com/yourusername"
     }
   }
   ```
4. Submit a pull request with the title [Prompt] Your Prompt Title.

[Submit a Prompt →](data/prompts.json)

## Categories Overview

| Category                | Description                                                                                         |
|-------------------------|-----------------------------------------------------------------------------------------------------|
| Error Diagnosis         | Identifying why an error occurs, highlighting root causes and solutions.                           |
| Data Flow Tracing       | Tracking how data moves through the system by highlighting components and interactions.            |
| Approach Comparison     | Evaluating different methods to solve a problem, noting trade-offs like efficiency and readability.|
| Pseudocode Analysis     | Converting logic into structured steps, focusing on identifying gaps and edge cases.                |
| Assumption Testing      | Validating hypotheses about bugs through rigorous testing and verification.                      |
| Refactoring             | Improving code structure without changing functionality, emphasizing clean code and maintainability. |
| Performance Tuning      | Optimizing speed and resource usage by addressing bottlenecks and efficiency improvements.         |
| Prompt Iteration        | Refining prompts for better AI responses, focusing on clarity and specificity.                     |
| Test Generation         | Creating tests to cover various scenarios through automated checks and edge case consideration.    |
| Environment Debugging   | Fixing setup and configuration issues to ensure compatibility across environments.               |
| Security Analysis       | Identifying vulnerabilities and protecting the system against threats.                           |
| Edge Case Handling      | Managing unexpected inputs with a focus on robustness and validation.                            |
| Logic Breakdown         | Dissecting complex algorithms to understand components and flow.                                |
| Dependency Debugging    | Resolving issues with third-party dependencies including conflicts and compatibility problems.   |
| Code Optimization       | Enhancing efficiency and readability using best practices and design patterns.                   |

These categories map to the entire debugging lifecycle – from detecting issues (Error Diagnosis) to preventing recurrence (Test Generation). They reflect modern challenges like AI hallucination mitigation (Prompt Iteration) and dependency hell resolution (Dependency Debugging).

### Submit a Learning Video
1. Fork this repository.
2. Edit the `videos` array in `app/learn/page.tsx`.
3. Add your video using the template below:
   ```typescript
   {
     id: "last id + 1",
     title: "Your Video Title",
     videoId: "YOUR_YOUTUBE_VIDEO_ID",
     author: {
       name: "Your Name",
     },
     description:
       "A brief description of your video (keep it concise).",
   }
   ```
   Note: The `videoId` can be found in your YouTube URL (e.g., for https://youtube.com/watch?v=ABC123, the ID is ABC123)
4. Submit a pull request with the title [Learn] Your Video Title.

[Submit a Video →](data/video.json)

### Advertise on DebugPrompt
We offer ad spaces to approved advertisers. To submit an ad:

1. Fork this repository.
2. Create a new JSON file in `ads/your-company-name.json`.
3. Use the template below:
   ```json
   {
     "company": "Your Company Name",
     "logo": "https://yourdomain.com/logo.png",
     "title": "Your Ad Title",
     "description": "Your ad description (max 100 characters).",
     "link": "https://yourdomain.com"
   }
   ```
4. Submit a pull request with the title [Ad] Your Company Name.
5. Pay for your ad via our Stripe Payment Link. You will be redirected to a form to fill in your details. Once approved your add will be added to the `ads.json` file.

[Submit an approved Ad →](data/ads.json)

## Development
Clone the repo:
```bash
git clone https://github.com/richardsondx/debugprompt.git
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Env variables (create a `.env.local` file):
```
UPSTASH_REDIS_REST_URL=https://your-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```
We use this for counting the copies on prompts.

## License
MIT License. See LICENSE for details.

Built by Richardson Dackam • [Follow me on X](https://x.twitter.com/richardsondx)
