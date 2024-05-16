import conf from '../conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthServices {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const useraccount = await this.account.create(ID.unique(), email, password, name)
            if (useraccount) {
                return this.login(email, password)
            }
            else {
                return useraccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            const user = await this.account.createEmailSession(email, password)
            return user
        } catch (error) {
            throw error

        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

    async getcurrentUser() {
        try {
            return await this.account.getcurrentUser()
        } catch (error) {
            throw error
        }
        return null
    }
}


const authservices = new AuthServices()

export default authservices