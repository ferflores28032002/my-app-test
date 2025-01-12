"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { CircleIcon } from "lucide-react";
import TextDisplay from "../TextDisplay";

interface BubbleChartProps {
  data: Array<{
    price: number;
    count: number;
    range: string;
  }>;
}

export function BubbleChart({ data }: BubbleChartProps) {
  return (
    <Card className="p-6 border rounded-lg bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <CircleIcon className="h-5 w-5 text-black dark:text-white" />
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Price Range Distribution
        </h2>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            {/* Grid Lines */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--grid-stroke, #E5E7EB)"
              className="dark:stroke-gray-600"
            />
            {/* X-Axis Labels */}
            <XAxis
              dataKey="price"
              name="Price"
              stroke="currentColor" // Cambia dinámicamente según el tema
              tick={{
                fill: "currentColor", // Cambia el color del texto según el tema
                fontSize: 12,
              }}
              label={{
                value: "Price Range",
                position: "bottom",
                fill: "currentColor", // Cambia el color de la etiqueta según el tema
              }}
              className="dark:fill-white"
            />
            {/* Y-Axis Labels */}
            <YAxis
              dataKey="count"
              name="Count"
              stroke="currentColor" // Cambia dinámicamente según el tema
              tick={{
                fill: "currentColor", // Cambia el color del texto según el tema
                fontSize: 12,
              }}
              label={{
                value: "Product Count",
                angle: -90,
                position: "insideLeft",
                fill: "currentColor", // Cambia el color de la etiqueta según el tema
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
              cursor={{ strokeDasharray: "3 3" }}
            />
            {/* Scatter Points */}
            <Scatter
              name="Products"
              data={data}
              fill="var(--scatter-fill, #4F46E5)"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <TextDisplay
        text="This chart visualizes the distribution of products across different
        price ranges and their respective counts. Each point represents a price
        range and its product count."
        className="text-black dark:text-white"
      />
    </Card>
  );
}
