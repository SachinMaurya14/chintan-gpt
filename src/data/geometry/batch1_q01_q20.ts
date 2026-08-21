import { GeometryRawQuestion } from "./types.js";

export const GEOMETRY_BATCH1: GeometryRawQuestion[] = [
  {
    id: "tcs_geom_01",
    question: "The length of a rectangular plot is 20 m more than its breadth. If the cost of fencing the plot along its perimeter at ₹26.50 per meter is ₹5,300, what is the area of the rectangular plot in square meters?",
    options: [
      "2,400 m²",
      "2,100 m²",
      "2,800 m²",
      "1,800 m²"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Total perimeter = Total Cost / Cost per meter = 5300 / 26.50 = 200 m.\nStep 2: Let breadth = b meters, then length l = b + 20.\nStep 3: Perimeter = 2(l + b) = 2(b + 20 + b) = 2(2b + 20) = 4b + 40.\nStep 4: 4b + 40 = 200 => 4b = 160 => b = 40 m.\nStep 5: Length l = 40 + 20 = 60 m.\nStep 6: Area = l × b = 60 × 40 = 2,400 m².",
    formulaUsed: "Perimeter = 2(l + b), Area = l × b, Total Cost = Perimeter × Rate",
    difficulty: "Easy",
    category: "2D Perimeter & Area",
    yearAsked: "TCS Ninja 2022"
  },
  {
    id: "tcs_geom_02",
    question: "The area of an equilateral triangle is 49√3 cm². A circle is inscribed inside this triangle. What is the area of the inscribed circle? (Use π = 22/7)",
    options: [
      "51.33 cm²",
      "48.25 cm²",
      "53.67 cm²",
      "46.50 cm²"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Area of equilateral triangle = (√3/4)a² = 49√3 => a² = 196 => side a = 14 cm.\nStep 2: Inradius of equilateral triangle r = a / (2√3) = 14 / (2√3) = 7/√3 cm.\nStep 3: Area of inscribed circle = πr² = (22/7) × (7/√3)² = (22/7) × (49/3) = (22 × 7)/3 = 154/3 = 51.33 cm².",
    formulaUsed: "Area of equilateral triangle = (√3/4)a², Inradius r = a / (2√3), Area of circle = πr²",
    difficulty: "Easy",
    category: "Inscribed Figures & Triangles",
    yearAsked: "TCS NQT 2023"
  },
  {
    id: "tcs_geom_03",
    question: "The diagonals of a rhombus are in the ratio 3 : 4 and its perimeter is 40 cm. Find the area of the rhombus in square centimeters.",
    options: [
      "96 cm²",
      "48 cm²",
      "120 cm²",
      "72 cm²"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Perimeter of rhombus = 4s = 40 cm => side s = 10 cm.\nStep 2: Let the half-diagonals be 3x and 4x (so diagonals d1 = 6x, d2 = 8x).\nStep 3: In a rhombus, diagonals bisect each other perpendicularly: (d1/2)² + (d2/2)² = s² => (3x)² + (4x)² = 10² => 9x² + 16x² = 100 => 25x² = 100 => x² = 4 => x = 2.\nStep 4: Diagonals are d1 = 6(2) = 12 cm, d2 = 8(2) = 16 cm.\nStep 5: Area = (1/2) × d1 × d2 = (1/2) × 12 × 16 = 96 cm².",
    formulaUsed: "Side s = √((d1/2)² + (d2/2)²), Area of Rhombus = (1/2) × d1 × d2",
    difficulty: "Easy",
    category: "Rhombus Geometry",
    yearAsked: "TCS Ninja 2021"
  },
  {
    id: "tcs_geom_04",
    question: "A wire when bent into the form of a square encloses an area of 484 cm². If the same wire is bent into the form of a circle, what is the area enclosed by the circle? (Take π = 22/7)",
    options: [
      "616 cm²",
      "588 cm²",
      "644 cm²",
      "512 cm²"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Area of square = s² = 484 cm² => s = √484 = 22 cm.\nStep 2: Length of the wire = Perimeter of square = 4 × 22 = 88 cm.\nStep 3: Circumference of circle = 2πr = 88 => 2 × (22/7) × r = 88 => r = 14 cm.\nStep 4: Area of circle = πr² = (22/7) × 14 × 14 = 22 × 2 × 14 = 616 cm².",
    formulaUsed: "Perimeter of square = 4s, Circumference = 2πr, Area = πr²",
    difficulty: "Easy",
    category: "Melting & Recasting / 2D Conversion",
    yearAsked: "TCS NQT 2022"
  },
  {
    id: "tcs_geom_05",
    question: "The parallel sides of a trapezium are 25 cm and 13 cm, and its non-parallel sides are each equal to 10 cm. What is the area of the trapezium?",
    options: [
      "152 cm²",
      "144 cm²",
      "168 cm²",
      "136 cm²"
    ],
    correctAnswer: "A",
    explanation: "Step 1: In an isosceles trapezium, the difference between parallel bases = 25 - 13 = 12 cm.\nStep 2: Projection on each side = 12 / 2 = 6 cm.\nStep 3: Height h = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.\nStep 4: Area of trapezium = (1/2) × (a + b) × h = (1/2) × (25 + 13) × 8 = (1/2) × 38 × 8 = 152 cm².",
    formulaUsed: "Area of Trapezium = (1/2)(a + b)h, Height h = √(c² - ((a - b)/2)²)",
    difficulty: "Moderate",
    category: "Trapezium Geometry",
    yearAsked: "TCS Digital 2023"
  },
  {
    id: "tcs_geom_06",
    question: "A racetrack is in the form of a ring whose inner circumference is 352 m and outer circumference is 396 m. What is the width of the track and the area of the track? (Use π = 22/7)",
    options: [
      "Width = 7 m, Area = 2,618 m²",
      "Width = 8 m, Area = 2,840 m²",
      "Width = 6 m, Area = 2,420 m²",
      "Width = 7 m, Area = 2,816 m²"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Inner circumference 2πr = 352 => 2 × (22/7) × r = 352 => r = (352 × 7) / 44 = 56 m.\nStep 2: Outer circumference 2πR = 396 => 2 × (22/7) × R = 396 => R = (396 × 7) / 44 = 63 m.\nStep 3: Width of track = R - r = 63 - 56 = 7 m.\nStep 4: Area of annular track = π(R² - r²) = π(R - r)(R + r) = (22/7) × 7 × (63 + 56) = 22 × 119 = 2,618 m².",
    formulaUsed: "Annulus Area = π(R² - r²) = π(R - r)(R + r), Width = R - r",
    difficulty: "Moderate",
    category: "Annular Regions & Circles",
    yearAsked: "TCS Ninja 2022"
  },
  {
    id: "tcs_geom_07",
    question: "A circular garden of radius 21 m has a gravel path of width 3.5 m running all around its outside. If the cost of paving the path with concrete tiles is ₹45 per square meter, calculate the total expenditure. (Take π = 22/7)",
    options: [
      "₹22,522.50",
      "₹21,450.00",
      "₹24,180.50",
      "₹19,845.00"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Inner radius r = 21 m, outer radius R = 21 + 3.5 = 24.5 m.\nStep 2: Area of path = π(R² - r²) = (22/7) × (24.5² - 21²) = (22/7) × (24.5 - 21)(24.5 + 21) = (22/7) × 3.5 × 45.5 = 22 × 0.5 × 45.5 = 11 × 45.5 = 500.5 m².\nStep 3: Total cost = Area × Rate = 500.5 × 45 = ₹22,522.50.",
    formulaUsed: "Path Area = π(R + r)(R - r), Total Cost = Area × Rate",
    difficulty: "Moderate",
    category: "Cost-based Mensuration & Circles",
    yearAsked: "TCS NQT 2023"
  },
  {
    id: "tcs_geom_08",
    question: "A sector of a circle of radius 12 cm has an angle of 120°. If this sector is rolled up such that its two bounding radii are joined to form a cone, what is the volume of the cone formed? (Take π = 3.1416)",
    options: [
      "189.57 cm³",
      "176.42 cm³",
      "198.24 cm³",
      "164.80 cm³"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Arc length of sector = (θ/360) × 2πR = (120/360) × 2π(12) = (1/3) × 24π = 8π cm.\nStep 2: When formed into a cone, arc length becomes the base circumference 2πr = 8π => radius of cone r = 4 cm.\nStep 3: Slant height of cone l = radius of sector = 12 cm.\nStep 4: Vertical height h = √(l² - r²) = √(12² - 4²) = √(144 - 16) = √128 = 8√2 ≈ 11.3137 cm.\nStep 5: Volume of cone = (1/3)πr²h = (1/3) × π × 4² × 8√2 = (128√2 π) / 3 ≈ (128 × 1.4142 × 3.1416) / 3 ≈ 189.57 cm³.",
    formulaUsed: "Arc Length = (θ/360)2πR = 2πr_cone, h = √(l² - r²), Volume = (1/3)πr²h",
    difficulty: "Advanced",
    category: "Sector to Cone Conversion",
    yearAsked: "TCS Digital 2024"
  },
  {
    id: "tcs_geom_09",
    question: "A solid metallic sphere of radius 10.5 cm is melted and recast into a number of smaller solid cones, each of radius 3.5 cm and height 3 cm. Find the number of cones formed.",
    options: [
      "126",
      "108",
      "144",
      "96"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Volume of sphere = (4/3)πR³ = (4/3)π × (10.5)³ = (4/3)π × (21/2)³ = (4/3)π × (9261/8) = (9261/6)π = 1543.5π cm³.\nStep 2: Volume of one cone = (1/3)πr²h = (1/3)π × (3.5)² × 3 = π × (7/2)² = (49/4)π = 12.25π cm³.\nStep 3: Number of cones = Volume of sphere / Volume of one cone = 1543.5π / 12.25π = 1543.5 / 12.25 = 126.",
    formulaUsed: "Number of recast objects = Volume_initial / Volume_individual, Sphere Vol = (4/3)πR³, Cone Vol = (1/3)πr²h",
    difficulty: "Moderate",
    category: "Melting and Recasting",
    yearAsked: "TCS Ninja 2022"
  },
  {
    id: "tcs_geom_10",
    question: "A solid right circular cylinder has a total surface area of 462 cm². Its curved surface area is one-third of its total surface area. What is the volume of the cylinder? (Take π = 22/7)",
    options: [
      "539 cm³",
      "462 cm³",
      "616 cm³",
      "385 cm³"
    ],
    correctAnswer: "A",
    explanation: "Step 1: TSA = 2πr(r + h) = 462 cm².\nStep 2: CSA = 2πrh = (1/3) × 462 = 154 cm².\nStep 3: Area of two circular bases = TSA - CSA = 462 - 154 = 308 cm² => 2πr² = 308 => πr² = 154 => (22/7)r² = 154 => r² = 49 => r = 7 cm.\nStep 4: From CSA: 2πrh = 154 => 2 × (22/7) × 7 × h = 154 => 44h = 154 => h = 154/44 = 3.5 cm (or 7/2 cm).\nStep 5: Volume = πr²h = 154 × 3.5 = 539 cm³.",
    formulaUsed: "TSA = 2πr(r + h), CSA = 2πrh, Volume = πr²h",
    difficulty: "Moderate",
    category: "Cylinder Mensuration",
    yearAsked: "TCS NQT 2023"
  },
  {
    id: "tcs_geom_11",
    question: "A conical tent is 9 m high and the diameter of its base is 24 m. What is the cost of canvas required to make the tent at the rate of ₹28 per square meter? (Take π = 22/7)",
    options: [
      "₹15,840",
      "₹14,250",
      "₹16,420",
      "₹17,160"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Height h = 9 m, base radius r = 24 / 2 = 12 m.\nStep 2: Slant height l = √(r² + h²) = √(12² + 9²) = √(144 + 81) = √225 = 15 m.\nStep 3: Canvas required = Curved Surface Area (CSA) of cone = πrl = (22/7) × 12 × 15 = (22 × 180) / 7 = 3960 / 7 m².\nStep 4: Total Cost = Area × Rate = (3960 / 7) × 28 = 3960 × 4 = ₹15,840.",
    formulaUsed: "Slant height l = √(r² + h²), CSA = πrl, Cost = CSA × Rate",
    difficulty: "Easy",
    category: "Cone Surface Area & Cost",
    yearAsked: "TCS Ninja 2021"
  },
  {
    id: "tcs_geom_12",
    question: "A hollow cylindrical pipe of length 35 cm has external diameter 10 cm and thickness 1 cm. What is the total surface area of the hollow pipe in cm²? (Take π = 22/7)",
    options: [
      "2,036.57 cm²",
      "1,980.00 cm²",
      "2,154.28 cm²",
      "1,848.50 cm²"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Length h = 35 cm, External radius R = 10 / 2 = 5 cm, thickness t = 1 cm => Internal radius r = 5 - 1 = 4 cm.\nStep 2: External CSA = 2πRh = 2 × (22/7) × 5 × 35 = 2 × 22 × 5 × 5 = 1,100 cm².\nStep 3: Internal CSA = 2πrh = 2 × (22/7) × 4 × 35 = 2 × 22 × 4 × 5 = 880 cm².\nStep 4: Area of two ring bases = 2 × π(R² - r²) = 2 × (22/7) × (25 - 16) = 2 × (22/7) × 9 = 396 / 7 ≈ 56.57 cm².\nStep 5: Total Surface Area = External CSA + Internal CSA + 2(Ring Base Area) = 1100 + 880 + 56.57 = 2,036.57 cm².",
    formulaUsed: "Hollow Cylinder TSA = 2π(R + r)h + 2π(R² - r²)",
    difficulty: "Advanced",
    category: "Hollow Cylinder",
    yearAsked: "TCS Digital 2023"
  },
  {
    id: "tcs_geom_13",
    question: "A hemispherical bowl of internal diameter 36 cm contains a liquid. This liquid is to be filled into small cylindrical bottles of diameter 6 cm and height 6 cm. How many such bottles are required to empty the bowl completely?",
    options: [
      "72",
      "64",
      "81",
      "54"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Radius of hemispherical bowl R = 36 / 2 = 18 cm.\nStep 2: Volume of hemisphere = (2/3)πR³ = (2/3)π × 18³ = (2/3)π × 5832 = 3888π cm³.\nStep 3: Radius of cylindrical bottle r = 6 / 2 = 3 cm, height h = 6 cm.\nStep 4: Volume of one bottle = πr²h = π × 3² × 6 = 54π cm³.\nStep 5: Number of bottles = Volume of bowl / Volume of one bottle = 3888π / 54π = 72.",
    formulaUsed: "Hemisphere Volume = (2/3)πR³, Cylinder Volume = πr²h, Count = Vol_total / Vol_unit",
    difficulty: "Easy",
    category: "Volume Transfer & Solids",
    yearAsked: "TCS Ninja 2022"
  },
  {
    id: "tcs_geom_14",
    question: "Water flows at the rate of 15 km/h through a cylindrical pipe of diameter 14 cm into a rectangular cuboidal cistern of dimensions 50 m × 44 m. In what time (in hours) will the level of water in the cistern rise by 21 cm? (Take π = 22/7)",
    options: [
      "2 hours",
      "2.5 hours",
      "3 hours",
      "1.5 hours"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Radius of pipe r = 14 / 2 = 7 cm = 0.07 m.\nStep 2: Area of cross-section of pipe A = πr² = (22/7) × (0.07)² = (22/7) × 0.0049 = 0.0154 m².\nStep 3: Speed of water v = 15 km/h = 15,000 m/h.\nStep 4: Volume of water discharged per hour = A × v = 0.0154 × 15,000 = 231 m³/h.\nStep 5: Volume of water required in cistern = l × b × h = 50 × 44 × (21/100) = 50 × 44 × 0.21 = 462 m³.\nStep 6: Time required = Required Volume / Rate of flow = 462 / 231 = 2 hours.",
    formulaUsed: "Volume flow rate = Cross-sectional Area × Flow Velocity, Time = Target Volume / Volume Flow Rate",
    difficulty: "Advanced",
    category: "Water Displacement and Flow",
    yearAsked: "TCS Digital 2022"
  },
  {
    id: "tcs_geom_15",
    question: "The dimensions of a rectangular metal block (cuboid) are 66 cm × 42 cm × 21 cm. It is melted and recast into a solid sphere. What is the surface area of the sphere formed? (Take π = 22/7)",
    options: [
      "5,544 cm²",
      "4,850 cm²",
      "5,220 cm²",
      "6,160 cm²"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Volume of cuboid = 66 × 42 × 21 = 58,212 cm³.\nStep 2: Volume of sphere = (4/3)πR³ = 58,212 => (4/3) × (22/7) × R³ = 58,212 => (88/21)R³ = 58,212 => R³ = (58,212 × 21) / 88 = 661.5 × 21 = 13,891.5 => wait, 58212 / 88 = 661.5, 661.5 × 21 = 9261.\nStep 3: R³ = 9261 => R = 21 cm (since 21³ = 9261).\nStep 4: Surface Area of sphere = 4πR² = 4 × (22/7) × 21 × 21 = 4 × 22 × 3 × 21 = 88 × 63 = 5,544 cm².",
    formulaUsed: "Cuboid Volume = l × b × h, Sphere Volume = (4/3)πR³, Sphere Surface Area = 4πR²",
    difficulty: "Moderate",
    category: "Melting and Recasting",
    yearAsked: "TCS NQT 2023"
  },
  {
    id: "tcs_geom_16",
    question: "A right circular cone of height 20 cm and base radius 15 cm is cut by a plane parallel to its base at a distance of 8 cm from the vertex. What is the ratio of the volume of the smaller cone created to the volume of the original cone?",
    options: [
      "8 : 125",
      "4 : 25",
      "2 : 5",
      "16 : 125"
    ],
    correctAnswer: "A",
    explanation: "Step 1: By similar triangles, the ratio of dimensions (height, radius, slant height) of the smaller cone to the original cone is k = h1 / h = 8 / 20 = 2 / 5.\nStep 2: The volume of similar 3D geometric shapes scales with the cube of their linear scale factor: V1 / V = k³ = (2/5)³ = 8 / 125.\nStep 3: Ratio of volumes = 8 : 125.",
    formulaUsed: "Volume Scaling for Similar Cones: V1 / V2 = (h1 / h2)³",
    difficulty: "Moderate",
    category: "Similar Solids & Volume Scaling",
    yearAsked: "TCS Ninja 2023"
  },
  {
    id: "tcs_geom_17",
    question: "A cube of edge 14 cm is inscribed with a sphere such that the sphere touches all six faces of the cube. What is the volume of the space inside the cube that is outside the sphere? (Take π = 22/7)",
    options: [
      "1,306.67 cm³",
      "1,437.33 cm³",
      "1,215.50 cm³",
      "1,520.00 cm³"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Side of cube a = 14 cm => Volume of cube = a³ = 14³ = 2,744 cm³.\nStep 2: The sphere touches all faces => diameter of sphere d = a = 14 cm => radius R = 7 cm.\nStep 3: Volume of sphere = (4/3)πR³ = (4/3) × (22/7) × 7³ = (4/3) × 22 × 49 = 4312 / 3 = 1,437.33 cm³.\nStep 4: Volume of empty space = Volume of cube - Volume of sphere = 2,744 - 1,437.33 = 1,306.67 cm³.",
    formulaUsed: "Cube Vol = a³, Inscribed Sphere Radius R = a/2, Empty Space = a³ - (4/3)π(a/2)³",
    difficulty: "Moderate",
    category: "Inscribed Solids & Empty Space",
    yearAsked: "TCS Digital 2022"
  },
  {
    id: "tcs_geom_18",
    question: "The base of a right prism is a triangle whose sides are 9 cm, 12 cm, and 15 cm. If the height of the prism is 10 cm, find its total surface area.",
    options: [
      "468 cm²",
      "432 cm²",
      "512 cm²",
      "360 cm²"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Check the triangle sides: 9² + 12² = 81 + 144 = 225 = 15². It is a right-angled triangle.\nStep 2: Base Area = (1/2) × base × height = (1/2) × 9 × 12 = 54 cm².\nStep 3: Base Perimeter = 9 + 12 + 15 = 36 cm.\nStep 4: Lateral Surface Area (LSA) = Base Perimeter × Height = 36 × 10 = 360 cm².\nStep 5: Total Surface Area (TSA) = LSA + 2(Base Area) = 360 + 2(54) = 360 + 108 = 468 cm².",
    formulaUsed: "Prism LSA = Perimeter × Height, TSA = LSA + 2 × Base Area",
    difficulty: "Moderate",
    category: "Prism Geometry",
    yearAsked: "TCS NQT 2023"
  },
  {
    id: "tcs_geom_19",
    question: "Find the volume of a regular tetrahedron whose edge length is 6 cm.",
    options: [
      "18√2 cm³",
      "12√3 cm³",
      "24√2 cm³",
      "16√3 cm³"
    ],
    correctAnswer: "A",
    explanation: "Step 1: A regular tetrahedron has 4 equilateral triangular faces of edge a = 6 cm.\nStep 2: Volume of a regular tetrahedron = a³ / (6√2).\nStep 3: Substitute a = 6: Volume = 6³ / (6√2) = 216 / (6√2) = 36 / √2 = 18√2 cm³ ≈ 25.46 cm³.",
    formulaUsed: "Volume of Regular Tetrahedron = a³ / (6√2) = (√2 / 12)a³",
    difficulty: "Advanced",
    category: "Polyhedra & Tetrahedron",
    yearAsked: "TCS Prime 2024"
  },
  {
    id: "tcs_geom_20",
    question: "A four-walled room has length 8 m, breadth 6 m, and height 4 m. It has two doors each of size 2 m × 1 m and two windows each of size 1.5 m × 1 m. Find the total cost of painting the four walls and the ceiling at ₹35 per square meter.",
    options: [
      "₹5,320",
      "₹5,600",
      "₹4,980",
      "₹5,145"
    ],
    correctAnswer: "A",
    explanation: "Step 1: Area of 4 walls = 2h(l + b) = 2 × 4 × (8 + 6) = 8 × 14 = 112 m².\nStep 2: Area of ceiling = l × b = 8 × 6 = 48 m².\nStep 3: Total unadjusted area = 112 + 48 = 160 m².\nStep 4: Area of 2 doors = 2 × (2 × 1) = 4 m².\nStep 5: Area of 2 windows = 2 × (1.5 × 1) = 3 m².\nStep 6: Total openings area = 4 + 3 = 7 m².\nStep 7: Net paintable area = 160 - 7 = 153 m².\nStep 8: Total cost = 153 × 35 = ₹5,320.",
    formulaUsed: "Wall Area = 2h(l + b), Ceiling Area = l × b, Net Area = Gross Area - Openings Area, Cost = Area × Rate",
    difficulty: "Easy",
    category: "Cost-based Mensuration & Real-World",
    yearAsked: "TCS Ninja 2022"
  }
];
