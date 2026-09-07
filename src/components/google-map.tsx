"use client";

interface GoogleMapProps {
  title?: string;
  location: string;
  lat: number;
  lng: number;
  zoom?: number;
  width?: string;
  height?: string;
}

export function GoogleMap({
  title = "Campus Location",
  location,
  lat,
  lng,
  zoom = 16,
  width = "100%",
  height = "100%",
}: GoogleMapProps) {
  const mapUrl = new URL("https://www.google.com/maps/embed/v1/place");
  mapUrl.searchParams.set("key", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "");
  mapUrl.searchParams.set("q", location);

  // Fallback: Use static map if API key is not set
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg bg-muted" style={{ aspectRatio: "16/9" }}>
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=m&z=${zoom}&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
          className="absolute inset-0"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: "16/9" }}>
      <iframe
        src={mapUrl.toString()}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="absolute inset-0"
      />
    </div>
  );
}
