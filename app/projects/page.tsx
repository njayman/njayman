import Article from "@/components/layouts/article";
import Link from "next/link";

export default function Projects() {
  const githubProfileBaseUrl = "https://githib.com/njayman";
  return (
    <Article>
      <h1 className="text-4xl">Awesome projects</h1>
      <section>
        <h2 className="text-2xl">
          <Link href={`${githubProfileBaseUrl}/proz`} target="_blank">
            Proz
          </Link>
        </h2>
        <p>A terminal based project listing tool.</p>
      </section>
      <span>more to come</span>
    </Article>
  );
}
