export interface User {
    email: string;
    password: string;
}

export interface Category {
    name: string;
    imgSrc?: string;
    user?: string;
    _id?: string;
}

export interface Message {
    message: string;
}

export interface Position {
    name: string;
    cost: number;
    category: string;
    user?: string;
    _id?: string;
    quantity?: number;
}

export interface Order {
    date?: Date;
    order?: number;
    user?: string;
    list: OrderPosition[];
    _id?: string;
}

export interface OrderPosition {
    name: string;
    cost: number;
    quantity: number;
    _id?: string;
}

export interface Filter {
    start?: Date;
    end?: Date;
    order?: number;
}

export interface OverviewPage {
    gain: OverviewPageItem;
    orders: OverviewPageItem;
}

export interface OverviewPageItem {
    percent: number;
    compare: number;
    yesterday: number;
    isHiegher: boolean;
}

export interface AnaliticsPage {
    average: number;
    chart: AnaliticsChart[];
}

export interface AnaliticsChart {
    gain: number;
    order: number;
    label: string;
}
