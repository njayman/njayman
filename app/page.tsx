import Article from "@/components/layouts/article";
import { getMyWorkingExperience } from "@/utils";
import Link from "next/link";
import { Github, Globe, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <Article>
      <h1 className="text-4xl">
        Hello,
        <br />
        This is Najish Mahmud
      </h1>
      <p className="text-lg pt-5">
        I am a self taught software engineer with more than{" "}
        {getMyWorkingExperience()} years of experience working in the industry.
      </p>
      <p className="text-base pt-5">I am specialized in:</p>
      <ul className="list-disc">
        <li>Web application development.</li>
        <li>
          Web application deployment (linux, containers, web app platforms like
          vercel, netlify, etc.)
        </li>
        <li>Server configuration for deploying web applications.</li>
      </ul>
      <section className="pt-3 w-full">
        <div className="flex flex-row justify-center">
          <Link href="https://njayman.com" className="m-2" target="_blank">
            <Globe />
          </Link>
          <Link
            href="https://github.com/njayman"
            className="m-2"
            target="_blank"
          >
            <Github />
          </Link>
          <Link
            href="https://linkedin.com/in/najishmahmud"
            className="m-2"
            target="_blank"
          >
            <Linkedin />
          </Link>
        </div>
      </section>
    </Article>
  );
}
