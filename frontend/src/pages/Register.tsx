import { useState, type JSX } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import { saveToken } from "../auth/auth";

interface RegisterResponse {
  token: string;
  redirect: string;
}

export default function Register(): JSX.Element {
  const [gamertag, setGamertag] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const submit = async (): Promise<void> => {
    try {
      const res = await api.post<RegisterResponse>("/auth/register", {
        gamertag,
        email,
        password,
      });

      saveToken(res.data.token);
      navigate(res.data.redirect);
    } catch (err: any) {
      console.error("Register error:", err.response?.data);
    }
  };

  // Animation variants
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
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]"
      />

      {/* Main Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        {/* Decorative HUD Elements around the card */}
        <div className="absolute -top-6 -left-6 w-12 h-12 border-t-4 border-l-4 border-indigo-500 rounded-tl-xl opacity-50"></div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-4 border-r-4 border-purple-500 rounded-br-xl opacity-50"></div>

        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl shadow-2xl shadow-indigo-500/10">
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Join the Roster
            </h2>
            <p className="text-zinc-500 text-sm font-medium tracking-widest mt-2 uppercase">
              Initialize Profile
            </p>
          </motion.div>

          <div className="space-y-5">
            <motion.div variants={itemVariants} className="group">
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 block group-focus-within:text-indigo-300 transition-colors">
                Gamertag
              </label>
              <div className="relative">
                <input
                  className="w-full bg-zinc-950/50 border border-zinc-700 text-zinc-100 px-4 py-3 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono placeholder:text-zinc-700"
                  placeholder="ENTER_ID"
                  value={gamertag}
                  onChange={(e) => setGamertag(e.target.value)}
                />
                {/* Tech corner accent */}
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-indigo-500/50 clip-path-polygon-[100%_100%,0%_100%,100%_0%]"></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 block group-focus-within:text-indigo-300 transition-colors">
                Email Address
              </label>
              <input
                className="w-full bg-zinc-950/50 border border-zinc-700 text-zinc-100 px-4 py-3 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono placeholder:text-zinc-700"
                placeholder="agent@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 block group-focus-within:text-indigo-300 transition-colors">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-zinc-950/50 border border-zinc-700 text-zinc-100 px-4 py-3 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono placeholder:text-zinc-700"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={submit}
              className="w-full relative mt-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black uppercase tracking-widest rounded-lg overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Game <span className="text-lg">➔</span>
              </span>
              {/* Shine effect */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </motion.button>
          </div>

          <motion.div variants={itemVariants} className="mt-8 text-center">
            <p className="text-zinc-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wide hover:underline decoration-2 underline-offset-4 transition-all"
              >
                Log In
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
