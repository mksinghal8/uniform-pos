import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useProductStore from '@/store_zustand/productStore';

export function CategoryCarousel() {
  const {
    allCategories,
  } = useProductStore();

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full" // Ensure the carousel takes full width
    >
      <CarouselContent className="flex space-x-2"> {/* Add spacing between items */}
        {allCategories.results.map((category) => (
          <CarouselItem
            key={category.id}
            className="md:basis-1/6 lg:basis-1/8 sm:basis-1/4 xsm:basis-1/4 basis-1/4"
          >
            <div className="p-1">
              <Card className="h-full"> {/* Make the card take full height */}
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <span className="text-3xl font-semibold">{category.name}</span>
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
