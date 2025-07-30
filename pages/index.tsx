import React, {
  useState,
  useEffect,
  ReactNode,
  ChangeEvent,
  FormEvent,
} from "react";
import { motion, useAnimation, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Briefcase,
  Cpu,
  Users,
  Send,
  Linkedin,
  Mail,
  Menu,
  X,
  CheckCircle,
  ArrowRight,
  Twitter,
} from "lucide-react";

// --- Reusable Animated Component ---
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Service Card Component ---
interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  tech: string;
}
const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  tech,
}) => (
  <motion.div
    className="bg-white/50 backdrop-blur-lg p-8 rounded-xl border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-2"
    whileHover={{ scale: 1.03 }}
  >
    <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-6 border border-gray-200">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
    <p className="text-gray-600 mb-5 leading-relaxed">{description}</p>
    <p className="text-sm text-gray-500 font-medium">
      <span className="font-semibold text-gray-600">Core Stack:</span> {tech}
    </p>
  </motion.div>
);

// --- Team Member Card ---
interface TeamMemberCardProps {
  name: string;
  role?: string;
  imgSrc: string;
}
const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  imgSrc,
}) => (
  <motion.div
    className="text-center group"
    variants={{
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    }}
  >
    <div className="relative inline-block">
      <img
        src={imgSrc}
        alt={name}
        className="w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto object-cover bg-gray-200 border-4 border-white shadow-lg transition-transform duration-400 group-hover:scale-110"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = `https://placehold.co/128x128/e0e0e0/4a4a4a?text=${name
            .split(" ")
            .map((n) => n[0])
            .join("")}`;
        }}
      />
    </div>
    <h4 className="mt-5 text-lg font-semibold text-gray-800">{name}</h4>
    {role && <p className="text-gray-500">{role}</p>}
  </motion.div>
);

