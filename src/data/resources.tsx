import { FaCarCrash } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import { VscLaw } from "react-icons/vsc";
import { FaUserDoctor } from "react-icons/fa6";
import { RiAuctionFill } from "react-icons/ri";
import { FaFileAlt } from "react-icons/fa";
import {
  CarCrash,
  Cap,
  WeighingScale,
  UserDoctor,
  Law,
  Document,
} from "@/assets/icons";
export const resources = [
  {
    imageSrc: CarCrash,
    icon: (
      <FaCarCrash className="text-4xl md:text-5xl text-[#3498DB] shrink-0" />
    ),
    title: "Auto Accident Resources",
    description:
      "Helpful links to navigate New York’s auto accident rules and recovery process.",
    links: [
      { text: "NY DMV: Auto Accidents Information", href: "#" },
      { text: "NY No-Fault Insurance FAQs", href: "#" },
      { text: "NY Courts: Motor Vehicle Accidents", href: "#" },
      { text: "NY Department of Health: Traffic Safety", href: "#" },
    ],
  },
  {
    imageSrc:Cap,
    icon: (
      <BiSolidDish className="text-4xl md:text-5xl text-[#3498DB] shrink-0" />
    ),
    title: "Workers' Compensation Resources",
    description:
      "Find official guidance & support if you’ve been injured on the job in New York.",
    links: [
      { text: "NY Workers’ Compensation Board", href: "#" },
      { text: "Information for Injured Workers", href: "#" },
      { text: "Workers’ Compensation Forms", href: "#" },
      { text: "What to Do When Injured on the Job", href: "#" },
    ],
  },
  {
    imageSrc: WeighingScale,
    icon: <VscLaw className="text-4xl md:text-5xl text-[#3498DB] shrink-0" />,
    title: "Labor Law Resources",
    description:
      "Understand your workplace rights, safety regulations, & fair wage protections.",
    links: [
      { text: "NY Department of Labor", href: "#" },
      { text: "Workplace Safety and Health", href: "#" },
      { text: "Wage and Hour Laws", href: "#" },
      { text: "NY Division of Human Rights", href: "#" },
    ],
  },
  {
    imageSrc: UserDoctor,
    icon: (
      <FaUserDoctor className="text-4xl md:text-5xl text-[#3498DB] shrink-0" />
    ),
    title: "Medical Resources",
    description:
      "Access healthcare support, Medicaid details, & resources for injured workers.",
    links: [
      { text: "NY Office of Professional Medical Conduct", href: "#" },
      { text: "NY Health Care Information", href: "#" },
      { text: "NY Medicaid Program", href: "#" },
      { text: "Find a Workers’ Comp Doctor", href: "#" },
    ],
  },
  {
    imageSrc:Law,
    icon: (
      <RiAuctionFill className="text-4xl md:text-5xl text-[#3498DB] shrink-0" />
    ),
    title: "Legal Aid Resources",
    description:
      "Access legal assistance and referrals for injured workers and low-income individuals.",
    links: [
      { text: "Law Help NY", href: "#" },
      { text: "Legal Aid Society of NYC", href: "#" },
      { text: "NYC Bar Legal Referral Service", href: "#" },
      { text: "NY State Bar Association Referral Service", href: "#" },
    ],
  },
  {
    imageSrc: Document,
    icon: (
      <FaFileAlt className="text-4xl md:text-5xl text-[#3498DB] shrink-0" />
    ),
    title: "Forms and Documents",
    description:
      "Quick access to key legal & compensation forms for accidents & claims.",
    links: [
      { text: "MV-104: Report of Motor Vehicle Accident", href: "#" },
      { text: "C-3: Employee Claim for Compensation", href: "#" },
      { text: "LS 223: Complaint of Labor Law Violation", href: "#" },
      { text: "NY Courts Forms", href: "#" },
    ],
  },
];
