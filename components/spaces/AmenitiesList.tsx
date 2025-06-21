// components/spaces/AmenitiesList.tsx
'use client';

import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const AMENITY_CATEGORIES = {
  technology: ['WiFi', 'Projector', 'Monitor', 'Printer', 'Video Conferencing'],
  furniture: ['Whiteboard', 'Standing Desk', 'Ergonomic Chair'],
  facilities: ['Phone Booth', 'Kitchen', 'Lounge Area'],
  refreshments: ['Coffee', 'Tea', 'Snacks', 'Water'],
  accessibility: ['Wheelchair Access', 'Elevator', 'Gender-Neutral Restroom'],
};

interface AmenitiesListProps {
  amenities: string[];
}

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  if (amenities.length === 0) return null;

  // Categorize amenities
  const categorizedAmenities: Record<string, string[]> = {};
  const uncategorized: string[] = [];

  amenities.forEach((amenity) => {
    let foundCategory = false;
    for (const [category, items] of Object.entries(AMENITY_CATEGORIES)) {
      if (items.includes(amenity)) {
        if (!categorizedAmenities[category]) {
          categorizedAmenities[category] = [];
        }
        categorizedAmenities[category].push(amenity);
        foundCategory = true;
        break;
      }
    }
    if (!foundCategory) {
      uncategorized.push(amenity);
    }
  });

  // Get amenity description (would come from your CMS or constants)
  const getAmenityDescription = (amenity: string) => {
    const descriptions: Record<string, string> = {
      WiFi: 'High-speed internet access throughout the space',
      Projector: 'HD projector available for presentations',
      Whiteboard: 'Wall-mounted whiteboard with markers provided',
      // Add more descriptions as needed
    };
    return descriptions[amenity] || `${amenity} available`;
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    setVisibleCount(expanded ? 8 : amenities.length);
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-xl font-semibold mb-4">Amenities</h2>
      
      <TooltipProvider delayDuration={200}>
        <div className="space-y-6">
          {/* Render categorized amenities */}
          {Object.entries(categorizedAmenities).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-medium text-gray-700 capitalize mb-2">
                {category.replace('-', ' ')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((amenity) => (
                  <Tooltip key={amenity}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[200px]">
                      <p>{getAmenityDescription(amenity)}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}

          {/* Render uncategorized amenities */}
          {uncategorized.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Other Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {uncategorized
                  .slice(0, expanded ? undefined : visibleCount)
                  .map((amenity) => (
                    <Tooltip key={amenity}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-[200px]">
                        <p>{getAmenityDescription(amenity)}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
              </div>
            </div>
          )}
        </div>
      </TooltipProvider>

      {amenities.length > 8 && (
        <button
          onClick={toggleExpand}
          className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          {expanded ? (
            <>
              <ChevronUp size={16} className="mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1" />
              Show All {amenities.length} Amenities
            </>
          )}
        </button>
      )}
    </div>
  );
}