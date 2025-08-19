"use client";
import React, { useEffect, useRef, useState } from "react";

// ArcGIS JS API styles
import "@arcgis/core/assets/esri/themes/light/main.css";

// ArcGIS JS API modules
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { ActiveLicenseWithNoticeType } from "@/lib/actions/noticeActions";

interface ArcGISMapProps {
  // Multiple leases to display
  leases: Awaited<ActiveLicenseWithNoticeType>;
  // Map display options
  showLandMarking?: boolean;
  zoomLevel?: number;
  // Auto-fit map to show all leases
  autoFit?: boolean;
}

const noticeColors = {
  info: [13, 78, 55], // #0d4e37 - primary-dark
  warning: [225, 180, 100], // #e1b464 - accent
  violation: [208, 125, 126], // #d07d7e - warning
};

const ArcGISMap: React.FC<ArcGISMapProps> = ({
  leases,
  showLandMarking = true,
  zoomLevel = 16,
  autoFit = true,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    let view: MapView | null = null;

    const initializeMap = async () => {
      try {
        // Reset error state on success
        const map = new Map({
          basemap: "hybrid",
        }) as __esri.MapProperties;

        // Create graphics for all leases
        const allGraphics: Graphic[] = [];
        const allCoordinates: [number, number][] = [];

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

        leases.forEach((lease, index) => {
          // Create point for the lease location
          const leasePoint = new Point({
            longitude: lease.longtitude,
            latitude: lease.latitude,
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
              description: `${lease.permission} license - Area: ${
                lease.licenseArea || "N/A"
              } sqm`,
              licenseNumber: lease.licenseNumber,
              licenseType: lease.permission,
              landArea: lease.licenseArea,
              noticeType: lease.noticeType || "info",
            },
            popupTemplate: {
              title: "<div class='custom-popup-title'>{name}</div>",
              content: "<div class='custom-popup-content'>{description}</div>",
            },
          });

          allGraphics.push(leaseGraphic);
          allCoordinates.push([lease.longtitude, lease.latitude]);
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
            center: [firstLease.longtitude, firstLease.latitude],
            container: "viewDiv",
            map: map,
            zoom: zoomLevel,
          });
        }

        // Add all lease graphics to the map
        allGraphics.forEach((graphic) => {
          view!.graphics.add(graphic);
        });
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initializeMap();

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [leases, showLandMarking, zoomLevel, autoFit]);

  if (!leases || leases!.length === 0)
    return <div className="text-2xl text-primary">لا يوجد اراضي مرخصة</div>;

  return (
    <div ref={mapRef} id="viewDiv" style={{ height: "500px", width: "100%" }} />
  );
};

export default ArcGISMap;
