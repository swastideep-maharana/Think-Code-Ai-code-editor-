"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { useAuth } from "@/context/AuthContext";
import { logOut } from "@/lib/authHelpers";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: "💡",
    title: "AI Code Suggestions",
    description:
      "Get intelligent code completions and suggestions powered by AI to enhance your productivity.",
    tooltip:
      "Our AI understands your context and suggests relevant code snippets and completions instantly.",
  },
  {
    icon: "🛠️",
    title: "Real-time Collaboration",
    description:
      "Collaborate with your team in real-time, sharing code and ideas seamlessly within the editor.",
    tooltip:
      "Work with teammates on the same codebase at the same time, no more merge conflicts!",
  },
  {
    icon: "📈",
    title: "Performance Analytics",
    description:
      "Monitor your coding performance and progress with integrated analytics and insights.",
    tooltip:
      "Track your coding habits and improvements with detailed dashboards and reports.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const iconVariants = {
  hover: {
    scale: 1.3,
    rotate: [0, 10, -10, 10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "loop" as "loop",
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const subheadingVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
  },
};

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const lottieContainerVariants = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );

  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };

  const handleGetStarted = () => {
    router.push("/editor");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white flex flex-col items-center justify-center px-6 py-12 overflow-hidden"
      >
        {/* Floating blurred background blob */}
        <motion.div
          className="absolute top-[-200px] left-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-blue-600 to-purple-700 opacity-30 filter blur-3xl -translate-x-1/2 pointer-events-none select-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />

        <motion.div className="relative max-w-5xl text-center z-10">
          {/* Animated Heading */}
          <motion.h1
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl font-extrabold mb-4 tracking-tight"
          >
            Welcome to <span className="text-blue-400">DevPilot</span>
          </motion.h1>

          {/* Animated Subheading */}
          <motion.p
            variants={subheadingVariants}
            initial="hidden"
            animate="visible"
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            A modern AI-powered code assistant that helps you write, refactor,
            and generate code with ease. Work side-by-side with AI inside your
            developer dashboard.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12"
          >
            {features.map(({ icon, title, description, tooltip }, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
                }}
                className="group relative bg-gradient-to-tr from-gray-800 to-gray-900 rounded-xl p-7 shadow-lg cursor-pointer select-none"
                tabIndex={0}
                aria-describedby={`feature-tooltip-${i}`}
              >
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="text-5xl mb-5"
                  aria-label={title + " icon"}
                >
                  {icon}
                </motion.div>
                <h3 className="text-2xl font-semibold mb-3">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{description}</p>

                {/* Tooltip */}
                <div
                  id={`feature-tooltip-${i}`}
                  role="tooltip"
                  className="absolute left-1/2 bottom-full mb-3 w-64 px-4 py-2 rounded-md bg-black bg-opacity-80 text-sm text-gray-200 opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 -translate-x-1/2"
                >
                  {tooltip}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Lottie Animation with bobbing */}
          <motion.div
            variants={lottieContainerVariants}
            animate="animate"
            className="flex justify-center mb-12"
            aria-label="Coding animation"
          >
            <Player
              autoplay
              loop
              src="https://assets9.lottiefiles.com/packages/lf20_jcikwtux.json"
              style={{ height: 320, width: 320 }}
            />
          </motion.div>

          {/* Buttons with pulsing animations */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              animate={{
                boxShadow: [
                  "0 0 10px #3b82f6",
                  "0 0 20px #3b82f6",
                  "0 0 10px #3b82f6",
                ],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Button
                onClick={handleGetStarted}
                className="px-8 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 active:scale-95 transition-transform"
              >
                🚀 Get Started
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              animate={{
                boxShadow: [
                  "0 0 10px #ef4444",
                  "0 0 20px #ef4444",
                  "0 0 10px #ef4444",
                ],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Button
                variant="outline"
                onClick={handleLogout}
                className="px-8 py-4 text-lg font-semibold border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500 active:scale-95 transition-colors"
              >
                🔒 Logout
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