// --- Navbar Component ---
interface NavbarProps {
  scrollToSection: (id: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Navbar: React.FC<NavbarProps> = ({
  scrollToSection,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", title: "About" },
    { id: "services", title: "Services" },
    { id: "product", title: "Product" },
    { id: "team", title: "Team" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a
              href="#"
              onClick={() => scrollToSection("hero")}
              className="flex items-center space-x-2.5"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-900"
              >
                <path
                  d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 7L12 12L22 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12V22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-2xl font-bold text-gray-900 tracking-wide">
                Agami
              </span>
            </a>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300"
              >
                {link.title}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-t border-gray-200 shadow-lg"
        >
          <nav className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className="block px-4 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {link.title}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="block w-full text-center bg-gray-800 text-white mt-4 mx-auto px-4 py-3 rounded-lg text-base font-semibold hover:bg-gray-900 transition-colors"
            >
              Contact Us
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

// --- Hero Section ---
interface HeroProps {
  scrollToSection: (id: string) => void;
}
const Hero: React.FC<HeroProps> = ({ scrollToSection }) => (
  <section
    id="hero"
    className="relative h-screen flex items-center justify-center text-center bg-white overflow-hidden"
  >
    {/* Animated Colorful Floating Shapes */}
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.7, x: -100, y: -80 }}
      animate={{ opacity: 0.25, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 2, ease: 'easeOut' }}
      className="pointer-events-none absolute top-[-8%] left-[-8%] w-[28vw] h-[28vw] rounded-full bg-gradient-to-tr from-sky-400 via-fuchsia-300 to-white blur-2xl z-0"
    />
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.7, x: 100, y: 80 }}
      animate={{ opacity: 0.18, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 2.5, delay: 0.3, ease: 'easeOut' }}
      className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-[32vw] h-[32vw] rounded-full bg-gradient-to-tl from-indigo-300 via-sky-200 to-white blur-2xl z-0"
    />
    {/* Animated Sparkles/Confetti */}
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
      animate={{ opacity: 0.28, scale: 1, rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-yellow-300 via-pink-300 to-sky-200 rounded-full blur-xl mix-blend-lighten animate-spin-slow z-0"
      style={{ filter: 'blur(20px)' }}
    />
    {/* Animated Background Grid */}
    <motion.div
      aria-hidden
      initial={{ opacity: 0.8, scale: 1 }}
      animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.04, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute inset-0 bg-grid-gray-100 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] z-0"
    />
    <div className="relative z-10 container mx-auto px-4">
      <div className="flex flex-col items-center mb-6 select-none">
  <div className="flex items-center space-x-2">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-900">
      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 12V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
    <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Agami</span>
  </div>
  <span className="mt-1 text-base sm:text-lg text-gray-600 font-medium tracking-wide">Your Trusted AI Companion</span>
</div>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-xl sm:text-2xl max-w-2xl mx-auto text-gray-700 mb-10"
      >
        We build high-performance applications and intelligent systems to accelerate business growth.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12 flex justify-center"
      >
        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
          whileHover={{ scale: 1.08, boxShadow: "0 0 24px 6px #0ea5e9" }}
          className="inline-flex items-center bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 text-white font-semibold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-indigo-400/80 transform transition-all duration-300 text-lg ring-2 ring-sky-400/40 ring-offset-2 ring-offset-white animate-glow"
          style={{ boxShadow: '0 4px 24px 0 rgba(14,165,233,0.18)' }}
        >
          Let’s Build Together
          <ArrowRight className="ml-2 h-5 w-5 text-white" />
        </motion.a>
      </motion.div>
    </div>
  </section>
);
// --- About Section ---
const About: React.FC = () => (
  <section id="about" className="py-24 lg:py-32 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Engineering the Future of Business
        </h2>
        <p className="mt-6 text-xl text-gray-600 leading-relaxed">
          Agami was born from a collective ambition among driven computer
          science students to bridge the chasm between legacy enterprise systems
          and the transformative power of modern AI. We are architects of
          innovation, committed to delivering solutions that are not just
          technologically superior, but strategically vital.
        </p>
      </AnimatedSection>
      <AnimatedSection className="mt-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6">
            <h4 className="text-2xl font-semibold mb-3 text-gray-800">
              Innovation
            </h4>
            <p className="text-gray-600">
              A relentless pursuit of novel ideas and technologies to create
              tangible, lasting value.
            </p>
          </div>
          <div className="p-6 border-x border-gray-200">
            <h4 className="text-2xl font-semibold mb-3 text-gray-800">
              Partnership
            </h4>
            <p className="text-gray-600">
              Building enduring relationships by acting as an extension of your
              team to achieve shared success.
            </p>
          </div>
          <div className="p-6">
            <h4 className="text-2xl font-semibold mb-3 text-gray-800">
              Excellence
            </h4>
            <p className="text-gray-600">
              Upholding the highest standards in code quality, project
              execution, and strategic thinking.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

// --- Services Section ---
const Services: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: 'spring', stiffness: 60 } },
  };
  const cards = [
    {
      icon: <Briefcase size={32} className="text-sky-500 drop-shadow-md" />,
      title: "Enterprise Java Engineering",
      description: "Expertise in scalable, robust Java solutions for mission-critical business needs, from backend APIs to distributed systems.",
      tech: "Java, Spring Boot, Kafka, Docker, AWS",
      border: "border-sky-400",
      bg: "bg-gradient-to-tr from-sky-50 via-white to-indigo-50",
    },
    {
      icon: <Cpu size={32} className="text-fuchsia-500 drop-shadow-md" />,
      title: "AI/ML & Data Science",
      description: "Building intelligent systems with state-of-the-art AI/ML, NLP, and data pipelines for actionable insights and automation.",
      tech: "Python, TensorFlow, PyTorch, LangChain, Vector Databases",
      border: "border-fuchsia-400",
      bg: "bg-gradient-to-tr from-fuchsia-50 via-white to-sky-50",
    },
    {
      icon: <Users size={32} className="text-amber-500 drop-shadow-md" />,
      title: "Strategic Tech Partnership",
      description: "Serving as your dedicated technical advisors, from product strategy and MVP development to scaling your infrastructure for future growth.",
      tech: "Agile Methodologies, CI/CD, DevOps, Product Roadmapping",
      border: "border-amber-400",
      bg: "bg-gradient-to-tr from-amber-50 via-white to-fuchsia-50",
    },
  ];
  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <AnimatedSection className="text-center mb-20">
        <h2 className="text-4xl font-bold tracking-tight text-gradient sm:text-5xl drop-shadow-md">
          Our Core Capabilities
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          We deliver end-to-end, enterprise-grade solutions tailored to your
          strategic goals.
        </p>
      </AnimatedSection>
      <motion.div
        className="grid gap-10 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.title}
            variants={cardVariants}
            className={`glass ${card.bg} border-2 ${card.border} p-10 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group relative overflow-hidden`}
            style={{ minHeight: 340 }}
          >
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-white/80 to-sky-100 blur-2xl opacity-60 group-hover:opacity-80 transition" />
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md mb-7 border-2 border-white">
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 drop-shadow-sm">
              {card.title}
            </h3>
            <p className="text-gray-700 mb-5 leading-relaxed">
              {card.description}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              <span className="font-semibold text-gray-600">Core Stack:</span> {card.tech}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// --- Product Preview Section ---
