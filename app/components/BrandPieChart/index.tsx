"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { PieChartIcon } from "lucide-react";
import TextDisplay from "../TextDisplay";
import { COLORS } from "@/app/helpers/colors";

interface BrandData {
  brand: string;
  count: number;
}

interface BrandPieChartProps {
  data: BrandData[];
}

export function BrandPieChart({ data }: BrandPieChartProps) {
  return (
    <Card className="p-6 border rounded-lg bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <PieChartIcon className="h-5 w-5 text-black dark:text-white" />
        <h2 className="text-xl font-semibold">Brand Distribution</h2>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="brand"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${entry.brand}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg, #ffffff)",
                border: "1px solid var(--tooltip-border, #d1d5db)",
                borderRadius: "0.5rem",
                color: "var(--tooltip-text, #111827)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <TextDisplay
        text="This chart illustrates the distribution of products by brand. Each slice
        represents the proportion of total products associated with a specific
        brand, helping identify the most dominant brands at a glance."
      />
    </Card>
  );
}
