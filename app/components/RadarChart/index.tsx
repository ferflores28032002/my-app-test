"use client";

import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { ActivityIcon } from "lucide-react";
import TextDisplay from "../TextDisplay";

interface RadarChartProps {
  data: Array<{
    attribute: string;
    value: number;
  }>;
}

export function RadarChart({ data }: RadarChartProps) {
  return (
    <Card className="p-6 border rounded-lg bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ActivityIcon className="h-5 w-5 text-black dark:text-white" />
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Product Attributes Distribution
        </h2>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart data={data}>
            {/* Grid Lines */}
            <PolarGrid
              stroke="var(--grid-stroke, #E5E7EB)"
              className="dark:stroke-gray-600"
            />
            {/* Axis Labels */}
            <PolarAngleAxis
              dataKey="attribute"
              stroke="currentColor" // Cambia dinámicamente según el tema
              tick={{
                fill: "currentColor", // Asegura que las etiquetas cambien según el tema
                fontSize: 12,
              }}
              className="dark:fill-white"
            />
            {/* Radius Axis */}
            <PolarRadiusAxis
              stroke="currentColor" // Cambia dinámicamente según el tema
              tick={{
                fill: "currentColor", // Cambia el color del texto según el tema
                fontSize: 12,
              }}
              className="dark:fill-white"
            />
            {/* Radar Shape */}
            <Radar
              name="Value"
              dataKey="value"
              stroke="var(--radar-stroke, #4F46E5)"
              fill="var(--radar-fill, #4F46E5)"
              fillOpacity={0.6}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
      <TextDisplay
        text="This radar chart visualizes the distribution of product attributes and
        their values, helping identify the strengths and weaknesses across
        different metrics."
        className="text-black dark:text-white"
      />
    </Card>
  );
}
