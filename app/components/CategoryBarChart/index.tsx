"use client";

import { Card } from "@/components/ui/card";
import { BarChart3Icon } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import TextDisplay from "../TextDisplay";
import LoadingCategory from "./components/Loading";

interface CategoryData {
  category: string;
  count: number;
}

interface CategoryBarChartProps {
  data: CategoryData[];
  isLoading?: boolean;
}

export function CategoryBarChart({ data, isLoading }: CategoryBarChartProps) {
  if (isLoading) {
    return <LoadingCategory />;
  }

  return (
    <Card className="p-6 border rounded-lg bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3Icon className="h-5 w-5 text-black dark:text-white" />
        <h2 className="text-xl font-semibold">Products by Category</h2>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-300 dark:stroke-gray-600"
            />
            <XAxis
              dataKey="category"
              className="text-xs"
              tick={{ fill: "currentColor" }}
              stroke="currentColor"
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "currentColor" }}
              stroke="currentColor"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg, #ffffff)",
                border: "1px solid var(--tooltip-border, #d1d5db)",
                borderRadius: "0.5rem",
                color: "var(--tooltip-text, #111827)",
              }}
            />
            <Bar dataKey="count" fill="url(#barGradient)" />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.7} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <TextDisplay
        text="This chart shows the distribution of products across different
        categories. Each bar represents the total number of products in that
        category."
      />
    </Card>
  );
}
