/**
 * JSON-LD structured-data objects used across the marketing site.
 * Injected per-page via JsonLdComponent so each schema lands only where its
 * matching content is visible (Google requires FAQ schema to match the page).
 */

const QA = (question: string, answer: string) => ({
  '@type': 'Question',
  name: question,
  acceptedAnswer: { '@type': 'Answer', text: answer },
});

/** Home page FAQ — mirrors the visible Q&A in home.component.html. */
export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    QA(
      'What is See Job Run?',
      'See Job Run is construction management software for independent general contractors and small crews. It puts job scheduling, task assignments, time tracking, job-site photos, documents, subcontractor bid requests, and reports in one app you can use on your phone, tablet, or computer.',
    ),
    QA(
      'Who is See Job Run for?',
      'See Job Run is built for small and independent general contractors, remodelers, and custom-home builders who run their own crews and subcontractors. It is designed to replace scattered spreadsheets, group texts, and paper with one organized system.',
    ),
    QA(
      'How much does See Job Run cost?',
      'See Job Run plans start at $29/month, with a $19/month Bid Pro option for contractors who mainly send and sign subcontractor bids. There is a free trial to start, and subcontractors can receive and respond to bid requests at no cost.',
    ),
    QA(
      'How do I send a bid request to several subcontractors at once?',
      'With See Job Run you create one bid request, share the same plan set, and invite multiple subcontractors per trade in a few taps. Each sub fills out your bid form right in the app, so you can compare bids side by side and award the job without chasing PDFs or emails.',
    ),
    QA(
      'Does See Job Run work in Spanish?',
      'Yes. See Job Run runs in both English and Spanish, and each user picks their own language. Typed job notes, tasks, and updates translate automatically, so English- and Spanish-speaking crews stay on the same page.',
    ),
    QA(
      'What devices does See Job Run work on?',
      'See Job Run works on iPhone, iPad, Android phones and tablets, and any desktop web browser. Your jobs, schedule, photos, and documents stay in sync across every device.',
    ),
    QA(
      'Can subcontractors use See Job Run for free?',
      'Yes. Subcontractors can receive bid requests, view shared plans, submit a bid, and sign a subcontract for free. Sending your own bid requests and managing your jobs is part of the paid plans.',
    ),
    QA(
      'How is See Job Run different from spreadsheets or group texts?',
      'See Job Run keeps every job schedule, tasks, photos, documents, and bids in one organized place instead of scattered across spreadsheets, texts, and email. Everyone on the job sees the latest plan, so nothing gets lost or double-handled.',
    ),
  ],
};

/** Comparison page FAQ. */
export const COMPARE_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    QA(
      'What is the best app for a small general contractor?',
      'The best app for a small general contractor is one that combines job scheduling, task tracking, time, photos, documents, and subcontractor bidding in a single tool that works on the phone and the desktop. See Job Run was built specifically for independent GCs and small crews, starting at $29/month, with English and Spanish built in.',
    ),
    QA(
      'How is See Job Run different from Buildertrend, Procore, or CoConstruct?',
      'See Job Run is built for small and independent contractors, not large builders, so it is simpler and far less expensive than enterprise tools like Procore, Buildertrend, or CoConstruct. It focuses on the day-to-day a small GC actually needs — scheduling, tasks, time, photos, and sending subcontractor bids — without per-project pricing or long onboarding.',
    ),
    QA(
      'Is See Job Run better than running my jobs on spreadsheets and texts?',
      'Spreadsheets and group texts scatter your schedule, photos, and bids across different places where things get lost. See Job Run keeps every job in one organized place that the whole crew can see, so the latest plan, tasks, and documents are always in one spot.',
    ),
    QA(
      'Does See Job Run handle subcontractor bidding?',
      'Yes. See Job Run lets a general contractor send one bid request, share plans, and invite multiple subcontractors per trade who each fill out the bid form in the app. The GC compares bids side by side, awards by trade, and moves the winning bid into a subcontract — all in one place.',
    ),
  ],
};
