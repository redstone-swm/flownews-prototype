import { jwtDecode } from 'jwt-decode';

interface JWTClaims {
  exp: number;
  iat: number;
  [key: string]: any;
}

export function decodeJWT(token: string): JWTClaims | null {
  try {
    return jwtDecode<JWTClaims>(token);
  } catch (error) {
    console.error('JWT 디코딩 실패:', error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const claims = decodeJWT(token);
  if (!claims) return true;
  
  const currentTime = Date.now() / 1000;
  return claims.exp < currentTime;
}