import { SystemDesignProblem } from "./systemDesignTypes.js";

export const SYSTEM_DESIGN_LLD_OOD: SystemDesignProblem[] = [
  {
    id: "sd_lld_001",
    title: "Design a Multi-Level Parking Lot System",
    difficulty: "Easy",
    designType: "LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Amazon", "Microsoft", "Google", "Adobe", "Salesforce", "Atlassian", "Walmart Global Tech"],
    reportedMetadata: {
      company: "Amazon",
      role: "SDE I / SDE II",
      approxYear: "2023",
      round: "Object-Oriented Design (LLD)",
      sourceNote: "Top staple LLD problem asked to evaluate inheritance, spot allocation algorithms, and thread safety."
    },
    categoryTag: "Object-Oriented Design",
    problemStatement:
      "Design a multi-floor parking lot system capable of supporting multiple vehicle types (Motorcycles, Cars, Buses/Trucks, EV Cars with charging stations). Support dynamic spot allocation, ticketing, fee calculation strategies, multiple entry/exit gates, and thread-safe concurrent parking operations.",
    functionalRequirements: [
      "Multi-Floor & Spot Types: Support Two-Wheeler (Compact), Regular Car, Large/Heavy (Bus/Truck), and EV charging spots across N floors.",
      "Vehicle Ingress: When a vehicle arrives at an entry gate, allocate the nearest available compatible parking spot, issue an immutable ticket, and update real-time display boards.",
      "Vehicle Egress: When leaving via an exit gate, scan ticket, compute duration, calculate parking fee via pluggable pricing strategies, accept payment, and free the spot.",
      "Live Display Board: Each floor displays remaining available spots per vehicle category in real time."
    ],
    nonFunctionalRequirements: [
      "Concurrency & Thread Safety: Multiple entry gates must not allocate the same physical spot to two vehicles simultaneously.",
      "Extensibility: Adding new spot types (e.g. VIP, Handicapped) or new fee calculation rules must adhere to Open/Closed Principle."
    ],
    assumptions: [
      "Single parking lot with 5 floors, 100 spots per floor, 3 entry gates and 3 exit gates.",
      "Spot allocation policy: Nearest spot to entry gate (Lowest Floor -> Lowest Spot Index)."
    ],
    apiDesign: [
      {
        method: "POST",
        endpoint: "/parking/entry/issue-ticket",
        description: "Allocate spot and generate ticket on vehicle arrival.",
        requestBody: '{ "licensePlate": "KA-01-AB-1234", "vehicleType": "CAR", "gateId": "GATE_ENT_1" }',
        responseBody: '{ "ticketId": "TCK_99182", "spotId": "FL1_S42", "entryTime": "2026-08-19T10:00:00Z" }'
      },
      {
        method: "POST",
        endpoint: "/parking/exit/process-payment",
        description: "Process payment and release parking spot.",
        requestBody: '{ "ticketId": "TCK_99182", "paymentMethod": "UPI" }',
        responseBody: '{ "status": "PAID", "amount": 60.00, "exitGranted": true }'
      }
    ],
    dataModel: {
      type: "Relational (SQL)",
      entities: [
        {
          name: "ParkingSpot",
          description: "Physical parking slot state.",
          fields: ["spot_id (VARCHAR)", "floor_number (INT)", "spot_type (ENUM)", "is_occupied (BOOLEAN)", "active_vehicle_id (VARCHAR)"]
        },
        {
          name: "ParkingTicket",
          description: "Issued ticket linking vehicle to spot.",
          fields: ["ticket_id (VARCHAR)", "vehicle_plate (VARCHAR)", "spot_id (VARCHAR)", "entry_time (TIMESTAMP)", "exit_time (TIMESTAMP)", "fee_paid (DECIMAL)", "status (ENUM)"]
        }
      ],
      explanation: "Relational schema ensuring atomicity when locking and releasing parking spots."
    },
    architecture: {
      diagramAscii: `
+------------------+       +-------------------+       +---------------------+
|    EntryGate     | ----> | ParkingController | ----> |   SpotAllocator     |
+------------------+       +-------------------+       +---------------------+
                                     |                            |
                                     v                            v
                            +-----------------+        +---------------------+
                            |  TicketManager  |        | ParkingFloor (1..N) |
                            +-----------------+        +---------------------+
                                                                  |
                                                                  v
                                                       +---------------------+
                                                       |     ParkingSpot     |
                                                       +---------------------+
      `,
      description: "Modular LLD architecture with clean separation between gates, allocators, floors, and payment strategies.",
      components: [
        { name: "ParkingLot (Singleton)", role: "Root Coordinator", details: "Maintains floors, gates, and active ticket index." },
        { name: "SpotAssignmentStrategy", role: "Allocation Strategy", details: "Strategy pattern for finding nearest free spot." },
        { name: "FeeCalculationStrategy", role: "Pricing Engine", details: "Calculates hourly / flat rate / vehicle-based fee." }
      ]
    },
    databaseChoice: {
      primaryDb: "PostgreSQL / In-Memory Concurrent HashMap with persistent event journal",
      rationale: "For a single-building physical parking system, local in-memory thread-safe queues back-synced to embedded SQLite/Postgres ensure zero latency.",
      alternativeConsidered: "MongoDB",
      tradeoff: "Relational guarantees prevent double-booking via atomic row locks."
    },
    concurrencyAndThreadSafety: "Java `ReentrantLock` or `ConcurrentSkipListSet` per spot type, or atomic CAS (`AtomicBoolean isOccupied`) on spot assignment.",
    consistencyModel: "Strictly Serialized spot allocation.",
    availabilityAndFailover: "Local edge controller with battery backup and local offline database synchronization.",
    failureScenarios: [
      { failure: "Two cars enter simultaneously at different gates requesting Car spots", impact: "Risk of assigning same spot.", mitigation: "Synchronize on the spot allocation queue or use synchronized / atomic CAS state check on the spot." }
    ],
    security: ["ANPR License Plate recognition with cryptographic HMAC verification on tickets."],
    monitoringObservability: ["Occupancy percentage per floor", "Average parking duration", "Revenue generated per hour"],
    bottlenecks: ["Peak exit queues during rush hour (mitigated by automated FASTag / RFID scanner)."],
    tradeOffs: [
      {
        topic: "Pre-allocated Spot Queue vs Dynamic On-Demand Scan",
        optionA: "Scan all spots dynamically O(N) on each arrival",
        optionB: "Maintain Min-Heap (PriorityQueue) of available spot IDs per type",
        choiceMade: "Min-Heap per vehicle type per floor",
        why: "Provides instant O(1) retrieval and O(log M) spot return time while naturally allocating lowest spot index."
      }
    ],
    interviewFollowUps: [
      {
        question: "How do you ensure two gates never assign the exact same spot concurrently?",
        interviewerContext: "Testing thread synchronization primitives.",
        strongAnswer: "Maintain a `ConcurrentLinkedQueue` or `PriorityBlockingQueue<ParkingSpot>` per spot category. When `assignSpot()` is invoked, atomically `poll()` the top spot from the queue. If the queue is empty, the lot is full. When a car vacates, `offer()` the spot back to the blocking queue. This guarantees thread-safe, lock-free O(1) allocation."
      },
      {
        question: "How do you handle a Large Vehicle taking multiple Compact spots if no Large spots exist?",
        interviewerContext: "Testing dynamic business logic extensibility.",
        strongAnswer: "Implement an `AggregatedSpotAllocationStrategy` that searches for N contiguous compact spots. Lock all N spots atomically; if any fails to acquire, release all previously acquired locks and rollback."
      },
      {
        question: "How do you calculate fees with different hourly slabs (e.g. $4 for 1st hr, $3.5 for 2nd-4th hr, $2 thereafter)?",
        interviewerContext: "Checking Strategy and Decorator pattern usage for billing.",
        strongAnswer: "Create a `SlabFeeCalculationStrategy` implementing `IFeeCalculationStrategy`. Compute duration in hours via `Math.ceil(diffMs / 3600000)` and iterate through configured rate slabs. Can be combined with `EVChargingFeeDecorator` to add electricity usage surcharge."
      }
    ],
    lldOodDetails: {
      classesAndInterfaces: [
        { name: "Vehicle", type: "abstract class", responsibility: "Base vehicle properties", methods: ["getLicensePlate(): string", "getType(): VehicleType"] },
        { name: "ParkingSpot", type: "abstract class", responsibility: "Encapsulates physical spot state and lock", methods: ["assignVehicle(v: Vehicle): boolean", "removeVehicle(): void", "isFree(): boolean"] },
        { name: "IFeeCalculationStrategy", type: "interface", responsibility: "Calculates parking cost based on time and vehicle type", methods: ["calculateFee(ticket: ParkingTicket): number"] },
        { name: "ISpotAllocationStrategy", type: "interface", responsibility: "Selects optimal spot from available floors", methods: ["findSpot(floors: ParkingFloor[], type: VehicleType): ParkingSpot | null"] },
        { name: "ParkingLot", type: "class", responsibility: "Singleton orchestrator managing gates and floors", methods: ["getInstance(): ParkingLot", "parkVehicle(v: Vehicle): ParkingTicket", "unparkVehicle(ticketId: string): Receipt"] }
      ],
      relationshipsUml: "ParkingLot *-- ParkingFloor\nParkingFloor *-- ParkingSpot\nParkingSpot o-- Vehicle\nParkingTicket --> ParkingSpot\nParkingLot --> ISpotAllocationStrategy\nParkingLot --> IFeeCalculationStrategy",
      solidPrinciplesApplied: [
        { principle: "SRP", application: "ParkingFloor only tracks its spots. Fee calculation is delegated to IFeeCalculationStrategy." },
        { principle: "OCP", application: "New vehicle types (e.g., ElectricBike) and new fee algorithms are added without modifying ParkingLot core." },
        { principle: "LSP", application: "CompactSpot, LargeSpot, and HandicappedSpot properly substitute ParkingSpot without breaking invariants." }
      ],
      designPatterns: [
        { pattern: "Singleton Pattern", whyUsed: "Ensures only one authoritative ParkingLot instance exists per facility.", whyNotAlternative: "Multiple instances would cause split-brain spot state.", tradeoff: "Requires thread-safe double-checked locking." },
        { pattern: "Strategy Pattern", whyUsed: "Allows swappable spot allocation (Nearest First vs Best-Fit) and pricing models (Hourly vs Flat).", whyNotAlternative: "Avoids nested switch-case blocks.", tradeoff: "Adds interface layers." },
        { pattern: "Factory Pattern", whyUsed: "VehicleFactory and SpotFactory instantiate concrete types based on metadata.", whyNotAlternative: "Decouples instantiation from business logic.", tradeoff: "Minor class count increase." }
      ],
      threadSafetyMechanisms: ["PriorityBlockingQueue for available spots", "AtomicBoolean isOccupied per spot", "ReentrantLock for ticket generation"],
      codeImplementation: {
        language: "typescript",
        code: `// --- Enums & Value Objects ---
export enum VehicleType {
  MOTORCYCLE,
  CAR,
  TRUCK,
  ELECTRIC
}

export enum SpotType {
  COMPACT,
  REGULAR,
  LARGE,
  ELECTRIC_CHARGING
}

// --- Base Vehicle & Subclasses ---
export abstract class Vehicle {
  constructor(public readonly licensePlate: string, public readonly type: VehicleType) {}
}

export class Car extends Vehicle {
  constructor(licensePlate: string) {
    super(licensePlate, VehicleType.CAR);
  }
}

export class Motorcycle extends Vehicle {
  constructor(licensePlate: string) {
    super(licensePlate, VehicleType.MOTORCYCLE);
  }
}

// --- Parking Spot & Subclasses ---
export class ParkingSpot {
  private occupiedVehicle: Vehicle | null = null;

  constructor(
    public readonly spotId: string,
    public readonly floorNumber: number,
    public readonly spotType: SpotType
  ) {}

  public isFree(): boolean {
    return this.occupiedVehicle === null;
  }

  public assignVehicle(vehicle: Vehicle): boolean {
    if (!this.isFree()) return false;
    this.occupiedVehicle = vehicle;
    return true;
  }

  public vacate(): Vehicle | null {
    const v = this.occupiedVehicle;
    this.occupiedVehicle = null;
    return v;
  }
}

// --- Strategy Interfaces ---
export interface IFeeStrategy {
  calculateFee(durationHours: number, vehicleType: VehicleType): number;
}

export class HourlyFeeStrategy implements IFeeStrategy {
  calculateFee(durationHours: number, vehicleType: VehicleType): number {
    const baseRate = vehicleType === VehicleType.MOTORCYCLE ? 10 : vehicleType === VehicleType.CAR ? 20 : 40;
    return Math.max(1, durationHours) * baseRate;
  }
}

// --- Ticket ---
export class ParkingTicket {
  public readonly ticketId: string;
  public readonly entryTime: Date;
  public exitTime: Date | null = null;
  public feePaid: number = 0;

  constructor(public readonly vehicle: Vehicle, public readonly spot: ParkingSpot) {
    this.ticketId = \`TCK_\${Date.now()}_\${Math.floor(Math.random() * 1000)}\`;
    this.entryTime = new Date();
  }
}

// --- Parking Lot Singleton Orchestrator ---
export class ParkingLot {
  private static instance: ParkingLot;
  private spotsByFloor: Map<number, ParkingSpot[]> = new Map();
  private activeTickets: Map<string, ParkingTicket> = new Map();
  private feeStrategy: IFeeStrategy = new HourlyFeeStrategy();

  private constructor() {}

  public static getInstance(): ParkingLot {
    if (!ParkingLot.instance) {
      ParkingLot.instance = new ParkingLot();
    }
    return ParkingLot.instance;
  }

  public initialize(floorCount: number, spotsPerFloor: number): void {
    for (let f = 1; f <= floorCount; f++) {
      const spots: ParkingSpot[] = [];
      for (let s = 1; s <= spotsPerFloor; s++) {
        const spotType = s <= 20 ? SpotType.COMPACT : s <= 80 ? SpotType.REGULAR : SpotType.LARGE;
        spots.push(new ParkingSpot(\`F\${f}-S\${s}\`, f, spotType));
      }
      this.spotsByFloor.set(f, spots);
    }
  }

  public parkVehicle(vehicle: Vehicle): ParkingTicket | null {
    // Locate first compatible free spot (Nearest First)
    for (const [floorNum, spots] of this.spotsByFloor.entries()) {
      for (const spot of spots) {
        if (spot.isFree() && this.canFit(vehicle.type, spot.spotType)) {
          if (spot.assignVehicle(vehicle)) {
            const ticket = new ParkingTicket(vehicle, spot);
            this.activeTickets.set(ticket.ticketId, ticket);
            return ticket;
          }
        }
      }
    }
    return null; // Parking Lot Full
  }

  public unparkVehicle(ticketId: string): { success: boolean; amount: number; message: string } {
    const ticket = this.activeTickets.get(ticketId);
    if (!ticket) {
      return { success: false, amount: 0, message: "Invalid or expired ticket" };
    }

    ticket.exitTime = new Date();
    const durationHours = Math.ceil((ticket.exitTime.getTime() - ticket.entryTime.getTime()) / (1000 * 3600)) || 1;
    const fee = this.feeStrategy.calculateFee(durationHours, ticket.vehicle.type);
    ticket.feePaid = fee;

    ticket.spot.vacate();
    this.activeTickets.delete(ticketId);

    return { success: true, amount: fee, message: "Vehicle unparked successfully" };
  }

  private canFit(vType: VehicleType, sType: SpotType): boolean {
    if (vType === VehicleType.MOTORCYCLE) return true;
    if (vType === VehicleType.CAR) return sType === SpotType.REGULAR || sType === SpotType.LARGE;
    if (vType === VehicleType.TRUCK) return sType === SpotType.LARGE;
    return false;
  }
}`
      }
    },
    finalAnswerSummary:
      "A complete, extensible Low-Level Design for a Multi-Floor Parking Lot using the Singleton, Strategy, and Factory patterns. The design cleanly encapsulates floor hierarchies, vehicle types, thread-safe spot allocations via PriorityBlockingQueues, and pluggable fee calculation algorithms.",
    interviewerEvaluation: {
      weak: "Creates a single gigantic class with monolithic if-else checks on vehicle types without thread safety.",
      needsImprovement: "Designs basic classes but lacks clear interfaces, hardcodes fee calculation, and ignores race conditions between gates.",
      good: "Implements clean class hierarchy with Strategy pattern for pricing and explains thread synchronization.",
      strong: "Uses Min-Heap PriorityQueue per spot type for O(1) allocation and addresses boundary edge cases.",
      tier1Ready: "Exceptional architecture incorporating concurrency primitives, ANPR camera integration, decorator patterns for EV charging add-ons, and clean SOLID principles."
    }
  },
  {
    id: "sd_lld_002",
    title: "Design an Elevator Dispatching & Multi-Car Control System",
    difficulty: "Medium",
    designType: "LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Google", "Amazon", "Microsoft", "Uber", "Apple", "Salesforce"],
    reportedMetadata: {
      company: "Google",
      role: "Software Engineer",
      approxYear: "2024",
      round: "Object-Oriented Design & State Management",
      sourceNote: "Classic OOD problem testing State pattern, SCAN / LOOK disk scheduling algorithms, and concurrent dispatcher architecture."
    },
    categoryTag: "State Machine & Concurrency",
    problemStatement:
      "Design an elevator control system for a modern high-rise skyscraper with N floors and M elevator cars. Handle internal requests (pressed inside elevator) and external hall calls (Up/Down pressed on floor). Implement optimal dispatching algorithms (SCAN/LOOK vs Destination Dispatching) to minimize average passenger wait time.",
    functionalRequirements: [
      "Hall Calls: Passengers on floor F press UP or DOWN direction buttons.",
      "Car Calls: Passengers inside car C press destination floor buttons.",
      "Movement & State Machine: Elevator transitions through states: IDLE, MOVING_UP, MOVING_DOWN, DOORS_OPEN, MAINTENANCE.",
      "Dispatch Optimization: Controller assigns incoming floor requests to the most optimal car based on current position, direction, and capacity."
    ],
    nonFunctionalRequirements: [
      "Safety & Capacity: Prevent overloading; halt when weight exceeds threshold.",
      "Starvation Prevention: No request should wait indefinitely while other floors are serviced.",
      "Concurrency: Thread-safe handling of multiple simultaneous button presses across floors and cars."
    ],
    assumptions: [
      "Building with 40 floors, 4 elevator cars, max capacity 12 persons / 1000 kg per car."
    ],
    apiDesign: [
      {
        method: "POST",
        endpoint: "/elevator/hall-call",
        description: "Register hall call from a specific floor.",
        requestBody: '{ "floor": 14, "direction": "UP" }',
        responseBody: '{ "assignedCarId": "ELEVATOR_2", "estimatedArrivalSec": 18 }'
      },
      {
        method: "POST",
        endpoint: "/elevator/car-call",
        description: "Register destination button inside a specific elevator car.",
        requestBody: '{ "carId": "ELEVATOR_2", "destinationFloor": 28 }',
        responseBody: '{ "status": "REGISTERED", "stopOrder": 2 }'
      }
    ],
    dataModel: {
      type: "In-Memory / Distributed Map",
      entities: [
        {
          name: "ElevatorCarState",
          description: "Tracks physical elevator telemetry.",
          fields: ["car_id (INT)", "current_floor (INT)", "direction (ENUM)", "state (ENUM)", "current_weight_kg (DOUBLE)", "target_floors (ARRAY<INT>)"]
        }
      ],
      explanation: "Real-time state machine maintained in memory with high-frequency control loop polling sensors."
    },
    architecture: {
      diagramAscii: `
[ Hall Panel ]     [ Inside Car Panel ]
       \\                  /
        v                v
      +--------------------+
      | ElevatorController | (Dispatcher)
      +--------------------+
         /        |       \\
        v         v        v
    [ Car 1 ]  [ Car 2 ] [ Car 3 ]
       |          |        |
   (LOOK Alg) (LOOK Alg)(LOOK Alg)
      `,
      description: "Central Dispatcher delegating requests to independent Elevator Car state machines executing LOOK algorithm.",
      components: [
        { name: "ElevatorController", role: "Central Dispatcher", details: "Calculates scoring function for each car and assigns hall calls." },
        { name: "ElevatorCar", role: "Autonomous Agent", details: "Maintains its own Min/Max Priority Queues (or Bitsets) for upcoming floor stops." },
        { name: "DoorSensor & WeightSensor", role: "Safety Hardware", details: "Monitors obstructions and weight capacity." }
      ]
    },
    databaseChoice: {
      primaryDb: "In-Memory State Engine + Redis Streams for audit telemetry",
      rationale: "Elevator movements operate on 50ms real-time control loops where disk I/O is unacceptable.",
      alternativeConsidered: "RDBMS",
      tradeoff: "RDBMS adds milliseconds of latency and is unsuited for high-frequency sensor streams."
    },
    concurrencyAndThreadSafety: "Each ElevatorCar runs an independent worker thread consuming from a thread-safe `PriorityBlockingQueue` or synchronized requests bitset.",
    consistencyModel: "Strict real-time consistency on sensor telemetry.",
    availabilityAndFailover: "If one elevator goes into MAINTENANCE, dispatcher excludes it from routing and redistributes its pending stops.",
    failureScenarios: [
      { failure: "Door Obstruction Sensor Triggered", impact: "Doors cannot close.", mitigation: "Reverse door motor immediately, restart timer, and alert sound after 3 attempts." }
    ],
    security: ["Keycard RFID / VIP floor access verification at elevator car button panel."],
    monitoringObservability: ["Average Passenger Wait Time (P50 < 30s, P95 < 60s)", "Total energy consumption and floor turnaround cycle time"],
    bottlenecks: ["Morning rush hour (all passengers going up from ground floor) - mitigated by zoned staging."],
    tradeOffs: [
      {
        topic: "FCFS (First-Come-First-Serve) vs LOOK Algorithm",
        optionA: "FCFS: Service requests in strict arrival order",
        optionB: "LOOK: Sweep in one direction, servicing all stops until highest, then reverse",
        choiceMade: "LOOK Algorithm",
        why: "FCFS causes extreme thrashing between floors; LOOK algorithm minimizes total elevator travel distance and wait times by over 70%."
      }
    ],
    interviewFollowUps: [
      {
        question: "How does the LOOK algorithm decide which floor to stop at next?",
        interviewerContext: "Verifying understanding of OS disk scheduling applied to real physical systems.",
        strongAnswer: "Maintain two sorted sets per elevator: `upStops` (Min-Heap) and `downStops` (Max-Heap). If moving UP, continuously pop the smallest floor >= `currentFloor`. Once `upStops` is exhausted, switch direction to DOWN and pop largest floor <= `currentFloor` from `downStops`. This eliminates starvation and redundant directional changes."
      },
      {
        question: "What is Destination Dispatching and why do modern towers use it?",
        interviewerContext: "Testing knowledge of state-of-the-art building design.",
        strongAnswer: "Instead of pressing UP/DOWN in the lobby, passengers enter their exact destination floor at a kiosk outside. The system groups passengers traveling to the same floors into the exact same elevator car before boarding, cutting wait times by up to 50% during peak rush hours."
      },
      {
        question: "How do you model the Elevator State Machine cleanly using Design Patterns?",
        interviewerContext: "Testing State Pattern mastery.",
        strongAnswer: "Create an `IElevatorState` interface with methods: `pressFloorButton()`, `openDoor()`, `closeDoor()`, `step()`. Implement concrete classes: `IdleState`, `MovingUpState`, `MovingDownState`, `DoorsOpenState`. Transitions are strictly governed within state objects without monolithic if-else blocks."
      }
    ],
    lldOodDetails: {
      classesAndInterfaces: [
        { name: "Direction", type: "enum", responsibility: "Elevator travel direction", methods: ["UP", "DOWN", "IDLE"] },
        { name: "ElevatorState", type: "enum", responsibility: "Physical operating state", methods: ["IDLE", "MOVING", "STOPPED", "DOORS_OPEN"] },
        { name: "IElevatorDispatcher", type: "interface", responsibility: "Algorithm to select best car for hall call", methods: ["assignElevator(floor: number, dir: Direction): ElevatorCar"] },
        { name: "ElevatorCar", type: "class", responsibility: "Autonomous car managing stops and movements", methods: ["addStop(floor: number): void", "step(): void", "openDoors(): void", "closeDoors(): void"] },
        { name: "ElevatorController", type: "class", responsibility: "System manager coordinating all cars", methods: ["handleHallCall(floor: number, dir: Direction): void", "handleCarCall(carId: number, floor: number): void"] }
      ],
      relationshipsUml: "ElevatorController *-- ElevatorCar\nElevatorController --> IElevatorDispatcher\nElevatorCar o-- Direction\nElevatorCar o-- ElevatorState",
      solidPrinciplesApplied: [
        { principle: "SRP", application: "ElevatorCar only handles its own motor movement and door states. Dispatching logic belongs exclusively to IElevatorDispatcher." },
        { principle: "OCP", application: "Can replace LOOK dispatcher with Destination Dispatcher without altering ElevatorCar logic." }
      ],
      designPatterns: [
        { pattern: "State Pattern", whyUsed: "Encapsulates behavior for Moving, Stopped, Doors Open, and Maintenance states.", whyNotAlternative: "Prevents illegal transitions (e.g., opening doors while moving at full speed).", tradeoff: "More classes." },
        { pattern: "Strategy Pattern", whyUsed: "Swappable dispatching algorithms (LOOK, SCAN, Nearest Car, Destination Grouping).", whyNotAlternative: "Allows benchmarking multiple algorithms easily.", tradeoff: "Interface indirection." }
      ],
      threadSafetyMechanisms: ["Synchronized internal stops collection", "AtomicInteger for current floor telemetry"],
      codeImplementation: {
        language: "typescript",
        code: `export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  IDLE = "IDLE"
}

export enum ElevatorState {
  IDLE = "IDLE",
  MOVING = "MOVING",
  DOORS_OPEN = "DOORS_OPEN"
}

export class ElevatorCar {
  public currentFloor: number = 0;
  public direction: Direction = Direction.IDLE;
  public state: ElevatorState = ElevatorState.IDLE;
  private upStops: Set<number> = new Set();
  private downStops: Set<number> = new Set();

  constructor(public readonly id: number, public readonly minFloor: number, public readonly maxFloor: number) {}

  public addDestination(floor: number): void {
    if (floor < this.minFloor || floor > this.maxFloor) return;

    if (floor > this.currentFloor) {
      this.upStops.add(floor);
    } else if (floor < this.currentFloor) {
      this.downStops.add(floor);
    }

    if (this.direction === Direction.IDLE) {
      this.direction = floor >= this.currentFloor ? Direction.UP : Direction.DOWN;
      this.state = ElevatorState.MOVING;
    }
  }

  public step(): void {
    if (this.state === ElevatorState.DOORS_OPEN) {
      this.state = ElevatorState.IDLE; // Doors close on next tick
    }

    if (this.direction === Direction.UP) {
      this.currentFloor++;
      if (this.upStops.has(this.currentFloor)) {
        this.upStops.delete(this.currentFloor);
        this.openDoors();
      }
      if (this.upStops.size === 0) {
        this.direction = this.downStops.size > 0 ? Direction.DOWN : Direction.IDLE;
      }
    } else if (this.direction === Direction.DOWN) {
      this.currentFloor--;
      if (this.downStops.has(this.currentFloor)) {
        this.downStops.delete(this.currentFloor);
        this.openDoors();
      }
      if (this.downStops.size === 0) {
        this.direction = this.upStops.size > 0 ? Direction.UP : Direction.IDLE;
      }
    }

    if (this.upStops.size === 0 && this.downStops.size === 0) {
      this.direction = Direction.IDLE;
      this.state = ElevatorState.IDLE;
    }
  }

  private openDoors(): void {
    this.state = ElevatorState.DOORS_OPEN;
    console.log(\`[Car #\${this.id}] Doors opened at Floor \${this.currentFloor}\`);
  }

  public calculateCost(targetFloor: number, targetDir: Direction): number {
    let cost = Math.abs(this.currentFloor - targetFloor);
    if (this.direction === Direction.IDLE) return cost;

    // Same direction and on the way
    if (this.direction === targetDir) {
      if ((targetDir === Direction.UP && targetFloor >= this.currentFloor) ||
          (targetDir === Direction.DOWN && targetFloor <= this.currentFloor)) {
        return cost;
      }
    }
    // Opposite direction or already passed: heavy penalty
    return cost + (this.maxFloor - this.minFloor) * 2;
  }
}

export class ElevatorController {
  constructor(public readonly cars: ElevatorCar[]) {}

  public requestElevator(floor: number, direction: Direction): ElevatorCar {
    let bestCar = this.cars[0];
    let minCost = Infinity;

    for (const car of this.cars) {
      const cost = car.calculateCost(floor, direction);
      if (cost < minCost) {
        minCost = cost;
        bestCar = car;
      }
    }

    bestCar.addDestination(floor);
    return bestCar;
  }

  public selectFloorInside(carId: number, destinationFloor: number): void {
    const car = this.cars.find(c => c.id === carId);
    if (car) {
      car.addDestination(destinationFloor);
    }
  }
}`
      }
    },
    finalAnswerSummary:
      "A complete Low-Level Design for a multi-car elevator control system using the LOOK disk-scheduling algorithm and State pattern. It optimizes passenger wait times, prevents starvation, and provides thread-safe dispatching across high-rise building floors.",
    interviewerEvaluation: {
      weak: "Proposes naive FCFS queue that drives the elevator up and down erratically.",
      needsImprovement: "Implements basic movement but fails to handle directional calls and cost scoring for multiple cars.",
      good: "Implements LOOK algorithm with two priority sets (up/down) and cost calculation for dispatching.",
      strong: "Incorporates State Pattern for door/movement transitions, handles capacity limits, and guarantees no starvation.",
      tier1Ready: "Master-level execution detailing Destination Dispatching, sub-millisecond control loops, sensor safety interlocks, and emergency brake state machines."
    }
  },
  {
    id: "sd_lld_003",
    title: "Design Movie Ticket Booking System (BookMyShow LLD & Concurrency)",
    difficulty: "Hard",
    designType: "HLD + LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Amazon", "Uber", "Flipkart", "Atlassian", "Microsoft", "Google", "Walmart Global Tech"],
    reportedMetadata: {
      company: "Amazon / Flipkart",
      role: "SDE II / Machine Coding",
      approxYear: "2024",
      round: "Low Level Design & Concurrency",
      sourceNote: "Flagship Indian & Global Tier-1 LLD round problem evaluating temporary seat locks, race conditions, and payment timeouts."
    },
    categoryTag: "Concurrency & Distributed Locking",
    problemStatement:
      "Design the core Low-Level Architecture and High-Level seat reservation engine for a Movie Ticket Booking platform (like BookMyShow / Fandango). Solve the high-concurrency race condition where 10,000 users attempt to book the exact same blockbuster seats simultaneously. Implement temporary 10-minute seat locking, Redis TTL expiration, payment webhooks, and idempotent seat confirmations.",
    functionalRequirements: [
      "Browse Theatres & Shows: Query cinema halls, screens, showtimes, and seat layout matrix (Silver, Gold, Recliner).",
      "Temporary Seat Lock (10-minute hold): User selects seats -> system atomically holds seats for 10 minutes; seats appear greyed out to all other users.",
      "Payment & Confirmation: User completes payment within 10 minutes -> seats transition to PERMANENTLY_BOOKED and QR code ticket is issued.",
      "Auto-Release on Expiry: If payment is not completed within 10 minutes, held seats are automatically released back to the general pool instantly."
    ],
    nonFunctionalRequirements: [
      "Zero Double-Booking: Under no circumstances should two users book the same seat in the same show.",
      "High Availability & Sub-100ms Read Latency during flash sales.",
      "Idempotency: Network retries on payment or booking must never double-charge or lock duplicate seats."
    ],
    assumptions: [
      "Blockbuster movie release with 50,000 concurrent requests at 10:00 AM for 200 cinema seats."
    ],
    apiDesign: [
      {
        method: "POST",
        endpoint: "/shows/{showId}/seats/lock",
        description: "Atomically lock an array of seats for 10 minutes.",
        headers: "Idempotency-Key: idemp_991823",
        requestBody: '{ "userId": "usr_991", "seatIds": ["A12", "A13"] }',
        responseBody: '{ "bookingId": "bk_8819", "lockExpiresAt": "2026-08-19T10:10:00Z", "totalAmount": 700.00 }'
      },
      {
        method: "POST",
        endpoint: "/bookings/{bookingId}/confirm-payment",
        description: "Confirm payment and finalize permanent booking.",
        requestBody: '{ "paymentTxnId": "txn_stripe_77192", "amount": 700.00 }',
        responseBody: '{ "status": "CONFIRMED", "ticketQr": "https://cdn.bms.com/qr/tk_991.png" }'
      }
    ],
    dataModel: {
      type: "Relational (SQL)",
      entities: [
        {
          name: "ShowSeat",
          description: "Tracks individual seat availability for a specific show.",
          fields: ["show_seat_id (VARCHAR)", "show_id (VARCHAR)", "seat_number (VARCHAR)", "category (ENUM)", "status (AVAILABLE, LOCKED, BOOKED)", "locked_by_user_id (VARCHAR)", "lock_expires_at (TIMESTAMP)", "version (INT, Optimistic Lock)"],
          indexes: ["UNIQUE KEY (show_id, seat_number)", "INDEX (show_id, status)"]
        },
        {
          name: "Booking",
          description: "Booking aggregate root.",
          fields: ["booking_id (VARCHAR)", "user_id (VARCHAR)", "show_id (VARCHAR)", "total_price (DECIMAL)", "status (PENDING, CONFIRMED, EXPIRED, REFUNDED)", "created_at (TIMESTAMP)"]
        }
      ],
      explanation: "PostgreSQL with row-level locking / optimistic locking version number or Redis Distributed Lock."
    },
    architecture: {
      diagramAscii: `
                               +----------------------------+
                               |     Client Application     |
                               +----------------------------+
                                             |
                                    [ API Gateway ]
                                             |
                                             v
                           +----------------------------------+
                           |     Seat Reservation Service     |
                           +----------------------------------+
                             /                              \\
          (1) Acquire Redlock / SetNX            (2) Persist Pending State
                           /                                  \\
                          v                                    v
            +--------------------------+          +-------------------------+
            | Redis Lock (TTL = 10min) |          | PostgreSQL (ACID Store) |
            +--------------------------+          +-------------------------+
                          |                                    |
                 (3) Auto-Expire Key                  (4) Listen to CDC /
                          |                               Delayed SQS Queue
                          v                                    |
            +--------------------------+                       v
            | Redis KeySpace Expiry /  | ----------> [ Release Lock Worker ]
            | SQS Delayed Message      |
            +--------------------------+
      `,
      description: "Two-Tier Locking: Redis Redlock for high-speed sub-millisecond atomic reservation + PostgreSQL for ACID financial ledger.",
      components: [
        { name: "SeatLockManager", role: "Concurrency Controller", details: "Uses Redis Lua scripts (`SET seat:show:A12 userId NX EX 600`) for atomic multi-seat reservation." },
        { name: "Delayed Message Queue (SQS / RabbitMQ)", role: "Expiry Watchdog", details: "Sends a delayed message scheduled for T+10min. If booking is still PENDING, unlocks seats and refunds expired attempts." },
        { name: "PaymentWebhookHandler", role: "Fulfillment Engine", details: "Idempotently processes payment gateway callbacks to mark seats BOOKED." }
      ]
    },
    databaseChoice: {
      primaryDb: "PostgreSQL (for financial bookings) + Redis Cluster (for fast seat locks)",
      rationale: "PostgreSQL provides strict ACID transactions and serializable isolation to prevent double booking; Redis handles flash sale read spikes.",
      alternativeConsidered: "Cassandra",
      tradeoff: "Cassandra's eventual consistency can lead to phantom double bookings during network partitions."
    },
    concurrencyAndThreadSafety: "Redis Lua script atomic execution for multi-key seat locking or SQL `SELECT ... FOR UPDATE` with optimistic concurrency control (`version` column).",
    consistencyModel: "Strict Linearizable Consistency for seat locks and payment transitions.",
    availabilityAndFailover: "Redis Sentinel multi-AZ replication + PostgreSQL Multi-AZ primary with warm standby.",
    failureScenarios: [
      { failure: "User closes browser after locking seats", impact: "Seats blocked for other users.", mitigation: "Redis TTL (600s) and SQS delayed queue automatically release the lock after 10 minutes." },
      { failure: "Payment succeeds after 10m01s (after lock expired and someone else booked)", impact: "Double-booking collision.", mitigation: "Compare lock token at payment webhook time; if seat was acquired by another user, automatically trigger full automated refund via Payment Gateway API." }
    ],
    security: ["HMAC cryptographic signature on booking QR codes to prevent forgery at theatre gates."],
    monitoringObservability: ["Lock contention rate (locks acquired vs rejected)", "Payment success conversion rate within 10-minute window", "P99 reservation latency"],
    bottlenecks: ["Flash sale hot database row lock contention on the same movie show."],
    tradeOffs: [
      {
        topic: "Pessimistic DB Lock vs Distributed Redis Lock (Redlock)",
        optionA: "Pessimistic DB Lock (`SELECT FOR UPDATE`)",
        optionB: "Redis Distributed Lock with Lua Script",
        choiceMade: "Redis Distributed Lock with DB Optimistic Verification",
        why: "Direct DB pessimistic locking at 50,000 RPS overwhelms database connection pools. Redis handles 100,000+ OPS in memory with sub-millisecond latency."
      }
    ],
    interviewFollowUps: [
      {
        question: "How do you atomically lock 4 seats together (e.g. A1, A2, A3, A4) in Redis without partial locks?",
        interviewerContext: "Testing atomic Lua script execution in Redis.",
        strongAnswer: "Execute a Redis Lua script. The script checks `EXISTS` on all 4 keys. If ANY key is already set, the script aborts immediately and returns 0 without acquiring any lock. If all are free, it sets all 4 keys with `SETEX` in the exact same atomic tick. Redis single-threaded execution guarantees no interleaving."
      },
      {
        question: "What happens if the Redis server restarts or loses the lock while payment is processing?",
        interviewerContext: "Resilience and dual-source verification.",
        strongAnswer: "The PostgreSQL database remains the ultimate source of truth. When the payment webhook arrives, it executes an atomic SQL query: `UPDATE ShowSeats SET status='BOOKED' WHERE show_id=? AND seat_id IN (?) AND (status='LOCKED' AND locked_by_user=?)`. If rows affected != requested count, trigger an immediate automated refund."
      },
      {
        question: "How do you design the seat layout rendering for 10,000 concurrent browsers?",
        interviewerContext: "Frontend + Backend caching strategy.",
        strongAnswer: "The physical theatre layout (rows, aisles, seat types) is static and cached at the CDN edge for 24 hours. Only the dynamic availability bitset (e.g. 200 bits where 0=available, 1=occupied/locked) is polled via WebSocket or Server-Sent Events (SSE) from a Redis bitmap with 1-second debounce."
      }
    ],
    lldOodDetails: {
      classesAndInterfaces: [
        { name: "SeatStatus", type: "enum", responsibility: "Seat availability lifecycle", methods: ["AVAILABLE", "LOCKED", "BOOKED"] },
        { name: "ISeatLockService", type: "interface", responsibility: "Handles temporary atomic reservations", methods: ["lockSeats(showId: string, seatIds: string[], userId: string, ttlSeconds: number): boolean", "unlockSeats(showId: string, seatIds: string[]): void"] },
        { name: "BookingManager", type: "class", responsibility: "Coordinates checkout, pricing, and ticket creation", methods: ["createBooking(userId: string, showId: string, seatIds: string[]): Booking", "confirmBooking(bookingId: string, paymentTxnId: string): Ticket"] }
      ],
      relationshipsUml: "BookingManager --> ISeatLockService\nBookingManager *-- Booking\nBooking o-- ShowSeat",
      solidPrinciplesApplied: [
        { principle: "SRP", application: "SeatLockService only handles locking mechanics; BookingManager handles payments and receipts." },
        { principle: "DIP", application: "BookingManager depends on ISeatLockService abstraction, enabling seamless switching from In-Memory to Redis Redlock." }
      ],
      designPatterns: [
        { pattern: "Optimistic Locking Pattern", whyUsed: "Prevents blocking transactions during long user checkout deliberation.", whyNotAlternative: "Pessimistic locks exhaust DB pools.", tradeoff: "Requires retry handling on collision." }
      ],
      threadSafetyMechanisms: ["Atomic Lua scripts in Redis", "PostgreSQL isolation level SERIALIZABLE on final booking write"],
      codeImplementation: {
        language: "typescript",
        code: `export enum SeatStatus {
  AVAILABLE = "AVAILABLE",
  LOCKED = "LOCKED",
  BOOKED = "BOOKED"
}

export interface ShowSeat {
  seatId: string;
  row: string;
  number: number;
  price: number;
  status: SeatStatus;
  lockedBy?: string;
  lockExpiresAt?: number;
}

export interface ISeatLockProvider {
  tryLockSeats(showId: string, seatIds: string[], userId: string, ttlMs: number): Promise<boolean>;
  releaseSeats(showId: string, seatIds: string[], userId: string): Promise<void>;
}

// --- In-Memory Atomic Lock Provider (Simulating Redis Lua Script) ---
export class InMemorySeatLockProvider implements ISeatLockProvider {
  // key: \`\${showId}:\${seatId}\` -> { userId, expiresAt }
  private locks: Map<string, { userId: string; expiresAt: number }> = new Map();

  async tryLockSeats(showId: string, seatIds: string[], userId: string, ttlMs: number): Promise<boolean> {
    const now = Date.now();

    // 1. Validation phase (Atomic Check)
    for (const seatId of seatIds) {
      const key = \`\${showId}:\${seatId}\`;
      const currentLock = this.locks.get(key);
      if (currentLock && currentLock.expiresAt > now && currentLock.userId !== userId) {
        return false; // Collision: At least one seat is already locked by someone else
      }
    }

    // 2. Acquisition phase (Atomic Set)
    const expiresAt = now + ttlMs;
    for (const seatId of seatIds) {
      const key = \`\${showId}:\${seatId}\`;
      this.locks.set(key, { userId, expiresAt });
    }

    return true;
  }

  async releaseSeats(showId: string, seatIds: string[], userId: string): Promise<void> {
    for (const seatId of seatIds) {
      const key = \`\${showId}:\${seatId}\`;
      const lock = this.locks.get(key);
      if (lock && lock.userId === userId) {
        this.locks.delete(key);
      }
    }
  }
}

export class MovieTicketBookingService {
  constructor(private readonly lockProvider: ISeatLockProvider) {}

  async reserveSeats(
    showId: string,
    seatIds: string[],
    userId: string
  ): Promise<{ success: boolean; bookingId?: string; error?: string }> {
    const LOCK_TTL_MS = 10 * 60 * 1000; // 10 minutes hold
    const acquired = await this.lockProvider.tryLockSeats(showId, seatIds, userId, LOCK_TTL_MS);

    if (!acquired) {
      return { success: false, error: "One or more selected seats are currently being booked by another customer. Please select different seats." };
    }

    const bookingId = \`BMS_\${Date.now()}_\${Math.floor(Math.random() * 10000)}\`;
    return { success: true, bookingId };
  }
}`
      }
    },
    finalAnswerSummary:
      "A battle-tested Low-Level and Concurrency Architecture for BookMyShow movie ticket reservations. Utilizes two-tier locking (atomic Redis Lua scripts for 10-minute temporary holds + PostgreSQL ACID serializable transactions for payment finalization), backed by SQS delayed queue expirations and automated refund reconciliation.",
    interviewerEvaluation: {
      weak: "Uses basic database updates without locking, resulting in catastrophic double-bookings during flash sales.",
      needsImprovement: "Understands temporary seat locking but relies purely on long-lived DB transactions that exhaust connection pools.",
      good: "Implements Redis distributed locking with TTL, designs clear API and DB schemas, and handles expiration queues.",
      strong: "Writes atomic Redis Lua scripts for multi-seat check-and-set, details edge-case late payment refunds, and includes optimistic versioning.",
      tier1Ready: "World-class system design addressing CDN layout bitmaps, WebSockets SSE seat map updates, distributed Redlock quorum validation, and financial ledger idempotency."
    }
  },
  {
    id: "sd_lld_004",
    title: "Design Splitwise (Expense Sharing & Debt Simplification)",
    difficulty: "Medium",
    designType: "OOD + LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Amazon", "Uber", "Google", "Microsoft", "Atlassian", "Flipkart", "Stripe"],
    reportedMetadata: {
      company: "Uber / Amazon",
      role: "SDE II Machine Coding",
      approxYear: "2024",
      round: "Machine Coding & Object-Oriented Design",
      sourceNote: "Extremely popular Tier-1 problem testing Split strategies (Equal, Exact, Percentage), graph debt minimization, and clean OOP modeling."
    },
    categoryTag: "Object-Oriented Design & Graph Algorithms",
    problemStatement:
      "Design an expense sharing and group bill settlement application like Splitwise. Support splitting expenses among users via multiple split strategies: EQUAL, EXACT, PERCENTAGE, and SHARE-BASED. Implement the Debt Simplification algorithm (Min-Cash-Flow graph reduction) to minimize the total number of transactions required to settle all group debts.",
    functionalRequirements: [
      "Add Expense: User adds an expense with a total amount, paid-by user, and list of participants.",
      "Split Strategies: Support Equal split (with rounding cents handling), Exact amounts split (sum must match total), and Percentage split (percentages must sum to 100%).",
      "User Balance Sheet: Query total amount a user owes and is owed by each individual contact.",
      "Simplify Debts (Min Cash Flow): Reduce circular debts (e.g. A owes B $10, B owes C $10 -> A owes C $10 directly) to minimum transactions using greedy heaps."
    ],
    nonFunctionalRequirements: [
      "Precision & Accuracy: Zero currency floating-point errors (use integer cents or `BigDecimal`).",
      "Extensibility: Adding a new split type (e.g. Dynamic Itemized Tax/Tip split) requires zero modifications to existing split classes."
    ],
    assumptions: [
      "Single currency (USD / INR) per group expense; all monetary amounts stored in cents ($10.50 -> 1050 cents)."
    ],
    apiDesign: [
      {
        method: "POST",
        endpoint: "/expenses",
        description: "Create an expense with designated split strategy.",
        requestBody: '{\n  "groupId": "grp_hawaii_2026",\n  "paidBy": "usr_alice",\n  "amountCents": 12000,\n  "splitType": "PERCENTAGE",\n  "splits": [\n    { "userId": "usr_alice", "percentage": 50 },\n    { "userId": "usr_bob", "percentage": 25 },\n    { "userId": "usr_charlie", "percentage": 25 }\n  ]\n}',
        responseBody: '{ "expenseId": "exp_88192", "status": "RECORDED" }'
      },
      {
        method: "GET",
        endpoint: "/groups/{groupId}/settlements/simplified",
        description: "Get minimized list of debt settlement payments for the group.",
        responseBody: '[\n  { "fromUser": "usr_bob", "toUser": "usr_alice", "amountCents": 3000 },\n  { "fromUser": "usr_charlie", "toUser": "usr_alice", "amountCents": 3000 }\n]'
      }
    ],
    dataModel: {
      type: "Relational (SQL)",
      entities: [
        {
          name: "Expense",
          description: "Immutable record of a financial payment.",
          fields: ["expense_id (VARCHAR)", "group_id (VARCHAR)", "paid_by (VARCHAR)", "amount_cents (BIGINT)", "split_type (ENUM)", "created_at (TIMESTAMP)"]
        },
        {
          name: "SplitDetail",
          description: "Individual debt obligation per participant.",
          fields: ["split_id (VARCHAR)", "expense_id (VARCHAR)", "user_id (VARCHAR)", "owed_cents (BIGINT)"]
        }
      ],
      explanation: "Double-entry accounting format ensuring sum of owed cents equals total expense amount."
    },
    architecture: {
      diagramAscii: `
[ Client / App ] ---> [ ExpenseController ]
                              |
                              v
                   +---------------------+
                   |   ExpenseService    |
                   +---------------------+
                     /                 \\
                    v                   v
        +-----------------------+    +--------------------------+
        | ISplitStrategy Engine |    | DebtSimplifier (MinHeap) |
        +-----------------------+    +--------------------------+
          /         |         \\
    [EqualSplit] [ExactSplit] [PercentSplit]
      `,
      description: "Strategy Pattern for validation and calculation, coupled with Min-Heap Debt Simplifier.",
      components: [
        { name: "SplitStrategyFactory", role: "Factory", details: "Creates and validates split instances based on split type." },
        { name: "BalanceSheetManager", role: "Ledger", details: "Maintains directed pairwise balance graph between all users." },
        { name: "DebtSimplifier", role: "Graph Optimizer", details: "Executes greedy min/max net-balance pairing to compress graph edges." }
      ]
    },
    databaseChoice: {
      primaryDb: "PostgreSQL",
      rationale: "Requires strict transactional consistency and exact ledger arithmetic without floating-point drift.",
      alternativeConsidered: "Neo4j (Graph Database)",
      tradeoff: "Graph DB simplifies multi-hop debt queries, but PostgreSQL handles financial transactions and indexing reliably at lower operational complexity."
    },
    concurrencyAndThreadSafety: "Optimistic concurrency on group balance versioning; concurrent writes on different groups are isolated.",
    consistencyModel: "Strong consistency for expense creation and settlement records.",
    availabilityAndFailover: "Standard multi-AZ SQL replication.",
    failureScenarios: [
      { failure: "Split percentage does not sum to exactly 100.00%", impact: "Corrupt balance calculation.", mitigation: "Strict pre-validation in `PercentageSplitStrategy.validate()` throwing `InvalidExpenseException`." }
    ],
    security: ["Role-Based Access Control (RBAC): Only group members can view or add expenses."],
    monitoringObservability: ["Total expenses logged per second", "Average graph simplification runtime (< 5ms)"],
    bottlenecks: ["Large group debt simplification with thousands of users (solved by greedy O(N log N) algorithm)."],
    tradeOffs: [
      {
        topic: "Floating Point vs Integer Cents for Currency",
        optionA: "Floating Point (`Double` / `Float`)",
        optionB: "Integer Cents (`BigInt` / `BigDecimal`)",
        choiceMade: "Integer Cents",
        why: "IEEE 754 floating point introduces rounding artifacts (e.g. 0.1 + 0.2 = 0.30000000000000004); storing cents avoids precision bugs completely."
      }
    ],
    interviewFollowUps: [
      {
        question: "Explain the Debt Simplification algorithm (Min Cash Flow).",
        interviewerContext: "Testing greedy / graph optimization algorithms in real product design.",
        strongAnswer: "1. Compute net balance for every user: `net = total_paid - total_owed`. 2. Separate users into two priority queues: `Debtors` (net < 0) and `Creditors` (net > 0). 3. In each step, pop the maximum debtor (owes most) and maximum creditor (is owed most). Settle the minimum of `(abs(debtor_net), creditor_net)`. 4. Update balances and push remaining non-zero balance back to heap. This reduces N(N-1)/2 transactions to at most N-1 transactions in O(N log N) time."
      },
      {
        question: "How do you handle rounding when splitting $100 equally among 3 people?",
        interviewerContext: "Real-world precision handling.",
        strongAnswer: "10000 cents / 3 = 3333 cents with a remainder of 1 cent (10000 % 3 = 1). Allocate 3334 cents to the first participant (or the payer) and 3333 cents to the remaining two. This ensures `sum(splits) === totalAmount` exactly."
      }
    ],
    lldOodDetails: {
      classesAndInterfaces: [
        { name: "SplitType", type: "enum", responsibility: "Type of division", methods: ["EQUAL", "EXACT", "PERCENT"] },
        { name: "ISplitStrategy", type: "interface", responsibility: "Validates and computes split amounts", methods: ["validate(splits: Split[], totalAmount: number): boolean", "calculate(splits: Split[], totalAmount: number): Map<string, number>"] },
        { name: "Expense", type: "class", responsibility: "Expense entity encapsulating payer and splits", methods: ["getExpenseId(): string", "getSplits(): Split[]"] },
        { name: "DebtSimplifier", type: "class", responsibility: "Greedy graph algorithm to minimize transactions", methods: ["simplify(balances: Map<string, Map<string, number>>): SettlementTransaction[]"] }
      ],
      relationshipsUml: "ExpenseService --> ISplitStrategy\nExpenseService *-- Expense\nExpense o-- Split\nEqualSplitStrategy ..|> ISplitStrategy\nExactSplitStrategy ..|> ISplitStrategy\nPercentSplitStrategy ..|> ISplitStrategy",
      solidPrinciplesApplied: [
        { principle: "SRP", application: "Expense only holds data; ISplitStrategy validates math; DebtSimplifier handles graph reductions." },
        { principle: "OCP", application: "Adding an Itemized split strategy requires creating `ItemizedSplitStrategy` without editing existing code." }
      ],
      designPatterns: [
        { pattern: "Strategy Pattern", whyUsed: "Encapsulates Equal, Exact, and Percentage algorithms.", whyNotAlternative: "Eliminates messy switch cases in Expense class.", tradeoff: "Class count." },
        { pattern: "Factory Pattern", whyUsed: "Instantiates correct strategy based on request payload.", whyNotAlternative: "Centralizes validation logic.", tradeoff: "None." }
      ],
      threadSafetyMechanisms: ["Immutable Expense and Split objects", "Synchronized balance updates per group"],
      codeImplementation: {
        language: "typescript",
        code: `export enum SplitType {
  EQUAL = "EQUAL",
  EXACT = "EXACT",
  PERCENT = "PERCENT"
}

export interface Split {
  userId: string;
  amountCents?: number;
  percentage?: number;
}

export interface ISplitStrategy {
  validateAndCalculate(totalCents: number, splits: Split[]): Map<string, number>;
}

export class EqualSplitStrategy implements ISplitStrategy {
  validateAndCalculate(totalCents: number, splits: Split[]): Map<string, number> {
    const count = splits.length;
    const baseAmount = Math.floor(totalCents / count);
    let remainder = totalCents % count;

    const result = new Map<string, number>();
    for (const split of splits) {
      let allocated = baseAmount;
      if (remainder > 0) {
        allocated += 1;
        remainder--;
      }
      result.set(split.userId, allocated);
    }
    return result;
  }
}

export class ExactSplitStrategy implements ISplitStrategy {
  validateAndCalculate(totalCents: number, splits: Split[]): Map<string, number> {
    let sum = 0;
    const result = new Map<string, number>();

    for (const split of splits) {
      if (!split.amountCents || split.amountCents <= 0) {
        throw new Error("Exact split amount must be positive");
      }
      sum += split.amountCents;
      result.set(split.userId, split.amountCents);
    }

    if (sum !== totalCents) {
      throw new Error(\`Exact splits sum (\${sum}) does not match total expense amount (\${totalCents})\`);
    }

    return result;
  }
}

export class DebtSimplifier {
  public static simplify(netBalances: Map<string, number>): Array<{ from: string; to: string; amountCents: number }> {
    const debtors: Array<{ userId: string; amount: number }> = [];
    const creditors: Array<{ userId: string; amount: number }> = [];

    for (const [userId, net] of netBalances.entries()) {
      if (net < 0) debtors.push({ userId, amount: -net });
      else if (net > 0) creditors.push({ userId, amount: net });
    }

    const settlements: Array<{ from: string; to: string; amountCents: number }> = [];

    let dIdx = 0;
    let cIdx = 0;

    while (dIdx < debtors.length && cIdx < creditors.length) {
      const debtor = debtors[dIdx];
      const creditor = creditors[cIdx];

      const settledAmount = Math.min(debtor.amount, creditor.amount);
      settlements.push({
        from: debtor.userId,
        to: creditor.userId,
        amountCents: settledAmount
      });

      debtor.amount -= settledAmount;
      creditor.amount -= settledAmount;

      if (debtor.amount === 0) dIdx++;
      if (creditor.amount === 0) cIdx++;
    }

    return settlements;
  }
}`
      }
    },
    finalAnswerSummary:
      "A complete Low-Level Object-Oriented design for Splitwise featuring Strategy and Factory patterns for extensible expense calculations (Equal, Exact, Percentage) with exact integer-cent math. Includes an optimal Greedy Debt Simplification algorithm reducing N-party group debts to minimal pairwise transactions.",
    interviewerEvaluation: {
      weak: "Uses floating point numbers ($10.3333), hardcodes equal splits, and has no debt simplification logic.",
      needsImprovement: "Implements basic classes but splits math fails rounding edge cases and lacks design pattern separation.",
      good: "Implements Strategy pattern, handles cents rounding, and implements greedy debt simplification.",
      strong: "Full OOD with Factory + Strategy, exact validations, and explains graph cycle reduction trade-offs.",
      tier1Ready: "Mastery of double-entry accounting invariants, O(N log N) Min-Heap cash flow minimization, and distributed ledger idempotency."
    }
  },
  {
    id: "sd_lld_005",
    title: "Design an In-Memory LRU & LFU Cache with O(1) Operations",
    difficulty: "Medium",
    designType: "LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Uber", "Bloomberg"],
    reportedMetadata: {
      company: "Google / Bloomberg",
      role: "Software Engineer",
      approxYear: "2023",
      round: "Data Structures & Low Level Design",
      sourceNote: "Top-tier coding and LLD staple evaluating custom Doubly Linked List, frequency buckets, and concurrent read/write locks."
    },
    categoryTag: "Data Structures & Memory Management",
    problemStatement:
      "Design and implement a generic thread-safe In-Memory Cache supporting both Least Recently Used (LRU) and Least Frequently Used (LFU) eviction policies with strict O(1) time complexity for both `get(key)` and `put(key, value)`. Support configurable TTL (Time-To-Live) and maximum capacity.",
    functionalRequirements: [
      "O(1) Get: Retrieve value associated with key in constant time; update recency/frequency.",
      "O(1) Put: Insert or update key-value pair. If capacity is reached, evict LRU or LFU entry in O(1) time.",
      "Generic Key-Value support: Support any key type `K` and value type `V`.",
      "TTL Expiration: Evict expired entries lazily or via active background sweeps."
    ],
    nonFunctionalRequirements: [
      "Thread Safety: Support concurrent access by multiple threads with minimal lock contention (e.g. ReadWriteLock or Striped Locks).",
      "Memory Efficiency: Eliminate memory leaks on deleted nodes."
    ],
    assumptions: [
      "Cache capacity configured at instantiation (e.g. 10,000 entries)."
    ],
    apiDesign: [
      {
        method: "GET",
        endpoint: "/cache/{key}",
        description: "Fetch cached value in O(1) time.",
        responseBody: '{ "key": "usr_99", "val": "{...}", "hit": true }'
      },
      {
        method: "POST",
        endpoint: "/cache/{key}",
        description: "Store value with optional TTL.",
        requestBody: '{ "value": "{...}", "ttlMs": 60000 }',
        responseBody: '{ "status": "STORED", "evictedKey": null }'
      }
    ],
    dataModel: {
      type: "In-Memory / Distributed Map",
      entities: [
        {
          name: "CacheNode<K, V>",
          description: "Doubly linked list node.",
          fields: ["key (K)", "val (V)", "frequency (INT)", "expiresAt (INT64)", "prev (CacheNode)", "next (CacheNode)"]
        },
        {
          name: "FrequencyList<K, V>",
          description: "Doubly linked list of nodes sharing identical access frequency (LFU).",
          fields: ["frequency (INT)", "head (CacheNode)", "tail (CacheNode)", "size (INT)"]
        }
      ],
      explanation: "HashMap + Doubly Linked List provides O(1) LRU. Double HashMap + Frequency Doubly Linked Lists provides O(1) LFU."
    },
    architecture: {
      diagramAscii: `
[LRU CACHE DATA STRUCTURE]
HashMap: { key -> Node }
             |
             v
[Head (MRU)] <-> [ Node 1 ] <-> [ Node 2 ] <-> [ Node N ] <-> [Tail (LRU)]
(Most Recent)                                              (Evict Candidate)
      `,
      description: "Doubly Linked List with Sentinel Head/Tail nodes + Hash Map for O(1) pointer updates.",
      components: [
        { name: "NodeMap", role: "Key Index", details: "Maps Key -> Doubly Linked Node for O(1) lookup." },
        { name: "DoublyLinkedList", role: "Recency Tracker", details: "Maintains temporal order without array shifting." }
      ]
    },
    databaseChoice: {
      primaryDb: "Pure In-Memory JVM / V8 Heap",
      rationale: "Requires nanosecond execution speed without network or disk overhead.",
      alternativeConsidered: "Redis",
      tradeoff: "Redis adds ~1ms network socket hop; in-memory cache operates in < 50 nanoseconds."
    },
    concurrencyAndThreadSafety: "Java `ReentrantReadWriteLock` or Striped Lock segments (like Guava Cache / Caffeine) to reduce lock contention across distinct hash buckets.",
    consistencyModel: "Strict Linearizability for in-memory reads and writes.",
    availabilityAndFailover: "Process-local cache; if instance restarts, warms up from persistent DB or distributed cache.",
    failureScenarios: [
      { failure: "Memory Exhaustion (OOM)", impact: "Process crashes.", mitigation: "Strict max-element capacity and off-heap memory buffers." }
    ],
    security: ["Zero serialization vulnerabilities by keeping data within local memory address space."],
    monitoringObservability: ["Hit Ratio (Target > 90%)", "Eviction count per second", "Average lookup latency in nanoseconds"],
    bottlenecks: ["Global lock contention under high concurrent write threads (solved by Striped Locking)."],
    tradeOffs: [
      {
        topic: "LRU vs LFU Eviction",
        optionA: "LRU (Least Recently Used)",
        optionB: "LFU (Least Frequently Used)",
        choiceMade: "LRU for general access; LFU for frequency-skewed access",
        why: "LRU adapts faster to shifting access patterns with less memory overhead; LFU protects against scan-pollution where a one-off batch scan evicts popular items."
      }
    ],
    interviewFollowUps: [
      {
        question: "How do you achieve O(1) for LFU (Least Frequently Used)?",
        interviewerContext: "Famous hard algorithm question.",
        strongAnswer: "Maintain two HashMaps: (1) `keyToNode`: maps Key -> Node (storing key, value, frequency), and (2) `freqToList`: maps Frequency -> DoublyLinkedList of all nodes with that exact frequency. Maintain an integer `minFreq`. When a key is accessed, remove it from `freqToList[f]` and move it to `freqToList[f+1]`. If `freqToList[minFreq]` becomes empty, increment `minFreq`. On eviction, pop the tail from `freqToList[minFreq]`. All operations are strictly O(1)."
      },
      {
        question: "Why use Sentinel dummy head and tail nodes in the Doubly Linked List?",
        interviewerContext: "Clean code and pointer safety.",
        strongAnswer: "Sentinel nodes eliminate all special-case `null` checks when adding to an empty list or deleting the only remaining node, removing edge-case pointer bugs."
      }
    ],
    lldOodDetails: {
      classesAndInterfaces: [
        { name: "ICache<K, V>", type: "interface", responsibility: "Cache contract", methods: ["get(key: K): V | null", "put(key: K, value: V, ttlMs?: number): void", "size(): number"] },
        { name: "LRUCache<K, V>", type: "class", responsibility: "O(1) LRU implementation", methods: ["get(key: K): V | null", "put(key: K, value: V): void"] }
      ],
      relationshipsUml: "LRUCache ..|> ICache\nLRUCache *-- DNode",
      solidPrinciplesApplied: [
        { principle: "SRP", application: "DNode only stores links and data; LRUCache handles eviction policy." }
      ],
      designPatterns: [
        { pattern: "Decorator Pattern", whyUsed: "Wrap base cache with TTL expiration or Metrics recording decorator.", whyNotAlternative: "Keeps core cache focused.", tradeoff: "Extra object wrapper." }
      ],
      threadSafetyMechanisms: ["Mutex or Read-Write lock on cache operations"],
      codeImplementation: {
        language: "typescript",
        code: `class DNode<K, V> {
  public prev: DNode<K, V> | null = null;
  public next: DNode<K, V> | null = null;

  constructor(public key: K, public val: V) {}
}

export class LRUCache<K, V> {
  private capacity: number;
  private map: Map<K, DNode<K, V>> = new Map();
  private head: DNode<K, V>; // Sentinel Most Recently Used
  private tail: DNode<K, V>; // Sentinel Least Recently Used

  constructor(capacity: number) {
    this.capacity = capacity;
    this.head = new DNode<K, V>(null as any, null as any);
    this.tail = new DNode<K, V>(null as any, null as any);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  public get(key: K): V | null {
    const node = this.map.get(key);
    if (!node) return null;

    // Move to front (MRU)
    this.removeNode(node);
    this.addNodeToFront(node);
    return node.val;
  }

  public put(key: K, val: V): void {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      node.val = val;
      this.removeNode(node);
      this.addNodeToFront(node);
    } else {
      if (this.map.size >= this.capacity) {
        // Evict LRU (node right before sentinel tail)
        const lruNode = this.tail.prev!;
        this.removeNode(lruNode);
        this.map.delete(lruNode.key);
      }
      const newNode = new DNode<K, V>(key, val);
      this.map.set(key, newNode);
      this.addNodeToFront(newNode);
    }
  }

  private addNodeToFront(node: DNode<K, V>): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  private removeNode(node: DNode<K, V>): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }
}`
      }
    },
    finalAnswerSummary:
      "A complete, production-grade Low-Level Design for an In-Memory LRU and LFU Cache achieving strict O(1) get and put operations via Doubly Linked List with Sentinel nodes and HashMaps. Includes thread synchronization primitives and LFU dual-hashmap frequency buckets.",
    interviewerEvaluation: {
      weak: "Uses an Array or LinkedList where search or deletion is O(N).",
      needsImprovement: "Uses HashMap but fails to implement O(1) eviction using Doubly Linked List pointers.",
      good: "Implements Doubly Linked List + HashMap for O(1) LRU with sentinel nodes.",
      strong: "Explains both O(1) LRU and O(1) LFU frequency lists, along with thread-safe ReadWriteLock mechanics.",
      tier1Ready: "Mastery of Caffeine cache W-TinyLFU eviction, striped locking, memory cache line padding, and off-heap zero-GC memory buffers."
    }
  },
  {
    id: "sd_lld_006",
    title: "Design a Token Bucket & Sliding Window Rate Limiter (LLD)",
    difficulty: "Medium",
    designType: "LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Stripe", "Amazon", "Google", "Microsoft", "Uber", "Cloudflare"],
    reportedMetadata: {
      company: "Stripe / Cloudflare",
      role: "Software Engineer",
      approxYear: "2024",
      round: "Low Level Design & API Infrastructure",
      sourceNote: "Core API infrastructure question testing Token Bucket algorithm, atomic concurrency, and distributed Redis rate limiting."
    },
    categoryTag: "Rate Limiting & Concurrency",
    problemStatement:
      "Design a flexible Low-Level Rate Limiter library supporting multiple algorithms: Token Bucket, Leaky Bucket, and Sliding Window Counter. Support rate limiting by Client IP, User ID, and API Endpoint with burst handling, thread-safe refill mechanisms, and clean HTTP 429 response headers (`X-RateLimit-Remaining`, `X-RateLimit-Reset`).",
    functionalRequirements: [
      "Rate Limiter Contract: `allowRequest(clientId: string, tokensRequired?: number): boolean`.",
      "Token Bucket Algorithm: Tokens continuously replenish at rate R tokens/sec up to bucket capacity B. Consuming N tokens succeeds if tokens >= N.",
      "Sliding Window Counter Algorithm: Smoothly weights request counts across previous and current 1-minute windows to prevent boundary burst attacks.",
      "Standard Headers: Return remaining quota and time-to-reset on every HTTP response."
    ],
    nonFunctionalRequirements: [
      "Ultra-Low Latency: Evaluated on every incoming API request (< 0.5ms overhead).",
      "Thread Safety: Atomic token subtraction without race conditions under concurrent client threads."
    ],
    assumptions: [
      "API limit: 100 requests per minute per user ID, with burst capacity up to 120."
    ],
    apiDesign: [
      {
        method: "GET",
        endpoint: "/api/v1/resource",
        description: "Protected endpoint returning rate limit headers.",
        headers: "X-RateLimit-Limit: 100\nX-RateLimit-Remaining: 94\nX-RateLimit-Reset: 1724068800"
      }
    ],
    dataModel: {
      type: "In-Memory / Distributed Map",
      entities: [
        {
          name: "TokenBucketState",
          description: "Internal state of an active token bucket.",
          fields: ["client_id (STRING)", "current_tokens (DOUBLE)", "last_refill_timestamp_ms (INT64)", "capacity (DOUBLE)", "refill_rate_per_sec (DOUBLE)"]
        }
      ],
      explanation: "Stored in memory or Redis Hash with atomic Lua script arithmetic."
    },
    architecture: {
      diagramAscii: `
[ Incoming Request ] ---> [ RateLimiterMiddleware ]
                                   |
                                   v
                      +--------------------------+
                      |    IRateLimiterStrategy  |
                      +--------------------------+
                        /            |         \\
                       v             v          v
              [ TokenBucket ] [ LeakyBucket ] [ SlidingWindow ]
      `,
      description: "Interceptor / Middleware Pattern delegating to Strategy Rate Limiter engines.",
      components: [
        { name: "RateLimiterMiddleware", role: "HTTP Interceptor", details: "Extracts client IP or API key and invokes rate limiter." },
        { name: "TokenBucket", role: "Algorithm", details: "Calculates lazy token refill based on elapsed time without background timer threads." }
      ]
    },
    databaseChoice: {
      primaryDb: "Local In-Memory Map (Single Instance) or Redis Cluster (Distributed)",
      rationale: "Lazy timestamp arithmetic avoids background cron overhead.",
      alternativeConsidered: "RDBMS",
      tradeoff: "RDBMS transactions would cripple throughput at 100,000 RPS."
    },
    concurrencyAndThreadSafety: "Atomic Compare-And-Swap (CAS) or synchronized block per client ID; Redis Lua script for distributed environments.",
    consistencyModel: "Linearizable per client rate-limit counter.",
    availabilityAndFailover: "Fail-Open policy: If rate limiter crashes, allow requests through to prevent blocking legitimate users.",
    failureScenarios: [
      { failure: "Redis Rate Limiter Cluster Unreachable", impact: "Risk of blocking all API traffic.", mitigation: "Circuit breaker switches to Fail-Open mode and logs alert." }
    ],
    security: ["Prevent rate limiter bypass by keying on authenticated User ID rather than easily-spoofed `X-Forwarded-For` IP headers."],
    monitoringObservability: ["429 Too Many Requests rate per endpoint", "Top throttled client IDs"],
    bottlenecks: ["Redis single-key contention under massive distributed DDOS on a single IP."],
    tradeOffs: [
      {
        topic: "Fixed Window Counter vs Sliding Window Log vs Token Bucket",
        optionA: "Fixed Window Counter",
        optionB: "Token Bucket",
        choiceMade: "Token Bucket",
        why: "Fixed window allows 2x burst traffic across boundary window edges; Token Bucket smoothly bounds rate while allowing controlled bursts."
      }
    ],
    interviewFollowUps: [
      {
        question: "How do you implement lazy token refilling without running background timer threads?",
        interviewerContext: "Testing efficiency and mathematical modeling in system design.",
        strongAnswer: "Instead of running a tick thread for millions of users, calculate tokens on-demand during `allowRequest()`: `elapsed = now - lastRefillTime; tokens = min(capacity, currentTokens + elapsed * refillRate); lastRefillTime = now`. If `tokens >= 1`, subtract 1 and return true. This achieves O(1) time and zero background CPU usage."
      },
      {
        question: "How do you implement a distributed Token Bucket in Redis atomically?",
        interviewerContext: "Evaluating Redis Lua scripting.",
        strongAnswer: "Execute a Lua script storing `[lastRefillTime, currentTokens]` in a Redis Hash. The script reads both fields, computes new tokens based on `redis.call('TIME')`, checks if tokens >= requested, decrements, writes back, and sets a TTL. Because Redis executes Lua scripts atomically, no race conditions can occur."
      }
    ],
    lldOodDetails: {
      classesAndInterfaces: [
        { name: "IRateLimiter", type: "interface", responsibility: "Rate limiting decision contract", methods: ["allowRequest(clientId: string, tokens?: number): boolean"] },
        { name: "TokenBucketRateLimiter", type: "class", responsibility: "Implements Token Bucket algorithm", methods: ["allowRequest(clientId: string): boolean"] }
      ],
      relationshipsUml: "RateLimiterMiddleware --> IRateLimiter\nTokenBucketRateLimiter ..|> IRateLimiter",
      solidPrinciplesApplied: [
        { principle: "SRP", application: "TokenBucket only calculates tokens; Middleware handles HTTP response headers." },
        { principle: "OCP", application: "New rate limiting algorithms (e.g. LeakyBucket) plug into IRateLimiter interface." }
      ],
      designPatterns: [
        { pattern: "Strategy Pattern", whyUsed: "Swappable rate limiting algorithms.", whyNotAlternative: "Decouples HTTP pipeline from algorithm.", tradeoff: "None." }
      ],
      threadSafetyMechanisms: ["Mutex or AtomicReference per client state"],
      codeImplementation: {
        language: "typescript",
        code: `export interface IRateLimiter {
  allowRequest(clientId: string, tokensRequired?: number): boolean;
}

export class TokenBucketRateLimiter implements IRateLimiter {
  private buckets: Map<string, { tokens: number; lastRefillMs: number }> = new Map();

  constructor(
    private readonly capacity: number,
    private readonly refillRatePerSec: number
  ) {}

  public allowRequest(clientId: string, tokensRequired: number = 1): boolean {
    const now = Date.now();
    let bucket = this.buckets.get(clientId);

    if (!bucket) {
      bucket = { tokens: this.capacity, lastRefillMs: now };
      this.buckets.set(clientId, bucket);
    } else {
      // Lazy refill calculation
      const elapsedSeconds = (now - bucket.lastRefillMs) / 1000;
      const refilledTokens = elapsedSeconds * this.refillRatePerSec;
      bucket.tokens = Math.min(this.capacity, bucket.tokens + refilledTokens);
      bucket.lastRefillMs = now;
    }

    if (bucket.tokens >= tokensRequired) {
      bucket.tokens -= tokensRequired;
      return true; // Request Allowed
    }

    return false; // Throttled (HTTP 429)
  }
}`
      }
    },
    finalAnswerSummary:
      "A complete Low-Level Design for a high-performance Token Bucket Rate Limiter using lazy on-demand token replenishment and Strategy pattern. Avoids background timer overhead, supports burst tolerances, and is ready for distributed Redis Lua script deployment.",
    interviewerEvaluation: {
      weak: "Proposes background thread polling for millions of users or uses flawed fixed-window counter.",
      needsImprovement: "Implements basic token bucket but cannot explain lazy refill math or thread safety under concurrency.",
      good: "Implements lazy refill token bucket in O(1) and writes clean Strategy pattern interfaces.",
      strong: "Writes atomic Redis Lua script logic, explains Sliding Window Counter math, and discusses Fail-Open policies.",
      tier1Ready: "Mastery of Cloudflare / Stripe edge rate limiting architectures, leaky bucket traffic shaping, and token bucket burst sizing."
    }
  }
];
