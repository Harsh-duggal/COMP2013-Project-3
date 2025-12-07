const token = Cookies.get("jwt-authorization");
const decoded = jwtDecode(token);

console.log(decoded.isAdmin);
//imported for the admin stuff 