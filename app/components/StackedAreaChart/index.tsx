"use client";

import { COLORS } from "@/app/helpers/colors";
import { Card } from "@/components/ui/card";
import { LayersIcon } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import TextDisplay from "../TextDisplay";

interface StackedAreaChartProps {
  data: Array<{
    date: string;
    [key: string]: number | string;
  }>;
  categories: string[];
}

export function StackedAreaChart({ data, categories }: StackedAreaChartProps) {
  return (
    <Card className="p-6 border rounded-lg bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <LayersIcon className="h-5 w-5 text-black dark:text-white" />
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Category Growth Over Time
        </h2>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            {/* Grid Lines */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--grid-stroke, #E5E7EB)"
              className="dark:stroke-gray-600"
            />
            {/* X-Axis */}
            <XAxis
              dataKey="date"
              stroke="currentColor" // Dinámico según el tema
              tick={{
                fill: "currentColor", // Dinámico según el tema
                fontSize: 12,
              }}
              className="dark:fill-white"
            />
            {/* Y-Axis */}
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
            {/* Areas */}
            {categories.map((category, index) => (
              <Area
                key={category}
                type="monotone"
                dataKey={category}
                stackId="1"
                stroke={`var(--area-stroke-${index}, ${
                  COLORS[index % COLORS.length]
                })`}
                fill={`var(--area-fill-${index}, ${
                  COLORS[index % COLORS.length]
                })`}
                fillOpacity={0.7}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <TextDisplay
        text="This chart shows the growth of various categories over time. Each area
        represents the contribution of a category to the total growth at a given
        point in time."
        className="text-black dark:text-white"
      />
    </Card>
  );
}
