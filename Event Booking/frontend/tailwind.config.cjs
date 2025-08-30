/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1E40AF',      // Primary Blue - headers, primary actions
        'brand-secondary': '#3B82F6',    // Secondary Blue - buttons, links
        'brand-light': '#DBEAFE',        // Light Blue - subtle backgrounds
        'brand-accent': '#60A5FA',       // Accent Blue - hover states, active elements
        'brand-dark': '#1E3A8A',         // Dark Blue - high-contrast text, headings
        'brand-background': '#F9FAFB',   // Neutral background
        'brand-text-primary': '#111827', // Primary text
        'brand-text-secondary': '#6B7280', // Secondary text
        'brand-success': '#10B981',      // Success Green
        'brand-error': '#EF4444',        // Error Red
      }
    },
  },
  plugins: [],
}
