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
