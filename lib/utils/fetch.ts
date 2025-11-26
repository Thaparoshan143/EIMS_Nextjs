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
        if (url == '') {
            console.error("URL is blank!!");
            return null;
        }
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
    
    try {
        if (url == '' || !data) {
            console.error("Either URL is blank or data not passed");
            return null;
        }
        const res = await axiosIns.post(url, data);

        return await res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Custom PUT request wrapper from urls (Axios based)..
 * args: url (with keypair, eg: ?id=1), data (put object)
 */
export const cPut = async (url: string, data: any) => {
    
    try {
        if (url == '' || !data) {
            console.error("Either URL is blank or data not passed");
            return null;
        }
        const res = await axiosIns.put(url, data);

        return await res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Custom DELETE request wrapper from urls (Axios based)..
 * args: url (with keypair, eg: ?id=1)
 */
export const cDelete = async (url: string) => {
    
    try {
        if (url == '') {
            console.error("URL is blank!!");
            return null;
        }

        const res = await axiosIns.delete(url);

        return await res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}