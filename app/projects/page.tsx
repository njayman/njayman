import Article from "@/components/layouts/article";
import Link from "next/link";

export default function Projects() {
  const githubProfileBaseUrl = "https://githib.com/njayman";

  return (
    <Article>
      <h1 className="text-4xl">Awesome projects</h1>
      <section className="pt-10">
        <h2 className="text-2xl">
          <Link href={`${githubProfileBaseUrl}/proz`} target="_blank">
            Proz
          </Link>
        </h2>
        <p>A terminal based project listing tool.</p>
      </section>
      <section className="pt-10">
        <h2 className="text-2xl">
          <Link href={`${githubProfileBaseUrl}/arlopeeker`} target="_blank">
            Arlopeeker
          </Link>
        </h2>
        <p>A desktop status app that acts as a peeker.</p>
      </section>
      <span>more to come</span>
    </Article>
  );
}