const ProductPreview: React.FC<HeroProps> = ({ scrollToSection }) => (
  <section id="product" className="py-24 lg:py-32 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <AnimatedSection className="text-center lg:text-left">
          <p className="text-base font-bold uppercase tracking-wider text-gray-500">
            Coming Soon
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Introducing Agami AI
          </h2>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed">
            The intelligent analyst for your website. Agami AI audits your
            digital presence and delivers a prioritized roadmap for SEO, content
            strategy, and performance optimization. Stop guessing, start
            growing.
          </p>
          <div className="mt-10">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="text-lg text-gray-800 font-semibold hover:text-black transition-colors group"
            >
              Request Early Access{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl blur-lg opacity-50"></div>
            <img
              src="https://placehold.co/600x400/f3f4f6/cbd5e1?text=Agami+AI+Dashboard"
              alt="Agami AI Product Preview"
              className="relative rounded-xl shadow-2xl border border-gray-200/50"
            />
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

// --- Team Section ---
const Team: React.FC = () => {
  const teamMembers = [
    { name: "Nafish Imtiaz Imti" },
    { name: "Md Talim Afrid Tomal" },
    { name: "Md Morsalin" },
    { name: "Md Redowan" },
    { name: "Marjan Haque" },
    { name: "Washiul Alam" },
    { name: "Md Aminur Rahman Joy" },
    { name: "Md Tareque Jamil Josh" },
    { name: "Pranto Shaha" },
    { name: "Protik Das Utso" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="team" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            The Minds Behind Agami
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            A collective of dedicated engineers, thinkers, and innovators.
          </p>
        </AnimatedSection>

        {/* Patrons Section */}
        <AnimatedSection className="mb-20">
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-10">
            <div className="text-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                Chief Patron
              </h3>
              <TeamMemberCard
                name="Prof Dr Syed Akter Hossain"
                role="Chief Patron"
                imgSrc="https://placehold.co/128x128/e0e0e0/4a4a4a?text=SAH"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                Patron
              </h3>
              <TeamMemberCard
                name="Naymul Islam Nayeem"
                role="Patron"
                imgSrc="https://placehold.co/128x128/e0e0e0/4a4a4a?text=NIN"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Core Team Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12"
        >
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} name={member.name} imgSrc="" />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- Contact Section ---
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would handle form submission (e.g., send to API)
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Let's Create Together
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Have a project in mind or want to learn more? We'd love to
              connect.
            </p>
          </div>
          {submitted ? (
            <div className="mt-12 text-center bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <h3 className="mt-5 text-2xl font-semibold">Thank You!</h3>
              <p className="mt-2 text-lg">
                Your message has been sent. We'll be in touch shortly.
              </p>
            </div>
          ) : (
            <div className="mt-12 bg-white p-8 sm:p-10 rounded-xl border border-gray-200 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    How can we help?
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Send Inquiry
                  </button>
                </div>
              </form>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

// --- Footer Component ---
const Footer: React.FC = () => (
  <footer className="bg-white border-t border-gray-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-500"
          >
            <path
              d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M2 7L12 12L22 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M12 12V22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-lg font-semibold text-gray-600">Agami</span>
        </div>
        <p className="text-gray-500 mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} Agami. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="mailto:hello@agami.io"
            className="text-gray-500 hover:text-gray-800"
          >
            <Mail size={20} />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-800">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-800">
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Global Styles ---
const GlobalStyles: React.FC = () => (
  <style jsx global>{`
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
    html {
      scroll-behavior: smooth;
    }
    body {
      font-family: "Inter", sans-serif;
    }
    .bg-grid-gray-100 {
      background-image:
        linear-gradient(to right, #e5e7eb 1px, transparent 1px),
        linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
      background-size: 60px 60px;
    }
  `}</style>
);

// --- Main App Wrapper ---
const MainApp: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <GlobalStyles />
      <div className="relative bg-white text-gray-900 font-sans antialiased min-h-screen overflow-x-hidden">
  {/* Animated Background Gradient Blobs */}
  <motion.div
    aria-hidden
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 0.2, scale: 1 }}
    transition={{ duration: 1.8, ease: 'easeOut' }}
    className="pointer-events-none fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-sky-200 via-indigo-100 to-white blur-2xl z-0"
  />
  <motion.div
    aria-hidden
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 0.18, scale: 1 }}
    transition={{ duration: 2.5, delay: 0.3, ease: 'easeOut' }}
    className="pointer-events-none fixed bottom-[-12%] right-[-12%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tl from-indigo-100 via-sky-100 to-white blur-2xl z-0"
  />
        <Navbar
          scrollToSection={scrollToSection}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <main className="relative z-10">
  <section className="relative">
    <Hero scrollToSection={scrollToSection} />
  </section>
  <section className="container mx-auto px-4 sm:px-6 lg:px-8">
    <About />
    <AnimatedSection className="my-24 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-5xl sm:text-7xl font-extrabold mb-8 text-gradient drop-shadow-lg"
      >
        Elite <span className="text-gradient">Java & AI</span> Solutions
      </motion.h2>
    </AnimatedSection>
    <Services />
    <ProductPreview scrollToSection={scrollToSection} />
    <Team />
    <Contact />
  </section>
</main>
        <Footer />
      </div>
    </>
  );
};

export default MainApp;
