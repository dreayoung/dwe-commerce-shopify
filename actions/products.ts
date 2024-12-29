'use server';

import { squareClient, retryWithBackoff } from '../lib/square';

export async function getImage(id: string): Promise<any | null> {
  try {
    const response = await retryWithBackoff(() =>
      squareClient.catalogApi.retrieveCatalogObject(id, true)
    );

    const item = response.result.object;

    if (item?.type !== 'IMAGE') {
      return null;
    }

    return item?.imageData?.url;
  } catch (error) {
    console.log(error);
  }
}

export async function getOptions() {
  try {
    const response = await retryWithBackoff(() =>
      squareClient.catalogApi.listCatalog(undefined, 'ITEM_OPTION')
    );

    return response.result.objects.map((item: any) => {
      return {
        id: item.id,
        name: item.itemOptionData.name,
        values: item.itemOptionData.values
      };
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    const response = await retryWithBackoff(() =>
      squareClient.catalogApi.listCatalog(undefined, 'ITEM')
    );

    const items = await Promise.all(
      response.result.objects
        ?.filter((obj: any) => obj.type === 'ITEM')
        .map(async (item: any) => {
          const previewImg = await getImage(item.itemData?.imageIds[0]);

          return {
            id: item.id,
            name: item.itemData.name,
            description: item.itemData.description,
            price: Number(item.itemData.variations?.[0].itemVariationData.priceMoney.amount) / 100,
            previewImg,
            isArchived: item.itemData.isArchived
          };
        }) || []
    );

    return items;
  } catch (error: any) {
    console.log('Error fetching all products:', error);
  }
}

export async function getProduct(id: string) {
  try {
    const response = await squareClient.catalogApi.retrieveCatalogObject(id);
    const item = response.result.object;

    if (item?.type !== 'ITEM') {
      return null;
    }

    const imageUrls = await Promise.all(
      (item.itemData?.imageIds || []).map(async (imageId) => {
        return await getImage(imageId);
      })
    );

    const options = await getOptions();

    const variations = item.itemData?.variations;
    if (variations) {
      const inventoryResponse = await squareClient.inventoryApi.batchRetrieveInventoryCounts({
        catalogObjectIds: variations.map((v) => v.id)
      });

      const inventoryCounts = inventoryResponse.result.counts || [];

      const variationsWithInventory = variations.map((variation) => {
        const inventoryCount = inventoryCounts.find(
          (count) => count.catalogObjectId === variation.id
        );

        const prodOptions: any[] = [];

        variation.itemVariationData?.itemOptionValues?.forEach((optionValue) => {
          prodOptions.push(optionValue);
        });

        return {
          id: variation.id,
          name: variation.itemVariationData?.name,
          currency: variation.itemVariationData?.priceMoney?.currency,
          availableForSale: inventoryCount ? Number(inventoryCount.quantity) > 0 : false,
          quantity: inventoryCount ? Number(inventoryCount.quantity) : 0,
          selectedOptions: prodOptions
        };
      });

      return {
        id: item.id,
        name: item.itemData?.name,
        price: Number(item.itemData?.variations?.[0]?.itemVariationData?.priceMoney?.amount) / 100,
        description: item.itemData?.descriptionHtml,
        variations: variationsWithInventory,
        options,
        imageUrls
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
