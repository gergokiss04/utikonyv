import "dotenv/config";
import express from "express";
import cors from "cors";
import SparqlClient from "sparql-http-client";

const app = express();
app.use(cors());
app.use(express.json());

const endpointUrl = process.env.GRAPHDB_URL;
const client = new SparqlClient({ endpointUrl });

const PREFIXES = `
  PREFIX : <http://www.semanticweb.org/motor/ontologies/2026/1/untitled-ontology-2/>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
`;

// 1. MINDENTUDÓ VÉGPONT (Helyszínek megye szerint)
app.get("/api/helyszinek/:megye", async (req, res) => {
  const query = `
        ${PREFIXES}
        SELECT DISTINCT ?id ?nev ?leiras ?varosNev ?tipus WHERE {
            ?id :talalhato ?varos .
            ?varos :reszeAnnak :${req.params.megye} .
            ?id :nev ?nev .
            ?varos :nev ?varosNev .
            OPTIONAL { ?id :leiras ?leiras }
            ?id rdf:type ?typeIRI .
            FILTER (?typeIRI != <http://www.w3.org/2002/07/owl#NamedIndividual>)
            FILTER NOT EXISTS {
                ?id rdf:type ?subType .
                ?subType rdfs:subClassOf ?typeIRI .
                FILTER (?subType != ?typeIRI)
            }
            BIND(STRAFTER(STR(?typeIRI), "untitled-ontology-2/") AS ?tipus)
        }
    `;
  try {
    const stream = await client.query.select(query);
    const results = [];
    stream.on("data", (row) => {
      results.push({
        id: row.id.value,
        nev: row.nev.value,
        leiras: row.leiras ? row.leiras.value : "",
        varos: row.varosNev.value,
        tipus: row.tipus.value,
      });
    });
    stream.on("end", () => res.json(results));
    stream.on("error", (err) => {
      console.error("SPARQL hiba:", err);
      res.status(500).json({ error: "Hiba a SPARQL lekérdezés során." });
    });
  } catch (err) {
    console.error("SPARQL kliens hiba:", err);
    res.status(500).json({ error: "Hiba a SPARQL kliens használata során." });
  }
});

// 2. STATISZTIKA (Megyei bontásban)
app.get("/api/statisztika/:megye", async (req, res) => {
  const query = `
        ${PREFIXES}
        SELECT ?tipus (COUNT(?id) AS ?db) WHERE {
            ?id :talalhato ?varos .
            ?varos :reszeAnnak :${req.params.megye} .
            
            ?id rdf:type ?typeIRI .
            FILTER (?typeIRI != <http://www.w3.org/2002/07/owl#NamedIndividual>)
            
            FILTER NOT EXISTS {
                ?id rdf:type ?subType .
                ?subType rdfs:subClassOf ?typeIRI .
                FILTER (?subType != ?typeIRI)
            }
            
            BIND(STRAFTER(STR(?typeIRI), "untitled-ontology-2/") AS ?tipus)
        } GROUP BY ?tipus
    `;
  try {
    const stream = await client.query.select(query);
    const results = [];
    stream.on("data", (row) => {
      results.push({
        tipus: row.tipus.value,
        db: parseInt(row.db.value),
      });
    });
    stream.on("end", () => res.json(results));
    stream.on("error", (err) => {
      console.error("SPARQL hiba:", err);
      res.status(500).json({ error: "Hiba a SPARQL lekérdezés során." });
    });
  } catch (err) {
    console.error("SPARQL kliens hiba:", err);
    res.status(500).json({ error: "Hiba a SPARQL kliens használata során." });
  }
});

// 3-6. KATEGÓRIA SPECIFIKUS VÉGPONTOK (Opcionális megye szűréssel)
app.get("/api/kategoria/:tipus", async (req, res) => {
  const { tipus } = req.params;
  const { megye } = req.query;

  const query = `
        ${PREFIXES}
        SELECT DISTINCT ?id ?nev ?varosNev ?leiras WHERE {
            ?id rdf:type :${tipus} .
            ?id :nev ?nev .
            ?id :talalhato ?varos .
            ?varos :nev ?varosNev .
            
            OPTIONAL { ?id :leiras ?leiras }
            
            ${megye ? `?varos :reszeAnnak :${megye} .` : ""}
        }
    `;

  try {
    const stream = await client.query.select(query);
    const results = [];
    stream.on("data", (row) => {
      results.push({
        id: row.id.value,
        nev: row.nev.value,
        leiras: row.leiras ? row.leiras.value : "",
        varos: row.varosNev.value,
        tipus: tipus,
      });
    });
    stream.on("end", () => res.json(results));
    stream.on("error", (err) => {
      console.error("SPARQL hiba:", err);
      res.status(500).json({ error: "Hiba a SPARQL lekérdezés során." });
    });
  } catch (err) {
    console.error("SPARQL kliens hiba:", err);
    res.status(500).json({ error: "Hiba a SPARQL kliens használata során." });
  }
});

// 7. Vármegyék listázása
app.get("/api/megyek", async (req, res) => {
  const query = `
        ${PREFIXES}
        SELECT DISTINCT ?id ?nev WHERE {
            ?id rdf:type :Varmegye .
            ?id :nev ?nev .
        } ORDER BY ?nev
    `;

  try {
    const stream = await client.query.select(query);
    const results = [];
    stream.on("data", (row) => {
      results.push({
        id: row.id.value.split("#").pop(),
        nev: row.nev.value,
      });
    });
    stream.on("end", () => res.json(results));
    stream.on("error", (err) => {
      console.error("SPARQL hiba (megyek):", err);
      res.status(500).json({ error: "Hiba a vármegyék lekérésekor." });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Intelligens ajánló
app.get("/api/ajanlo", async (req, res) => {
  const query = `
        ${PREFIXES}
        SELECT DISTINCT ?id ?nev ?varosNev ?tipus ?leiras WHERE {
            ?id :talalhato ?varos .
            ?varos :nev ?varosNev .
            ?id :nev ?nev .
            OPTIONAL { ?id :leiras ?leiras }
            
            ?id rdf:type ?typeIRI .
            ?typeIRI rdfs:subClassOf* :Helyszin .
            FILTER (?typeIRI != owl:NamedIndividual && ?typeIRI != :Helyszin && ?typeIRI != :Latnivalo && ?typeIRI != :Szolgaltatas)
            BIND(STRAFTER(STR(?typeIRI), "untitled-ontology-2/") AS ?tipus)
        }
        ORDER BY RAND()
        LIMIT 3
    `;
  try {
    const stream = await client.query.select(query);
    const results = [];
    stream.on("data", (row) => {
      results.push({
        id: row.id.value,
        nev: row.nev.value,
        leiras: row.leiras ? row.leiras.value : "",
        varos: row.varosNev.value,
        tipus: row.tipus.value,
      });
    });
    stream.on("end", () => res.json(results));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Szerver hiba" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend fut: http://localhost:${PORT}`));
