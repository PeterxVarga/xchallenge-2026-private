# R157 — Forrásból döntés: research workbench és célzott helyi ellenpróba
2026-11-18 | X-Challenge ONLY | téma OPEN, NO_SEND, NO_PROTOTYPE, NO_PRESENTATION, NO_PURCHASE. Kiinduló main 5355c7292beb7cca94adeea7250cd6d53a4b83aa. A korábbi két R151 és átfedő R152–R200, R152–R156 útvonalak megmaradnak. A kutatási rendszer fejlesztésére adott engedély nem a versenyprojekt implementációja.
## ROI
Három megvalósítható út: (a) új vektoradatbázis és automatikus AI-kinyerés, (b) meglévő Git + registry teljes korpuszos keresése, forrásazonosított admission és döntési csomag, (c) újabb kézi kutatási jelentés integráció nélkül. B a legkisebb alkalmas, natívan futtatható, új szolgáltatás vagy külső adatküldés nélkül; A később csak mérhető retrieval-hiba esetén. A közös Intelligence motorba most nem nyúlunk: a meglévő 78 X-only observation a történeti snapshot, nem új forrás vagy importált éles adat. A valódi E2E út: commitolt forrásszöveg -> keresés -> ember/agent által értelmezett, explicit korláttal ellátott finding card -> preview -> ellenőrzött befogadás -> provenance és gate packet -> döntés. Nem automatikus tény-hitelesítés vagy szemantikus LLM extractor.
## Óvodai felújítás és névkorrekció
S1: https://www.kobanya.hu/?action=getfile&fid=209283&module=news&v=b9965da43153174e9c2a6f3e3e5587c0 . 2026 I. félévi beruházási melléklet nyomtatott 12–13., PDF 0-index 12 és13 vizuálisan ellenőrizve. A Gézengúz kivitelezés fenti állapota megerősítés, R153–155 már tartalmazta, új független eredményként nem számoljuk. Az eredeti 13. oldal címében Napsugár és Csodapók szerepel; gépi kinyerésben Cseperedők, a 12. oldal ideiglenes elhelyezési címében Napraforgó, ezért a név és operatív telephely nem biztosan azonosítható a kinyert szövegből. A 4Mrd Ft teljes felújítás fedezete nem csak hűtés, nem a saját pilot forrása. 21 befejezett és 13 megkezdett méltányossági ablakcsere vizuálisan is megerősítve, már a korábbi R155-ben szerepel. Nem adjuk hozzá kétszer. Sem 2027-es óvodai ügyeleti rendet, sem új igazolt hőhiányt nem nyertünk.
## Lakhatási költségvetési csatorna
S2: https://www.kobanya.hu/?action=getfile&fid=209314&module=news&v=6196f1ed1b0b35a37bee02a06e0675a8 . Költségvetési mellékletek, kinyert szöveg L1688–1693 és L1803–1808, illetve L4409–4411. Június30-i ingatlanfelújítások (ÁFA nélkül), Budapest Airport zajvédelmi program nyílászárócseréje 36 553 410 Ft. A pontos sorszám eltér a külön táblaváltozatokban; az összeget nem összegezzük a két előfordulásból. A kapcsolódó tétel pontos oldalát ezúttal nem vizuálisan igazoltuk. Ugyanezen PDF index35 vizuálisan az általános tartalék módosításainál 3 154 000 Ft klímabeszerzést mutat; intézményazonosítás nincs. Nem költési bizonylat, nem új 2027-es hővédelmi program, nem automatikusan hozzáférhető pénz, nem vonjuk le egy pilot költségéből.
S3 korábbi jelentés újbóli keresési találata https://www.kobanya.hu/?action=getfile&fid=208591&module=news&v=d246551d1edcb44d1c449af681f75984 ; lakószobai zajvédelmi nyílászárócsere mellett további helyiségek ablakcseréje, R156 már tartalmazta; nem új finding. A zaj és túlmelegedés egyidejű fennállása továbbra is UNKNOWN. A HŐOTTHON CSEND a zajvédelem megőrzésével csak konkrét hőhiányra adhat többletet.
## Döntési következmény
HŐTÉR vezet a dokumentált történeti hőprobléma alapján, a 2027-es tényleges normál ellátás UNKNOWN marad. HŐOTTHON CSEND fontos ellenjelölt, az új összeg csak a felújítási csatorna részlete, nem helyi hőhatás. HŐOVI NYÁR meglévő beruházások miatt csak residual esetén; HŐMENEDÉK24 és HŐKÖLCSÖN továbbra is feltételes. KŐHŰTŐ üzemi vízáram, T, vízkémia és csatlakozás/engedély nem került elő. Nem indokolt új rangsort vagy témaválasztást bejelenteni. A mostani keresés célzott, nem teljes új külső audit. A 4 alábbi explicit finding card az agent által értelmezett, limitált állítás: szövegben vagy képen adott forrásállapotot örökít, nem automatikusan igazolt külső tényt. Két új költségvetési tétel, egy korábbi beruházási megerősítés és egy névkorrekció/terv; nem négy új, független beruházás.
## Explicit reviewed finding cards
~~~finding-json
{
  "id": "r157-noise-budget",
  "family": "HOME",
  "kind": "LOCAL_PLAN",
  "locator": "## Lakhatási költségvetési csatorna",
  "claim": "A 2026. június 30-i előirányzati mellékletben a Budapest Airport zajvédelmi nyílászárócserére 36 553 410 Ft szerepel az ÁFA nélküli ingatlanfelújítási szekcióban.",
  "limit": "Kinyert táblázat; a pontos sor oldalképe nem ellenőrzött. Nem szabad maradvány, nem tényleges kiadás és nem hővédelmi keret.",
  "decision": "HŐOTTHON CSEND bevezetési csatornáját erősíti, új hővédelmi finanszírozást nem igazol."
}
~~~

