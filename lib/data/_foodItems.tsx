// example...
export const _foodItems = [
    {
        name: "Sprite",
        imgpath: "#",
        price: 250,
        quantity: 50
    },
    {
        name: "Kurmure",
        imgpath: "#",
        price: 80,
        quantity: 10
    },
];

const _randFoodItemsCount = 6


export function getArray(count : number)
{
    return Array(count).fill(0).map((_, index) => index + 1)
}

export function getRandInt(low: number, high: number)
{
    return Math.floor((Math.random() * (high - low)) + low)
}

export function getRandChar(charCount: number)
{
    let charASCIITemp = getArray(charCount).map((num) => getRandInt(65, 90));

    return String.fromCharCode(...charASCIITemp);
}

// expected to be used in case of fallback..
export function getRandomFoodItems() {
    const arr = getArray(_randFoodItemsCount)
    let name, imgpath, price, quantity;

    return arr.map((num) => {
        name = getRandChar(10);
        imgpath = "https://www.eatthis.com/wp-content/uploads/sites/4/2024/07/Copy-of-MULTIPLE-PRODUCTS-TEMPLATE.jpg?quality=82&strip=all";
        price = getRandInt(50, 500);
        quantity = getRandInt(5, 100);

        return { name, imgpath, price, quantity };
    })
}
