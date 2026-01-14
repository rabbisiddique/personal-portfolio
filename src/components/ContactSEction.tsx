import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  ExternalLink,
  Flag,
  Languages,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";

const personalInfo = [
  {
    icon: <Briefcase className="w-5 h-5" />,
    label: "Freelance",
    value: "Available",
    color: "from-green-400 to-emerald-600",
    highlight: true,
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: "Age",
    value: "19 Years",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: <Flag className="w-5 h-5" />,
    label: "Nationality",
    value: "Bangladeshi",
    color: "from-red-400 to-pink-600",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    value: "Chhatak, Sylhet",
    color: "from-purple-400 to-indigo-600",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Phone",
    value: "+880 1705 928276",
    color: "from-cyan-400 to-blue-600",
    link: "tel:+8801705928276",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "rabbisiddique@gmail.com",
    color: "from-pink-400 to-rose-600",
    link: "mailto:rabbisiddique@gmail.com",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    label: "Skype",
    value: "rabbi siddique",
    color: "from-blue-400 to-purple-600",
  },
  {
    icon: <Languages className="w-5 h-5" />,
    label: "Languages",
    value: "Bangla • English • Hindi",
    color: "from-orange-400 to-yellow-600",
  },
];
export default function ContactSection() {
  return (
 
  );
}
