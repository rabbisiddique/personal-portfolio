"use client";
import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "@/action/admin/projects.action";
import { ProjectCardSkeleton } from "@/components/admin/loading/SkeletonProjectCard";
import ProjectForm from "@/components/admin/ProjectForm";
import Modal from "@/components/reuse/Modal";
import { useProject } from "@/hooks/useProjects";
import { ProjectFormData } from "@/schemas/projects.schema";
import { handleErrorWithToast } from "@/utils/handleErrorWithToast";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  Edit3,
  ExternalLink,
  Github,
  Grid,
  Layers,
  List as ListIcon,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Youtube,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Project, ViewMode } from "../../../../../admin.types";

const AdminProjectsPage: React.FC = () => {
  const { projects, isLoading } = useProject();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    return projects?.filter(
      (p) =>
        p.project_title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.tech_stack.some((t) =>
          t.toLowerCase().includes(search.toLowerCase()),
        ),
    );
  }, [projects, search]);

  const stats = useMemo(
    () => ({
      total: projects?.length,
      categories: new Set(projects?.map((p) => p.category)).size,
      techUsed: new Set(projects?.flatMap((p) => p.tech_stack)).size,
    }),
    [projects],
  );

  const handleOpenAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const handleDelete = async (projectId: string) => {
    try {
      const res = await deleteProjectAction(projectId);

      if (res.success && res.message) {
        toast.success(res.message);
      }
    } catch (error: unknown) {
      handleErrorWithToast(error, "Error deleting project in frontend");
    }
  };

  const handleSubmitForm = async (formData: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      if (editingProject) {
        const res = await updateProjectAction(formData, editingProject?.id);

        if (res.success && res.message) {
          toast.success(res.message);
        }
      } else {
        const res = await createProjectAction(formData);

        if (res.success && res.data) {
          toast.success(res.message);
        }
      }
      setIsSubmitting(false);
      setIsModalOpen(false);
    } catch (error: unknown) {
      handleErrorWithToast(error);
    }
  };

  // if (isLoading) {
  //   return <SkeletonProjectCard />;
  // }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Project Portfolio
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Manage and showcase your best technical work
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02, translateY: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all"
        >
          <Plus size={20} />
          Create New Project
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center gap-5 transition-colors">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Layers size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Total Projects
            </p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {stats.total}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center gap-5 transition-colors">
          <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <BarChart3 size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Categories
            </p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {stats.categories}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center gap-5 transition-colors">
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Tech Stack Size
            </p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {stats.techUsed}
            </p>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4 transition-colors">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search projects by title, category, or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 dark:focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 dark:text-slate-200"
          />
        </div>
        <div className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl self-stretch sm:self-auto transition-colors">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex-1 sm:flex-none p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"}`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 sm:flex-none p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"}`}
          >
            <ListIcon size={20} />
          </button>
        </div>
      </div>

      {/* Projects Display */}
      <div className="min-h-[400px]">
        {isLoading ? (
          // Show skeleton while loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : (
          <>
            {filteredProjects.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 mb-6">
                  <Search size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  No projects found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs">
                  We couldn`t find any projects matching your current search
                  criteria.
                </p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-6 px-5 py-2 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors"
                >
                  Clear search filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  <>
                    {filteredProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-blue-500/10 hover:border-blue-100 dark:hover:border-blue-500/30 transition-all duration-300 overflow-hidden relative"
                      >
                        {/* Actions Overlay for Grid */}
                        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleOpenEdit(project)}
                              className="p-2.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-xl shadow-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-700 transition-all"
                            >
                              <Edit3 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="p-2.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-xl shadow-lg text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-700 transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        {/* Thumbnail */}
                        <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                          <img
                            src={project.image_url}
                            alt={project.project_title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute bottom-4 left-4">
                            <span className="px-3 py-1 bg-black/50 dark:bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-lg border border-white/20">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 line-clamp-1 mb-2">
                            {project.project_title}
                          </h3>
                          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2 min-h-[40px]">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech_stack.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-[11px] font-bold border border-slate-100 dark:border-slate-700"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.tech_stack.length > 3 && (
                              <span className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-lg text-[11px] font-bold border border-slate-100 dark:border-slate-700">
                                +{project.tech_stack.length - 3} more
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4 pt-5 border-t border-slate-50 dark:border-slate-800">
                            {project.links.live_link && (
                              <a
                                href={project.links.live_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                <ExternalLink size={18} />
                              </a>
                            )}
                            {project.links.github_link && (
                              <a
                                href={project.links.github_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                              >
                                <Github size={18} />
                              </a>
                            )}
                            {project.links.video_link && (
                              <a
                                href={project.links.video_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                              >
                                <Youtube size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </>
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-blue-500/10 transition-all flex flex-col md:flex-row gap-6"
                    >
                      <div className="w-full md:w-56 aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden flex-shrink-0">
                        <img
                          src={project.image_url}
                          alt={project.project_title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 flex flex-col py-2">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-md mb-2 inline-block">
                              {project.category}
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                              {project.project_title}
                            </h3>
                          </div>

                          <div className="relative">
                            <button
                              onClick={() =>
                                setActiveMenuId(
                                  activeMenuId === project.id
                                    ? null
                                    : project.id,
                                )
                              }
                              className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-500 transition-colors"
                            >
                              <MoreVertical size={20} />
                            </button>

                            {activeMenuId === project.id && (
                              <>
                                <div
                                  className="fixed inset-0 z-20"
                                  onClick={() => setActiveMenuId(null)}
                                />
                                <div className="absolute right-0 top-12 w-48 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-xl z-30 p-2 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                                  <button
                                    onClick={() => handleOpenEdit(project)}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors"
                                  >
                                    <Edit3 size={16} /> Edit Details
                                  </button>
                                  <button
                                    onClick={() => handleDelete(project.id)}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                                  >
                                    <Trash2 size={16} /> Remove Project
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 mt-auto">
                          <div className="flex gap-2">
                            {project.tech_stack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-[10px] font-bold border border-slate-100 dark:border-slate-700"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-3 ml-auto">
                            {project.links.live_link && (
                              <a
                                href={project.links.live_link}
                                className="flex items-center gap-1.5 text-sm font-bold text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                              >
                                <ExternalLink size={16} /> Demo
                              </a>
                            )}
                            {project.links.github_link && (
                              <a
                                href={project.links.github_link}
                                className="flex items-center gap-1.5 text-sm font-bold text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all"
                              >
                                <Github size={16} /> Repo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>

      {/* Changed maxWidth to '4xl' from unsupported '3xl' to fix type error */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? "Modify Project" : "New Project Registration"}
        maxWidth="4xl"
      >
        <ProjectForm
          initialData={editingProject}
          isSubmitting={isSubmitting}
          onCancel={() => setIsModalOpen(false)}
          onSubmit={handleSubmitForm}
        />
      </Modal>
    </div>
  );
};

export default AdminProjectsPage;
