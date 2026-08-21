export interface GeometryFormulaItem {
  title: string;
  category: string;
  formula: string;
  description: string;
  example: string;
}

export const TCS_GEOMETRY_FORMULAS: GeometryFormulaItem[] = [
  {
    title: "2D Triangles & Inradius/Circumradius",
    category: "2D Plane Geometry",
    formula: "Area = (1/2)ab sin C = √[s(s-a)(s-b)(s-c)]\nEquilateral Area = (√3/4)a²\nInradius r = Δ / s (Equilateral: a / 2√3)\nCircumradius R = abc / (4Δ) (Equilateral: a / √3)",
    description: "In an equilateral triangle, Circumradius R = 2r. Area of circumcircle is 4 times the area of incircle.",
    example: "For equilateral triangle of side 14 cm: Incircle radius r = 7/√3 cm, Area = 154/3 = 51.33 cm²."
  },
  {
    title: "Quadrilaterals: Rhombus, Trapezium, Rectangle",
    category: "2D Quadrilaterals",
    formula: "Rhombus Area = (1/2) · d1 · d2,  Side s = √((d1/2)² + (d2/2)²)\nTrapezium Area = (1/2)(a + b) · h\nCuboid TSA Identity: (l + b + h)² = (Diagonal)² + TSA",
    description: "In a rhombus, diagonals bisect at 90°. In a trapezium, height is the perpendicular distance between parallel sides.",
    example: "Trapezium with bases 25 and 13 cm, non-parallel sides 10 cm => h = 8 cm => Area = (1/2)(38)(8) = 152 cm²."
  },
  {
    title: "Circles, Sectors, Annulus & Arbelos",
    category: "Circles & Annular Regions",
    formula: "Circumference = 2πr, Area = πr²\nAnnular Path Area = π(R² − r²) = π(R − r)(R + r)\nArc Length = (θ/360) · 2πr, Sector Area = (θ/360) · πr²\nArbelos Area = (π/4) · AC · CB",
    description: "When a sector of radius R and angle θ is rolled into a cone, base radius r_cone = (θ/360)R and slant height l = R.",
    example: "Sector of radius 12 cm with 120° angle rolled into cone => r = 4 cm, l = 12 cm, h = 8√2 cm, V ≈ 189.57 cm³."
  },
  {
    title: "Right Circular Cylinder & Hollow Pipes",
    category: "3D Cylinder Mensuration",
    formula: "Solid Cylinder: CSA = 2πrh, TSA = 2πr(r + h), Volume = πr²h\nHollow Cylinder: Volume = π(R² − r²)h\nHollow Pipe TSA = 2π(R + r)h + 2π(R² − r²)",
    description: "Total surface area of a hollow pipe consists of outer CSA + inner CSA + two annular base rings.",
    example: "Hollow pipe of length 35 cm, R = 5 cm, r = 4 cm => TSA = 2π(9)(35) + 2π(25 - 16) = 648π ≈ 2,036.57 cm²."
  },
  {
    title: "Right Circular Cone & Frustums",
    category: "3D Cone & Frustums",
    formula: "Slant Height l = √(r² + h²)\nCSA = πrl, TSA = πr(l + r), Volume = (1/3)πr²h\nFrustum Volume = (1/3)πh(R² + r² + Rr)\nFrustum Slant Height L = √[h² + (R − r)²], Frustum CSA = π(R + r)L",
    description: "When a cone is cut by a plane parallel to base at height ratio k = h1/H, Volume ratio is k³ = (h1/H)³.",
    example: "Cone of height 27 cm cut 18 cm above base: Top height = 9 cm => k = 1/3 => Top Cone : Lower Frustum = 1 : 26."
  },
  {
    title: "Sphere, Hemisphere & Spherical Rings",
    category: "3D Sphere Mensuration",
    formula: "Sphere: Surface Area = 4πR², Volume = (4/3)πR³\nSolid Hemisphere: CSA = 2πr², TSA = 3πr², Volume = (2/3)πr³\nHollow Sphere Shell: Vol = (4/3)π(R³ − r³)\nNapkin Ring Theorem: Remaining Volume V = (π/6)h³",
    description: "If sphere surface area increases by 44%, radius scales by √1.44 = 1.2 (+20%), volume scales by (1.2)³ = 1.728 (+72.8%).",
    example: "Drilling cylindrical hole of height 6 cm through any sphere leaves volume V = (π/6)(6³) = 36π cm³."
  },
  {
    title: "Prisms, Pyramids & Regular Polyhedra",
    category: "3D Polyhedra & Pyramids",
    formula: "Prism Volume = Base Area × Height, LSA = Base Perimeter × Height\nPyramid Volume = (1/3) × Base Area × Height\nRegular Tetrahedron: Volume = a³ / (6√2), TSA = √3a², Height = a√(2/3)\nEuler's Polyhedron Formula: V − E + F = 2",
    description: "For any convex 3D polyhedron, Vertices − Edges + Faces = 2 (e.g. Icosahedron: 12 − 30 + 20 = 2).",
    example: "Regular tetrahedron of edge 6 cm: Volume = 6³ / (6√2) = 18√2 cm³ ≈ 25.46 cm³."
  },
  {
    title: "Optimization & Maximum Inscribed Solids",
    category: "Optimization Geometry",
    formula: "Max Cylinder inside Cone: r = (2/3)R, h = H/3, V_max = (4/9)V_cone\nMax Cone inside Sphere: h = (4/3)R, r = (2√2/3)R, V_max / V_sphere = 8 / 27\nOpen Box from Sheet: dV/dx = 0 on V(x) = x(a − 2x)(b − 2x)\nCone inside Cylinder: V_cone : V_empty = 1 : 2",
    description: "In calculus and TCS placement optimization, maximizing polynomial volumes yields fixed universal geometric ratios.",
    example: "Sheet 45 × 24 cm with corner squares x cut: 12x² - 276x + 1080 = 0 => x = 5 cm gives maximum volume = 2,450 cm³."
  },
  {
    title: "Melting, Recasting & Liquid Flow",
    category: "Engineering Mensuration",
    formula: "Conservation of Volume: V_initial · (1 − Loss%) = N · V_unit\nFlow Rate Volume = Pipe Cross-section (πr²) × Speed (v) × Time (t)\nLiquid Level Rise H in Tank = Immersed Volume / Tank Base Area\nWire Drawn: (4/3)πR³ = πr²L",
    description: "When liquid or solid flows between containers, conservation of volume equates total volume to product of cross-sectional area and height rise.",
    example: "Water at 15 km/h via 14 cm pipe into 50m × 44m cistern: Rate = 231 m³/h, Target = 462 m³ => Time = 2 hours."
  }
];
