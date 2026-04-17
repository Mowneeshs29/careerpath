/**
 * Run:  npm run seed   (from inside the backend/ folder)
 * Populates the Career collection with sample data.
 *
 * dotenv is loaded from TWO locations so it works regardless of
 * where Node is invoked from:
 *   1. Relative to this file  →  ../../.env  (backend/.env)
 *   2. Relative to cwd()      →  .env        (also backend/.env when you cd backend first)
 */
const nodePath = require("path");

const pathFromFile = nodePath.resolve(__dirname, "../../.env");   // backend/src/utils/ → backend/
const pathFromCwd  = nodePath.resolve(process.cwd(), ".env");     // wherever you ran npm run seed from

require("dotenv").config({ path: pathFromFile });
require("dotenv").config({ path: pathFromCwd });                  // second call only fills MISSING vars

/* ─── Hard stop if still empty ─── */
if (!process.env.MONGO_URI) {
  console.error("\n[Seed] ❌  MONGO_URI is not defined.\n");
  console.error("  Searched for .env at:");
  console.error("    (a)", pathFromFile);
  console.error("    (b)", pathFromCwd);
  console.error("\n  Make sure backend/.env exists and contains:\n");
  console.error("      MONGO_URI=mongodb://localhost:27017/careerapp\n");
  process.exit(1);
}

const mongoose = require("mongoose");
const Career   = require("../models/Career");

