const paths = {
  paw: <><circle cx="8" cy="9" r="2.2" /><circle cx="16" cy="9" r="2.2" /><circle cx="5" cy="14" r="2" /><circle cx="19" cy="14" r="2" /><path d="M12 13c-3 0-5 3-5 5s2 2.5 5 2.5 5-.5 5-2.5-2-5-5-5z" /></>,
  wave: <><path d="M3 15c2 0 2-2 4.5-2S10 15 12 15s2-2 4.5-2 2.5 2 4.5 2" fill="none" /><path d="M3 19c2 0 2-2 4.5-2S10 19 12 19s2-2 4.5-2 2.5 2 4.5 2" fill="none" /><path d="M7 11l5-7 5 7" fill="none" /></>,
  peak: <><path d="M2 20l7-12 4 6 3-4 6 10z" fill="none" /><circle cx="18" cy="5" r="1.8" /></>,
  bowl: <><path d="M3 11h18a9 9 0 0 1-18 0z" fill="none" /><path d="M9 7c0-1.5 1-2 1-3.5M13 7c0-1.5 1-2 1-3.5" fill="none" /></>,
  globe: <><circle cx="12" cy="12" r="9" fill="none" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" /></>,
}

export default function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="currentColor">
      {paths[name]}
    </svg>
  )
}
