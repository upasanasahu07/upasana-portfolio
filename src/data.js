// All content comes from Upasana_Sahu_CV_v3.docx. Edit here; components only render it.

export const profile = {
  name: 'Upasana R. Sahu',
  role: 'Clinician-Scientist · PhD Candidate, Rehabilitation Sciences',
  place: 'University of Illinois Chicago',
  email: 'usahu2@uic.edu',
  scholar: 'https://scholar.google.com/citations?user=obps19wAAAAJ',
  linkedin: 'https://www.linkedin.com/in/upasana-s-7a293898/',
  lab: 'Cognitive, Motor & Balance (CogMoBal) Lab',
}

export const heroStats = [
  { n: 12, suffix: '+', label: 'years in neuro rehab & research' },
  { n: 6, suffix: '', label: 'peer-reviewed publications' },
  { n: 13, suffix: '+', label: 'conference presentations' },
  { n: 11, suffix: '', label: 'awards & honors' },
]

// ---------- Three sides ----------
export const projects = [
  { id: 'diss', short: 'Dissertation', title: 'Muscle fatigue, vibration & reactive balance', note: 'Independent dissertation · candidacy passed Oct 2024' },
  { id: 'r01', short: 'NIH R01 / DOD', title: 'Slip & trip perturbation studies', note: 'Aging adults with stroke, MS and MCI' },
  { id: 'cogx', short: 'CogXergaming', title: 'Gaming-based tele-exercise RCT', note: 'Lead RA · published JMIR 2024' },
  { id: 'ms', short: 'MS online study', title: 'DOD online cognitive intervention', note: 'Led remote recruitment & data collection' },
  { id: 'meta', short: 'Reviews', title: 'Systematic reviews & meta-analyses', note: 'Arch PM&R 2024 · CSM 2024 & 2026' },
]

export const skills = [
  { name: 'Qualisys motion capture', group: 'Lab', uses: ['diss', 'r01'] },
  { name: 'Bertec force platforms', group: 'Lab', uses: ['diss', 'r01'] },
  { name: 'Delsys EMG', group: 'Lab', uses: ['diss'] },
  { name: 'ActiveStep treadmill', group: 'Lab', uses: ['diss', 'r01'] },
  { name: 'Ankle / back vibrators', group: 'Lab', uses: ['diss'] },
  { name: 'IMU wearables', group: 'Lab', uses: ['r01'] },
  { name: 'Telehealth delivery', group: 'Digital', uses: ['cogx', 'ms'] },
  { name: 'REDCap', group: 'Data', uses: ['r01', 'cogx', 'ms'] },
  { name: 'SPSS', group: 'Data', uses: ['diss', 'r01', 'cogx'] },
  { name: 'MATLAB', group: 'Data', uses: ['diss', 'r01'] },
  { name: 'PRISMA / PROSPERO', group: 'Data', uses: ['meta'] },
  { name: 'IRB, GCP & HIPAA', group: 'Ops', uses: ['diss', 'r01', 'cogx', 'ms'] },
]

export const teaching = [
  { k: 'PT 550', t: 'Game-based teaching session for 10 graduate students' },
  { k: 'Mentor', t: 'Trained undergrad & new grad students in Qualisys analysis' },
  { k: 'TA 2026', t: 'Teaching assistant, UIC Physical Therapy program' },
  { k: 'Grader', t: 'Clinical simulation grader, PT 622 & DPT finals' },
  { k: 'Judge', t: 'UIC Undergraduate Research Forum, 2 years' },
]

// From LinkedIn (most recent first)
export const certifications = [
  { name: 'Research Security & Integrity', year: '2026' },
  { name: 'GCP for Clinical Trials — Drugs & Medical Devices (FDA focus)', year: 'CITI' },
  { name: 'Biomedical Research Investigators & Key Personnel', year: 'CITI' },
  { name: 'HIPAA for Healthcare Workers', year: 'CITI' },
  { name: 'C/NDT — Neurodevelopmental Treatment (31-day NDTA)', year: 'Clinical' },
]

export const populations = [
  { name: 'Stroke', w: 5 }, { name: 'Cerebral palsy', w: 4 }, { name: 'Aging adults', w: 5 },
  { name: 'MCI', w: 4 }, { name: 'MS', w: 3 }, { name: 'TBI', w: 3 }, { name: "Parkinson's", w: 2 },
  { name: 'SCI', w: 2 }, { name: 'Frailty', w: 3 }, { name: 'ICU / acute neuro', w: 3 }, { name: 'Pediatric neuro', w: 4 },
]

export const clinicalSkills = ['C/NDT certified', 'Bobath', 'PNF', 'MRP approach', 'Aquatic therapy', 'FES in stroke', 'Perturbation training', 'Early ICU mobilization']