/* ═══════════════════════════════════════════════════════════ */
const CAREERS = [
  {
    title: "Full-Stack Web Developer",
    category: "Technology",
    description: "Build and maintain complete web applications from user interface to server-side logic and databases. Work across the entire technology stack to deliver responsive, scalable products.",
    requiredSkills: ["javascript", "react", "node.js", "mongodb", "html", "css", "git"],
    relatedInterests: ["web development", "software engineering", "programming", "design"],
    learningPaths: [
      { title: "The Odin Project",  description: "Free full-stack curriculum",        url: "https://www.theodinproject.com",  duration: "6–12 months" },
      { title: "React Docs",        description: "Official React learning guide",     url: "https://react.dev/learn",         duration: "2 weeks" },
      { title: "MongoDB University",description: "NoSQL database mastery",            url: "https://www.mongodb.com/university", duration: "3 months" },
    ],
    salaryRange: { min: 70000, max: 140000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["web", "coding", "javascript", "react", "node"],
  },
  {
    title: "Data Scientist",
    category: "Technology",
    description: "Analyze complex datasets to uncover insights, build predictive models, and translate findings into actionable business strategies using statistical methods and machine learning.",
    requiredSkills: ["python", "machine learning", "statistics", "sql", "data analysis", "pandas"],
    relatedInterests: ["data analysis", "artificial intelligence", "research", "mathematics"],
    learningPaths: [
      { title: "Andrew Ng – ML Course", description: "Foundational ML on Coursera",   url: "https://www.coursera.org/learn/machine-learning", duration: "11 weeks" },
      { title: "Kaggle Learn",          description: "Hands-on data science notebooks", url: "https://www.kaggle.com/learn",  duration: "Ongoing" },
    ],
    salaryRange: { min: 85000, max: 170000, currency: "USD" },
    educationLevel: "Master's",
    tags: ["data", "ml", "python", "analytics"],
  },
  {
    title: "Cybersecurity Analyst",
    category: "Technology",
    description: "Protect organizational assets by monitoring networks, identifying vulnerabilities, responding to security incidents, and implementing defense strategies.",
    requiredSkills: ["network security", "python", "linux", "penetration testing", "incident response", "siem"],
    relatedInterests: ["cybersecurity", "hacking", "networking", "risk management"],
    learningPaths: [
      { title: "CompTIA Security+", description: "Industry-standard security cert",  url: "https://www.comptia.org/certifications/security", duration: "3 months" },
      { title: "TryHackMe",         description: "Interactive cybersecurity labs",   url: "https://tryhackme.com",          duration: "Ongoing" },
    ],
    salaryRange: { min: 75000, max: 150000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["security", "networking", "linux"],
  },
  {
    title: "Financial Analyst",
    category: "Finance",
    description: "Evaluate financial data, prepare reports, and advise on investment decisions. Support corporate planning and strategy through quantitative analysis.",
    requiredSkills: ["excel", "financial modeling", "sql", "python", "statistics", "accounting"],
    relatedInterests: ["finance", "investing", "economics", "business"],
    learningPaths: [
      { title: "CFA Institute",              description: "Chartered Financial Analyst prep", url: "https://www.cfainstitute.org",                          duration: "12–18 months" },
      { title: "Coursera – Financial Markets", description: "Yale finance course",           url: "https://www.coursera.org/learn/financial-markets-retail", duration: "7 weeks" },
    ],
    salaryRange: { min: 60000, max: 120000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["finance", "investing", "excel", "analysis"],
  },
  {
    title: "Blockchain Developer",
    category: "Technology",
    description: "Design and build decentralized applications and smart contracts on blockchain platforms. Bridge Web3 innovation with traditional software engineering.",
    requiredSkills: ["solidity", "javascript", "ethereum", "python", "smart contracts", "web3"],
    relatedInterests: ["blockchain", "cryptocurrency", "decentralization", "web development"],
    learningPaths: [
      { title: "CryptoZombies",    description: "Learn Solidity by building a game", url: "https://cryptozombies.io",        duration: "2 weeks" },
      { title: "Ethereum.org Docs", description: "Official developer docs",         url: "https://ethereum.org/en/developers", duration: "1 month" },
    ],
    salaryRange: { min: 90000, max: 180000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["blockchain", "web3", "crypto", "solidity"],
  },
  {
    title: "Health Informatics Specialist",
    category: "Healthcare",
    description: "Bridge healthcare and technology by designing systems that improve patient care, streamline medical records, and support data-driven clinical decisions.",
    requiredSkills: ["python", "sql", "data analysis", "healthcare systems", "project management"],
    relatedInterests: ["healthcare", "data analysis", "technology", "patient care"],
    learningPaths: [
      { title: "AMIA Informatics Certificate", description: "Professional health informatics cert", url: "https://www.amia.org", duration: "6 months" },
      { title: "Johns Hopkins – Health IT",    description: "Coursera health IT specialization",    url: "https://www.coursera.org", duration: "4 months" },
    ],
    salaryRange: { min: 70000, max: 130000, currency: "USD" },
    educationLevel: "Master's",
    tags: ["healthcare", "informatics", "data", "systems"],
  },
  {
    title: "UX/UI Designer",
    category: "Design",
    description: "Create intuitive, visually appealing user experiences. Conduct user research, prototype solutions, and collaborate with developers to ship polished products.",
    requiredSkills: ["figma", "user research", "wireframing", "prototyping", "css", "design systems"],
    relatedInterests: ["design", "user experience", "creativity", "psychology", "art"],
    learningPaths: [
      { title: "Google UX Design Certificate", description: "Hands-on Coursera program", url: "https://www.coursera.org/professional-certificates/google-ux-design", duration: "6 months" },
      { title: "Figma Learn",                 description: "Official Figma tutorials",  url: "https://help.figma.com/hc/en-us/articles/360059768813",            duration: "2 weeks" },
    ],
    salaryRange: { min: 65000, max: 130000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["design", "ux", "figma", "creativity"],
  },
  {
    title: "Digital Marketing Manager",
    category: "Marketing",
    description: "Plan and execute online marketing strategies including SEO, social media, PPC, and content marketing to grow brand awareness and drive conversions.",
    requiredSkills: ["seo", "google ads", "content marketing", "social media", "analytics", "data analysis"],
    relatedInterests: ["marketing", "social media", "advertising", "business", "communication"],
    learningPaths: [
      { title: "Google Digital Marketing Certificate", description: "Industry-recognized cert",       url: "https://www.google.com/intl/en_us/about/products", duration: "3 months" },
      { title: "HubSpot Academy",                     description: "Free inbound marketing courses",  url: "https://academy.hubspot.com",                     duration: "Ongoing" },
    ],
    salaryRange: { min: 60000, max: 120000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["marketing", "seo", "social media", "advertising"],
  },
  {
    title: "Data Engineer",
    category: "Technology",
    description: "Design, build, and maintain the infrastructure and systems that enable data collection, storage, and analysis at scale. Build reliable ETL pipelines and data warehouses.",
    requiredSkills: ["python", "sql", "aws", "spark", "docker", "kafka", "data pipelines"],
    relatedInterests: ["data", "cloud computing", "architecture", "programming", "infrastructure"],
    learningPaths: [
      { title: "dbt Learn",                 description: "Data transformation best practices", url: "https://docs.getdbt.com/tutorials/building-a-dbt-project/intro-to-dbt", duration: "1 month" },
      { title: "AWS Data Engineering Path", description: "Cloud data services",               url: "https://aws.amazon.com/training",                                     duration: "4 months" },
    ],
    salaryRange: { min: 90000, max: 165000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["data", "cloud", "python", "infrastructure", "pipelines"],
  },
  {
    title: "DevOps Engineer",
    category: "Technology",
    description: "Automate and streamline software development and deployment. Bridge development and operations teams by building CI/CD pipelines, managing cloud infrastructure, and ensuring system reliability.",
    requiredSkills: ["docker", "kubernetes", "aws", "linux", "ci/cd", "python", "terraform"],
    relatedInterests: ["cloud computing", "automation", "infrastructure", "software engineering"],
    learningPaths: [
      { title: "Docker Mastery – Udemy",    description: "Container fundamentals",      url: "https://www.udemy.com",                  duration: "2 months" },
      { title: "Kubernetes Official Docs",  description: "Container orchestration",    url: "https://kubernetes.io/docs/tutorials",  duration: "3 months" },
    ],
    salaryRange: { min: 95000, max: 175000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["devops", "cloud", "docker", "automation", "ci/cd"],
  },
  {
    title: "Project Manager",
    category: "Business",
    description: "Lead cross-functional teams to deliver projects on time and within budget. Coordinate resources, manage risks, and ensure stakeholder alignment across complex initiatives.",
    requiredSkills: ["project management", "communication", "leadership", "risk management", "agile", "excel"],
    relatedInterests: ["leadership", "business", "organization", "teamwork", "strategy"],
    learningPaths: [
      { title: "PMP Certification Prep",  description: "Gold-standard project management cert", url: "https://www.pmi.org/certifications/project-management-pmp",  duration: "4–6 months" },
      { title: "Atlassian – Agile Guide", description: "Scrum & Kanban basics",               url: "https://www.atlassian.com/agile/guides/agile-project-management", duration: "2 weeks" },
    ],
    salaryRange: { min: 75000, max: 140000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["management", "leadership", "agile", "business"],
  },
  {
    title: "Machine Learning Engineer",
    category: "Technology",
    description: "Design, train, and deploy machine learning models at production scale. Bridge research and engineering to ship AI features in real-world products.",
    requiredSkills: ["python", "machine learning", "tensorflow", "pytorch", "docker", "aws", "statistics"],
    relatedInterests: ["artificial intelligence", "deep learning", "research", "data science"],
    learningPaths: [
      { title: "Fast.ai",          description: "Practical deep learning",        url: "https://fast.ai",                                    duration: "3 months" },
      { title: "MLOps Zoomcamp",   description: "End-to-end ML operations",      url: "https://github.com/DataTalks-EE/mlops-zoomcamp",   duration: "6 months" },
    ],
    salaryRange: { min: 120000, max: 200000, currency: "USD" },
    educationLevel: "Master's",
    tags: ["ml", "ai", "python", "deep learning", "production"],
  },
  {
    title: "Cloud Architect",
    category: "Technology",
    description: "Design and oversee a company's cloud computing strategy, including cloud adoption plans, application design, and cloud management and monitoring.",
    requiredSkills: ["aws", "azure", "docker", "kubernetes", "cloud computing", "python", "networking"],
    relatedInterests: ["cloud computing", "infrastructure", "security", "architecture"],
    learningPaths: [
      { title: "AWS Certified Solutions Architect", description: "AWS official certification", url: "https://aws.amazon.com/certification/", duration: "3-6 months" },
    ],
    salaryRange: { min: 110000, max: 190000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["cloud", "architecture", "aws", "infrastructure"],
  },
  {
    title: "Mobile App Developer",
    category: "Technology",
    description: "Create applications for mobile devices using native or cross-platform frameworks. Design intuitive interfaces and ensure high performance across different screen sizes.",
    requiredSkills: ["swift", "kotlin", "react native", "flutter", "javascript", "java"],
    relatedInterests: ["mobile technology", "software engineering", "design", "ui/ux"],
    learningPaths: [
      { title: "iOS App Dev Tutorials", description: "Apple official tutorials", url: "https://developer.apple.com/tutorials/app-dev-training", duration: "1-3 months" },
    ],
    salaryRange: { min: 80000, max: 150000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["mobile", "app", "ios", "android"],
  },
  {
    title: "Human Resources Manager",
    category: "Business",
    description: "Plan, direct, and coordinate the administrative functions of an organization. Oversee the recruiting, interviewing, and hiring of new staff.",
    requiredSkills: ["communication", "conflict resolution", "leadership", "hris", "recruiting", "performance management"],
    relatedInterests: ["people management", "business", "psychology", "organization"],
    learningPaths: [
      { title: "SHRM Certification", description: "Society for Human Resource Management cert", url: "https://www.shrm.org/", duration: "3-6 months" },
    ],
    salaryRange: { min: 65000, max: 130000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["hr", "management", "business", "people"],
  },
  {
    title: "Graphic Designer",
    category: "Design",
    description: "Create visual concepts to communicate ideas that inspire, inform, and captivate consumers. Develop overall layout and production design for advertisements, brochures, and corporate reports.",
    requiredSkills: ["adobe creative suite", "photoshop", "illustrator", "typography", "branding", "creativity"],
    relatedInterests: ["art", "design", "illustration", "visual communication"],
    learningPaths: [
      { title: "Coursera Graphic Design", description: "CalArts Graphic Design Specialization", url: "https://www.coursera.org/", duration: "6 months" },
    ],
    salaryRange: { min: 45000, max: 90000, currency: "USD" },
    educationLevel: "Associate",
    tags: ["design", "art", "creative", "branding"],
  },
  {
    title: "Product Manager",
    category: "Business",
    description: "Identify the customer need and the larger business objectives that a product or feature will fulfill, articulate what success looks like for a product, and rally a team to turn that vision into a reality.",
    requiredSkills: ["product strategy", "agile", "wireframing", "data analysis", "user research", "communication"],
    relatedInterests: ["leadership", "technology", "business", "design", "strategy"],
    learningPaths: [
      { title: "Product School", description: "Product Management Certifications", url: "https://productschool.com/", duration: "2 months" },
    ],
    salaryRange: { min: 95000, max: 160000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["product", "management", "business", "strategy"],
  },
  {
    title: "Systems Administrator",
    category: "Technology",
    description: "Configure, maintain, and ensure the reliable operation of computer systems, especially multi-user computers, such as servers.",
    requiredSkills: ["linux", "windows server", "networking", "troubleshooting", "bash", "powershell", "virtualization"],
    relatedInterests: ["networking", "infrastructure", "hardware", "troubleshooting"],
    learningPaths: [
      { title: "CompTIA Server+", description: "Server architecture certification", url: "https://www.comptia.org/", duration: "2 months" },
    ],
    salaryRange: { min: 60000, max: 100000, currency: "USD" },
    educationLevel: "Associate",
    tags: ["it", "sysadmin", "infrastructure", "servers"],
  },
  {
    title: "Mechanical Engineer",
    category: "Engineering",
    description: "Design, develop, build, and test mechanical and thermal sensors and devices, including tools, engines, and machines.",
    requiredSkills: ["cad", "solidworks", "thermodynamics", "mathematics", "problem solving", "autocad"],
    relatedInterests: ["engineering", "physics", "manufacturing", "design"],
    learningPaths: [
      { title: "MIT OpenCourseWare", description: "Free Mechanical Engineering Courses", url: "https://ocw.mit.edu/", duration: "Ongoing" },
    ],
    salaryRange: { min: 70000, max: 130000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["engineering", "mechanical", "design", "physics"],
  },
  {
    title: "Registered Nurse",
    category: "Healthcare",
    description: "Provide and coordinate patient care, educate patients and the public about various health conditions, and provide advice and emotional support to patients and their family members.",
    requiredSkills: ["patient care", "cpr", "compassion", "communication", "clinical skills", "critical thinking"],
    relatedInterests: ["medicine", "helping others", "health", "science"],
    learningPaths: [
      { title: "NCLEX-RN", description: "National Council Licensure Examination", url: "https://www.ncsbn.org/nclex.htm", duration: "1 month" },
    ],
    salaryRange: { min: 60000, max: 110000, currency: "USD" },
    educationLevel: "Associate",
    tags: ["healthcare", "nursing", "medical", "patient care"],
  },
  {
    title: "Data Analyst",
    category: "Technology",
    description: "Translate numbers and data into plain English in order to help organizations make better business decisions.",
    requiredSkills: ["sql", "excel", "tableau", "python", "data visualization", "statistics"],
    relatedInterests: ["data", "statistics", "business", "problem solving"],
    learningPaths: [
      { title: "Google Data Analytics", description: "Professional Certificate on Coursera", url: "https://www.coursera.org/", duration: "6 months" },
    ],
    salaryRange: { min: 60000, max: 100000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["data", "analysis", "statistics", "sql"],
  },
  {
    title: "Network Engineer",
    category: "Technology",
    description: "Design and implement computer and information networks, such as local area networks (LAN), wide area networks (WAN), intranets, extranets, and other data communications networks.",
    requiredSkills: ["cisco", "routing", "switching", "firewalls", "troubleshooting", "tcp/ip"],
    relatedInterests: ["networking", "infrastructure", "telecommunications", "security"],
    learningPaths: [
      { title: "Cisco CCNA", description: "Cisco Certified Network Associate", url: "https://www.cisco.com/", duration: "3-6 months" },
    ],
    salaryRange: { min: 75000, max: 125000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["networking", "infrastructure", "it", "cisco"],
  },
  {
    title: "Game Developer",
    category: "Technology",
    description: "Translate design ideas into playable games. Code the base engine of the game or implement mechanics and features.",
    requiredSkills: ["c#", "c++", "unity", "unreal engine", "3d math", "game design"],
    relatedInterests: ["gaming", "programming", "creativity", "art", "storytelling"],
    learningPaths: [
      { title: "Unity Learn", description: "Official Unity tutorials", url: "https://learn.unity.com/", duration: "Ongoing" },
    ],
    salaryRange: { min: 65000, max: 130000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["gaming", "development", "unity", "c#"],
  },
  {
    title: "Content Writer",
    category: "Marketing",
    description: "Produce engaging, well-researched content for publication online and in print. Work includes articles, blog posts, product descriptions, and promotional literature.",
    requiredSkills: ["writing", "seo", "editing", "research", "creativity", "time management"],
    relatedInterests: ["writing", "reading", "marketing", "storytelling", "journalism"],
    learningPaths: [
      { title: "HubSpot Content Marketing", description: "Free certification course", url: "https://academy.hubspot.com/", duration: "1 week" },
    ],
    salaryRange: { min: 45000, max: 80000, currency: "USD" },
    educationLevel: "Bachelor's",
    tags: ["writing", "marketing", "content", "creative"],
  },
];
/* ═══════════════════════════════════════════════════════════ */

(async () => {
  try {
    console.log("\n[Seed] Connecting to MongoDB…");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[Seed] ✓ Connected\n");

    await Career.deleteMany();
    console.log("[Seed] ✓ Cleared Career collection");

    await Career.insertMany(CAREERS);
    console.log(`[Seed] ✓ Inserted ${CAREERS.length} careers\n`);

    await mongoose.disconnect();
    console.log("[Seed] Done ✓\n");
  } catch (err) {
    console.error("[Seed] ❌ Error:", err.message);
    process.exit(1);
  }
})();
