// components/skeletons/SkeletonHero.tsx
import { Eye, Image as ImageIcon, Type, User } from "lucide-react";

const SkeletonHero = () => {
  return (
    <div className="mb-8 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview Card Skeleton */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Eye size={18} className="text-muted-foreground" />
              <div className="h-6 w-32 bg-muted rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-16 bg-emerald-500/10 rounded-full" />
              <div className="h-9 w-20 bg-muted rounded-lg" />
            </div>
          </div>

          <div className="space-y-6">
            {/* Hero Preview Skeleton */}
            <div className="border border-border rounded-lg p-8 bg-muted/30">
              <div className="space-y-4">
                {/* Badge */}
                <div className="h-6 w-24 bg-primary/10 rounded-full" />

                {/* Name */}
                <div className="h-12 w-3/4 bg-muted rounded-lg" />

                {/* Role */}
                <div className="h-7 w-48 bg-primary/10 rounded" />

                {/* Description */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-5/6 bg-muted rounded" />
                  <div className="h-4 w-4/6 bg-muted rounded" />
                </div>

                {/* Button */}
                <div className="pt-4">
                  <div className="h-11 w-36 bg-foreground/10 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Image Skeleton */}
            <div className="border border-border rounded-lg overflow-hidden bg-muted/30">
              <div className="w-full h-64 bg-muted flex items-center justify-center">
                <ImageIcon size={48} className="text-muted-foreground/30" />
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards Skeleton */}
        <div className="space-y-6">
          {/* Identity Skeleton */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <User size={16} className="text-primary" />
              <div className="h-5 w-20 bg-muted rounded" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="h-3 w-16 bg-muted rounded mb-2" />
                <div className="h-4 w-32 bg-muted rounded" />
              </div>
              <div>
                <div className="h-3 w-16 bg-muted rounded mb-2" />
                <div className="h-4 w-28 bg-muted rounded" />
              </div>
            </div>
          </div>

          {/* Roles Skeleton */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Type size={16} className="text-primary" />
              <div className="h-5 w-24 bg-muted rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-9 w-full bg-muted/50 rounded-lg" />
              <div className="h-9 w-full bg-muted/50 rounded-lg" />
              <div className="h-9 w-3/4 bg-muted/50 rounded-lg" />
            </div>
          </div>

          {/* Visual Assets Skeleton */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon size={16} className="text-primary" />
              <div className="h-5 w-28 bg-muted rounded" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="h-3 w-24 bg-muted rounded mb-2" />
                <div className="h-4 w-40 bg-muted rounded" />
              </div>
              <div>
                <div className="h-3 w-20 bg-muted rounded mb-2" />
                <div className="h-4 w-36 bg-muted rounded" />
              </div>
              <div>
                <div className="h-3 w-20 bg-muted rounded mb-2" />
                <div className="h-4 w-16 bg-emerald-500/10 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonHero;
