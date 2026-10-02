// Account ownership is not a global privilege. Only explicit backend booleans count.
export interface AccessIdentity { is_global_admin?: unknown; is_operator?: unknown }
export function canAdmin(identity: AccessIdentity | null | undefined): boolean {
  return identity?.is_global_admin === true;
}
export function canOperate(identity: AccessIdentity | null | undefined): boolean {
  return canAdmin(identity) || identity?.is_operator === true;
}
export function privilegedLinks(identity: AccessIdentity | null | undefined) {
  return [
    ...(canOperate(identity) ? [{ href: "/operations", label: "Betrieb" }, { href: "/admin?tab=testimonials", label: "Testimonials" }] : []),
    ...(canAdmin(identity) ? [{ href: "/admin/overview", label: "Administration" }] : []),
  ];
}
export function isProtectedPath(pathname: string): boolean {
  return ["/kundenbereich", "/admin", "/operations"].some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)) || pathname === "/checkout/return";
}
