import type { Point } from "pigeon-maps"

export interface MapSize {
    width: number
    height: number
}

export interface MapCamera {
    center: Point
    zoom: number
}

const TILE_SIZE = 256
const MAX_LATITUDE = 85.05112878

// Web Mercator, matching the projection used by Pigeon Maps.
function project([latitude, longitude]: Point): Point {
    const radians = Math.max(-MAX_LATITUDE, Math.min(MAX_LATITUDE, latitude)) * Math.PI / 180
    return [
        (longitude + 180) / 360,
        (1 - Math.log(Math.tan(radians) + 1 / Math.cos(radians)) / Math.PI) / 2,
    ]
}

function unproject([x, y]: Point): Point {
    return [Math.atan(Math.sinh(Math.PI * (1 - 2 * y))) * 180 / Math.PI, x * 360 - 180]
}

export function getOverviewCamera(locations: Point[], size: MapSize): MapCamera {
    if (!locations.length) return { center: [0, 0], zoom: 1 }

    const points = locations.map(project)
    const minX = Math.min(...points.map(point => point[0]))
    const maxX = Math.max(...points.map(point => point[0]))
    const minY = Math.min(...points.map(point => point[1]))
    const maxY = Math.max(...points.map(point => point[1]))
    // Reserve room for 50px markers, the zoom buttons and the overview control.
    const padding = { top: 120, right: 64, bottom: 32, left: 80 }
    const availableWidth = Math.max(1, size.width - padding.left - padding.right)
    const availableHeight = Math.max(1, size.height - padding.top - padding.bottom)
    const zoom = Math.max(1, Math.min(
        13,
        Math.log2(availableWidth / (TILE_SIZE * (maxX - minX))),
        Math.log2(availableHeight / (TILE_SIZE * (maxY - minY))),
    ))
    const scale = TILE_SIZE * 2 ** zoom

    return {
        center: unproject([
            (minX + maxX) / 2 - (padding.left - padding.right) / (2 * scale),
            (minY + maxY) / 2 - (padding.top - padding.bottom) / (2 * scale),
        ]),
        zoom,
    }
}

export function keepPopupVisible(
    camera: MapCamera,
    anchor: Point,
    viewport: MapSize,
    popup: MapSize,
): MapCamera {
    const center = project(camera.center)
    const point = project(anchor)
    const scale = TILE_SIZE * 2 ** camera.zoom
    const x = (point[0] - center[0]) * scale + viewport.width / 2
    const y = (point[1] - center[1]) * scale + viewport.height / 2
    const halfWidth = Math.max(popup.width / 2, 25)
    const margin = 16
    const left = x - halfWidth
    const right = x + halfWidth
    const top = y - 60
    const bottom = y + popup.height
    const dx = left < margin ? left - margin : Math.max(0, right - viewport.width + margin)
    const dy = top < margin ? top - margin : Math.max(0, bottom - viewport.height + margin)

    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return camera

    return {
        center: unproject([center[0] + dx / scale, center[1] + dy / scale]),
        zoom: camera.zoom,
    }
}
