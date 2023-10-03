export { default } from "next-auth/middleware"

// this applies next-auth only to matching routes 
export const config = { matcher: ["/dashboard"] }