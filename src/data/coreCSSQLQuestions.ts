import { CoreCSQuestion } from "./coreCSTypes.js";

export const CORE_CS_SQL_QUESTIONS: CoreCSQuestion[] = [
  {
    id: "sql-01",
    title: "Find Nth Highest Salary (Handling Ties & NULLs)",
    topic: "SQL",
    subtopic: "Window Functions & Subqueries",
    difficulty: "Medium",
    format: "SQL Coding",
    companies: ["Amazon", "Microsoft", "Google", "Meta", "Oracle"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Amazon",
      role: "SDE / Data Engineer",
      year: 2024,
      sourceReference: "Amazon Classic SQL Technical Screen"
    },
    question: "Write an SQL query to find the Nth highest distinct salary from the `Employee` table. If there is no Nth highest salary, return NULL.",
    sqlSchema: "CREATE TABLE Employee (id INT PRIMARY KEY, salary INT);\nINSERT INTO Employee VALUES (1, 100), (2, 200), (3, 300), (4, 300);",
    sqlExpectedQuery: `CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  RETURN (
    SELECT DISTINCT salary
    FROM (
      SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk
      FROM Employee
    ) ranked
    WHERE rnk = N
  );
END`,
    detailedExplanation: "Using `DENSE_RANK()` is critical because if multiple employees tie for 1st place (e.g. 300, 300), standard `RANK()` would assign ranks (1, 1, 3), skipping rank 2 entirely. `DENSE_RANK()` assigns ranks (1, 1, 2), correctly treating 200 as the 2nd highest distinct salary. Alternatively, in MySQL: `SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET N-1`.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Why does `LIMIT 1 OFFSET N-1` fail if N is out of range or table has fewer than N rows?",
        interviewerIntent: "NULL handling edge case.",
        strongCandidateAnswer: "A direct query returns empty set (0 rows) instead of a single row containing `NULL`. Wrapping it in `SELECT (SELECT DISTINCT salary ... LIMIT 1 OFFSET N-1) as getNthHighestSalary` properly evaluates an empty scalar subquery to `NULL`.",
        keyKeywords: ["Scalar subquery", "NULL return", "Empty set handling"]
      }
    ]
  },
  {
    id: "sql-02",
    title: "Delete Duplicate Emails Keeping the Smallest ID",
    topic: "SQL",
    subtopic: "Data Manipulation & CTE",
    difficulty: "Medium",
    format: "SQL Coding",
    companies: ["Meta", "Amazon", "Apple", "Uber"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Meta",
      role: "Software Engineer",
      year: 2024,
      sourceReference: "Meta Core SQL & Data Consistency Screening"
    },
    question: "Given a table `Person` with columns `(id INT, email VARCHAR)`, write a DELETE statement to remove all duplicate email rows, keeping only the row with the smallest `id`.",
    sqlSchema: "CREATE TABLE Person (id INT PRIMARY KEY, email VARCHAR(255));\nINSERT INTO Person VALUES (1, 'john@example.com'), (2, 'bob@example.com'), (3, 'john@example.com');",
    sqlExpectedQuery: `DELETE p1 FROM Person p1
INNER JOIN Person p2 
ON p1.email = p2.email AND p1.id > p2.id;`,
    detailedExplanation: "We perform a self-join on `Person` where the emails match (`p1.email = p2.email`) and `p1.id > p2.id`. This matches every duplicate row with an ID greater than the minimum ID for that email, and the `DELETE p1` clause deletes only the higher-ID duplicates. Alternatively, using CTE in PostgreSQL: `WITH Ranked AS (SELECT id, ROW_NUMBER() OVER(PARTITION BY email ORDER BY id) as rn FROM Person) DELETE FROM Person WHERE id IN (SELECT id FROM Ranked WHERE rn > 1);`.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What lock does this DELETE query take on the table in MySQL InnoDB?",
        interviewerIntent: "Concurrency and locking during batch deletes.",
        strongCandidateAnswer: "It acquires exclusive row locks (X-locks) on the deleted rows and shared/next-key locks on the scanned rows. For large tables with millions of rows, this can lock large ranges; production best practice is to batch deletes in chunks of 5000 rows with primary key pagination.",
        keyKeywords: ["X-locks", "Next-key locks", "Batch chunking", "Lock escalation"]
      }
    ]
  },
  {
    id: "sql-03",
    title: "Top K Highest Paid Employees per Department",
    topic: "SQL",
    subtopic: "Window Functions & Partitioning",
    difficulty: "Hard",
    format: "SQL Coding",
    companies: ["Google", "Amazon", "Microsoft", "Uber"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Google",
      role: "Software Engineer / Analytics",
      year: 2024,
      sourceReference: "Google SQL & Data Querying Interview"
    },
    question: "Write an SQL query to find the top 3 highest-earning employees in each department. If there are ties, include all tied employees.",
    sqlSchema: "CREATE TABLE Department (id INT PRIMARY KEY, name VARCHAR(50));\nCREATE TABLE Employee (id INT PRIMARY KEY, name VARCHAR(50), salary INT, departmentId INT);",
    sqlExpectedQuery: `WITH RankedSalaries AS (
  SELECT 
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary,
    DENSE_RANK() OVER (
      PARTITION BY e.departmentId 
      ORDER BY e.salary DESC
    ) AS rnk
  FROM Employee e
  JOIN Department d ON e.departmentId = d.id
)
SELECT Department, Employee, Salary
FROM RankedSalaries
WHERE rnk <= 3;`,
    detailedExplanation: "We use a Common Table Expression (CTE) with `DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC)`. `PARTITION BY` groups the ranking calculation independently per department. `DENSE_RANK()` ensures that if two people tie for 1st, the next highest salary is ranked 2nd. Filtering `rnk <= 3` in the outer query returns the top 3 unique salary tiers per department.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is the computational complexity of window function partitioning in database engines?",
        interviewerIntent: "Query execution plan mechanics.",
        strongCandidateAnswer: "O(N log N) time where N is the number of rows. The query engine sorts the dataset by `(partition_col, order_col)` or uses a hash partition followed by sort, scanning the sorted partition stream with an O(N) window accumulator.",
        keyKeywords: ["Sort operation", "O(N log N)", "Hash partition", "Window accumulator"]
      }
    ]
  },
  {
    id: "sql-04",
    title: "Consecutive Active Days: Gaps and Islands Problem",
    topic: "SQL",
    subtopic: "Advanced Window Analytics",
    difficulty: "Extreme",
    format: "SQL Coding",
    companies: ["Meta", "Uber", "Stripe", "Amazon"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Meta",
      role: "Software Engineer / Product Analytics",
      year: 2024,
      sourceReference: "Meta Advanced SQL & Retention Cohorts Loop"
    },
    question: "Given a table `UserLogins (user_id INT, login_date DATE)`, write an SQL query to find all users who have logged in for at least 5 consecutive calendar days.",
    sqlSchema: "CREATE TABLE UserLogins (user_id INT, login_date DATE);",
    sqlExpectedQuery: `WITH DistinctLogins AS (
  SELECT DISTINCT user_id, login_date 
  FROM UserLogins
),
GroupedLogins AS (
  SELECT 
    user_id,
    login_date,
    DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY login_date) DAY) as island_id
  FROM DistinctLogins
)
SELECT user_id, COUNT(*) as consecutive_days
FROM GroupedLogins
GROUP BY user_id, island_id
HAVING COUNT(*) >= 5;`,
    detailedExplanation: "This is the classic 'Gaps and Islands' problem. 1. De-duplicate user logins per day with `SELECT DISTINCT`. 2. Assign a sequential `ROW_NUMBER() (1, 2, 3...)` ordered by `login_date` partitioned by `user_id`. 3. Key insight: If dates are consecutive (e.g. Day 10, Day 11, Day 12), subtracting `ROW_NUMBER` days `(10-1, 11-2, 12-3)` yields a constant baseline date (`island_id` = Day 9). Any gap in consecutive days causes the baseline date to jump. 4. Grouping by `(user_id, island_id)` and filtering `HAVING COUNT(*) >= 5` identifies consecutive streaks of 5+ days.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "How would you solve this if you needed to find consecutive streaks in transactions without date arithmetic?",
        interviewerIntent: "Alternative window techniques (LEAD/LAG vs difference).",
        strongCandidateAnswer: "Use `LAG(login_date, 4) OVER(PARTITION BY user_id ORDER BY login_date)`. If `DATEDIFF(login_date, lag_date) = 4`, it guarantees 5 consecutive days of activity directly.",
        keyKeywords: ["LAG window function", "DATEDIFF", "Streak detection"]
      }
    ]
  },
  {
    id: "sql-05",
    title: "EXISTS vs IN: Performance & Three-Valued Logic with NULLs",
    topic: "SQL",
    subtopic: "Query Optimization & Semantics",
    difficulty: "Medium",
    format: "Explanation",
    companies: ["Microsoft", "Oracle", "Amazon", "Adobe"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Oracle",
      role: "Database / Backend SWE",
      year: 2024,
      sourceReference: "Oracle SQL Optimization & Query Planner Mechanics"
    },
    question: "Why does `NOT IN` return ZERO rows if the subquery contains even a single NULL value, while `NOT EXISTS` works correctly? How do their execution plans differ?",
    detailedExplanation: "SQL uses Three-Valued Logic (TRUE, FALSE, UNKNOWN). `x NOT IN (1, 2, NULL)` expands to `x != 1 AND x != 2 AND x != NULL`. In SQL, `x != NULL` evaluates to UNKNOWN. In boolean logic, `TRUE AND UNKNOWN` is UNKNOWN. Because a WHERE clause requires TRUE to return rows, UNKNOWN fails the filter, returning 0 rows! `NOT EXISTS` checks for the presence of matching rows and evaluates to TRUE as long as no correlated matching row exists, ignoring NULL semantics. In execution plans, modern optimizers convert correlated `EXISTS` into Anti-Semi-Joins which short-circuit on the first match.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "When is IN faster than EXISTS?",
        interviewerIntent: "Subquery selectivity trade-offs.",
        strongCandidateAnswer: "`IN` can be faster when the subquery returns an extremely small, static in-memory list (e.g. 5 items) and the outer table is large with an index. `EXISTS` is superior when the subquery is large because it stops scanning the inner table as soon as 1 matching row is found (short-circuit evaluation).",
        keyKeywords: ["Short-circuit evaluation", "Anti-semi-join", "Subquery selectivity", "Three-valued logic"]
      }
    ]
  }
];
