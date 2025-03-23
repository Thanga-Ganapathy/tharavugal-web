import * as jose from 'jose';

interface TokenPayload {
  [key: string]: any; // Adjust this to match the expected payload structure
}

export default class Auth {
  static SECRET_KEY: string | undefined = process.env.SECRET_KEY;  

  // Make sure the SECRET_KEY is available
  static checkSecretKey(): void {

    if (!this.SECRET_KEY) {
      throw new Error('SECRET_KEY environment variable is missing.');
    }
  }

  static async generateToken(payload: TokenPayload): Promise<string> {
    // Ensure SECRET_KEY is set
    this.checkSecretKey();
    
    const secret = jose.base64url.decode(this.SECRET_KEY as string);
    
    // Generate the token using EncryptJWT
    try {
      const authToken = await new jose.EncryptJWT(payload)
        .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
        .setIssuedAt()
        .setExpirationTime('30m')
        .encrypt(secret);

      return authToken;
    } catch (error) {
      console.error('Error generating token:', error);
      throw new Error('Failed to generate token');
    }
  }

  static async isAuthenticated(token: string): Promise<TokenPayload | Boolean> {
    // Ensure SECRET_KEY is set
    this.checkSecretKey();
    
    try {
      const secret = jose.base64url.decode(this.SECRET_KEY as string);
      
      // Decrypt the token
      const { payload } = await jose.jwtDecrypt(token.split(' ')[1], secret);
      
      // Here you could add extra payload validation if needed
      return payload as TokenPayload;
    } catch (error) {
      console.error('Error verifying token:', error);
      
      return false
    }
  }
}
