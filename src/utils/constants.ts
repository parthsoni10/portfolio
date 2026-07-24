export const PORTFOLIO_DATA = {
  name: "Parth Soni",
  title: "Full Stack Developer | AIML Enthusiast",
  about: "Developer and MCA candidate (GLS University) with hands-on experience building production-grade web applications using the MERN stack and Django, plus applied machine learning projects covering data analysis, model training, and deployment. Proven track record delivering end-to-end features — responsive UI, RESTful API architecture, database modelling, AI integrations, and cloud deployments. Achieved 2nd Rank at CYBER SHADEZ 2026 National TechFest. Seeking internship or entry-level roles in Frontend, Backend, Full Stack, or Machine Learning development.",
  projects: [
    {
      id: "wanderlust",
      title: "WanderLust",
      subtitle: "AI-Powered Full-Stack Accommodation Platform",
      description: "Engineered a full-stack Airbnb-inspired platform with role-based dashboards (Guest, Host, Admin). Integrated Google Gemini AI for chatbot concierge, AI-generated descriptions, and sentiment scoring. Implemented Razorpay payments with HMAC SHA-256 verification, Redis caching with self-healing MongoDB fallback, Mapbox geolocation, and Cloudinary image delivery.",
      highlights: [
        "Role-based dashboards (Guest, Host, Admin) for listing management, bookings & revenue analytics",
        "Google Gemini AI chatbot concierge, AI-generated descriptions, review sentiment scoring & smart search",
        "Razorpay payment gateway with HMAC SHA-256 signature verification & automated invoicing",
        "Redis (ioredis) caching layer with self-healing MongoDB fallback & automatic cache invalidation",
        "Mapbox interactive geolocation & Cloudinary optimised image storage"
      ],
      tech: ["Node.js", "Express", "MongoDB", "Redis", "Gemini AI", "Razorpay", "Mapbox", "Cloudinary"],
      link: "https://github.com/parthsoni10/WanderLust",
      color: "#00f0ff"
    },
    {
      id: "mental-health-signal",
      title: "Mental Health Signal",
      subtitle: "ML-Powered Student Wellness Analytics",
      description: "Built a full-stack ML web app predicting student mental health scores (0–10) from daily habits, screen time, sleep, and stress levels. Trained a scikit-learn regression pipeline with EDA and feature engineering. Served predictions via FastAPI with Pydantic validation. Designed a responsive frontend with animated SVG gauge and dual-layer validation.",
      highlights: [
        "Predicts student mental health score (0–10) from daily habits, screen time, sleep & stress levels",
        "scikit-learn regression pipeline with EDA, feature engineering & country grouping",
        "FastAPI REST backend with Pydantic request validation",
        "Responsive frontend with animated SVG gauge & dual-layer client + server validation",
        "Graceful error handling across idle, loading, result & error UI states"
      ],
      tech: ["Python", "FastAPI", "scikit-learn", "pandas", "Pydantic", "JavaScript", "HTML/CSS"],
      link: "https://github.com/parthsoni10/Mental-Health-Score",
      color: "#b026ff"
    },
    {
      id: "shareplug",
      title: "SharePlug",
      subtitle: "EV Charging Station Finder & Booking Platform",
      description: "Engineered a full-stack EV charging platform serving 3 roles (Owner, Operator, Admin) with role-based access control. Built geolocation-based station discovery with Leaflet.js and Nominatim API, real-time marker clustering, and a complete booking engine with slot availability tracking. Deployed to production on Render.",
      highlights: [
        "3-role system (Owner, Operator, Admin) with role-based access control & custom permissions",
        "Geolocation-based station discovery with Leaflet.js & Nominatim API",
        "Real-time marker clustering & complete booking engine with slot availability tracking",
        "Deployed on Render with PostgreSQL, Gunicorn WSGI & Whitenoise for static files"
      ],
      tech: ["Django", "Python", "PostgreSQL", "Leaflet.js", "Geopy", "REST APIs", "Gunicorn"],
      link: "https://github.com/parthsoni10/SharePlug",
      liveLink: "https://shareplug.onrender.com",
      color: "#00ff88"
    }
  ],
  education: [
    {
      degree: "Master of Computer Application (MCA)",
      institution: "GLS University",
      period: "2025 – 2027",
      details: []
    },
    {
      degree: "Bachelor of Computer Application (BCA)",
      institution: "Gujarat University",
      period: "2022 – 2025",
      details: ["CGPA: 8.2/10", "17th Rank among 3000+ students (Sem-1)"]
    },
    {
      degree: "Higher Secondary (Gujarat Board)",
      institution: "Vijaynagar High School",
      period: "2022",
      details: ["Percentile: 97.05"]
    }
  ],
  awards: [
    {
      title: "2nd Rank – CYBER SHADEZ 2026 National TechFest",
      issuer: "GLS University",
      description: "Competitive programming & tech challenge"
    },
    {
      title: "17th Rank among 3000+ students in BCA SEM-1",
      issuer: "Gujarat University",
      description: "Demonstrating strong academic foundation"
    },
    {
      title: "97.05 Percentile in Higher Secondary",
      issuer: "Gujarat Board",
      description: "Demonstrating strong academic foundation"
    }
  ],
  skills: [
    // Languages
    "JavaScript", "Python", "C", "C++",
    // Frontend
    "React.js", "HTML5", "CSS3", "EJS",
    // Backend
    "Node.js", "Express.js", "Django", "FastAPI", "REST APIs", "MVC Architecture",
    // Databases
    "MongoDB", "MySQL", "PostgreSQL",
    // Auth & Security
    "Passport.js", "JWT", "Session Management", "OAuth",
    // Tools & Platforms
    "Git", "GitHub", "VS Code", "Jupyter Notebook", "Cloudinary", "Redis", "Razorpay", "Mapbox",
    // ML & Data
    "scikit-learn", "pandas", "NumPy",
    // Core CS
    "Data Structures", "DBMS", "OOP", "Cloud Computing"
  ],
  socials: {
    github: "https://github.com/parthsoni10",
    linkedin: "https://www.linkedin.com/in/parth-soni-2b8172376",
    email: "mailto:parthsoni1015@gmail.com",
    phone: "tel:+919974144294"
  }
};
