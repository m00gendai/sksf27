export interface NavbarItem{
    name: string
    url: string
    openInNewTab?: boolean
    sub?: NavbarItem[]
    isQuickLink?: boolean
    icon?: any
}
