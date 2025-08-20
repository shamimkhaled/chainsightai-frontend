import React from "react";
import { Briefcase, Lightbulb, Linkedin, Mail, MapPin } from "lucide-react";

const founders = [
  {
    name: "Pratim Lala",
    image: "/PratimLala.jpeg",
    position: "Co-Founder , ChainSightAI",
    description:
      "With over 25 years of experience in the industry, Founder One has spearheaded numerous initiatives in AI and global trade innovation. His leadership has shaped strategic visions and transformed organizations.",
    workHistory: [
      "Former Director at GlobalTrade Inc. (2010–2020)",
      "Advisor to multiple AI startups in logistics and compliance",
      "Led cross-border AI compliance automation projects in APAC & Europe",
    ],
  },
  {
    name: "Mashruf H.",
    image: "/Mashruf H.jpeg",
    position: "Co-Founder , ChainSightAI",
    description:
      "Founder Two is an expert in systems architecture and AI-driven analytics. With a background in tech innovation, he has played a crucial role in developing scalable platforms for Fortune 500 clients.",
    workHistory: [
      "Ex-CTO at DataLogix Systems (2015–2023)",
      "Designed real-time compliance engines using NLP & ML",
      "Patent holder in trade document classification systems",
    ],
  },
  {
    // name: "Steve Johnson - Arman",
    // image: "/founder3.jpg",
    // position: "COO & Co-Founder",
    // description:
    //   "Founder Three brings operational excellence and strategic foresight. With a track record of leading global operations, he ensures efficient execution of business objectives and team synergy.",
    // workHistory: [
    //   "VP of Operations at TradeGrid Corp. (2012–2022)",
    //   "Scaled ops across 3 continents with 200+ team members",
    //   "Implemented AI-based optimization in customs clearance",
    // ],
  },
];

export default function FoundersSection() {
  return (
    <section id="founders" className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
          Meet the Founders
        </h2>

        {/* Founder 1 */}
        <div className="flex flex-col md:flex-row items-center mb-12 bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow-md transition hover:shadow-lg">
          {/* Founder Image */}
          <img
            src="/PratimLala.jpeg"
            alt="Founder 1"
            className="w-40 h-40 aspect-square rounded-full object-cover mb-4 md:mb-0 md:mr-8"
          />

          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {founders[0].name}
            </h3>
            {/* <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> CEO, ChainSight | 25+ Years in
              Supply Chain Risk
            </p> */}

            <p className="text-slate-700 dark:text-slate-300 text-justify mb-4">
              Co-Founder , ChainSightAI | Technology & Systems Leader Pratim is a seasoned technology and business leader with two decades of experience spanning telecom, system integration, outsourcing, and enterprise solutions. As Co-Founder & Executive Director at ChainSightAI, he leverages his deep technical expertise and strategic leadership to architect scalable systems and strengthen organizational efficiency.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-justify mb-4">
              He has served as CEO, CTO, and Executive Director across companies in Bangladesh, Singapore, and Hong Kong, including Genex Infosys, SOFTCALL, Hanzo Communications, Bitucom, and Accord Telecom. His work has focused on deploying large-scale technology systems, managing BPO operations, and driving digital innovation across global markets.
            </p>

            {/* Key Highlights */}
            <div className="mb-4">
              <h4 className="text-slate-800 dark:text-white font-semibold mb-1 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> Areas of Expertise
              </h4>
              <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
                <li>System deployment & integration</li>
                <li>Business process outsourcing (BPO)</li>
                <li>Telecom & enterprise technology leadership</li>
                <li>Strategic operations & organizational management</li>
                <li>Cross-border business development</li>
              </ul>
            </div>

            {/* Contact / Social */}
            <div className="flex items-center space-x-4 mt-4">
              <a
                href="mailto:founder@example.com"
                className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/pratim-lala/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </div>

        {/* Founder 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center mb-12 bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 shadow-md">
          <img
            src="/Mashruf H.jpeg"
            alt="Founder 2"
            className="w-40 h-40 aspect-square rounded-full object-cover mb-4 md:mb-0 md:ml-8"
          />
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {founders[1].name}
            </h3>
            {/* <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
              Chief Risk Officer | 20+ Years in Trade Finance
            </p> */}
            <p className="text-slate-700 dark:text-slate-300 text-justify mb-4">
              Co-Founder, ChainSightAI | Entrepreneur & Global Strategist With over a decade of leadership across aviation, technology, healthtech, supply chain, and apparel, Mashruf has built a career on driving innovation and scaling businesses worldwide. As Founder & CEO of ChainSightAI, he brings deep expertise in global sales, strategic partnerships, and corporate governance, blending experience from ventures such as Regent Airways, Appnometry, Rescue Plastics, and Omoide Health.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-justify mb-4">
              Previously, Mashruf led Regent Airways from its inception, growing it into a major regional carrier with over 1,100 employees and international operations across Asia and the Middle East. He also co-founded multiple startups in technology and sustainability, including a recycled textile brand and a pediatric healthtech platform.
            </p>
            {/* Key Highlights */}
            <div className="mb-4">
              <h4 className="text-slate-800 dark:text-white font-semibold mb-1 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> Areas of Expertise
              </h4>
              <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
                <li>Global business expansion & market strategy</li>
                <li>Supply chain & logistics optimization</li>
                <li>Strategic partnerships & brand collaborations</li>
                <li>Corporate governance & regulatory compliance</li>
                <li>Technology innovation & digital transformation</li>
              </ul>
            </div>

            {/* Contact / Social Icons */}
            <div className="flex items-center space-x-4 mt-2">
              <a
                href="mailto:founder2@example.com"
                className="text-slate-500 hover:text-red-600 dark:hover:text-red-400"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/mashruf-h/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-red-600 dark:hover:text-red-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Chicago, USA
              </span>
            </div>
          </div>
        </div>

        {/* Founder 3 */}
        {/* <div className="flex flex-col md:flex-row items-center mb-12 bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow-md transition hover:shadow-lg"> */}
          {/* Founder Image  */}
          {/* <img
            src="/founder3.jpg"
            alt="Founder 3"
            className="w-40 h-40 aspect-square rounded-full object-cover mb-4 md:mb-0 md:mr-8"
          /> */}

          {/* Content */}
          {/* <div> */}

            {/* <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {founders[2].name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> CEO, ChainSight | 25+ Years in
              Supply Chain Risk
            </p>

            <p className="text-slate-700 dark:text-slate-300 text-justify mb-4">
              A seasoned executive with over two decades of expertise in global
              logistics, vendor evaluation, and trade compliance. Spearheaded
              supply chain initiatives across Fortune 500 companies, enhancing
              operational efficiency and resilience.
            </p>

            <div className="mb-4">
              <h4 className="text-slate-800 dark:text-white font-semibold mb-1 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> Areas of Expertise
              </h4>
              <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
                <li>Global supply chain optimization & strategy</li>
                <li>Vendor compliance and regulatory frameworks</li>
                <li>Digital transformation and automation</li>
                <li>Risk assessment and crisis management</li>
                <li>Cross-border logistics and customs management</li>
              </ul>
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <a
                href="mailto:founder@example.com"
                className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/founder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Texas, USA
              </span>
            </div> */}

          {/* </div> */}

        {/* </div> */}

      </div>
    </section>
  );
}
