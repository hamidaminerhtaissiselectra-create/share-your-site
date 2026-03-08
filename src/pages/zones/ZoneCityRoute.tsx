import { useParams, Navigate } from "react-router-dom";
import ZoneCityPage from "@/components/ZoneCityPage";
import { getZoneCityBySlug } from "@/data/zonesPagesData";
import { getRegionBySlug } from "@/data/regionsData";

const ZoneCityRoute = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/zones-intervention" replace />;

  // 1. Check if it's an IDF city page
  const city = getZoneCityBySlug(slug);
  if (city) return <ZoneCityPage city={city} />;

  // 2. Check if it's a known region slug — redirect to zones-intervention
  const region = getRegionBySlug(slug);
  if (region) return <Navigate to="/zones-intervention" replace />;

  // 3. Unknown slug — redirect
  return <Navigate to="/zones-intervention" replace />;
};

export default ZoneCityRoute;
