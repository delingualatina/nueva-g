export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID || '1713967079582707';

export const pageview = () => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
};

export const event = (name, options = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', name, options);
  }
};

export const trackLead = (options = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', options);
  }
};
