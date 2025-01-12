"use client";

import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ImageIcon,
  LayoutGridIcon,
  MoonIcon,
  PackageIcon,
  SearchIcon,
  SunIcon,
} from "lucide-react";

import {
  BrandPieChart,
  BubbleChart,
  CategoryBarChart,
  Error,
  Loading,
  NoDataComponent,
  ProductGallery,
  ProductTable,
  RadarChart,
  StackedAreaChart,
  TimelineChart,
} from "./components";
import { fetchProducts } from "./services/api";

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }, []);

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const filteredProducts = useMemo(() => {
    if (!data?.result) return [];
    return data.result.filter(
      (product) =>
        (product.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedBrand === "all" || product.brand === selectedBrand)
    );
  }, [data, searchTerm, selectedBrand]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const categoryData = useMemo(() => {
    if (!data?.result) return [];
    const categories = data.result.reduce((acc, product) => {
      acc[product.id_category] = (acc[product.id_category] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return Object.entries(categories).map(([category, count]) => ({
      category: `Category ${category}`,
      count,
    }));
  }, [data]);

  const brandData = useMemo(() => {
    if (!data?.result) return [];
    const brands = data.result.reduce((acc, product) => {
      acc[product.brand] = (acc[product.brand] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(brands).map(([brand, count]) => ({
      brand,
      count,
    }));
  }, [data]);

  const timelineData = useMemo(() => {
    if (!data?.result) return [];
    const timeline = data.result.reduce((acc, product) => {
      const date = new Date(product.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(timeline)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  const brandOptions = useMemo(() => {
    if (!data?.result) return [];
    const brands = new Set(data.result.map((product) => product.brand));
    return Array.from(brands);
  }, [data]);

  const radarData = useMemo(() => {
    if (!data?.result) return [];
    const totals = data.result.reduce(
      (acc, product) => ({
        categories: (acc.categories || 0) + 1,
        brands: acc.brands || new Set(),
        prices: (acc.prices || 0) + (parseFloat(product.price) || 0),
        sizes: (acc.sizes || 0) + (parseFloat(product.size) || 0),
      }),
      {
        categories: 0,
        brands: new Set(),
        prices: 0,
        sizes: 0,
      }
    );

    data.result.forEach((product) => {
      totals.brands.add(product.brand);
    });

    return [
      { attribute: "Categories", value: totals.categories },
      { attribute: "Brands", value: totals.brands.size },
      { attribute: "Avg Price", value: totals.prices / data.result.length },
      { attribute: "Avg Size", value: totals.sizes / data.result.length },
    ];
  }, [data]);

  const stackedAreaData = useMemo(() => {
    if (!data?.result) return { data: [], categories: [] };
    const timelineByCategory = data.result.reduce((acc, product) => {
      const date = new Date(product.createdAt).toLocaleDateString();
      const category = `Category ${product.id_category}`;

      if (!acc[date]) acc[date] = {};
      acc[date][category] = (acc[date][category] || 0) + 1;
      return acc;
    }, {} as Record<string, Record<string, number>>);

    const categories = Array.from(
      new Set(data.result.map((p) => `Category ${p.id_category}`))
    );

    return {
      data: Object.entries(timelineByCategory).map(([date, counts]) => ({
        date,
        ...counts,
      })),
      categories,
    };
  }, [data]);

  const bubbleData = useMemo(() => {
    if (!data?.result) return [];
    const priceRanges = data.result.reduce((acc, product) => {
      const price = Math.floor(parseFloat(product.price || "0") / 10) * 10;
      acc[price] = (acc[price] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return Object.entries(priceRanges).map(([price, count]) => ({
      price: parseFloat(price),
      count,
      range: `$${price}-${parseFloat(price) + 10}`,
    }));
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} refetch={refetch} />;
  }

  if (!data?.result || data.result.length === 0) {
    return <NoDataComponent refetch={refetch} />;
  }

  return (
    <div className={`p-2 md:p-8 ${isDarkMode ? "dark" : ""}`}>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Product Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive product data visualization
          </p>
        </div>
        <Button onClick={toggleDarkMode} variant="outline" size="icon">
          {isDarkMode ? (
            <SunIcon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>

      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList className="bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
          <TabsTrigger
            value="charts"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
          >
            <LayoutGridIcon className="h-4 w-4 mr-2" />
            Charts
          </TabsTrigger>
          <TabsTrigger
            value="table"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
          >
            <PackageIcon className="h-4 w-4 mr-2" />
            Table
          </TabsTrigger>
          <TabsTrigger
            value="gallery"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Gallery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CategoryBarChart data={categoryData} />
            <StackedAreaChart
              data={stackedAreaData.data}
              categories={stackedAreaData.categories}
            />
            <TimelineChart data={timelineData} />
            <BrandPieChart data={brandData} />
            <RadarChart data={radarData} />
            <BubbleChart data={bubbleData} />
          </div>
        </TabsContent>

        <TabsContent value="table">
          <div className="mb-4 flex gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brandOptions.map((brand) => (
                  <SelectItem key={brand} value={brand || "unknown"}>
                    {brand || "Unknown"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedBrand("all");
              }}
              className="px-4  bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700 rounded-md"
            >
              Clear
            </button>
          </div>
          <ProductTable
            products={paginatedProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </TabsContent>

        <TabsContent value="gallery">
          <ProductGallery
            products={paginatedProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
