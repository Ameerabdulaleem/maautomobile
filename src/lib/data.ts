/*
 * All editable website content lives in this file.
 * To add a part or a car, copy one of the entries below and change the details.
 */

export type Service = {
  icon: "diagnostics" | "engine" | "transmission" | "suspension" | "electrical" | "brakes" | "ac" | "service";
  title: string;
  text: string;
};

export const services: Service[] = [
  {
    icon: "diagnostics",
    title: "Computer Diagnostics",
    text: "Dealer level fault scanning that reads every control unit, so we fix the real cause and not just the warning light.",
  },
  {
    icon: "engine",
    title: "Engine Repair and Rebuild",
    text: "From timing chains and oil leaks to complete overhauls on V6, V8 and V12 engines, handled with factory procedures.",
  },
  {
    icon: "transmission",
    title: "Transmission Service",
    text: "Gearbox servicing, fluid changes, mechatronic repair and lasting cures for shudder, slipping and harsh shifting.",
  },
  {
    icon: "suspension",
    title: "Air Suspension",
    text: "Air struts, compressors, valve blocks and height sensors restored, so your car rides the way it was designed to.",
  },
  {
    icon: "electrical",
    title: "Electrical and Programming",
    text: "Wiring faults, module coding, key programming, lighting and comfort features traced and corrected properly.",
  },
  {
    icon: "brakes",
    title: "Brakes and Steering",
    text: "Discs, pads, calipers, electronic parking brakes and steering racks checked and renewed for confident stopping.",
  },
  {
    icon: "ac",
    title: "Air Conditioning",
    text: "Leak testing, regassing, compressor and condenser replacement to keep the cabin cool in Abuja heat.",
  },
  {
    icon: "service",
    title: "Scheduled Servicing",
    text: "Oil, filters, fluids and full inspections carried out on schedule, to protect your engine and your resale value.",
  },
];

export const steps = [
  {
    title: "Book a visit",
    text: "Send us your car details and the problem you have noticed. We reply by email to confirm a convenient time.",
  },
  {
    title: "Inspection and diagnosis",
    text: "We inspect the car, run a full computer scan and explain exactly what we found in plain language.",
  },
  {
    title: "Clear quote, then repair",
    text: "You approve the quote before any work starts. Our technicians then carry out the repair with the right parts.",
  },
  {
    title: "Quality check and handover",
    text: "Every car is road tested and checked again before we hand the keys back to you.",
  },
] as const;

export const reasons = [
  {
    title: "Specialists, not generalists",
    text: "Range Rover, Mercedes-Benz and Rolls-Royce are what we work on every day, so we know their common faults well.",
  },
  {
    title: "Genuine and quality parts",
    text: "We fit genuine and trusted OEM grade parts, many of them available right here in our own parts marketplace.",
  },
  {
    title: "Honest, upfront pricing",
    text: "You get a clear quote before work begins. Nothing is added to your bill without your approval.",
  },
  {
    title: "A registered company",
    text: "Muslim Aleem Automobile Ltd is registered with the Corporate Affairs Commission, RC 7394953.",
  },
] as const;

export type PartCategory = "Filters" | "Transmission" | "Lighting" | "Emblems" | "Wheel Accessories";

export type Part = {
  id: string;
  name: string;
  category: PartCategory;
  fits: string;
  description: string;
  /** Leave empty to show "Price on request". Example: "₦25,000" */
  price?: string;
  /** Optional photo placed in /public/parts, for example "/parts/oil-filter.jpg" */
  image?: string;
};

