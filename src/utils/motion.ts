/**
 * Motion policy for the whole site.
 *
 * The Framer "Noir Signal" template animates for every visitor, including
 * phones/tablets where Android "Remove animations" / battery saver report
 * `prefers-reduced-motion: reduce`. To match it, the portfolio animates for
 * everyone too. Flip RESPECT_REDUCED_MOTION to `true` to honour the OS
 * setting again (CSS fallbacks key off `html.honor-reduced-motion`).
 */
export const RESPECT_REDUCED_MOTION = false;

export const prefersReducedMotion = (): boolean =>
  RESPECT_REDUCED_MOTION &&
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
