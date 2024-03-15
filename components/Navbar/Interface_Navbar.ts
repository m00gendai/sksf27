export interface NavbarItem{
    name: string
    url: string
    sub?: NavbarItem[]
    isQuickLink?: boolean
    icon?: string
}