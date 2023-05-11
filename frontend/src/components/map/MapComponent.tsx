import {
    MapContainer,
    TileLayer,
} from 'react-leaflet'
import {LatLngTuple} from "leaflet";
import {useState} from "react";
import StartMarker from "./StartMarker";

export default function MapComponent() {
    const [position, setPosition] = useState<LatLngTuple>([52.519, 13.406])
    // const coordinatesMarker: LatLngTuple = [53.579, 9.874]
    console.log(position)

    return (
        <MapContainer
            center={[52.519, 13.406]}
            zoom={12} scrollWheelZoom={true}
            style={{width: 450, height: 450}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
           <StartMarker position={position} setPosition={setPosition}/>
        </MapContainer>
    )
}