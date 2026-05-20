import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { motion } from "framer-motion";

import {
  Brain,
  FileText,
  Trophy,
  Activity,
} from "lucide-react";

import PageContainer from "../components/layout/PageContainer";
import BackgroundEffects from "../components/layout/BackgroundEffects";

import { dashboardAPI } from "../services/api";

export default function Dashboard() {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const data =
        await dashboardAPI.getStats();

      setStats(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-[#07070b]
        text-white
        flex
        items-center
        justify-center
      ">
        Loading Dashboard...
      </div>
    );
  }

  // Pie Chart Data
  const difficultyData = [

    {
      name: "Easy",
      value: stats.quizzesByDifficulty.EASY,
    },

    {
      name: "Medium",
      value: stats.quizzesByDifficulty.MEDIUM,
    },

    {
      name: "Hard",
      value: stats.quizzesByDifficulty.HARD,
    },
  ];

  // Performance Chart
  const performanceData = [

    {
      name: "Average",
      score: stats.averageScore,
    },

    {
      name: "Highest",
      score: stats.highestScore,
    },
  ];

  const COLORS = [
    "#8b5cf6",
    "#06b6d4",
    "#ec4899",
  ];

  return (

    <div className="
      min-h-screen
      bg-[#07070b]
      text-white
      relative
      overflow-hidden
    ">

      <BackgroundEffects />

      <PageContainer>

        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-10"
        >

          <h1 className="
            text-4xl
            font-bold
            mb-3
            bg-gradient-to-r
            from-violet-400
            to-cyan-400
            bg-clip-text
            text-transparent
          ">
            Analytics Dashboard
          </h1>

          <p className="text-white/50">
            Monitor your AI learning performance.
          </p>

        </motion.div>

        {/* STAT CARDS */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6
          mb-10
        ">

          <StatCard
            icon={<Brain size={22} />}
            title="Total Quizzes"
            value={stats.totalQuizzesAttempted}
          />

          <StatCard
            icon={<Activity size={22} />}
            title="Average Score"
            value={`${stats.averageScore}%`}
          />

          <StatCard
            icon={<Trophy size={22} />}
            title="Highest Score"
            value={`${stats.highestScore}%`}
          />

          <StatCard
            icon={<FileText size={22} />}
            title="Summaries"
            value={stats.totalSummariesGenerated}
          />

        </div>

        {/* CHARTS */}
        <div className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
          mb-10
        ">

          {/* PIE CHART */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              bg-white/[0.03]
              border border-white/10
              backdrop-blur-2xl
              rounded-3xl
              p-6
            "
          >

            <h2 className="
              text-xl
              font-semibold
              mb-6
            ">
              Quiz Difficulty
            </h2>

            <div className="h-[300px]">

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={difficultyData}
                    dataKey="value"
                    outerRadius={100}
                    innerRadius={60}
                  >

                    {difficultyData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={COLORS[index]}
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

          {/* BAR CHART */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              bg-white/[0.03]
              border border-white/10
              backdrop-blur-2xl
              rounded-3xl
              p-6
            "
          >

            <h2 className="
              text-xl
              font-semibold
              mb-6
            ">
              Performance Summary
            </h2>

            <div className="h-[300px]">

              <ResponsiveContainer>

                <BarChart
                  data={performanceData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ffffff10"
                  />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="score"
                    fill="#8b5cf6"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

        </div>

        {/* RECENT ACTIVITY */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            bg-white/[0.03]
            border border-white/10
            backdrop-blur-2xl
            rounded-3xl
            p-6
          "
        >

          <h2 className="
            text-2xl
            font-semibold
            mb-6
          ">
            Recent Activity
          </h2>

          <div className="space-y-4">

            {stats.recentActivity.map(
              (activity, index) => (

                <div
                  key={index}
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/5
                    pb-4
                  "
                >

                  <div>

                    <p className="font-medium">

                      {activity.type === "quiz"
                        ? "🧠 Quiz Completed"
                        : "📖 Study Summary"}

                    </p>

                    <p className="
                      text-sm
                      text-white/50
                    ">
                      {activity.title}
                    </p>

                  </div>

                  <div className="
                    text-sm
                    text-white/40
                  ">

                    {new Date(
                      activity.createdAt
                    ).toLocaleDateString()}

                  </div>

                </div>
              )
            )}

          </div>

        </motion.div>

      </PageContainer>
    </div>
  );
}


function StatCard({
  icon,
  title,
  value,
}) {

  return (

    <motion.div
      whileHover={{
        y: -5,
      }}
      className="
        bg-white/[0.03]
        border border-white/10
        backdrop-blur-2xl
        rounded-3xl
        p-6
      "
    >

      <div className="
        flex
        items-center
        justify-between
        mb-5
      ">

        <div className="
          text-violet-400
        ">
          {icon}
        </div>

      </div>

      <h3 className="
        text-white/50
        text-sm
        mb-2
      ">
        {title}
      </h3>

      <p className="
        text-3xl
        font-bold
      ">
        {value}
      </p>

    </motion.div>
  );
}