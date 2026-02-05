import { motion } from 'framer-motion';

const ProjectCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden"
    >
      {/* Thumbnail Skeleton */}
      <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer" />
        <div className="absolute bottom-4 left-4">
          <div className="w-20 h-6 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title */}
        <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded-lg mb-2 w-3/4 animate-pulse" />
        
        {/* Description */}
        <div className="space-y-2 mb-5 min-h-[40px]">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6 animate-pulse" />
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="w-16 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="w-20 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="w-14 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-5 border-t border-slate-50 dark:border-slate-800">
          <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

// Grid of skeletons
const ProjectSkeletonGrid = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </>
  );
};

export { ProjectCardSkeleton, ProjectSkeletonGrid };
