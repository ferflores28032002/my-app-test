import React from "react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3Icon } from "lucide-react";

const LoadingCategory = () => {
  return (
    <Card className="p-6 border rounded-lg bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3Icon className="h-5 w-5 text-black dark:text-white" />
        <h2 className="text-xl font-semibold">Products by Category</h2>
      </div>
      <div className="h-[300px] flex items-center justify-center">
        <Skeleton className="w-full h-[250px]" />
      </div>
    </Card>
  );
};

export default LoadingCategory;
