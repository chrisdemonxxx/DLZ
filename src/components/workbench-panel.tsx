import { BarcodePanel } from "./barcode-panel";
import { CardPanel } from "./card-panel";
import { CatalogPanel } from "./catalog-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function WorkbenchPanel() {
  return (
    <Tabs defaultValue="card" className="w-full">
      <TabsList className="mb-4 h-auto w-full flex-wrap justify-start">
        <TabsTrigger value="card" className="flex-1 sm:flex-none">
          Card face
        </TabsTrigger>
        <TabsTrigger value="barcode" className="flex-1 sm:flex-none">
          PDF417
        </TabsTrigger>
        <TabsTrigger value="spec" className="flex-1 sm:flex-none">
          Official spec
        </TabsTrigger>
      </TabsList>
      <TabsContent value="card">
        <CardPanel />
      </TabsContent>
      <TabsContent value="barcode">
        <BarcodePanel />
      </TabsContent>
      <TabsContent value="spec">
        <CatalogPanel />
      </TabsContent>
    </Tabs>
  );
}
