import {Marker, Popup} from "react-leaflet";
import {LatLngTuple} from "leaflet";

export default function StartMarker(
    {position, setPosition}:
        {
            position: LatLngTuple,
            setPosition: (newPosition: LatLngTuple) => void
        }){
return (
    <Marker
        position={position}
        draggable={true}
        eventHandlers={{
            mouseup: (event) => {
                setPosition([event.latlng.lat, event.latlng.lng])
            }
        }}
    >
        <Popup>
           Lat: {position[0]} <br/> Lang: {position[1]}
        </Popup>
    </Marker>
)
}