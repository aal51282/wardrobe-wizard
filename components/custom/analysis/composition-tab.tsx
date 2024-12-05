"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CompositionTabProps {
  categories: Record<string, number>;
  brands: Record<string, number>;
}

export function CompositionTab({ categories = {}, brands = {} }: CompositionTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
          <CardDescription>Breakdown of clothing types</CardDescription>
        </CardHeader>
        <CardContent>
          {categories && Object.entries(categories).length > 0 ? (
            Object.entries(categories).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between mb-2">
                <span className="capitalize">{category}</span>
                <span className="font-bold">{count}</span>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-4">
              No categories available
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand Mix</CardTitle>
          <CardDescription>Brands in your outfit</CardDescription>
        </CardHeader>
        <CardContent>
          {brands && Object.entries(brands).length > 0 ? (
            Object.entries(brands).map(([brand, count]) => (
              <div key={brand} className="flex items-center justify-between mb-2">
                <span className="capitalize">{brand}</span>
                <span className="font-bold">{count}</span>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-4">
              No brands available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 