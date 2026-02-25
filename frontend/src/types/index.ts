export interface IProduct {
  id: string;
  name: string;
  unit: 'kg' | 'l' | 'pcs' | 'g' | 'ml';
  current_quantity: number;
  min_quantity: number;
  max_quantity: number;
  price_per_unit: number;
  supplier_id: string;
  expiry_date?: Date;
  category: string;
  photo_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IRecipe {
  id: string;
  name: string;
  description?: string;
  portion_size: number;
  unit: string;
  cost: number;
  price: number;
  profit_margin: number;
  category: string;
  photo_url?: string;
  ingredients: IRecipeIngredient[];
  created_at: Date;
  updated_at: Date;
}

export interface IRecipeIngredient {
  id: string;
  recipe_id: string;
  product_id: string;
  name: string;
  quantity: number;
  unit: string;
  cost: number;
}

export interface IOrder {
  id: string;
  order_number: string;
  customer_name?: string;
  table_number?: number;
  items: IOrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';
  total_cost: number;
  total_price: number;
  created_at: Date;
  started_at?: Date;
  completed_at?: Date;
}

export interface IOrderItem {
  id: string;
  order_id: string;
  recipe_id: string;
  quantity: number;
  special_instructions?: string;
  status: 'pending' | 'preparing' | 'ready';
}

export interface IDashboardMetrics {
  low_stock_items: IProduct[];
  pending_orders: IOrder[];
  daily_cost: number;
  daily_revenue: number;
  daily_profit: number;
}
