"use client";
import React, { useEffect, useRef, Suspense, useState } from "react";

// ArcGIS JS API styles
import "@arcgis/core/assets/esri/themes/light/main.css";

// ArcGIS JS API modules
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

interface ArcGISMapProps {
  latitude: number;
  longitude: number;
  noticeType?: "warning" | "violation" | "info";
}

// Notice color scheme matching the app's design system
const noticeColors = {
  info: [13, 78, 55], // #0d4e37 - primary-dark
  warning: [225, 180, 100], // #e1b464 - accent
  violation: [208, 125, 126], // #d07d7e - warning
};

// Loading fallback component
const MapLoadingFallback: React.FC = () => (
  <div
    style={{
      height: "500px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #1b8354", // Using primary color
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto 16px",
        }}
      />
      <p style={{ margin: 0, color: "#666" }}>Loading map...</p>
    </div>
    <style jsx>{`
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

// Error fallback component
const MapErrorFallback: React.FC = () => (
  <div
    style={{
      height: "500px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fef2f2",
      borderRadius: "8px",
      border: "1px solid #fecaca",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "48px",
          height: "48px",
          margin: "0 auto 16px",
          color: "#dc2626",
        }}
      >
        ⚠️
      </div>
      <p style={{ margin: 0, color: "#dc2626", fontWeight: "500" }}>
        Failed to load map
      </p>
      <p style={{ margin: "8px 0 0 0", color: "#991b1b", fontSize: "14px" }}>
        Please refresh the page or try again later
      </p>
    </div>
  </div>
);

const ArcGISMap: React.FC<ArcGISMapProps> = ({
  latitude,
  longitude,
  noticeType = "info",
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapError, setMapError] = useState<boolean>(false);

  useEffect(() => {
    if (!mapRef.current) return;

    let view: MapView | null = null;

    const initializeMap = async () => {
      try {
        // Create the map view with proper map structure
        view = new MapView({
          container: mapRef.current!,
          map: {
            basemap: "streets-navigation-vector",
          },
          center: [longitude, latitude],
          zoom: 14,
        });

        // Wait for the view to be ready
        await view.when();

        // Create and add the point graphic
        const point = new Point({
          longitude,
          latitude,
        });

        // Use notice color scheme for marker
        const markerColor = noticeColors[noticeType];
        const markerSymbol = new SimpleMarkerSymbol({
          color: markerColor,
          outline: {
            color: [255, 255, 255], // White outline
            width: 2,
          },
        });

        const pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol,
        });

        view.graphics.add(pointGraphic);

        // Reset error state on success
        setMapError(false);
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError(true);
      }
    };

    initializeMap();

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [latitude, longitude, noticeType]);

  // Show error fallback if map failed to load
  if (mapError) {
    return <MapErrorFallback />;
  }

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
};

// Wrapper component with Suspense
const ArcGISMapWithSuspense: React.FC<ArcGISMapProps> = (props) => {
  return (
    <Suspense fallback={<MapLoadingFallback />}>
      <ArcGISMap {...props} />
    </Suspense>
  );
};

export default ArcGISMapWithSuspense;
