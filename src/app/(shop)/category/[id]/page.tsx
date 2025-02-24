import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const products = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

export default async function ({ params }: Props) {
  const { id } = await params;

  const category = products.filter((category) => category.gender === id);

  const labels: Record<Category, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Articulos de ${labels[id]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={category} />
    </>
  );
}
