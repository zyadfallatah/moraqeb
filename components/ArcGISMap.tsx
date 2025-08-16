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
import PopupTemplate from "@arcgis/core/PopupTemplate";

interface Lease {
  licenseNumber: string;
  licenseType: "residential" | "commercial" | "industrial" | "agricultural";
  landArea?: number; // in square meters
  landCoordinates: {
    latitude: number;
    longitude: number;
  };
  // Optional: Specific land boundaries if available
  landBoundaries?: Array<{
    latitude: number;
    longitude: number;
  }>;
  // Notice type for styling
  noticeType?: "warning" | "violation" | "info";
}

interface ArcGISMapProps {
  // Multiple leases to display
  leases: Lease[];
  // Map display options
  showLandMarking?: boolean;
  zoomLevel?: number;
  // Auto-fit map to show all leases
  autoFit?: boolean;
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
  leases,
  showLandMarking = true,
  zoomLevel = 16,
  autoFit = true,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapError, setMapError] = useState<boolean>(false);

  useEffect(() => {
    if (!mapRef.current) return;

    let view: MapView | null = null;

    const initializeMap = async () => {
      try {
        // Reset error state on success
        const map = new Map({
          basemap: "hybrid",
        }) as __esri.MapProperties;

        // Handle multiple leases
        if (!leases || leases.length === 0) {
          // Default to Riyadh if no leases provided
          const defaultCoords = { latitude: 24.7136, longitude: 46.6753 };
          view = new MapView({
            center: [defaultCoords.longitude, defaultCoords.latitude],
            container: "viewDiv",
            map: map,
            zoom: zoomLevel,
          });
          return;
        }

        // Create graphics for all leases
        const allGraphics: Graphic[] = [];
        const allCoordinates: [number, number][] = [];

        leases.forEach((lease, index) => {
          // Create point for the lease location
          const leasePoint = new Point({
            longitude: lease.landCoordinates.longitude,
            latitude: lease.landCoordinates.latitude,
          });

          // Create marker symbol with lease-specific notice color
          const markerSymbol = new SimpleMarkerSymbol({
            color: noticeColors[lease.noticeType || "info"],
            size: 12,
            outline: {
              color: [255, 255, 255],
              width: 2,
            },
          });

          const leaseGraphic = new Graphic({
            geometry: leasePoint,
            symbol: markerSymbol,
            attributes: {
              name: `License: ${lease.licenseNumber}`,
              description: `${lease.licenseType} license - Area: ${
                lease.landArea || "N/A"
              } sqm`,
              licenseNumber: lease.licenseNumber,
              licenseType: lease.licenseType,
              landArea: lease.landArea,
              noticeType: lease.noticeType,
            },
            popupTemplate: {
              title: "<div class='custom-popup-title'>{name}</div>",
              content: "<div class='custom-popup-content'>{description}</div>",
            },
          });

          allGraphics.push(leaseGraphic);
          allCoordinates.push([
            lease.landCoordinates.longitude,
            lease.landCoordinates.latitude,
          ]);

          // Add land marking if enabled and boundaries are provided
          if (
            showLandMarking &&
            lease.landBoundaries &&
            lease.landBoundaries.length > 0
          ) {
            // TODO: Implement land boundary marking when needed
            console.log(
              `Land marking enabled for lease ${lease.licenseNumber}:`,
              lease.landBoundaries
            );
          }
        });

        // Create map view centered on first lease or auto-fit to all
        if (autoFit && allCoordinates.length > 1) {
          // Auto-fit to show all leases
          view = new MapView({
            container: "viewDiv",
            map: map,
            zoom: zoomLevel,
          });

          // Fit the view to show all graphics
          view.when(() => {
            view!.goTo({
              target: allGraphics,
              padding: 50,
            });
          });
        } else {
          // Center on first lease
          const firstLease = leases[0];
          view = new MapView({
            center: [
              firstLease.landCoordinates.longitude,
              firstLease.landCoordinates.latitude,
            ],
            container: "viewDiv",
            map: map,
            zoom: zoomLevel,
          });
        }

        // Add all lease graphics to the map
        allGraphics.forEach((graphic) => {
          view!.graphics.add(graphic);
        });

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
  }, [leases, showLandMarking, zoomLevel, autoFit]);

  // Show error fallback if map failed to load
  if (mapError) {
    return <MapErrorFallback />;
  }

  return (
    <div ref={mapRef} id="viewDiv" style={{ height: "500px", width: "100%" }} />
  );
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
