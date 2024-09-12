export * from '@/types/auth'
export * from '@/types/entities'
export * from '@/types/calendar'
export * from '@/types/selectOption'

export type CountryName =  {
    name: string
	abbr: string
	zones: string[]
}

export type CountryFlag =  {
    name: string
	code: string
	emoji: string
    unicode: string
    image: string
}