~~~finding-json
{
  "id": "r157-gezenguz-progress",
  "family": "PRESCHOOL",
  "kind": "LOCAL_HISTORICAL",
  "locator": "## Óvodai felújítás és névkorrekció",
  "claim": "A 2026 első félévi beszámoló eredeti 13. oldala a Gézengúz hűtési és villamos/fűtési korszerűsítéséhez lezajlott közbeszerzést és június végén indult kivitelezést rögzít.",
  "limit": "A beszámoló történeti státusza, nem átadás vagy működő szobahűtés; R153–155 előzmény újraellenőrzése, nem új független beruházás.",
  "decision": "A normál beruházás lefedettségét kell előbb ismerni; a hűtési pilot nem számolható ezen munka helyett."
}
~~~

~~~finding-json
{
  "id": "r157-napsugar-heading",
  "family": "PRESCHOOL",
  "kind": "LOCAL_PLAN",
  "locator": "## Óvodai felújítás és névkorrekció",
  "claim": "Az eredeti 13. oldalkép a Napsugár Bölcsőde és Csodapók Óvoda teljes felújítását nevezi meg, 4 milliárd Ft 2026-os jóváhagyott fedezettel; a kinyert szöveg ettől eltérő óvodanevet tartalmaz.",
  "limit": "A dokumentum előző oldala is eltérő bölcsődenevezést használ. Nem bizonyított telephelyi útvonal, elkészült beruházás, hűtési részkeret vagy új projektforrás.",
  "decision": "Oldalkép az elsődleges, de az intézményi névellentmondást nem oldjuk fel feltételezéssel. 2027-es ellátási hely és kivitelezés egyeztetése szükséges."
}
~~~

~~~finding-json
{
  "id": "r157-unallocated-ac",
  "family": "ALL",
  "kind": "LOCAL_PLAN",
  "locator": "## Lakhatási költségvetési csatorna",
  "claim": "A 2026. június 30-i általános tartalék felhasználásának táblája 3 154 000 Ft klímabeszerzést mutat a módosítások között.",
  "limit": "A sor nem nevezi meg a fogadó intézményt, egységszámot vagy beszerelést. Nem hozzáférhető új keret és nem a Tekergő/KEÓ átadási bizonyítéka.",
  "decision": "Ne tulajdonítsuk a döntősöknek; további konkrét beruházásazonosító szükséges."
}
~~~
## Állapot
Koncepcióválasztás PARTIAL/OPEN, hővédelmi funkcionális/E2E/éles készültség UNKNOWN. A rendszer lokalizált kutatási képesség, nem nyilvános app, nem autonóm távolléti kutatás. A registry tesztjei és natív checkout ellenőrzése külön technikai bizonyíték; a döntéshez még hiányzik a konkrét 2027 residual. Nincs érzékeny lakói adat, külső kapcsolat, prototípus vagy témalezárás.