export const clinicalJobs = [
  { y: '2013–14', role: 'Pediatric & outpatient physio', where: 'Happy Hours Centre · Thane hospitals', tag: 'Pediatric' },
  { y: '2017–18', role: 'Pediatric aquatic therapist', where: "Baby's Castle, Mumbai", tag: 'Aquatic' },
  { y: '2017–19', role: 'Neuro-physiotherapist', where: 'Bhaktivedanta Hospital · adult & pediatric OPD and ICU', tag: 'Hospital' },
  { y: '2019–20', role: 'Senior physiotherapist', where: 'Physiocure, Mumbai · fall-prevention programs', tag: 'Outpatient' },
  { y: '2020–21', role: 'Lead ICU COVID-19 physio', where: 'NESCO COVID Centre (MCGM) · led the physio team', tag: 'Crisis ICU' },
]

export const personal = {
  languages: ['English', 'Hindi', 'Marathi', 'Kannada'],
  loves: [
    { icon: 'paw', t: 'Fostering animals' },
    { icon: 'wave', t: 'Kayaking' },
    { icon: 'peak', t: 'Hiking' },
    { icon: 'bowl', t: 'Exploring cuisines' },
    { icon: 'globe', t: 'New cultures' },
  ],
  instructor: ['Pilates (primary & advanced)', 'Power yoga', 'Aerobics & spinning', 'Pre/postnatal fitness'],
  volunteering: ['Project Hood fall prevention', 'MS Walk & MS Bike Ride', 'UIC Community Health Fair', 'Tutoring Chicago', 'Chicago India Day Fair', 'Stroke & CP camps in Maharashtra'],
  route: [
    { city: 'Mangalore', what: 'BPT', x: 0.1 },
    { city: 'Pune', what: 'MS-PT, ranked 1st', x: 0.32 },
    { city: 'Mumbai', what: 'Clinician · COVID ICU', x: 0.52 },
    { city: 'Chicago', what: 'PhD, UIC', x: 0.9 },
  ],
}

// ---------- Education ----------
export const education = [
  { years: '2008 – 2012', degree: 'BPT, Physiotherapy', school: 'Vikas College of Physiotherapy (RGUHS), Mangalore', badge: 'With internship' },
  { years: '2014 – 2017', degree: 'MS-PT, Neurosciences', school: 'Sancheti Institute College of Physiotherapy (MUHS), Pune', badge: 'Ranked 1st in dept.' },
  { years: '2021 – now', degree: 'PhD, Rehabilitation Sciences', school: 'University of Illinois Chicago', badge: 'Candidacy passed · GPA 3.66' },
]

export const dissertation = {
  title: 'Sensorimotor Modulations and Their Impact on Reactive Balance: Examining Muscle Fatigue Effects',
  status: 'Active data collection',
  chair: 'Dr. Tanvi Bhatt, PT, PhD (Chair & Advisor)',
  committee: ['Dr. Alexander S. Aruin', 'Dr. Shuaijie Wang', 'Dr. Chih-Hsiung Wang', 'Dr. Gonzalo Varas Diaz (Pontifical Catholic Univ. of Chile)'],
}

// credits per course area, from the coursework table
export const coursework = [
  { area: 'Statistics', credits: 12, color: 'var(--teal)', courses: 'EPSY 503 · 547 · 543' },
  { area: 'Rehab science', credits: 13, color: 'var(--sage)', courses: 'PT 505 · 506 · 563 · 598' },
  { area: 'Biomechanics & motor control', credits: 8, color: 'var(--coral)', courses: 'PT 571 · PT 510 · KN 410' },
  { area: 'Teaching, grants & ethics', credits: 7, color: 'var(--sand)', courses: 'PT 550 · KN 594 · GC 501 · KN 501' },
]

// ---------- Research ----------
export const publications = [
  { year: 2026, first: false, theme: 'balance', journal: 'Medicine & Science in Sports & Exercise', title: 'Combined effects of vestibular dysfunction and mild cognitive impairment on reactive stepping responses in older adults', authors: ['Pitts J', 'Mehta T', 'Kannan L', 'Wang S', 'Master M', 'Sahu U', 'Deshmukh S', 'Purohit R', 'Bhatt T'], doi: '10.1249/MSS.0000000000003945' },
  { year: 2026, first: true, theme: 'tele', journal: 'Topics in Geriatric Rehabilitation', title: 'Assessing the effectiveness of tele-exercise on physical function in older adults: a pre-post study', authors: ['Sahu U', 'Subramaniam S', 'Purohit R', 'Wilson E', 'Bhatt T'], doi: null, status: 'Accepted' },
  { year: 2024, first: false, theme: 'balance', journal: 'Journal of Biomechanics', title: 'Does proprioceptive reweighting contribute to reactive balance strategies during slip-like perturbations?', authors: ['Van Criekinge T', 'Sahu U', 'Claeys K', 'Bhatt T'], doi: '10.1016/j.jbiomech.2024.112378' },
  { year: 2024, first: false, theme: 'tele', journal: 'Journal of Medical Internet Research', title: 'Gaming-based tele-exercise program to improve physical function in frail older adults: feasibility RCT', authors: ['Kannan L', 'Sahu U', 'Subramaniam S', 'Mehta N', 'Kaur T', 'Hughes S', 'Bhatt T'], doi: '10.2196/56810' },
  { year: 2024, first: false, theme: 'dual', journal: 'Archives of Physical Medicine & Rehabilitation', title: 'Effect of explicit prioritization on dual tasks during standing and walking in neurologic and neurocognitive disorders: a meta-analysis', authors: ['Van Criekinge T', 'Sahu U', 'Bhatt T'], doi: '10.1016/j.apmr.2024.02.714' },
  { year: 2017, first: true, theme: 'measure', journal: 'Journal of the Indian Academy of Geriatrics', title: 'Translation and cross-cultural adaptation of the ABC Scale for Maharashtra', authors: ['Sahu U', 'Kulkarni VN'], doi: null },
]

