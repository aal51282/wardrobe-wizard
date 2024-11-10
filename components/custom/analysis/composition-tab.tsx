"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CompositionTabProps {
  categories: Record<string, number>;
  brands: Record<string, number>;
}

export function CompositionTab({ categories, brands }: CompositionTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
          <CardDescription>Breakdown of clothing types</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.entries(categories).map(([category, count]) => (
            <div key={category} className="flex items-center justify-between mb-2">
              <span>{category}</span>
              <span className="font-bold">{count}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand Mix</CardTitle>
          <CardDescription>Brands in your outfit</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.entries(brands).map(([brand, count]) => (
            <div key={brand} className="flex items-center justify-between mb-2">
              <span>{brand}</span>
              <span className="font-bold">{count}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
} 