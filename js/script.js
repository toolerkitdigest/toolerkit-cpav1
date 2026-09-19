const OFFERS = {
  tier1: {
    url: 'https://appcomplete.org/cl/i/34j997?sub1=',
    ctaText: 'CLAIM TIER-1 REWARD →',
    tierTag: 'TIER-1 VERIFIED'
  },
  tier2: {
    url: 'https://appcomplete.org/cl/i/4o799r?sub1=',
    ctaText: 'CLAIM REGIONAL REWARD →',
    tierTag: 'TIER-2 VERIFIED'
  },
  tier3: {
    url: 'https://trckapp.org/cl/i/ex11pk?sub1=',
    ctaText: 'CONTINUE ACCESS →',
    tierTag: 'GLOBAL ACCESS'
  }
};

const TIER1_COUNTRIES = ['US', 'GB', 'CA', 'AU', 'NZ'];
const TIER2_COUNTRIES = ['BR', 'PL', 'ZA', 'MX', 'AR', 'CO'];

document.addEventListener('DOMContentLoaded', async () => {
  // Device OS check simulation / detection
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const osText = isIOS ? 'iOS Device Authenticated' : isAndroid ? 'Android Device Authenticated' : 'Browser Session Verified';
  document.getElementById('device-os-text').textContent = osText;
  document.getElementById('status-icon-1').textContent = '✅';

  // Geo lookup
  let countryCode = 'GLOBAL';
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      if (data.country_code) countryCode = data.country_code.toUpperCase();
    }
  } catch (e) {
    console.warn('Fallback geo mode');
  }

  let tier = 'tier3';
  if (TIER1_COUNTRIES.includes(countryCode)) tier = 'tier1';
  else if (TIER2_COUNTRIES.includes(countryCode)) tier = 'tier2';

  const cfg = OFFERS[tier];
  document.getElementById('region-badge').textContent = `${cfg.tierTag} (${countryCode})`;
  
  const ctaBtn = document.getElementById('cta-button');
  const btnText = ctaBtn.querySelector('.btn-text');
  btnText.textContent = cfg.ctaText;
  ctaBtn.href = `${cfg.url}${countryCode.toLowerCase()}`;

  // Telegram bot quick trigger sync (deep link format t.me/YourBotName?start=geo_code)
  const botUsername = 'ToolerKitDropBot'; // replace with your bot
  document.getElementById('tg-bot-link').href = `https://t.me/${botUsername}?start=${countryCode.toLowerCase()}`;
});
