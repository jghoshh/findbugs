"use client";

import { useMemo, useState } from "react";

type Sighting = {
  id: string;
  description: string;
  location: string;
  imageUrl: string;
  createdAt: number;
};

const locationCatalog = [
  { code: "SMN", name: "Séraphin-Marion 133-135 (Academic Hall)" },
  { code: "HGN", name: "Séraphin-Marion 115 (Hagen)" },
  { code: "WCA", name: "University 52 (William Commanda)" },
  { code: "TBT", name: "Cumberland 550 (Tabaret)" },
  { code: "LRR", name: "Laurier 100" },
  { code: "MHN", name: "Laurier 70 (Hamelin)" },
  { code: "MRT", name: "University 65 (Morisset)" },
  { code: "UCU", name: "University 85 (University Centre / Jock-Turcot)" },
  { code: "LPR", name: "Louis Pasteur 141" },
  { code: "THN", name: "University 45 (Thompson Residence)" },
  { code: "MNT", name: "University 125 (Montpetit)" },
  { code: "PRZ", name: "University 50 (Pérez)" },
  { code: "90U", name: "University 90 (residence)" },
  { code: "MRD", name: "University 110 (Marchand Residence)" },
  { code: "LMX-CRX", name: "Jean-Jacques Lussier 145 (Lamoureux + Learning Crossroads)" },
  { code: "BRS", name: "Thomas-More 100 (Brooks Residence)" },
  { code: "CBY", name: "Louis Pasteur 161 (Colonel By Hall)" },
  { code: "LBC", name: "Louis Pasteur 45 (Leblanc Residence)" },
  { code: "MCE", name: "Marie Curie 100" },
  { code: "CRG", name: "Marie Curie 20 (Bioscience Phase I / CAREG)" },
  { code: "FTX", name: "Louis Pasteur 57 (Fauteux Hall)" },
  { code: "SMD", name: "University 60 (Simard)" },
  { code: "VNR", name: "Jean-Jacques Lussier 136 (Vanier Hall)" },
  { code: "GNN", name: "Marie Curie 30 (Bioscience Phase III / Gendron Hall)" },
  { code: "MRN", name: "Louis Pasteur 140 (Marion Hall)" },
  { code: "STN", name: "University 100 (Stanton Residence)" },
  { code: "HSY", name: "Laurier 157 (Hyman Soloway Residence)" },
  { code: "STE", name: "S.I.T.E. Building (Engineering/Technology)" },
  { code: "DRO", name: "D’Iorio Hall" }
];

const locationMap = Object.fromEntries(locationCatalog.map((item) => [item.code, item.name]));

const seedCodes = [
  "SMN",
  "HGN",
  "WCA",
  "TBT",
  "LRR",
  "MHN",
  "MRT",
  "UCU",
  "LPR",
  "THN",
  "MNT",
  "PRZ",
  "90U",
  "MRD",
  "LMX-CRX",
  "BRS",
  "CBY",
  "LBC",
  "MCE",
  "CRG",
  "FTX",
  "SMD",
  "VNR",
  "GNN",
  "MRN",
  "STN",
  "HSY",
  "STE",
  "DRO"
];

const buildSighting = (code: string, minutesAgo = 5): Sighting => {
  const name = locationMap[code];
  return {
    id: `seed-${code}`,
    description: `Seed sighting @<${code}>${name ? ` | ${name}` : ""}`,
    location: code,
    imageUrl: "https://placehold.co/200x120/ffffff/000000?text=Bug",
    createdAt: Date.now() - minutesAgo * 60000
  };
};

function createSeedSightings(): Sighting[] {
  const groups = [
    { code: "SMN", count: 10 },
    { code: "HGN", count: 7 },
    { code: "WCA", count: 3 },
    { code: "TBT", count: 2 },
    { code: "LRR", count: 2 },
    { code: "MRT", count: 2 }
  ];

  const sightings: Sighting[] = [];
  groups.forEach((group, groupIndex) => {
    Array.from({ length: group.count }).forEach((_, i) => {
      const minutesAgo = groupIndex * 10 + i + 1;
      sightings.push({
        ...buildSighting(group.code, minutesAgo),
        id: `seed-${group.code}-${i}`
      });
    });
  });

  return sightings;
}

export default function HomePage() {
  const [sightings] = useState<Sighting[]>(() => createSeedSightings());

  const distribution = useMemo(() => {
    const counts = new Map<string, number>();
    sightings.forEach((s) => {
      counts.set(s.location, (counts.get(s.location) ?? 0) + 1);
    });
    const items = Array.from(counts.entries()).map(([location, count]) => ({ location, count }));
    items.sort((a, b) => b.count - a.count || a.location.localeCompare(b.location));
    return items;
  }, [sightings]);

  const totalSightings = sightings.length;
  const topCount = distribution[0]?.count ?? 1;

  return (
    <main className="page">
      <div className="container">
        <header className="page-header">
          <h1>where are the bed bugs</h1>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSegME_pJhcor5EAVb39-ruyL9babzrZgcuEazVXPecp7O7flA/viewform?usp=header"
            className="link-button"
            target="_blank"
            rel="noreferrer"
          >
            report a sighting
          </a>
        </header>

        <section className="panel distribution-panel">
          <div className="section-head">
            <h2>you should probably be careful here</h2>
            <span className="pill">{totalSightings} sightings</span>
          </div>

          <div className="distribution-grid">
            {distribution.map((item) => (
              <div className="distribution-card" key={item.location}>
                <div className="distribution-top">
                  <div>
                    <strong>@{item.location}</strong>
                    <div className="muted-text">{locationMap[item.location] ?? "Unknown building"}</div>
                  </div>
                  <span>{item.count} {item.count === 1 ? "report" : "reports"}</span>
                </div>
                <div className="bar" aria-label={`${item.location} sightings`}>
                  <div
                    className="bar-fill"
                    style={{ width: `${Math.max(8, Math.round((item.count / topCount) * 100))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
