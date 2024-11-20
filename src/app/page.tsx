import GridLayout from "@/layouts/grid";
import { lgLayout, mdLayout, smLayout } from "@/config/layouts";
import { gridItems } from "@/config/grid-items";

export default async function Home() {
  return (
    <main className="py-8">
      <GridLayout lgLayout={lgLayout} mdLayout={mdLayout} smLayout={smLayout}>
        {gridItems.map((item) => (
          <div key={item.i}>{<item.component />}</div>
        ))}
      </GridLayout>
    </main>
  );
}