export const parts: Part[] = [
  {
    id: "oil-filter",
    name: "Oil Filter",
    category: "Filters",
    fits: "Mercedes-Benz, Range Rover and more",
    description: "Quality oil filters that keep your engine oil clean between services.",
  },
  {
    id: "transmission-anti-shake",
    name: "Automatic Transmission Anti-Shake",
    category: "Transmission",
    fits: "Most automatic gearboxes",
    description: "Treatment for automatic gearboxes that helps reduce shudder and rough gear changes.",
  },
  {
    id: "mercedes-welcome-light",
    name: "Mercedes-Benz Welcome Light",
    category: "Lighting",
    fits: "Mercedes-Benz",
    description: "Door courtesy lights that project the logo onto the ground when you open the door.",
  },
  {
    id: "mercedes-emblem",
    name: "Mercedes-Benz Emblem",
    category: "Emblems",
    fits: "Mercedes-Benz",
    description: "Replacement star emblems and badges to restore a faded or missing original.",
  },
  {
    id: "land-rover-valve-stem-cap",
    name: "Land Rover Valve Stem Cap",
    category: "Wheel Accessories",
    fits: "Land Rover and Range Rover",
    description: "Branded valve stem caps that protect the tyre valve and finish the wheel neatly.",
  },
  {
    id: "mercedes-valve-stem-caps",
    name: "Tire Valve Stem Caps Mercedes",
    category: "Wheel Accessories",
    fits: "Mercedes-Benz",
    description: "A set of Mercedes branded tyre valve caps that keep dust and moisture out.",
  },
];

export type Car = {
  id: string;
  make: string;
  model: string;
  body: "suv" | "sedan";
  /** Paint colour used for the illustration when there is no photo */
  color: string;
  highlights: string[];
  /** Leave empty to show "Price on request". Example: "₦85,000,000" */
  price?: string;
  /** Optional photo placed in /public/cars, for example "/cars/range-rover.jpg" */
  image?: string;
};

/*
 * SAMPLE LISTINGS. Replace these with the real cars you have in stock,
 * then add the year, mileage and price to the highlights and price fields.
 */
export const cars: Car[] = [
  {
    id: "range-rover-sport",
    make: "Range Rover",
    model: "Sport",
    body: "suv",
    color: "#1f2a24",
    highlights: ["Luxury SUV", "Automatic", "Workshop inspected"],
  },
  {
    id: "mercedes-gle",
    make: "Mercedes-Benz",
    model: "GLE",
    body: "suv",
    color: "#8e959c",
    highlights: ["Luxury SUV", "Automatic", "Workshop inspected"],
  },
  {
    id: "mercedes-s-class",
    make: "Mercedes-Benz",
    model: "S-Class",
    body: "sedan",
    color: "#14181c",
    highlights: ["Executive saloon", "Automatic", "Workshop inspected"],
  },
  {
    id: "rolls-royce-ghost",
    make: "Rolls-Royce",
    model: "Ghost",
    body: "sedan",
    color: "#e9e6df",
    highlights: ["Ultra luxury saloon", "Automatic", "Workshop inspected"],
  },
];

export const faqs = [
  {
    q: "Which cars do you work on?",
    a: "We specialise in Range Rover, Land Rover, Mercedes-Benz and Rolls-Royce, and we also look after other luxury and exotic brands such as Bentley, Porsche and Maybach.",
  },
  {
    q: "How do I book my car in?",
    a: "Fill in the booking form on this page or email us directly. Tell us the car, the year and what you have noticed, and we will reply to confirm a time.",
  },
  {
    q: "Will I know the cost before the work starts?",
    a: "Yes. We diagnose the car first, then share a clear quote. Work only begins once you have approved it.",
  },
  {
    q: "How do I buy parts from the marketplace?",
    a: "Add the parts you need to your enquiry list and send it to us. We confirm the price, availability and the exact fit for your car before you pay.",
  },
  {
    q: "Do you use genuine spare parts?",
    a: "Yes. We fit genuine and trusted OEM grade parts, and we tell you exactly what is going into your car before we fit it.",
  },
  {
    q: "Can I inspect a car for sale before buying?",
    a: "Of course. Every car we list can be viewed at our Mabushi workshop, and you are welcome to come with your own mechanic.",
  },
] as const;
