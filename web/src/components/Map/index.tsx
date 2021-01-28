import React, { useEffect, useState } from 'react';
import { MapContainer as LeafletMap, MapContainerProps as LeafletMapProps, TileLayer } from 'react-leaflet'

interface MapProps extends LeafletMapProps {
  interactive?: boolean
  children: React.ReactNode
}

export default function Map({ children, interactive = true, ...props }: MapProps) {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setInitialPosition([latitude, longitude]);
    });
  }, []);

  return (
    initialPosition[0] !== 0 ? (
      <LeafletMap 
        center={initialPosition} 
        zoom={15} 
        style={{ width: '100%', height: '100%' }}
        dragging={interactive}
        touchZoom={interactive}
        zoomControl={interactive}
        scrollWheelZoom={interactive}
        doubleClickZoom={interactive}
        {...props}
      >
      <TileLayer 
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />
      {children}
    </LeafletMap>
    ) : null
  );
}
