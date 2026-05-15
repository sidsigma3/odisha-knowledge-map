import { useMemo, useState } from "react";
import { TOPICS, TOPIC_ORDER } from "./data/index.js";
import AppShell from "./components/layout/AppShell.jsx";
import TopicTabs from "./components/topics/TopicTabs.jsx";
import Legend from "./components/topics/Legend.jsx";
import SearchBar from "./components/controls/SearchBar.jsx";
import FilterPanel from "./components/controls/FilterPanel.jsx";
import MapViewport from "./components/map/MapViewport.jsx";
import LocationListSidebar from "./components/sidebar/LocationListSidebar.jsx";
import DetailDrawer from "./components/detail/DetailDrawer.jsx";
import useFilteredLocations from "./hooks/useFilteredLocations.js";
import useMediaQuery from "./hooks/useMediaQuery.js";
import { MOBILE_BREAKPOINT } from "./lib/constants.js";

export default function App() {
  const [activeTopicId, setActiveTopicId] = useState(TOPIC_ORDER[0]);
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});

  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const activeTopic = TOPICS[activeTopicId];
  const visibleLocations = useFilteredLocations(activeTopic, query, filters);

  const selectedLocation = useMemo(
    () => activeTopic.locations.find((l) => l.id === selectedId) ?? null,
    [activeTopic, selectedId]
  );

  const handleTopicChange = (id) => {
    setActiveTopicId(id);
    setSelectedId(null);
    setQuery("");
    setFilters({});
  };

  return (
    <AppShell
      header={
        <TopicTabs
          topics={TOPIC_ORDER.map((id) => TOPICS[id])}
          activeId={activeTopicId}
          onChange={handleTopicChange}
        />
      }
      sidebar={
        <>
          <SearchBar value={query} onChange={setQuery} />
          <FilterPanel topic={activeTopic} filters={filters} onChange={setFilters} />
          <LocationListSidebar
            locations={visibleLocations}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onHover={setHoveredId}
          />
        </>
      }
      map={
        <MapViewport
          topic={activeTopic}
          locations={visibleLocations}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={setSelectedId}
          onHover={setHoveredId}
          overlay={<Legend topic={activeTopic} />}
        />
      }
      detail={
        <DetailDrawer
          topic={activeTopic}
          location={selectedLocation}
          isMobile={isMobile}
          onClose={() => setSelectedId(null)}
        />
      }
    />
  );
}