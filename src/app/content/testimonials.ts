/* ─────────────────────────────────────────────────────────────────────────────
 * TESTIMONIALS — home page. Mockup approved by Poul 2026-10-01.
 *
 * Text is VERBATIM from the CCP; do not edit wording. Square-bracket text inside
 * a quote is the reviewer's original edited for the current company name and is
 * kept exactly as written.
 *
 * NEVER use the old company name — see the "Norholm Builders" guard in
 * scripts/check-content.mjs.
 * ──────────────────────────────────────────────────────────────────────────── */

export const OAK_COAST_URL = 'https://www.oakcoastconstruction.net/';

export interface AppReview { initials: string; name: string; source: string; date: string; text: string; }

/* ── Section 1: THE APP ──────────────────────────────────────────────────── */
export const FOUNDER = {
  initials: 'PN',
  name: 'Poul Norholm',
  role: 'Founder',
  // "Oak Coast Construction, Inc." is rendered as a link to OAK_COAST_URL.
  company: 'Oak Coast Construction, Inc.',
  license: 'CA Lic. #735734',
  text:
    'I wanted something I could use every day with any job or lead I worked on. ' +
    'This app is for all of us in construction who supervise and manage projects with endless details.',
};

export const APP_REVIEWS: AppReview[] = [
  {
    initials: 'Bo', name: 'Bo', source: 'App Store review', date: 'Sep 27, 2023',
    text:
      'The app is laid out well, easy to navigate, and has lots of features that make running any project a breeze. ' +
      'Contractors and project managers are able to share tasks with the specific people needed, and clients are able ' +
      'to keep track of the job progress at any time. English and Spanish is a huge plus, allowing each user to select ' +
      'their preference and have everything translate seamlessly!',
  },
  {
    initials: 'Mi', name: 'Mi', source: 'App Store review', date: 'Sep 27, 2023',
    text:
      'This app is a one-stop-shop for keeping your projects organized and on track. It is easy to use and is a great ' +
      'help for communicating with subs and anyone else who is involved with the job. Well worth the small fee because ' +
      'of the time and materials saved.',
  },
];

/* ── Section 2: BUILT BY A REAL GC ───────────────────────────────────────── */
export interface ClientReview { initials: string; name: string; role?: string; date: string; text: string; }

/** Shown before "Show all". */
export const CLIENT_REVIEWS_FIRST = 3;

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    initials: 'KP', name: 'Kim Phillips', date: 'Jan 13, 2023',
    text:
      'Just finished a bedroom remodel with some extra touch ups around my house. Poul and his crew did a great job ' +
      'and were easy to work with. I highly recommend Oak Coast Construction, Inc.',
  },
  {
    initials: 'SM', name: 'Steven Mamigonian', date: 'Dec 17, 2018',
    text:
      'I have had many contractors over the years, but by far, none has compared to Poul Norholm and his company. ' +
      'The work he did was excellent, clean, and top-notch. I will recommend [Oak Coast Construction] to everyone. ' +
      'In fact, he is already planning the next job for me, and will do all of my future work. 5++ Stars!!!',
  },
  {
    initials: 'RW', name: 'Richard Wenz', role: 'Wrought iron subcontractor, 15+ years with Poul', date: 'Apr 25, 2018',
    text:
      'Poul is great to work with, honest, trustworthy and clean. I have worked for Poul for around 15 years and ' +
      'I have never been disappointed.',
  },
  {
    initials: 'BJ', name: 'Bryan Johnston', date: 'Dec 17, 2018',
    text:
      'We live in a small house with 2 children under 3 and operate 2 separate businesses from home… Poul came by and ' +
      'took a look at the property and listened to what we wanted to do and was able to work in a project that fit our ' +
      'budget… He took care of ordering the new windows and sliding glass door and got exactly what we wanted. This ' +
      'project could not have gone smoother. I highly recommend [Oak Coast Construction] and will be using them again.',
  },
  {
    initials: 'TK', name: 'Tom Kosta', date: 'Apr 25, 2018',
    text:
      'Poul and his team did a fantastic job on our remodel. They completed the job on time and on budget. I am looking ' +
      'forward to the next project with them.',
  },
  {
    initials: 'BS', name: 'Beau Sisemore', date: 'Apr 1, 2016',
    text:
      "I've worked with many contractors in San Luis Obispo county and Poul has been on the top of my list for many " +
      'years now. Courteous, professional, timely and honest. I highly recommend [Oak Coast Construction] for your next project.',
  },
  {
    initials: 'BH', name: 'bhealey29', date: 'Jul 20, 2015',
    text:
      "[Poul Norholm] was very detailed and precise and great to work with — organizing and selecting our products to " +
      "match the design for his client's needs.",
  },
  {
    initials: 'BC', name: 'Bill Cockshott', role: 'Century 21 Hometown Realtor', date: 'Jul 8, 2015',
    text:
      'Poul is a talented craftsman who pays attention to the smallest detail and keeps in mind the needs of his clients ' +
      'using his services as builder of some of the finest homes on the Central California Coast.',
  },
  {
    initials: 'CM', name: 'Cory Moore', date: 'Jul 7, 2015',
    text:
      'Poul was very professional and on time. He explained the process and made several suggestions that ended up ' +
      'saving us time and money. I would recommend [Oak Coast Construction] for projects big and small.',
  },
];
