export const appRoutes = [
  { path: '/', label: 'Home', elementKey: 'home', showInNav: true },
  { path: '/dashboard', label: 'Dashboard', elementKey: 'dashboard', showInNav: true },
  { path: '/pricing', label: 'Pricing', elementKey: 'pricing', showInNav: true },
  { path: '/blog', label: 'Blog', elementKey: 'blog', showInNav: true },
  { path: '/privacy', label: 'Privacy Policy', elementKey: 'privacy', showInNav: false }
]

export const primaryNavItems = appRoutes.filter((route) => route.showInNav)
export const footerLegalLinks = appRoutes.filter((route) => route.path === '/privacy')
