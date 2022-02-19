import L from 'leaflet'

const icon = (type?: string) => {
    let color
    switch (type) {
        case 'light':
            color = 'text-yellow-600'
            break

        case 'high':
            color = 'text-gray-700'
            break
        default:
            color = 'text-red-600'
    }

    return L.divIcon({
        html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="filter: drop-shadow( 1px 1px 2px rgba(0, 0, 0, .15))"><path d="M5.05,4.05c1.312,-1.312 3.094,-2.05 4.95,-2.05c3.84,-0 7,3.16 7,7c0,1.856 -0.738,3.638 -2.05,4.95l-4.95,4.95l-4.95,-4.95c-1.312,-1.312 -2.051,-3.094 -2.051,-4.95c0,-1.856 0.739,-3.638 2.051,-4.95Z" fill="#fff"/><circle cx="10" cy="8.977" r="3.233" fill="currentColor"/></svg>',
        className: 'bg-transparent ' + color,
        iconSize: [30, 30],
    })
}

const iconAdd = () => {
    return L.divIcon({
        html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" /></svg>',
        className: 'text-white rounded-full bg-green-500',
        iconSize: [25, 25],
    })
}
const iconUser = () => {
    return L.divIcon({
        html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" /></svg>',
        className: 'text-purple-500',
        iconSize: [25, 25],
    })
}
const iconCleaned = () => {
    return L.divIcon({
        html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style="filter: drop-shadow( 1px 1px 2px rgba(0, 0, 0, .15))"><path d="M4.142,2.426c1.553,-1.553 3.662,-2.426 5.858,-2.426c4.545,-0 8.284,3.74 8.284,8.284c0,2.197 -0.873,4.305 -2.426,5.858l-5.858,5.858l-5.858,-5.858c-1.553,-1.553 -2.426,-3.661 -2.426,-5.858c-0,-2.196 0.873,-4.305 2.426,-5.858Z" style="fill:#fff;"/><path d="M6.117,6.142c-1.471,2.572 0.434,6.208 0.69,7.459l4.525,-7.532c-0.298,1.038 -0.84,2.66 -1.773,4.418c-0.796,1.498 -1.621,2.614 -2.326,3.421c1.513,-0.277 5.198,-1.087 6.52,-3.4c1.806,-3.158 -0.548,-7.902 -0.548,-7.902c0,-0 -5.282,0.377 -7.088,3.536Z" style="fill:url(#_Linear1);"/><defs><linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(8.86996,0,0,8.86996,5.56507,8.25679)"><stop offset="0" style="stop-color:#39b54a;stop-opacity:1"/><stop offset="0" style="stop-color:#39b54a;stop-opacity:1"/><stop offset="1" style="stop-color:#8cc63f;stop-opacity:1"/></linearGradient></defs></svg>',
        className: 'text-green-500',
        iconSize: [25, 25],
    })
}

export { icon, iconAdd, iconUser, iconCleaned }
