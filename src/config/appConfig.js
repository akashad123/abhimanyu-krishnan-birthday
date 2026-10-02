/**
 * Application Configuration
 * Central source of truth for site branding, family names, occasion details,
 * and media upload constraints.
 */

export const APP_CONFIG = {
  // Child and family identity (strictly confirmed details only)
  childName: "Abhimanyu Krishnan",
  parentsName: "Praveen & Leeba",
  occasion: "First Birthday",
  siteTitle: "Abhimanyu Krishnan — First Birthday Memory Album",
  subtitle: "One Whole Year of Joy, Love & Sweet Little Smiles",

  // Visual celebration tags
  plaqueTitleTop: "ONE WHOLE YEAR",
  plaqueTitleOf: "of",
  plaqueTitleName: "Abhimanyu Krishnan",
  scrollDownText: "Scroll Down",

  // Supabase & Media Upload constraints
  storage: {
    bucketName: "memories",
    tableName: "memories",
    maxFileSizeBytes: 10 * 1024 * 1024, // 10MB client limit
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  },

  // Navigation anchors
  sections: {
    hero: "hero",
    pinata: "pinata",
    memories: "memories",
    upload: "add-memory",
  },
};

export default APP_CONFIG;
