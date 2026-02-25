// User Types
export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'chef' | 'viewer';
  restaurant_id: string;
  phone?: string;
  created_at: Date;
  updated_at: Date;
}

// Product/Inventory Types
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

// Recipe Types
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
  allergens: string[];
  nutrition: {
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
  };
  ingredients: IRecipeIngredient[];
  created_at: Date;
  updated_at: Date;
}

export interface IRecipeIngredient {
  id: string;
  recipe_id: string;
  product_id: string;
  quantity: number;
  unit: string;
  cost: number;
}

// Order Types
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

// Supplier Types
export interface ISupplier {
  id: string;
  name: string;
  contact_person?: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  delivery_days?: string;
  payment_terms?: string;
  created_at: Date;
}

// Staff Types
export interface IStaff {
  id: string;
  user_id: string;
  position: string;
  hire_date: Date;
  salary?: number;
  schedule?: IShift[];
  performance_metrics?: {
    dishes_prepared: number;
    quality_score: number;
    avg_time_per_dish: number;
  };
}

export interface IShift {
  id: string;
  staff_id: string;
  date: Date;
  start_time: string;
  end_time: string;
  position: string;
}

// Analytics Types
export interface IDashboardMetrics {
  low_stock_items: IProduct[];
  pending_orders: IOrder[];
  dishes_of_day: IRecipe[];
  staff_on_duty: IStaff[];
  daily_cost: number;
  daily_revenue: number;
  daily_profit: number;
}

export interface IPurchaseOrder {
  id: string;
  supplier_id: string;
  order_date: Date;
  items: IPurchaseItem[];
  status: 'draft' | 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  total_cost: number;
  delivery_date?: Date;
  notes?: string;
}

export interface IPurchaseItem {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}
