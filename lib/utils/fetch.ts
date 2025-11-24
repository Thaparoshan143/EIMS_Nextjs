import axios from "axios";

const axiosIns = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Custom GET request wrapper from urls (Axios based)..
 * args: url
 */
export const cGet = async (url: string) => {
    
    try {
        const res = await axiosIns.get(url);

        const data = await res.data;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * for prev. support cFetch simply cGet forwarder..
 */
export const cFetch = cGet;


/**
 * Custom POST request wrapper from urls (Axios based)..
 * args: url, data (post object)
 */
export const cPost = async (url: string, data: any) => {
    
    console.log("In the post method: rec");
    console.log(typeof data);
    console.log(data);
    try {
        const res = await axiosIns.post(url, data);

        return await res.data;
    } catch (error) {
        console.log("Idk error here in frontend forward");
        console.error(error);
        return null;
    }
}