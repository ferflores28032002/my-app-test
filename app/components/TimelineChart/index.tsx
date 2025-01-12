"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { LineChartIcon } from "lucide-react";
import TextDisplay from "../TextDisplay";

interface TimelineData {
  date: string;
  count: number;
}

interface TimelineChartProps {
  data: TimelineData[];
}

export function TimelineChart({ data }: TimelineChartProps) {
  return (
    <Card className="p-6 border rounded-lg bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <LineChartIcon className="h-5 w-5 text-black dark:text-white" />
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Product Creation Timeline
        </h2>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {/* Grid Lines */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--grid-stroke, #E5E7EB)"
              className="dark:stroke-gray-600"
            />
            {/* X-Axis Labels */}
            <XAxis
              dataKey="date"
              stroke="currentColor" // Dinámico según el tema
              tick={{
                fill: "currentColor", // Dinámico según el tema
                fontSize: 12,
              }}
              className="dark:fill-white"
            />
            {/* Y-Axis Labels */}
            <YAxis
              stroke="currentColor" // Dinámico según el tema
              tick={{
                fill: "currentColor", // Dinámico según el tema
                fontSize: 12,
              }}
              className="dark:fill-white"
            />
            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg, #1F2937)",
                border: "none",
                borderRadius: "0.5rem",
                color: "var(--tooltip-text, #FFFFFF)",
              }}
            />
            {/* Line */}
            <Line
              type="monotone"
              dataKey="count"
              stroke="var(--line-stroke, #4F46E5)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <TextDisplay
        text="This chart displays the timeline of product creation, showing the number
        of products created over time. Each point represents the count for a
        specific date."
        className="text-black dark:text-white"
      />
    </Card>
  );
}
