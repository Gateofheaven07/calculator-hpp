export const dynamic = "force-dynamic";

import { getMaterials } from "@/app/actions/material-actions";
import { MaterialTable } from "@/components/dashboard/material-table";
import { MaterialsHeader } from "@/components/dashboard/materials-header";

export default async function MaterialsPage() {
  const materials = await getMaterials();

  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full pb-20">
      <MaterialsHeader />
      <MaterialTable materials={materials} />
    </div>
  );
}
