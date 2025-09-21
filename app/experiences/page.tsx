import Article from "@/components/layouts/article";
import { getMyWorkingExperience } from "@/utils";
import Link from "next/link";

export default function Experiences() {
  return (
    <Article>
      <h1 className="text-4xl">
        My {getMyWorkingExperience()} years of experience
      </h1>
      <section className="pt-3">
        <h2 className="text-2xl font-bold">
          <Link href="https://therapbd.com" target="_blank">
            Therap (BD) Ltd.
          </Link>
        </h2>
        <span>Software Engineer</span>
        <br />
        <span>2023 - 2025</span>
        <ul className="list-disc ml-10">
          <li>Front end development with react, Typescript.</li>
          <li>
            Internal libraries, web components, and module development from
            scratch including storybooks and unit tests using react, typescript
            and vanilla js. (DateTimePicker, Localization Context, Data Table,
            Event-driven reactive modules, etc.).
          </li>
          <li>Code review and Code refactoring.</li>
          <li>Training and mentoring new recruits.</li>
        </ul>
      </section>
      <section className="pt-3">
        <h2 className="text-2xl font-bold">
          <Link href="https://mirinfosys.com" target="_blank">
            MIR Info Systems Ltd. (Formerly Ergo Ventures Ltd.)
          </Link>
        </h2>
        <span>Software Engineer</span>
        <br />
        <span>2022 - 2023</span>
        <ul className="list-disc ml-10">
          <li>
            Front end development with react, typescript and related libraries
            like tailwind css, material UI, react router, react-redux, tanstack
            etc.
          </li>
          <li>
            Development of odoo modules using python, xml and OWL(a frontend
            framwork for odoo).
          </li>
          <li>Backend development with python, Django, FastAPI and nodejs.</li>
          <li>Containerizing and Deploying web application in the cloud.</li>
          <li>
            Configuring and deploying AI chatbot using RASA machine learning
            framework and FastAPI.
          </li>
        </ul>
      </section>
      <section className="pt-3">
        <h2 className="text-2xl font-bold">
          <Link href="https://kernelinternational.com" target="_blank">
            Kernel International Ltd.
          </Link>
        </h2>
        <span>Web Developer (Intern)</span>
        <br />
        <span>2019 - 2022</span>
        <ul className="list-disc ml-10">
          <li>
            Front end development with react, typescript and related libraries
            like bootstrap, material UI, react router, react-redux, tanstack
            etc.
          </li>
          <li>Backend development with typescript and nodejs.</li>
          <li>Containerizing and Deploying web application in the cloud.</li>
        </ul>
      </section>
    </Article>
  );
}
