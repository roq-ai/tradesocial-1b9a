const mapping: Record<string, string> = {
  bookmarks: 'bookmark',
  charts: 'chart',
  companies: 'company',
  follows: 'follow',
  portfolios: 'portfolio',
  profiles: 'profile',
  stats: 'stats',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
