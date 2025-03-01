export enum CategoryType {
    TOP = 'top',
    SUB = 'sub',
    BASE = 'base',
  }
  
export interface Category {
    title: string;
    categoryType: CategoryType;
    parent?: string;  // Parent category title for subcategories and base categories
  }
  
export const categories: Category[] = [
    { title: "Men", categoryType: CategoryType.TOP },
    { title: "Women", categoryType: CategoryType.TOP },
    { title: "Kids", categoryType: CategoryType.TOP },
  
    // Subcategories for Men
    { title: "Apparel", categoryType: CategoryType.SUB, parent: "Men" },
    { title: "Footwear", categoryType: CategoryType.SUB, parent: "Men" },
    { title: "Accessories", categoryType: CategoryType.SUB, parent: "Men" },
  
    // Subcategories for Women
    { title: "Apparel", categoryType: CategoryType.SUB, parent: "Women" },
    { title: "Footwear", categoryType: CategoryType.SUB, parent: "Women" },
    { title: "Accessories", categoryType: CategoryType.SUB, parent: "Women" },
  
    // Subcategories for Kids
    { title: "Apparel", categoryType: CategoryType.SUB, parent: "Kids" },
    { title: "Footwear", categoryType: CategoryType.SUB, parent: "Kids" },
    { title: "Accessories", categoryType: CategoryType.SUB, parent: "Kids" },
  
    // Base categories for Men - Apparel
    { title: "T-Shirts", categoryType: CategoryType.BASE, parent: "Apparel" },
    { title: "Jeans", categoryType: CategoryType.BASE, parent: "Apparel" },
    { title: "Jackets", categoryType: CategoryType.BASE, parent: "Apparel" },
  
    // Base categories for Men - Footwear
    { title: "Sneakers", categoryType: CategoryType.BASE, parent: "Footwear" },
    { title: "Loafers", categoryType: CategoryType.BASE, parent: "Footwear" },
  
    // Base categories for Women - Apparel
    { title: "Dresses", categoryType: CategoryType.BASE, parent: "Apparel" },
    { title: "Tops", categoryType: CategoryType.BASE, parent: "Apparel" },
    { title: "Skirts", categoryType: CategoryType.BASE, parent: "Apparel" },
  
    // Base categories for Women - Footwear
    { title: "Heels", categoryType: CategoryType.BASE, parent: "Footwear" },
    { title: "Flats", categoryType: CategoryType.BASE, parent: "Footwear" },
  
    // Base categories for Kids - Apparel
    { title: "Shirts", categoryType: CategoryType.BASE, parent: "Apparel" },
    { title: "Shorts", categoryType: CategoryType.BASE, parent: "Apparel" },
  
    // Base categories for Kids - Footwear
    { title: "Sneakers", categoryType: CategoryType.BASE, parent: "Footwear" },
    { title: "Boots", categoryType: CategoryType.BASE, parent: "Footwear" },
  ];
  