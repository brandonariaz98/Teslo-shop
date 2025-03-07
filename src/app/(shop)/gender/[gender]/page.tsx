export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const search = await searchParams;
  const page = search.page ? parseInt(search.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
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
        title={`Articulos de ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
