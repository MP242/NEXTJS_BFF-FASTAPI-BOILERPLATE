import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { superUser } from './lib/utils';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token');

  const { pathname } = req.nextUrl;

  // Autoriser les requêtes pour les fichiers statiques et les pages publiques
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }

  // Si le token n'existe pas, l'utilisateur n'est pas authentifié
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const superuser = superUser(token.value);

    // Vérifier les rôles pour les chemins protégés
    if (pathname.startsWith('/test') && !superuser) {
      // Rediriger vers la page d'accès refusé si l'utilisateur n'est pas un super utilisateur
      return NextResponse.redirect(new URL('/', req.url));
    }

  // Si l'utilisateur est authentifié, laisser passer la requête
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path*', // Exemple de route protégée
    '/users/:path*', // rajouter la route users car jai un await getUsers
    '/test/:path*'
  ],
};