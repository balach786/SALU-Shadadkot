export type Program = {
  slug: string;
  name: string;
  level: "Undergraduate" | "Postgraduate";
  duration: string;
  eligibility: string;
  fee: string;
  description: string;
  curriculum: string[];
  careers: string[];
};

export const PROGRAMS: Program[] = [
  {
    slug: "bs-computer-science",
    name: "BS Computer Science",
    level: "Undergraduate",
    duration: "4 Years (8 Semesters)",
    eligibility: "Intermediate (Pre-Engineering / ICS) with min. 50% marks",
    fee: "PKR 35,000 / semester",
    description:
      "A rigorous program covering software engineering, AI, data science, networks, and modern web development — preparing graduates for the global tech industry.",
    curriculum: [
      "Programming Fundamentals", "Data Structures & Algorithms", "Database Systems",
      "Operating Systems", "Web Engineering", "Artificial Intelligence",
      "Machine Learning", "Computer Networks", "Software Engineering", "Final Year Project",
    ],
    careers: ["Software Engineer", "Data Analyst", "AI/ML Engineer", "DevOps Engineer", "Full-Stack Developer"],
  },
  {
    slug: "bba",
    name: "BBA — Bachelor of Business Administration",
    level: "Undergraduate",
    duration: "4 Years (8 Semesters)",
    eligibility: "Intermediate (any group) with min. 45% marks",
    fee: "PKR 30,000 / semester",
    description:
      "Develops future business leaders with strong foundations in management, marketing, finance, HR and entrepreneurship.",
    curriculum: [
      "Principles of Management", "Microeconomics", "Financial Accounting",
      "Marketing Management", "Business Law", "Human Resource Management",
      "Strategic Management", "Entrepreneurship", "Business Research", "Internship",
    ],
    careers: ["Management Trainee", "Marketing Officer", "HR Executive", "Financial Analyst", "Entrepreneur"],
  },
  {
    slug: "bs-english",
    name: "BS English (Literature & Linguistics)",
    level: "Undergraduate",
    duration: "4 Years (8 Semesters)",
    eligibility: "Intermediate with English as a subject, min. 45% marks",
    fee: "PKR 25,000 / semester",
    description:
      "Combines classical and modern literature with applied linguistics, producing teachers, writers, researchers and communication professionals.",
    curriculum: [
      "Classical Literature", "Modern Poetry", "Linguistics", "Phonetics & Phonology",
      "Pakistani Literature in English", "Literary Criticism", "ELT Methodology",
      "Discourse Analysis", "Research Methods", "Thesis",
    ],
    careers: ["Lecturer / Teacher", "Content Writer", "Editor", "Translator", "Civil Services"],
  },
  {
    slug: "mcs",
    name: "MCS — Master of Computer Science",
    level: "Postgraduate",
    duration: "2 Years (4 Semesters)",
    eligibility: "BSc / BS (16 years) with min. 50% marks",
    fee: "PKR 40,000 / semester",
    description:
      "Advanced computer science specialization with focus on research, applied AI, distributed systems and modern software practices.",
    curriculum: [
      "Advanced Algorithms", "Distributed Systems", "Advanced DB Systems",
      "Cloud Computing", "Deep Learning", "Information Security",
      "Research Methodology", "Thesis / Project",
    ],
    careers: ["Senior Software Engineer", "Research Associate", "Systems Architect", "University Lecturer"],
  },
  {
    slug: "mba",
    name: "MBA — Master of Business Administration",
    level: "Postgraduate",
    duration: "2 Years (4 Semesters) / 1.5 Years for BBA holders",
    eligibility: "16 years of education with min. 50% marks",
    fee: "PKR 45,000 / semester",
    description:
      "Executive-style MBA emphasizing strategic management, leadership, and applied case work for managerial roles across sectors.",
    curriculum: [
      "Managerial Economics", "Corporate Finance", "Strategic Marketing",
      "Organizational Behavior", "Operations Management", "Business Analytics",
      "Leadership", "Capstone Project",
    ],
    careers: ["Manager", "Consultant", "Project Lead", "Banker", "Entrepreneur"],
  },
];

export type NewsItem = {
  title: string;
  date: string;
  description: string;
  category: "Announcement" | "Event" | "Academic";
};

export const NEWS: NewsItem[] = [
  {
    title: "Admissions Open for Fall 2026",
    date: "2026-06-15",
    description:
      "Applications are now being accepted for all undergraduate and postgraduate programs. Apply online through our smart admission portal.",
    category: "Announcement",
  },
  {
    title: "Annual Convocation 2026 Scheduled",
    date: "2026-07-10",
    description:
      "The university will hold its annual convocation on August 20, 2026. All graduating students are requested to register before July 30.",
    category: "Event",
  },
  {
    title: "New Computer Lab Inaugurated",
    date: "2026-05-28",
    description:
      "A state-of-the-art AI & Data Science lab with 60 workstations was inaugurated by the Vice Chancellor.",
    category: "Academic",
  },
  {
    title: "Scholarship Program for Need-Based Students",
    date: "2026-05-12",
    description:
      "100 fully-funded scholarships available for talented students from Kambar Shahdadkot district. Apply with admission form.",
    category: "Announcement",
  },
  {
    title: "Research Symposium on Sindh Studies",
    date: "2026-04-22",
    description:
      "International scholars to present papers on the cultural heritage and contemporary issues of Sindh.",
    category: "Event",
  },
  {
    title: "MoU Signed with HEC for Faculty Development",
    date: "2026-04-05",
    description:
      "The campus has signed a Memorandum of Understanding with HEC to enhance faculty research capabilities.",
    category: "Announcement",
  },
];

export const FAQS = [
  {
    q: "When does the admission cycle open?",
    a: "Admissions for the Fall semester open in June each year, with the Spring intake opening in December.",
  },
  {
    q: "Can I edit my application after submission?",
    a: "Applications cannot be edited after submission. Please contact the admissions office for any corrections.",
  },
  {
    q: "What documents are required during admission?",
    a: "Matric and Intermediate transcripts, CNIC/B-Form, recent photographs, character certificate, and the fee payment receipt.",
  },
  {
    q: "Is there a hostel facility?",
    a: "Yes, separate hostels are available for male and female students on a first-come, first-served basis.",
  },
  {
    q: "How can I track my application status?",
    a: "Use the 'Find My Application' page and enter your CNIC to view the current status of your admission.",
  },
];
