"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import ProtectedRoute from "@/components/protectedRoute";
import { logOut } from "@/lib/authHelpers";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };

  const handleGetStarted = () => {
    router.push("/editor");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to <span className="text-blue-500">DevPilot</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            A modern AI-powered code assistant that helps you write, refactor,
            and generate code with ease. Work side-by-side with AI inside your
            developer dashboard.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-2">
                AI Code Suggestions
              </h3>
              <p className="text-gray-400">
                Get intelligent code completions and suggestions powered by AI
                to enhance your productivity.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="text-3xl mb-4">🛠️</div>
              <h3 className="text-xl font-semibold mb-2">
                Real-time Collaboration
              </h3>
              <p className="text-gray-400">
                Collaborate with your team in real-time, sharing code and ideas
                seamlessly within the editor.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">
                Performance Analytics
              </h3>
              <p className="text-gray-400">
                Monitor your coding performance and progress with integrated
                analytics and insights.
              </p>
            </motion.div>
          </div>

          {/* Lottie Animation */}
          <div className="mb-8">
            <Player
              autoplay
              loop
              src="https://assets9.lottiefiles.com/packages/lf20_jcikwtux.json"
              style={{ height: "300px", width: "300px" }}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button onClick={handleGetStarted} className="px-6 py-3 text-lg">
                🚀 Get Started
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="px-6 py-3 text-lg border-black text-black"
              >
                🔒 Logout
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
