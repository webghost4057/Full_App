// import conf from '../conf/conf.js'
// import { Client, Account, ID } from "appwrite";

// export class AuthServices {
//     client = new Client();
//     account;
//     constructor() {
//         this.client
//             .setEndpoint(conf.appwriteURL)
//             .setProject(conf.appwriteProjectID);
//         this.account = new Account(this.client);
//     }

//     async createAccount({ email, password, name }) {
//         try {
//             const useraccount = await this.account.create(ID.unique(), email, password, name);
//             console.log(useraccount);
//             if (useraccount) {
//                 return this.login({email, password});
//             }
//             else {
//                 return useraccount;
//             }
//         } catch (error) {
//             console.log("Appwrite serive :: CreateAccount :: error", error);
//         }
//     }

//     async login({ email, password }) {
//         try {
//             return await this.account.createEmailSession(email, password);
//         } catch (error) {
//             console.log("Appwrite serive :: lOGIN :: error", error);

//         }
//     }

//     async logout() {
//         try {
//             return await this.account.deleteSessions()
//         } catch (error) {
//             console.log("Appwrite serive :: lOGOUT :: error", error);
//         }
//     }

//     async getCurrentUser() {
//         try {
//             return await this.account.get();
//         } catch (error) {
//             console.log("Appwrite serive :: getCurrentUser :: error", error);
//         }
//         return null;
//     }
// }

// const authservices = new AuthServices()
// export default authservices


import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthServices {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const useraccount = await this.account.create(ID.unique(), email, password, name);
            console.log(useraccount);
            if (useraccount) {
                return this.login({email, password});
            }
            else {
                return useraccount;
            }
        } catch (error) {
            console.log("Appwrite service :: CreateAccount :: error", error);
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login successful:", session);
            return session;
        } catch (error) {
            if (error instanceof AppwriteException) {
                console.log("Appwrite service :: LOGIN :: error", error.message);
            } else {
                console.log("Appwrite service :: LOGIN :: error", error);
            }
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: LOGOUT :: error", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }
}

const authservices = new AuthServices()
export default authservices