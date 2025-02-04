export type user = {
    id: string;
    name: string;
    lastname: string;
    email: string;
    image: string;
    password: string;
    role: string;
}

export type review = {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
}

export type product = {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
    category: string;
    reviews: review[];
}

// export type cartItem = {
//     productId: string;
//     quantity: number;
// }

