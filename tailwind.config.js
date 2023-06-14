const defaultConfig = require('tailwindcss/defaultConfig')

/** @type {import('tailwindcss/types').Config} */
const config = {
	content: ['index.html', 'src/**/*.tsx'],
	theme: {
		fontFamily: {
			sans: ['Arial', 'sans-serif']
		}
	}
}
module.exports = config
