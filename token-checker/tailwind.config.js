/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundColor: {
				light: "#fff",
				dark: "#333",
			},
			textColor: {
				light: "#333",
				dark: "#fff",
			},
			fontFamily: {
				"space-grotesk": ["Space Grotesk", "sans-serif"],
				unbounded: ["Unbounded", "sans-serif"],
			},
		},
	},
	plugins: [require("@tailwindcss/aspect-ratio")],
};
