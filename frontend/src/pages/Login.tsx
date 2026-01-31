import { useState, type JSX } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import { saveToken } from "../auth/auth";

interface LoginResponse {
  token: string;
  redirect: string;
}

export default function Login(): JSX.Element {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const submit = async (): Promise<void> => {
    try {
      const res = await api.post<LoginResponse>("/auth/login", {
        identifier,
        password,
      });

      saveToken(res.data.token);
      navigate(res.data.redirect);
    } catch (err: any) {
      console.error("Login error:", err.response?.data);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-zinc-950 text-white overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Animated Background Grid & Glows */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-zinc-950 to-purple-900/20 pointer-events-none"></div>

      {/* Moving blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px]"
      />

      {/* Main Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        {/* Decorative HUD Elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 border-t-4 border-r-4 border-purple-500 rounded-tr-xl opacity-50"></div>
        <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b-4 border-l-4 border-indigo-500 rounded-bl-xl opacity-50"></div>

        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl shadow-2xl shadow-purple-500/10">
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Welcome Back
            </h2>
            <p className="text-zinc-500 text-sm font-medium tracking-widest mt-2 uppercase">
              Resume Session
            </p>
          </motion.div>

          <div className="space-y-5">
            <motion.div variants={itemVariants} className="group">
              <label className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1 block group-focus-within:text-purple-300 transition-colors">
                Identity
              </label>
              <div className="relative">
                <input
                  className="w-full bg-zinc-950/50 border border-zinc-700 text-zinc-100 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono placeholder:text-zinc-700"
                  placeholder="EMAIL / GAMERTAG"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
                {/* Tech corner accent */}
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-purple-500/50 clip-path-polygon-[100%_100%,0%_100%,100%_0%]"></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <label className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1 block group-focus-within:text-purple-300 transition-colors">
                Passcode
              </label>
              <input
                type="password"
                className="w-full bg-zinc-950/50 border border-zinc-700 text-zinc-100 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono placeholder:text-zinc-700"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={submit}
              className="w-full relative mt-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black uppercase tracking-widest rounded-lg overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Log In <span className="text-lg">➔</span>
              </span>
              {/* Shine effect */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </motion.button>
          </div>

          <motion.div variants={itemVariants} className="mt-8 text-center">
            <p className="text-zinc-500 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-purple-400 hover:text-purple-300 font-bold uppercase tracking-wide hover:underline decoration-2 underline-offset-4 transition-all"
              >
                Register
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* CSS for custom shine animation */}
      <style>{`
        @keyframes shine {
          100% {
            left: 125%;
          }
        }
        .animate-shine {
          animation: shine 1s;
        }
      `}</style>
    </div>
  );
}
