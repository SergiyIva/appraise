import { box } from "@/styled-system/patterns";
import { AddUser } from "@/src/components/control/AddUser";
import { Tree } from "@/src/components/tree/Tree";

export default async function Home() {
  return (
    <main
      className={box({
        overflow: "auto",
        h: "100vh",
      })}
    >
      <AddUser />
      <Tree />
    </main>
  );
}
