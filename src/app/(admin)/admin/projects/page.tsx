"use client";
import Modal from "@/components/reuse/Modal";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  CheckCircle,
  Edit3,
  ExternalLink,
  Eye,
  Github,
  Grid3x3,
  ImageIcon,
  Link as LinkIcon,
  List,
  Plus,
  Save,
  Search,
  Trash2,
  Youtube,
} from "lucide-react";
import React, { useState } from "react";
import { MOCK_PROJECTS } from "../../../../../constants";

type ViewMode = "grid" | "list";

const AdminProjectsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<
    (typeof MOCK_PROJECTS)[0] | null
  >(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const filteredProjects = MOCK_PROJECTS.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase()),
  );

  const openAddModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (proj: (typeof MOCK_PROJECTS)[0]) => {
    setEditingProject(proj);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setIsModalOpen(false);
      setEditingProject(null);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  const handleDelete = (projectId: string) => {
    console.log("Delete project:", projectId);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <motion.button
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={16} />
          Add Project
        </motion.button>
      </div>

      {/* Filters and View Controls */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">Total Projects</p>
          <p className="text-2xl font-bold text-foreground">
            {MOCK_PROJECTS.length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">Categories</p>
          <p className="text-2xl font-bold text-foreground">
            {new Set(MOCK_PROJECTS.map((p) => p.category)).size}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">Filtered Results</p>
          <p className="text-2xl font-bold text-foreground">
            {filteredProjects.length}
          </p>
        </div>
      </div>

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No projects found</p>
        </div>
      ) : viewMode === "grid" ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
            >
              {/* Project Image */}
              <div className="aspect-video relative bg-muted overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => openEditModal(project)}
                    className="p-2 rounded-lg bg-background/90 hover:bg-background text-foreground transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 rounded-lg bg-background/90 hover:bg-background text-destructive transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-background/90 backdrop-blur-sm border border-border text-xs font-medium text-foreground">
                  {project.category}
                </span>
              </div>

              {/* Project Content */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.links.video && (
                    <a
                      href={project.links.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Youtube size={16} />
                    </a>
                  )}
                  <div className="ml-auto">
                    <button className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                      View <Eye size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div className="flex gap-5">
                {/* Thumbnail */}
                <div className="w-48 h-32 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-muted text-xs font-medium text-foreground">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Links */}
                  <div className="flex items-center gap-4 mt-auto">
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                      >
                        <ExternalLink size={14} />
                        Demo
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                      >
                        <Github size={14} />
                        GitHub
                      </a>
                    )}
                    {project.links.video && (
                      <a
                        href={project.links.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1.5"
                      >
                        <Youtube size={14} />
                        Video
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        title={editingProject ? "Edit Project" : "Add New Project"}
        maxWidth="2xl"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  defaultValue={editingProject?.title}
                  placeholder="e.g., E-commerce Platform"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    defaultValue={editingProject?.category}
                    placeholder="e.g., Web3, Fintech"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue={editingProject?.image}
                      placeholder="https://..."
                      className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                    <button
                      type="button"
                      className="p-2.5 rounded-lg border border-border bg-muted hover:bg-background text-primary transition-colors"
                    >
                      <ImageIcon size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Description
            </h3>
            <textarea
              defaultValue={editingProject?.description}
              placeholder="Describe your project, its features, and technologies used..."
              rows={4}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
            />
          </div>

          {/* Links */}
          <div className="bg-muted/30 rounded-xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <LinkIcon size={16} className="text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                Project Links
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Live Demo
                </label>
                <input
                  type="url"
                  defaultValue={editingProject?.links.demo}
                  placeholder="https://demo.com"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  defaultValue={editingProject?.links.github}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">
                  Video Demo
                </label>
                <input
                  type="url"
                  defaultValue={editingProject?.links.video}
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingProject(null);
              }}
              className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {isUpdating ? (
                <>
                  <Activity size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {editingProject ? "Update Project" : "Add Project"}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-[10000] bg-card border border-border rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-sm"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle
                size={20}
                className="text-emerald-600 dark:text-emerald-400"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {editingProject ? "Project updated" : "Project added"}
              </p>
              <p className="text-xs text-muted-foreground">
                Changes saved successfully
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProjectsPage;
