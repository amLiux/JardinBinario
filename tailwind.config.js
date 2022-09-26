module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'bg404Pattern': 'radial-gradient(circle at bottom right,rgb(192 132 252),#0f172a 25%)',
			},
			animation: {
				'star': 'shining 3000ms ease-in-out infinite',
				'star-trail': 'tail 3000ms ease-in-out infinite, shooting 3000ms ease-in-out infinite',
				'writing-machine-before': 'writingMachine var(--velocidad) steps(14) 340ms forwards',
				'writing-machine-after': 'writingMachine var(--velocidad) steps(14) 340ms forwards, blink 200ms steps(14) 26'
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};
