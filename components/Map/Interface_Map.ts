import { Medium } from "@/globals/globals_interface"

export interface FestivalCentre {
    coordinates: [number, number]
    name: string
    location: string
    description: string
    href: string
    color: string
    logo: string
}

export interface ShootingRange{
    name: string
    location: string
    category: string[]
    direction: string
    coordinates: { lat: string, lon: string }
    targets: { amount: number, type: string}[]
    images: Medium[]
    positions: string[]
    _modified: number
    _mby:  string
    _created: number
    _cby: string
    _id: number
  }
