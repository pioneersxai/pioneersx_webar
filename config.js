/**
 * ============================================================
 *  BRAND CONFIG — Edit ONLY this file to fully rebrand the site
 *  One file. One client. 15 minutes.
 * ============================================================
 */

const BRAND = {

  // ── Core Identity ─────────────────────────────────────────
  name:        "PioneersX",                          // Brand name shown everywhere
  tagline:     "مساعدك الشخصي بالذكاء الاصطناعي",   // Hero subtitle
  description: "منصة الذكاء الاصطناعي الأكثر تقدماً في المنطقة",

  // ── Colors (also update --primary-red in css/style.css) ───
  primaryColor: "#ff1e1e",   // Main brand color — match with CSS :root

  // ── Logo ──────────────────────────────────────────────────
  logoLetter:  "X",          // Single letter shown in navbar logo
  logoFile:    "",           // Optional: path to image logo, e.g. "assets/logo.png"
  faviconColor: "%23ff1e1e", // URL-encoded hex for SVG favicon (# = %23)

  // ── Contact ───────────────────────────────────────────────
  phone:      "+966 54 770 5498",
  whatsapp:   "9665477705498",   // No + or spaces — used in wa.me links
  email:      "info@pioneersx.store",
  city:       "الرياض، المملكة العربية السعودية",

  // ── API ───────────────────────────────────────────────────
  apiBase:    "https://pioneersx-backend.onrender.com/api",

  // ── Domain ────────────────────────────────────────────────
  domain:     "https://pioneersxai.github.io/pioneersx_webar",

  // ── Social Links (set to "" to hide) ─────────────────────
  social: {
    twitter:   "https://x.com/pioneersxai",
    linkedin:  "https://www.linkedin.com/company/pioneersx",
    instagram: "https://www.instagram.com/pioneersxai/",
    youtube:   "https://www.youtube.com/@pioneersxai",
    tiktok:    "https://www.tiktok.com/@pioneersxai",
  },

  // ── Language & Direction ──────────────────────────────────
  lang: "ar",    // "ar" for Arabic, "en" for English
  dir:  "rtl",   // "rtl" for Arabic, "ltr" for English

  // ── Products (shown in products/features section) ─────────
  products: [
    {
      id:          "assistx",
      name:        "AssistX",
      tagline:     "مساعد ذكي لعملك",
      description: "مساعد ذكاء اصطناعي متخصص يفهم طبيعة عملك ويتفاعل مع عملائك بكفاءة عالية",
      icon:        "fas fa-robot",
      link:        "assistx/index.html",
    },
    {
      id:          "analyticsx",
      name:        "AnalyticsX",
      tagline:     "تحليلات ذكية لقراراتك",
      description: "منصة تحليل بيانات مدعومة بالذكاء الاصطناعي تحول أرقامك إلى قرارات استراتيجية",
      icon:        "fas fa-chart-line",
      link:        "analyticsx/index.html",
    },
    {
      id:          "clinix",
      name:        "CliniX",
      tagline:     "الذكاء الاصطناعي للقطاع الطبي",
      description: "حلول ذكاء اصطناعي متخصصة للعيادات والمستشفيات لتحسين تجربة المريض",
      icon:        "fas fa-heartbeat",
      link:        "clinix/index.html",
    },
  ],

  // ── Pricing Tiers ─────────────────────────────────────────
  pricing: [
    {
      name:     "الأساسية",
      price:    "499",
      currency: "ر.س",
      period:   "شهرياً",
      features: ["مساعد ذكي واحد", "1000 رسالة/شهر", "دعم فني", "تقارير أساسية"],
      cta:      "ابدأ الآن",
      featured: false,
    },
    {
      name:     "الاحترافية",
      price:    "999",
      currency: "ر.س",
      period:   "شهرياً",
      features: ["3 مساعدين ذكيين", "10,000 رسالة/شهر", "دعم أولوية", "تحليلات متقدمة", "تكامل API"],
      cta:      "الأكثر طلباً",
      featured: true,
    },
    {
      name:     "المؤسسية",
      price:    "اتصل بنا",
      currency: "",
      period:   "",
      features: ["مساعدين غير محدودين", "رسائل غير محدودة", "مدير حساب مخصص", "تخصيص كامل", "SLA مضمون"],
      cta:      "تواصل معنا",
      featured: false,
    },
  ],

};

// ── Auto-apply brand to page ───────────────────────────────
// Runs on DOMContentLoaded and replaces all [data-brand] elements
document.addEventListener("DOMContentLoaded", () => {

  // Page title
  document.title = `${BRAND.name} - ${BRAND.tagline}`;

  // Lang & direction
  document.documentElement.lang = BRAND.lang;
  document.documentElement.dir  = BRAND.dir;

  // Replace all elements that have data-brand attributes
  const replacements = {
    "brand-name":        BRAND.name,
    "brand-tagline":     BRAND.tagline,
    "brand-description": BRAND.description,
    "brand-phone":       BRAND.phone,
    "brand-email":       BRAND.email,
    "brand-city":        BRAND.city,
    "brand-whatsapp":    BRAND.whatsapp,
  };

  Object.entries(replacements).forEach(([key, value]) => {
    document.querySelectorAll(`[data-brand="${key}"]`).forEach(el => {
      el.textContent = value;
    });
  });

  // WhatsApp links
  document.querySelectorAll("[data-whatsapp-link]").forEach(el => {
    el.href = `https://wa.me/${BRAND.whatsapp}`;
  });

  // Phone links
  document.querySelectorAll("[data-phone-link]").forEach(el => {
    el.href = `tel:${BRAND.phone}`;
  });

  // Email links
  document.querySelectorAll("[data-email-link]").forEach(el => {
    el.href = `mailto:${BRAND.email}`;
  });

  // Social links
  const socialMap = {
    "social-twitter":   BRAND.social.twitter,
    "social-linkedin":  BRAND.social.linkedin,
    "social-instagram": BRAND.social.instagram,
    "social-youtube":   BRAND.social.youtube,
    "social-tiktok":    BRAND.social.tiktok,
  };
  Object.entries(socialMap).forEach(([key, url]) => {
    document.querySelectorAll(`[data-brand="${key}"]`).forEach(el => {
      if (!url) { el.style.display = "none"; return; }
      el.href = url;
    });
  });

  // Logo letter
  document.querySelectorAll("[data-brand='logo-letter']").forEach(el => {
    el.textContent = BRAND.logoLetter;
  });

});
