// utils/transformAboutData.ts
import {
  AboutData,
  ExpertiseData,
  PersonalInfoData,
  SystemStatData,
} from "@/schemas/about.schema";

export function transformAboutData(dbData: any): AboutData {
  if (!dbData) {
    throw new Error("No data to transform");
  }

  return {
    hero: {
      first_name: dbData.hero?.first_name || "",
      last_name: dbData.hero?.last_name || "",
      role_title: dbData.hero?.role_title || "",
      operator_label: dbData.hero?.operator_label || "",
      background_text: dbData.hero?.background_text || "",
      description: dbData.hero?.description || "",
    },
    systemStats: (dbData.system_stats || []).map((stat: SystemStatData) => ({
      id: stat.id || "",
      label: stat.label || "",
      value: stat.value || "",
      icon: stat.icon || "",
      color: stat.color || "",
    })),
    personalInfo: (dbData.personal_info || []).map(
      (info: PersonalInfoData) => ({
        id: info.id || "",
        label: info.label || "",
        value: info.value || "",
        icon: info.icon || "",
        highlight: info.highlight ?? false, // Use ?? to handle undefined/null
      }),
    ),
    expertise: (dbData.expertise || []).map((exp: ExpertiseData) => ({
      id: exp.id || "",
      title: exp.title || "",
      description: exp.description || "",
      extra_description: exp.extra_description || "",
      icon: exp.icon || "",
      level: String(exp.level || ""),
    })),
  };
}
