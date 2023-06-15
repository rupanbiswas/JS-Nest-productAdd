// import { Injectable, Logger } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';
// import { Product } from './products/entities/product.entity';
// import { ProductRepository } from './products/product.reository';
// import { Stores } from './stores/entities/store.entity';
// import { StoreRepository } from './stores/store.repository';

// @Injectable()
// export class ScheduledTasksService {
//   constructor(
//     private readonly storeRepository: StoreRepository,
//     private readonly productRepository: ProductRepository,
//   ) { }
//   private readonly logger = new Logger(ScheduledTasksService.name);

//   // List scheduled jobs below
//   @Cron('0 1 * * *')
//   async handleCron() {
//     const data = null; //shopify data
//     try {
//       const stores: Store[] = await null; // all stores from our db

//       stores.forEach(async (store) => {
//         const storeProductsInDB: Product[] = await null;
//         const storeProductsInShopify: Product[] = await null;
//         storeProductsInDB.forEach(async (storeProductInDB) => {
//           const checkIfProductRemovedInShopify: boolean =
//             storeProductsInShopify.some((storeProductInShopify) => {
//               return storeProductInShopify == storeProductInDB;
//             });
//           if (checkIfProductRemovedInShopify == false) {
//             //delete from db
//           }
//         });
//         storeProductsInShopify.forEach(async (storeProductInShopify) => {
//           const checkIfProductRemovedInShopify: boolean =
//             storeProductsInDB.some((storeProductInDB) => {
//               return storeProductInShopify == storeProductInDB;
//             });
//           if (checkIfProductRemovedInShopify == false) {
//             //insert shopify product in db
//           }
//         });
//       });
//       this.logger.debug('Called when the current second is 45');
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// }
