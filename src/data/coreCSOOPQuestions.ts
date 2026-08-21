import { CoreCSQuestion } from "./coreCSTypes.js";

export const CORE_CS_OOP_QUESTIONS: CoreCSQuestion[] = [
  {
    id: "oop-01",
    title: "Virtual Functions & Dynamic Dispatch: vtable and vptr Internals",
    topic: "OOP",
    subtopic: "Polymorphism & Memory Layout",
    difficulty: "Hard",
    format: "Explanation",
    companies: ["Google", "Microsoft", "Apple", "Nvidia", "Adobe"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Google",
      role: "Software Engineer - C++ / Systems",
      year: 2024,
      sourceReference: "Google C++ / OOP Systems Interview Loop"
    },
    question: "How does runtime polymorphism (dynamic dispatch) work internally in C++? Explain the exact mechanics and memory overhead of the vtable and vptr.",
    detailedExplanation: "When a class declares at least one `virtual` function: 1. The compiler generates a static array of function pointers called a `vtable` (Virtual Table) for that class. 2. The compiler silently injects a hidden pointer called `vptr` (Virtual Table Pointer, 8 bytes on 64-bit systems) into every instance object of that class, typically as the first member variable. 3. When a virtual function is invoked via a base pointer (e.g. `basePtr->draw()`), the CPU dereferences `basePtr->vptr` to find the runtime vtable, indexes the vtable array for `draw()`, and invokes the resolved concrete derived function pointer.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Why should a base class destructor always be declared `virtual` if it has virtual methods?",
        interviewerIntent: "Critical memory leak bug detection.",
        strongCandidateAnswer: "If a base class destructor is NOT virtual, deleting a derived object through a base pointer (`Base* p = new Derived(); delete p;`) invokes ONLY the Base destructor via static binding. The Derived class destructor is skipped, leaking all heap memory and resources allocated in the Derived class.",
        keyKeywords: ["Virtual destructor", "Derived destructor skipped", "Memory leak", "Undefined behavior"]
      },
      {
        stepNumber: 2,
        interviewerPrompt: "What is the memory size of `sizeof(EmptyClass)` vs `sizeof(ClassWithVirtualMethod)` on a 64-bit compiler?",
        interviewerIntent: "Object layout memory validation.",
        strongCandidateAnswer: "`sizeof(EmptyClass)` is 1 byte (to ensure distinct memory addresses for unique instances). `sizeof(ClassWithVirtualMethod)` is 8 bytes due to the injected 64-bit `vptr` pointer.",
        keyKeywords: ["1 byte empty class", "8 bytes vptr", "64-bit alignment"]
      }
    ],
    systemsDeepDive: {
      whyItMattersInProduction: "Crucial for writing high-performance C++ and Java systems where vtable indirection prevents compiler inlining and incurs L1 instruction cache misses.",
      commonPitfalls: ["Calling virtual methods inside constructors or destructors (dynamic dispatch does NOT resolve to derived classes during base construction)."],
      tradeoffsOrPerformanceImpact: "Virtual calls incur a pointer indirection overhead (~1-2ns) and disable CPU branch prediction and compiler inlining."
    }
  },
  {
    id: "oop-02",
    title: "Multiple Inheritance: Diamond Problem & Virtual Base Classes",
    topic: "OOP",
    subtopic: "Inheritance",
    difficulty: "Medium",
    format: "Scenario",
    companies: ["Microsoft", "Google", "Apple", "Adobe"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Microsoft",
      role: "Software Engineer",
      year: 2023,
      sourceReference: "Microsoft Core OOP & Systems Architecture"
    },
    question: "What is the Diamond Problem in multiple inheritance? How does C++ resolve it using Virtual Inheritance?",
    detailedExplanation: "The Diamond Problem occurs when Class B and Class C both inherit from Class A, and Class D inherits from both B and C. Without virtual inheritance, an object of Class D contains TWO separate copies of Class A's member variables (one via B, one via C), causing ambiguous method calls (e.g. `d.methodFromA()`) and wasted memory. C++ resolves this using `virtual public A` in B and C. This ensures that Class D contains only a single shared instance of Class A, with B and C storing virtual base pointers/offsets to the shared A subobject.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "How do modern languages like Java and C# avoid the diamond problem completely?",
        interviewerIntent: "Language design philosophy.",
        strongCandidateAnswer: "They disallow multiple class inheritance entirely, allowing only single class inheritance while supporting multiple Interface implementation. (Java 8+ default methods resolve conflicts using explicit interface disambiguation rules).",
        keyKeywords: ["Single class inheritance", "Multiple interfaces", "Default method conflict resolution"]
      }
    ]
  },
  {
    id: "oop-03",
    title: "SOLID Principles in Real-World Software Engineering",
    topic: "OOP",
    subtopic: "Design Principles",
    difficulty: "Medium",
    format: "Explanation",
    companies: ["Amazon", "Uber", "Microsoft", "Salesforce", "Atlassian"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Amazon",
      role: "SDE II / LLD",
      year: 2024,
      sourceReference: "Amazon Low-Level Object-Oriented Design Interview"
    },
    question: "Break down the SOLID principles with concrete engineering violations and fixes for Liskov Substitution (LSP) and Dependency Inversion (DIP).",
    detailedExplanation: "S: Single Responsibility (one class has one reason to change). O: Open/Closed (open for extension, closed for modification via abstractions). L: Liskov Substitution (objects of a superclass should be replaceable with objects of a subclass without breaking program correctness; e.g. Classic Square inheriting from Rectangle violates LSP because mutating width breaks square's height invariance). I: Interface Segregation (clients shouldn't be forced to depend on methods they don't use; favor lean interfaces). D: Dependency Inversion (high-level modules should not depend on low-level modules; both should depend on abstractions/interfaces).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Give a real production example of Dependency Inversion in a Payment Processing service.",
        interviewerIntent: "Practical architectural decoupling.",
        strongCandidateAnswer: "Instead of `OrderService` directly instantiating `StripeGateway stripe = new StripeGateway()`, `OrderService` depends on a `PaymentGateway` interface. `StripeGateway` and `PaypalGateway` implement `PaymentGateway`. `OrderService` receives the interface via constructor injection, allowing zero-code-change gateway switching and unit test mocking.",
        keyKeywords: ["PaymentGateway interface", "Constructor injection", "Decoupling", "Unit test mocking"]
      }
    ]
  },
  {
    id: "oop-04",
    title: "Composition vs Inheritance: Why Prefer Composition?",
    topic: "OOP",
    subtopic: "Design Architecture",
    difficulty: "Easy",
    format: "Explanation",
    companies: ["Google", "Amazon", "Atlassian", "Adobe"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Atlassian",
      role: "Software Engineer",
      year: 2024,
      sourceReference: "Atlassian Object-Oriented Fundamentals"
    },
    question: "Why does the Gang of Four (GoF) principle state 'Favor object composition over class inheritance'? What are the concrete dangers of deep inheritance hierarchies?",
    detailedExplanation: "Inheritance creates tight compile-time coupling ('White-Box Reuse') where subclasses depend heavily on parent implementation details. If the parent class changes, subclasses often break ('Fragile Base Class Problem'). Inheritance also violates encapsulation and cannot be dynamically changed at runtime. Composition ('Black-Box Reuse') embeds objects via references/interfaces ('HAS-A' instead of 'IS-A'), preserving encapsulation, allowing dynamic runtime behavior switching (e.g. Strategy Pattern), and enabling easy unit testing with mocks.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "When IS inheritance genuinely appropriate over composition?",
        interviewerIntent: "Balanced engineering judgment.",
        strongCandidateAnswer: "When there is a genuine, immutable 'IS-A' relationship where the derived class fulfills the full Liskov Substitution contract, reuses substantial common polymorphic behavior, and is part of a closed domain model (e.g. GUI framework `Button extends UIComponent`).",
        keyKeywords: ["True IS-A relationship", "LSP fulfillment", "Polymorphic framework"]
      }
    ]
  },
  {
    id: "oop-05",
    title: "Shallow Copy vs Deep Copy & Copy on Write",
    topic: "OOP",
    subtopic: "Memory & Object State",
    difficulty: "Easy",
    format: "Short Answer",
    companies: ["Microsoft", "Apple", "Amazon", "Oracle"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Apple",
      role: "Software Engineer",
      year: 2024,
      sourceReference: "Apple Object Lifecycle & Memory Management"
    },
    question: "Explain the difference between Shallow Copy and Deep Copy. What happens when an object with heap pointers is shallow-copied and both copies are deleted?",
    detailedExplanation: "Shallow Copy copies all primitive fields by value and copies pointer/reference fields by address (both objects point to the same underlying heap memory block). Deep Copy recursively duplicates all dynamically allocated heap objects, creating completely independent memory blocks. If a shallow-copied object with heap pointers is destroyed, the first destructor frees the heap memory. When the second object is destroyed, it attempts to free the already-freed pointer, causing a fatal 'Double Free' memory corruption crash (or dangling pointer bugs if one object modifies the shared memory).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is RAII (Resource Acquisition Is Initialization) and how does it prevent resource leaks?",
        interviewerIntent: "Core modern C++/systems idiom.",
        strongCandidateAnswer: "RAII ties resource lifecycle (heap memory, file handles, mutex locks, database sockets) directly to object lifetime on the stack. Resources are acquired in the constructor and deterministically released in the destructor. When stack frames unwind (even during exceptions), destructors run automatically, guaranteeing zero resource leaks.",
        keyKeywords: ["RAII", "Constructor acquisition", "Destructor release", "Deterministic cleanup", "Exception safety"]
      }
    ]
  }
];
