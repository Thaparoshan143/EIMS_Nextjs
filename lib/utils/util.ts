// verify user based on the environment variables...
// user and password are retrieved from .env file.. ensure it is there..

export const verifyUser = (cred: { user: string, password: string} ) => {

    const adminUser = process.env.NEXT_PUBLIC_ADMIN_CRED_USER;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_CRED_PASSWORD;

    // if failed to load the .env file for verifying user.. throw some informations..
    if (!adminUser && !adminPassword)
    {
        showNoEnvCred();
        return false;
    }
    // actual password..
    console.log(cred);

    if (cred.user ==  adminUser && cred.password == adminPassword)
        return true;

    return false;
}

/**
 * Helper wrapper function used to validate the user login with token check..
*/
 export const isValidAccess = () => {
    const adminToken = process.env.NEXT_PUBLIC_ADMIN_CRED_TOKEN;

    if (!adminToken) {
        showNoEnvCred();
        return false;
    }

    if (localStorage.getItem('token') == adminToken) {
        return true;
    }

    return false;
}

// this is helper function..
export function showNoEnvCred()
{
    console.error("couldn't find the admin cred from .env file. Is file missing?");
    console.info('\
            \nUsage: Create .env file in project with at least following variables defined!!\
            \nNEXT_PUBLIC_ADMIN_CRED_USER="userhere.."\
            \nNEXT_PUBLIC_ADMIN_CRED_PASSWORD="passwordhere..."\
            \nNEXT_PUBLIC_ADMIN_CRED_TOKEN="tokenhere..."\
            ');
}

// toast helpers
import { showToast, ToastOptions } from "nextjs-toast-notify";

export interface IToastMsg {
  type: "error" | "info" | "success" | "warning" | "none",
  text?: string,
};

// other global toast args..
const toastOtherGloArgs: ToastOptions = {
    duration: 4000,
    progress: true,
    position: "bottom-center",
    transition: "fadeIn",
    icon: '',
    sound: false,
};

export function showToastHelper(msg: IToastMsg) {
    switch(msg?.type)
    {
        case "success":
            showToast.success(msg?.text || "Success", toastOtherGloArgs);
        break;
        case "error":
            showToast.error(msg?.text || "Error", toastOtherGloArgs);
        break;
        case "warning":
            showToast.success(msg?.text || "Warning", toastOtherGloArgs);
        break;
        case "info":
            showToast.success(msg?.text || "Info", toastOtherGloArgs);
        break;
        case "none":
            // if anything other to be done..
        break;  
        default:
            showToast.error("Unknown Error!! try again!", toastOtherGloArgs);
        break;
    }
} 

// helper function and utils for ease..
import { cGet, cPut } from "./fetch";
import { getRandomFoodItems } from "../data/_foodItems";

const menuFetchURL = process.env.NEXT_PUBLIC_MENU_FETCH_URL;
const posFetchURL = process.env.NEXT_PUBLIC_POS_FETCH_URL;

/**
 * Helper function to fetch all the menu item from database
 * args: setter (usestate) function 
 * on success, it will call the setter function
 */
export const _fetchMenuItems = async (menuItemSetter: (items: any) => void) => {
    const items = await cGet(menuFetchURL || '');

    if (items) {
        menuItemSetter(items);
    }
    else {
        showToastHelper({text: "Error fetching menu items. Try again!", type:"error"});
        menuItemSetter((_: any) => getRandomFoodItems()); // instead of this you can directly pass callback, but since the setter pass items as args so..
    }
}

/**
 * Helper function to fetch all the menu item from database
 * args: setter (usestate) function 
 * on success, it will call the setter function
 */
export const _updatePOSMenuItems = async (data: any) => {
    let mUpdateURL = menuFetchURL || '';
    mUpdateURL += "?multiple=true";
    
    return await cPut(mUpdateURL, data);
}

/**
 * Helper function to fetch all the menu item from database
 * args: setter (usestate) function 
 * on success, it will call the setter function
 */
export const _fetchInvoiceList = async (invoiceSetter: (items: any) => void) => {
    const items = await cGet(posFetchURL || '');

    if (items) {
        invoiceSetter(items);
    }
    else {
        showToastHelper({text: "Error fetching invoices. Try again!", type:"error"});
    }
}