/**
 * This is the custom fetch for getting from urls..
 */
export const cFetch = async (url: string) => {
    
    try {
        // for now using default fetch.. 
        const res = await fetch(url)

        if (!res.ok) {
            console.error(`Error fetching with given URL: ${url} with status code: ${res.status}` )
            return null;
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}