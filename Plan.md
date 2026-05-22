**1-Week Plan**

Here is a practical 7-day breakdown for the FlashCardQuiz project, with a little stretch built in.

**Day 1: Project Setup**
- Finalize the MVP scope.
- Set up repo structure, dependencies, and environment variables.
- Create the base app shell and routing.
- Define the flashcard data model and quiz session model.
- Add placeholder screens for home, quiz, results, and settings.

**Day 2: Core Quiz Flow**
- Build question rendering UI.
- Implement answer selection and submit behavior.
- Add score tracking and per-question feedback.
- Add next-question flow and quiz completion summary.
- Save basic session history locally.

**Day 3: Game Mechanics**
- Add difficulty levels.
- Add timer or streak bonus logic.
- Add lives, XP, or score multipliers.
- Implement level progression rules.
- Add round summary with stats like accuracy and time.

**Day 4: Question Bank and Review**
- Create manual flashcard CRUD.
- Add topic filtering and question categories.
- Build wrong-answer review mode.
- Add simple spaced-repetition or “review later” queue.
- Add validation for card data and duplicate prevention.

**Day 5: LLM Question Generation**
- Add an API adapter for your chosen LLM provider.
- Create a backend endpoint for generating flashcards.
- Force structured JSON output from the model.
- Validate generated questions before saving.
- Add an approval step for AI-generated cards.

**Day 6: UI Polish**
- Improve layout, spacing, and typography.
- Add transitions, hover states, and loading states.
- Make the app responsive for mobile.
- Add keyboard shortcuts and basic accessibility support.
- Clean up empty states and error messages.

**Day 7: Testing and Cleanup**
- Test the full flow end to end.
- Fix bugs in scoring, navigation, and generation.
- Add unit tests for scoring and validation.
- Add fallback behavior when the LLM call fails.
- Prepare a short README with setup and usage steps.

**Stretch Goals**
- Add daily challenge mode.
- Add badges or achievements.
- Add multiple-choice and free-text answer modes.
- Add local persistence or cloud sync.
- Add analytics for topic performance and accuracy.


***How to structure the code?***
- Main components of the app:
    1. Flashcard - UI
    2. Session - Data
    3. Attempt - Data
    4. Level - Domain
    5. Review slide - UI
    6. Topic - Domain
    7. Prompt - Domain
    8. Question bank - Domain
    9. Score slide - UI
    10. Settings - Integration
    11. LLM Provider - Integration

- Main actions:
    1. Begin - UI
    2. Select - UI
    3. Answer - UI + Data
    4. Review - Data
    5. Generate QnA - Integration + Domain
    6. Finish - UI + Data
    7. Persist - Data
    8. Approve/Reject - Integration + Domain
    9. Delete - Data