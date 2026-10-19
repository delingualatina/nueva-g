export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID || '1713967079582707';

export const FB_TEST_EVENT_CODE =
  process.env.NEXT_PUBLIC_FB_TEST_EVENT_CODE || 'TEST84823';

const getEventOptions = (customOptions = {}) => {
  const options = { ...customOptions };
  if (FB_TEST_EVENT_CODE && FB_TEST_EVENT_CODE.trim() !== '') {
    options.test_event_code = FB_TEST_EVENT_CODE.trim();
  }
  return options;
};

export const pageview = () => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    const opts = getEventOptions();
    if (Object.keys(opts).length > 0) {
      window.fbq('track', 'PageView', {}, opts);
    } else {
      window.fbq('track', 'PageView');
    }
  }
};

export const event = (name, data = {}, customOptions = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    const opts = getEventOptions(customOptions);
    if (Object.keys(opts).length > 0) {
      window.fbq('track', name, data, opts);
    } else {
      window.fbq('track', name, data);
    }
  }
};

export const trackLead = (data = {}, customOptions = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    const opts = getEventOptions(customOptions);
    if (Object.keys(opts).length > 0) {
      window.fbq('track', 'Lead', data, opts);
    } else {
      window.fbq('track', 'Lead', data);
    }
  }
};
