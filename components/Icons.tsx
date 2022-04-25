import { ReactNode } from "react"

type IconsType = { [key: string]: ReactNode }

export const Icons: IconsType = {
	SIGNIN: <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
		<path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
	</svg>,
	REGISTER: <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 my-auto" viewBox="0 0 20 20" fill="currentColor">
		<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
	</svg>,
	ERROR: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
		<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
	</svg>,
}