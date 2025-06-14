import Article from "@/components/layouts/article";

export default function Toolbox() {
  return (
    <Article>
      <h1 className="text-4xl">My Favourite tools that I use daily</h1>
      <ul className="list-disc pl-10">
        <li>nvim - a hackable text editor in terminal.</li>
        <li>VSCode - a GUI code editor based on electron.</li>
        <li>lazygit - a tui based git client.</li>
        <li>
          i use &quot;Arch&quot; btw - a linux distro which provides flexibility
          and control, allowing users to build their ideal environment.
        </li>
        <li>
          Hyprland - a wayland based window manager for maximum utilization of
          window spaces and productivity.
        </li>
        <li>Docker - just contain and ship to production.</li>
      </ul>
      <span>and many more...</span>
    </Article>
  );
}
