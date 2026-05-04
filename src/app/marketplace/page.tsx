import MarketplaceClient from "@/components/marketplace/MarketplaceClient"
import { getProductsWithArtisans } from "@/lib/demo-data"

export default function MarketplacePage() {
  return <MarketplaceClient initialProducts={getProductsWithArtisans()} />
}