export const themes = {
  balance: { label: 'Reactive balance', color: 'var(--teal)' },
  dual: { label: 'Thinking + moving', color: 'var(--coral)' },
  tele: { label: 'Tele-rehab', color: 'var(--sage)' },
  measure: { label: 'Measurement', color: 'var(--sand)' },
}

export const presentations = [
  { year: 2022, venue: 'ISPGR', primary: true, title: 'Reactive gait stability to overground slips: older adults with vs. without MCI' },
  { year: 2023, venue: 'CSM', primary: true, title: 'Cognitive domain contribution to reactive balance control in older adults' },
  { year: 2024, venue: 'SfN', primary: true, title: 'Does unilateral quadriceps fatigue worsen reactive stability during walk-slips?' },
  { year: 2024, venue: 'CSM', primary: false, title: 'Explicit prioritization in dual-task paradigms: a meta-analysis' },
  { year: 2024, venue: 'CSM', primary: false, title: 'Non-interactive exergaming for frail elderly: Mimic-Game-&-Groove trial' },
  { year: 2025, venue: 'ACRM', primary: true, title: 'Unilateral quadriceps fatigue increases trip-related falls in young adults' },
  { year: 2025, venue: 'CSM', primary: false, title: 'Vestibular dysfunction increases lab falls in older adults with MCI' },
  { year: 2025, venue: 'ISPGR', primary: false, title: 'Priming effects of mechanical vibration on trip-like perturbations' },
  { year: 2026, venue: 'CSM', primary: true, title: 'Muscle fatigue location and reactive balance: a systematic review' },
  { year: 2026, venue: 'CSM', primary: false, title: 'Can FES reduce fall risk and cognitive-motor interference post-stroke?' },
  { year: 2026, venue: 'CSM', primary: false, title: 'Multimodal balance intervention for cognitive & physical impairments in MS' },
]

// ---------- Awards ----------
export const awards = [
  { year: 2017, name: 'Ranked 1st, Neurosciences PT', org: 'Sancheti Institute', kind: 'rank' },
  { year: 2021, name: 'Board of Trustees Award', org: 'UIC', kind: 'bot' },
  { year: 2022, name: 'Board of Trustees Award', org: 'UIC', kind: 'bot' },
  { year: 2023, name: 'Lillian Torrance Award', org: 'UIC Rehabilitation Sciences', kind: 'lt' },
  { year: 2023, name: 'GSC Travel Award', org: 'UIC', kind: 'travel' },
  { year: 2024, name: 'Board of Trustees Award', org: 'UIC', kind: 'bot' },
  { year: 2024, name: 'Lillian Torrance Award', org: 'UIC Rehabilitation Sciences', kind: 'lt' },
  { year: 2025, name: 'Deiss Graduate Research Award', org: 'UIC Graduate College', kind: 'deiss' },
  { year: 2025, name: 'Lillian Torrance Award', org: 'UIC Rehabilitation Sciences', kind: 'lt' },
  { year: 2025, name: 'GSC Travel Award', org: 'UIC', kind: 'travel' },
  { year: 2025, name: 'Board of Trustees Award', org: 'UIC', kind: 'bot' },
]
export const awardKinds = {
  deiss: { label: 'Research grant award', color: 'var(--coral)' },
  lt: { label: 'Lillian Torrance', color: 'var(--teal)' },
  bot: { label: 'Board of Trustees', color: 'var(--sage)' },
  travel: { label: 'Travel award', color: 'var(--sand)' },
  rank: { label: 'Academic rank', color: 'var(--ink)' },
}

// ---------- Future ----------
// Directions inferred from the CV — confirm wording with Upasana before publishing.
export const future = [
  { when: 'Now', title: 'Finish the dissertation', text: 'How muscle fatigue and vibration change the body’s split-second response to slips and trips.' },
  { when: 'Next', title: 'Fall-risk from wearables', text: 'Moving lab-grade balance measures onto IMU sensors that work at home, building on her hackathon work with fall-injury data.' },
  { when: 'Next', title: 'Perturbation training at scale', text: 'Bringing trip & slip training out of the lab through telehealth, as tested in CogXergaming.' },
  { when: 'Long term', title: 'Clinic ↔ lab ↔ industry', text: 'Translational research in medtech and digital health — evidence-based tools shaped by 12 years with stroke, MS and CP patients.' },
]
