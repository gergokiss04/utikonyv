# Intelligens Útikönyv (Szemantikus Web Demonstráció)

Ez egy olyan demonstrációs szoftver, ahol a vármegyékben található magyarországi főbb turisztikai látnivalókat, műemlékeket és szolgáltatásokat **kártyaalapú elrendezéssel** jelenítem meg. 

> [!NOTE]
> A projekt megoldása jelenleg **Észak-Magyarországra** fókuszál, de a rendszer moduláris felépítése lehetővé teszi a későbbi országos bővítést.

A szoftver különlegessége a **szemantikus lekérdezésekben** rejlik, amelyek olyan összetett szűréseket tesznek lehetővé, amelyekkel reprezentálni tudjuk a szemantikus web erejét.

---

## Felhasznált technológiák

* **Backend:** Node.js + Express.js
* **Frontend:** React

## Felhasznált szoftverek

* **Ontológia:** [Protégé](https://protege.stanford.edu/)
* **Adattár (Triple Store):** [GraphDB](https://graphdb.ontotext.com/)
* **Fejlesztő környezet:** [Visual Studio Code](https://code.visualstudio.com/)

---

## 🚀 Telepítési útmutató

### Szoftverek beszerzése
A fenti kék linkekre kattintva az összes szükséges telepítő elérhető. A fejlesztői környezet (VS Code) gyorsan, néhány kattintással telepíthető.

### Adattár (Triple Store) beállítása
1. Telepítsd a **GraphDB** ingyenes verzióját (regisztráció után használható).
2. Hozz létre egy új **Repository**-t.
3. Importáld be az `Ontology` mappában található `.ttl` kiterjesztésű fájlt.

### Alkalmazás indítása

**Backend:**
```bash
cd backend
npm install
node index.js
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```
