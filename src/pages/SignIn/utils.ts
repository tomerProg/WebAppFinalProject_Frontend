import { CredentialResponse } from "@react-oauth/google";

export const loginWithGoogle = (credentialResponse: CredentialResponse) => {
    console.log('send to /aut/google-login', credentialResponse.credential)
}
