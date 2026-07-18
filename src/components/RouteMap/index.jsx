import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const RouteMap = ({ donorLat, donorLon, requesterLat, requesterLon }) => {

    if (!donorLat || !donorLon || !requesterLat || !requesterLon) {
        return <p>Loading map...</p>
    }

    const donorPosition = [donorLat, donorLon]
    const requesterPosition = [requesterLat, requesterLon]

    const centerLat = (donorLat + requesterLat) / 2
    const centerLon = (donorLon + requesterLon) / 2

    return (
        <MapContainer
            center={[centerLat, centerLon]}
            zoom={13}
            style={{ height: '250px', width: '100%', borderRadius: '12px' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />

            <Marker position={donorPosition}>
                <Popup>Donor location</Popup>
            </Marker>

            <Marker position={requesterPosition}>
                <Popup>Requester / Hospital location</Popup>
            </Marker>

            <Polyline positions={[donorPosition, requesterPosition]} color="#E63946" />

        </MapContainer>
    )
}

export default RouteMap