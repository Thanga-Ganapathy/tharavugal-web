import { NextResponse } from 'next/server';
import { USER_ROLES } from './constants';
import Auth from './utils/Auth';

const routesConfig = {
  public: [
    { path: '/api/signin' },
    { path: '/api/search' },
    { path: '/api/event-categories' },
    { path: '/api/event-locations' },
    { path: '/api/visualize' },
    { path: '/api/events' },
    { path: '/api/events/.+' },
    { path: '/api/events/search' },
    { path: '/api/statistics/tags/.+' },
    { path: '/api/statistics/locations/.+' },
    { path: '/api/thamizhl-dictionary' },
    { path: '/api/feedback' },
    { path: '/api/announcements' },
    { path: '/api/quick-stats' },
    { path: '/api/did-you-know' },
  ],
  protected: [
    { path: '/api/admin', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/contribution-logs', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/contribution-logs/.+', roles: [USER_ROLES.ADMIN] },
    { path: '/api/entities', roles: [USER_ROLES.ADMIN] },
    { path: '/api/entity-types', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/events', roles: [USER_ROLES.ADMIN] },
    { path: '/api/food-ingredients', roles: [USER_ROLES.ADMIN] },
    { path: '/api/food-ingredients/.+', roles: [USER_ROLES.ADMIN] },
    { path: '/api/uploads', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/resources', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/resources/.+', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/thamizhl-dictionary', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/thamizhl-dictionary/.+', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/facts', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/facts/.+', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/announcements', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/announcements/.+', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/event-categories', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/event-locations', roles: [USER_ROLES.ADMIN] },
    { path: '/api/admin/feedbacks', roles: [USER_ROLES.ADMIN] },
  ],
};

async function authorize(req, route) {
  const authPayload = await Auth.isAuthenticated(
    req.headers.get('authorization')
  );

  if (authPayload) {
    return route.roles.includes(authPayload.role);
  }

  return false;
}

export const config = {
  matcher: '/api/:function*',
};

function matchRoute(path, arr) {
  return arr.find((p) => {
    const arr = path.match(p.path);
    if (arr && arr[0] === path) return true;
  });
}

export async function middleware(req, res) {
  const path = req.nextUrl.pathname;
  const publicRoute = matchRoute(path, routesConfig.public);

  if (publicRoute) {
    return NextResponse.next();
  }

  const protectedRoute = matchRoute(path, routesConfig.protected);

  if (protectedRoute) {
    const isAllowed = await authorize(req, protectedRoute);

    if (!isAllowed) {
      return new NextResponse(
        JSON.stringify({ message: 'Permission Denied!' }),
        {
          status: 401,
          headers: { 'content-type': 'application/json' },
        }
      );
    }

    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL('/404', req.url));
}
