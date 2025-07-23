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
      { text: "NY DMV: Auto Accidents Information", href: "https://dmv.ny.gov/insurance/what-do-after-accident" },
      { text: "NY No-Fault Insurance FAQs", href: "https://www.dfs.ny.gov/consumers/auto_insurance/no_fault_faqs" },
      { text: "NY Courts: Motor Vehicle Accidents", href: "https://www.nycourts.gov/courthelp/GoingToCourt/mva.shtml" },
      { text: "NY Department of Health: Traffic Safety", href: "https://www.health.ny.gov/prevention/injury_prevention/traffic/" },
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
      { text: "NY Workers’ Compensation Board", href: "https://www.wcb.ny.gov/" },
      { text: "Information for Injured Workers", href: "https://www.wcb.ny.gov/content/main/Workers/Workers.jsp" },
      { text: "Workers’ Compensation Forms", href: "https://www.wcb.ny.gov/content/main/forms/AllForms.jsp" },
      { text: "What to Do When Injured on the Job", href: "https://www.wcb.ny.gov/content/main/Workers/WhatToDo.jsp" },
    ],
  },
  {
    imageSrc: WeighingScale,
    icon: <VscLaw className="text-4xl md:text-5xl text-[#3498DB] shrink-0" />,
    title: "Labor Law Resources",
    description:
      "Understand your workplace rights, safety regulations, & fair wage protections.",
    links: [
      { text: "NY Department of Labor", href: "https://dol.ny.gov/" },
      { text: "Workplace Safety and Health", href: "https://dol.ny.gov/safety-and-health" },
      { text: "Wage and Hour Laws", href: "https://dol.ny.gov/minimum-wage" },
      { text: "NY Division of Human Rights", href: "https://dhr.ny.gov/" },
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
      { text: "NY Office of Professional Medical Conduct", href: "https://www.health.ny.gov/professionals/doctors/conduct/" },
      { text: "NY Health Care Information", href: "https://www.health.ny.gov/" },
      { text: "NY Medicaid Program", href: "https://www.health.ny.gov/health_care/medicaid/" },
      { text: "Find a Workers’ Comp Doctor", href: "https://www.wcb.ny.gov/health-providers/" },
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
      { text: "Law Help NY", href: "https://www.lawhelpny.org/" },
      { text: "Legal Aid Society of NYC", href: "https://legalaidnyc.org/" },
      { text: "NYC Bar Legal Referral Service", href: "https://www.nycbar.org/get-legal-help/" },
      { text: "NY State Bar Association Referral Service", href: "https://nysba.org/lawyer-referral-directory/" },
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
      { text: "MV-104: Report of Motor Vehicle Accident", href: "https://dmv.ny.gov/forms/mv104.pdf" },
      { text: "C-3: Employee Claim for Compensation", href: "https://www.wcb.ny.gov/content/main/forms/c3.pdf" },
      { text: "LS 223: Complaint of Labor Law Violation", href: "https://dol.ny.gov/system/files/documents/2022/05/ls223.pdf" },
      { text: "NY Courts Forms", href: "https://nycourts.gov/forms/index.shtml" },
    ],
  },
];
