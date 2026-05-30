"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { DashboardService } from "@/services/dashboard.service";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    DashboardService.getStats()
      .then((res) => setStats(res.data))
      .catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={stats?.total_tasks ?? 0}
        />

        <StatCard
          title="Pending"
          value={stats?.pending_tasks ?? 0}
        />

        <StatCard
          title="In Progress"
          value={stats?.in_progress_tasks ?? 0}
        />

        <StatCard
          title="Completed"
          value={stats?.completed_tasks ?? 0}
        />
      </div>
    </DashboardLayout>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200">
      <p className="text-neutral-500">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}